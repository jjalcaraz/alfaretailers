import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { emailService } from '@/lib/email';
import {
  ContactPayload,
  RequestSignals,
  applyRateLimits,
  botScore,
  buildLogContext,
  evaluateTiming,
  getContactMetricsSnapshot,
  getRecommendedThresholds,
  recordAccepted,
  recordBlocked,
  recordQuarantined,
  shouldQuarantine,
  shouldRejectForBotScore,
  storeQuarantineRecord,
  validateOriginSignals,
  verifyContactFormAttestationToken,
  verifyHumanChallenge,
} from '@/lib/security/contact-guard';

const SUCCESS_RESPONSE = {
  success: true,
  message: 'Thank you for your inquiry! We\'ll get back to you within 24 hours.',
};

const GENERIC_BLOCK_MESSAGE = 'We could not process your request at this time. Please try again later.';

const optionalShortText = z.string().trim().max(120).optional();

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address').max(254, 'Email is too long'),
  phone: z.string().trim().max(30, 'Phone number is too long').optional(),
  message: z.string().trim().min(20, 'Message must be at least 20 characters').max(2000, 'Message is too long'),
  propertyType: optionalShortText,
  bedrooms: optionalShortText,
  bathrooms: optionalShortText,
  address: z.string().trim().max(200).optional(),
  companyWebsite: z.string().trim().max(0).optional(),
  formStartedAt: z.number().int().positive(),
  formAttestationToken: z.string().trim().min(1, 'Security token missing'),
  turnstileToken: z.string().trim().optional(),
});

function extractClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return request.headers.get('x-real-ip') || 'unknown';
}

function buildRequestSignals(request: NextRequest): RequestSignals {
  return {
    ip: extractClientIp(request),
    userAgent: request.headers.get('user-agent') || 'unknown',
    origin: request.headers.get('origin'),
    referer: request.headers.get('referer'),
  };
}

function blockedResponse(status: number) {
  return NextResponse.json(
    {
      success: false,
      message: GENERIC_BLOCK_MESSAGE,
    },
    { status },
  );
}

