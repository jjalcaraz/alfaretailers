/**
 * SMS Consent Lookup — Alfa Retailers
 *
 * Allows an admin to retrieve consent records and subscription state for a phone
 * number as proof of opt-in when requested by a carrier or regulator.
 *
 * All responses include the verbatim consent language stored at time of opt-in,
 * the originating IP, page URL, user-agent, and timestamp — everything needed
 * for a TCPA / A2P carrier audit.
 *
 * Authentication:
 *   Requires the `x-sms-admin-key` request header (or `?key=` query parameter)
 *   to match the `SMS_CONSENT_ADMIN_KEY` environment variable.
 *   In development (NODE_ENV !== 'production') the key check is skipped so
 *   you can test without configuring the variable.
 *
 * Usage:
 *   GET /api/sms/consent?phone=+12105261401
 *   GET /api/sms/consent?phone=2105261401        (raw formats are normalised)
 *
 * Response shape (200):
 *   {
 *     phone:        string          // E.164 canonical form
 *     subscription: { status, subscribedAt, unsubscribedAt, source } | null
 *     consentLogs:  ConsentLogEntry[]   // append-only, most-recent first
 *     events:       EventEntry[]        // full audit trail, most-recent first
 *   }
 *
 * Required environment variable:
 *   SMS_CONSENT_ADMIN_KEY — secret key that guards this endpoint in production
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { normalizePhone } from '@/lib/sms';

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.SMS_CONSENT_ADMIN_KEY;

  // In development, skip key check so the endpoint is reachable without config
  if (process.env.NODE_ENV !== 'production' && !adminKey) {
    return true;
  }

  if (!adminKey) {
    // Production with no key configured — deny to avoid open endpoint
    console.error('sms_consent_lookup: SMS_CONSENT_ADMIN_KEY is not set in production');
    return false;
  }

  const provided =
    request.headers.get('x-sms-admin-key') ??
    new URL(request.url).searchParams.get('key') ??
    '';

  return provided === adminKey;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rawPhone = new URL(request.url).searchParams.get('phone') ?? '';

  if (!rawPhone) {
    return NextResponse.json(
      {
        error: 'Missing required query parameter: phone',
        hint: 'Provide an E.164 number or any common US format, e.g. ?phone=+12105261401',
      },
      { status: 400 },
    );
  }

  const phoneResult = normalizePhone(rawPhone);
  if (!phoneResult.ok) {
    return NextResponse.json(
      { error: `Invalid phone number: ${phoneResult.error}` },
      { status: 400 },
    );
  }

  const e164 = phoneResult.e164;

  // Fetch consent logs, subscription state, and event history in parallel
  const [consentLogs, subscription, events] = await Promise.all([
    prisma.smsConsentLog.findMany({
      where: { phone: e164 },
      orderBy: { consentedAt: 'desc' },
      select: {
        id: true,
        phone: true,
        consentLanguage: true,
        consentedAt: true,
        ipAddress: true,
        pageUrl: true,
        userAgent: true,
        name: true,
        email: true,
      },
    }),

    prisma.smsSubscription.findUnique({
      where: { phone: e164 },
      select: {
        status: true,
        subscribedAt: true,
        unsubscribedAt: true,
        source: true,
        updatedAt: true,
      },
    }),

    prisma.smsSubscriptionEvent.findMany({
      where: { phone: e164 },
      orderBy: { occurredAt: 'desc' },
      select: {
        id: true,
        event: true,
        source: true,
        keyword: true,
        ipAddress: true,
        userAgent: true,
        occurredAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    phone: e164,
    subscription,
    consentLogs,
    events,
    _meta: {
      consentLogCount: consentLogs.length,
      eventCount: events.length,
      retrievedAt: new Date().toISOString(),
    },
  });
}
