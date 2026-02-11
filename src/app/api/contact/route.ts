import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { emailService } from '@/lib/email';

const SUCCESS_RESPONSE = {
  success: true,
  message: 'Thank you for your inquiry! We\'ll get back to you within 24 hours.',
};

// Define validation schema for contact form
const optionalShortText = z.string().trim().max(120).optional();

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address').max(254, 'Email is too long'),
  phone: z.string().trim().max(30, 'Phone number is too long').optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
  propertyType: optionalShortText,
  bedrooms: optionalShortText,
  bathrooms: optionalShortText,
  address: z.string().trim().max(200).optional(),
  website: z.string().trim().max(0).optional(), // Honeypot field - should stay empty
  formStartedAt: z.number().int().positive().optional(), // Client-side timestamp
});

// Rate limiting storage (in production, use Redis or database)
const rateLimiter = new Map<string, { count: number; lastReset: number }>();

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() :
               request.headers.get('x-real-ip') ||
               'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${userAgent.slice(0, 80)}`;
}

function buildRateLimitKey(scope: 'ip' | 'email', identifier: string): string {
  return `${scope}:${identifier.toLowerCase()}`;
}

function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimiter.get(identifier);

  if (!record) {
    rateLimiter.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  // Reset window if expired
  if (now - record.lastReset > windowMs) {
    rateLimiter.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  // Check if over limit
  if (record.count >= maxRequests) {
    return false;
  }

  // Increment count
  record.count++;
  return true;
}

function containsLongSingleToken(value: string, minLength = 20): boolean {
  return value
    .trim()
    .split(/\s+/)
    .some((token) => token.length >= minLength);
}

function looksLikeAutomatedNoise(name: string, message: string): boolean {
  const trimmedName = name.trim();
  const trimmedMessage = message.trim();

  if (!/\s/.test(trimmedName) && containsLongSingleToken(trimmedName) && containsLongSingleToken(trimmedMessage)) {
    return true;
  }

  if (!/\s/.test(trimmedMessage) && trimmedMessage.length >= 24) {
    return true;
  }

  return false;
}

function shouldSilentlyDropSubmission(formData: z.infer<typeof contactSchema>): { drop: boolean; reason: string } {
  if ((formData.website ?? '').trim().length > 0) {
    return { drop: true, reason: 'honeypot_field_filled' };
  }

  if (!formData.formStartedAt) {
    return { drop: true, reason: 'missing_form_timestamp' };
  }

  const elapsedMs = Date.now() - formData.formStartedAt;
  if (elapsedMs < 2500 || elapsedMs > 12 * 60 * 60 * 1000) {
    return { drop: true, reason: 'invalid_form_submission_timing' };
  }

  if (looksLikeAutomatedNoise(formData.name, formData.message)) {
    return { drop: true, reason: 'automated_noise_pattern' };
  }

  return { drop: false, reason: 'accepted' };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP + user agent fingerprint
    const clientId = getClientIdentifier(request);
    const ipRateLimitKey = buildRateLimitKey('ip', clientId);
    if (!checkRateLimit(ipRateLimitKey, 3, 10 * 60 * 1000)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const formData = {
      ...validationResult.data,
      email: validationResult.data.email.toLowerCase(),
    };

    // Rate limiting by email address to reduce repeated spam cycles
    const emailRateLimitKey = buildRateLimitKey('email', formData.email);
    if (!checkRateLimit(emailRateLimitKey, 2, 12 * 60 * 60 * 1000)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      );
    }

    const spamCheck = shouldSilentlyDropSubmission(formData);
    if (spamCheck.drop) {
      console.warn('Contact form submission silently dropped', {
        reason: spamCheck.reason,
        clientId,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({
        ...SUCCESS_RESPONSE,
        filtered: true
      });
    }

    // Send notification email to Alfa Retailers
    const notificationResult = await emailService.sendContactNotification(formData);

    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.message);
      // Continue anyway - we still want to save the submission
    }

    // Send auto-reply to the user
    const autoReplyResult = await emailService.sendAutoReply(formData);

    if (!autoReplyResult.success) {
      console.error('Failed to send auto-reply email:', autoReplyResult.message);
      // Continue anyway - the main notification was sent
    }

    console.log('Contact form submission accepted:', {
      timestamp: new Date().toISOString(),
      notificationSent: notificationResult.success,
      autoReplySent: autoReplyResult.success
    });

    return NextResponse.json({
      ...SUCCESS_RESPONSE,
      filtered: false,
      data: {
        notificationSent: notificationResult.success,
        autoReplySent: autoReplyResult.success
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again.'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    message: 'Contact form API endpoint',
    emailConfigured: emailService.isConfigured(),
    config: emailService.getConfigurationInfo()
  });
}