export async function POST(request: NextRequest) {
  const signals = buildRequestSignals(request);

  let parsedPayload: ContactPayload | null = null;

  try {
    const body = await request.json();

    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.errors.map((error) => ({
            field: error.path.join('.'),
            message: error.message,
          })),
        },
        { status: 400 },
      );
    }

    parsedPayload = {
      ...validationResult.data,
      email: validationResult.data.email.toLowerCase(),
      phone: validationResult.data.phone?.trim(),
      propertyType: validationResult.data.propertyType?.trim(),
      bedrooms: validationResult.data.bedrooms?.trim(),
      bathrooms: validationResult.data.bathrooms?.trim(),
      address: validationResult.data.address?.trim(),
      companyWebsite: validationResult.data.companyWebsite?.trim(),
    };

    const originValidation = validateOriginSignals(signals);
    if (!originValidation.ok) {
      recordBlocked(originValidation.reason);
      console.warn('contact_form_blocked', {
        reason: originValidation.reason,
        ...buildLogContext(parsedPayload, signals),
      });
      return blockedResponse(403);
    }

    const attestationResult = verifyContactFormAttestationToken(parsedPayload.formAttestationToken, signals.userAgent);
    if (!attestationResult.ok) {
      recordBlocked(attestationResult.reason);
      console.warn('contact_form_blocked', {
        reason: attestationResult.reason,
        ...buildLogContext(parsedPayload, signals),
      });
      return blockedResponse(403);
    }

    if ((parsedPayload.companyWebsite ?? '').length > 0) {
      recordBlocked('honeypot_filled');
      console.warn('contact_form_blocked', {
        reason: 'honeypot_filled',
        ...buildLogContext(parsedPayload, signals),
      });
      return blockedResponse(400);
    }

    const timingResult = evaluateTiming(parsedPayload.formStartedAt);
    if (!timingResult.ok) {
      recordBlocked(timingResult.reason);
      console.warn('contact_form_blocked', {
        reason: timingResult.reason,
        elapsedMs: timingResult.elapsedMs,
        ...buildLogContext(parsedPayload, signals),
      });
      return blockedResponse(400);
    }

    const rateLimitResult = applyRateLimits(parsedPayload.email, signals);
    if (!rateLimitResult.ok) {
      recordBlocked(rateLimitResult.reason);
      console.warn('contact_form_blocked', {
        reason: rateLimitResult.reason,
        ...buildLogContext(parsedPayload, signals),
      });
      return blockedResponse(429);
    }

    const challengeResult = await verifyHumanChallenge(parsedPayload.turnstileToken, signals);
    if (!challengeResult.ok) {
      recordBlocked(challengeResult.reason);
      console.warn('contact_form_blocked', {
        reason: challengeResult.reason,
        ...buildLogContext(parsedPayload, signals),
      });
      return blockedResponse(403);
    }

    const scoreResult = botScore(parsedPayload);
    if (shouldRejectForBotScore(scoreResult)) {
      recordBlocked('bot_score_rejected');
      console.warn('contact_form_blocked', {
        reason: 'bot_score_rejected',
        ...buildLogContext(parsedPayload, signals, scoreResult),
      });
      return blockedResponse(400);
    }

    if (shouldQuarantine(scoreResult)) {
      storeQuarantineRecord(parsedPayload, 'bot_score_quarantined', scoreResult, signals);
      recordQuarantined('bot_score_quarantined');
      console.warn('contact_form_quarantined', {
        reason: 'bot_score_quarantined',
        ...buildLogContext(parsedPayload, signals, scoreResult),
      });

      return NextResponse.json({
        ...SUCCESS_RESPONSE,
        filtered: true,
        quarantined: true,
      });
    }

    const notificationPromise = emailService.sendContactNotification(parsedPayload);
    const autoReplyPromise = emailService.sendAutoReply(parsedPayload);

    const sendAsync = process.env.CONTACT_EMAIL_QUEUE_MODE === 'async';

    if (sendAsync) {
      void Promise.all([notificationPromise, autoReplyPromise])
        .then(([notificationResult, autoReplyResult]) => {
          if (!notificationResult.success) {
            console.error('contact_form_email_failure', { type: 'notification', message: notificationResult.message });
          }
          if (!autoReplyResult.success) {
            console.error('contact_form_email_failure', { type: 'auto_reply', message: autoReplyResult.message });
          }
        })
        .catch((error) => {
          console.error('contact_form_email_failure', { type: 'async_queue', error });
        });

      recordAccepted();
      console.info('contact_form_accepted', buildLogContext(parsedPayload, signals, scoreResult));

      return NextResponse.json({
        ...SUCCESS_RESPONSE,
        filtered: false,
        queued: true,
      });
    }

    const [notificationResult, autoReplyResult] = await Promise.all([notificationPromise, autoReplyPromise]);

    if (!notificationResult.success) {
      console.error('contact_form_email_failure', { type: 'notification', message: notificationResult.message });
    }

    if (!autoReplyResult.success) {
      console.error('contact_form_email_failure', { type: 'auto_reply', message: autoReplyResult.message });
    }

    recordAccepted();
    console.info('contact_form_accepted', {
      ...buildLogContext(parsedPayload, signals, scoreResult),
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success,
    });

    return NextResponse.json({
      ...SUCCESS_RESPONSE,
      filtered: false,
      data: {
        notificationSent: notificationResult.success,
        autoReplySent: autoReplyResult.success,
      },
    });
  } catch (error) {
    if (parsedPayload) {
      recordBlocked('internal_error');
      console.error('contact_form_error', {
        ...buildLogContext(parsedPayload, signals),
        error,
      });
    } else {
      recordBlocked('invalid_json_payload');
      console.error('contact_form_error', {
        reason: 'invalid_json_payload',
        ip: signals.ip,
        userAgentPreview: signals.userAgent.slice(0, 32),
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again.',
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const adminKey = process.env.CONTACT_METRICS_ADMIN_KEY;
  const providedAdminKey = request.headers.get('x-contact-admin-key') || new URL(request.url).searchParams.get('key');

  const allowMetrics = process.env.NODE_ENV === 'development' || (adminKey && providedAdminKey === adminKey);
  if (!allowMetrics) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    message: 'Contact form security metrics',
    emailConfigured: emailService.isConfigured(),
    emailConfig: emailService.getConfigurationInfo(),
    thresholds: getRecommendedThresholds(),
    ...getContactMetricsSnapshot(),
  });
}
