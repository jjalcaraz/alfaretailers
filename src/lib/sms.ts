/**
 * SMS Service — Alfa Retailers
 *
 * Handles:
 *   - E.164 phone number normalization and validation
 *   - Subscription state management (opt-in / opt-out / suppression list)
 *   - Carrier-compliant auto-reply messages (verbatim copy)
 *   - GoHighLevel (GHL) API integration for sending SMS and contact sync
 *   - Inbound STOP / START / HELP keyword processing
 *
 * Required environment variables (see .env.example for descriptions):
 *   GHL_API_KEY              — GoHighLevel private integration API key
 *   GHL_LOCATION_ID          — GoHighLevel sub-account / location ID
 *   GHL_SMS_FROM_NUMBER      — E.164 number to send FROM in GoHighLevel
 *   SMS_WEBHOOK_SECRET       — HMAC secret for verifying inbound webhook signatures
 */

import { prisma } from '@/lib/database';

// ─── E.164 normalisation ─────────────────────────────────────────────────────

/**
 * Attempt to convert a user-entered US phone number to E.164.
 * Returns `{ ok: true, e164: '+1...' }` on success,
 * or `{ ok: false, error: '...' }` when the input cannot be normalised.
 *
 * Supports formats: (210) 526-1401 | 210-526-1401 | 2105261401 | +12105261401
 * International numbers already in E.164 (starting with +1–9) are passed through
 * after basic digit-count validation.
 */
export function normalizePhone(raw: string): { ok: true; e164: string } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'string') {
    return { ok: false, error: 'Phone number is required.' };
  }

  const trimmed = raw.trim();

  // If already E.164
  if (/^\+[1-9]\d{7,14}$/.test(trimmed)) {
    return { ok: true, e164: trimmed };
  }

  // Strip everything except digits
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length === 0) {
    return { ok: false, error: 'Please enter a valid phone number.' };
  }

  // US: 10 digits or 11 digits starting with 1
  if (digits.length === 10) {
    const e164 = `+1${digits}`;
    if (!isValidE164(e164)) {
      return { ok: false, error: 'Please enter a valid 10-digit US phone number.' };
    }
    return { ok: true, e164 };
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    const e164 = `+${digits}`;
    if (!isValidE164(e164)) {
      return { ok: false, error: 'Please enter a valid US phone number.' };
    }
    return { ok: true, e164 };
  }

  return {
    ok: false,
    error: 'Please enter a valid US phone number (10 digits, e.g. 210-526-1401).',
  };
}

function isValidE164(e164: string): boolean {
  // US: +1 followed by 10 digits; first digit of area code and exchange must be 2–9
  return /^\+1[2-9]\d{2}[2-9]\d{6}$/.test(e164);
}

// ─── Carrier-compliant auto-reply messages (verbatim) ────────────────────────

export const SMS_MESSAGES = {
  /**
   * Sent once immediately after web form opt-in.
   * Carrier requirement: must identify sender, describe program, include STOP/HELP.
   */
  OPT_IN_CONFIRMATION:
    'Alfa Retailers: You\'re now subscribed to receive consultation booking links, appointment confirmations, missed-call follow-ups, and support updates. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to cancel.',

  /**
   * Sent once in response to STOP / STOPALL / UNSUBSCRIBE / CANCEL / END / QUIT.
   * After this message, no further outbound messages may be sent to the number.
   */
  STOP_CONFIRMATION:
    'Alfa Retailers: You have been unsubscribed and will receive no further messages. Reply START to resubscribe or HELP for help.',

  /**
   * Sent in response to HELP / INFO.
   * Must include business contact information and STOP instruction.
   */
  HELP_REPLY:
    'Alfa Retailers customer care. We send booking links, appointment confirmations, missed-call follow-ups & support updates. Msg & data rates may apply. Reply STOP to cancel. Support: juanalcaraz@alfaretailers.com or 210-526-1401.',

  /**
   * Sent in response to START / UNSTOP / SUBSCRIBE (resubscribe after opt-out).
   */
  START_CONFIRMATION:
    'Alfa Retailers: You\'re resubscribed. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to cancel.',
} as const;

// ─── Inbound keyword classification ──────────────────────────────────────────

type InboundKeywordAction = 'opt_out' | 'opt_in' | 'help' | 'unknown';

const STOP_KEYWORDS = new Set(['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT']);
const START_KEYWORDS = new Set(['START', 'UNSTOP', 'SUBSCRIBE']);
const HELP_KEYWORDS = new Set(['HELP', 'INFO']);

export function classifyInboundKeyword(body: string): InboundKeywordAction {
  const normalized = body.trim().toUpperCase();
  if (STOP_KEYWORDS.has(normalized)) return 'opt_out';
  if (START_KEYWORDS.has(normalized)) return 'opt_in';
  if (HELP_KEYWORDS.has(normalized)) return 'help';
  return 'unknown';
}

// ─── Subscription state management ───────────────────────────────────────────

/** Returns true if the number is in the suppression list (unsubscribed). */
export async function isSuppressed(e164: string): Promise<boolean> {
  const sub = await prisma.smsSubscription.findUnique({
    where: { phone: e164 },
    select: { status: true },
  });
  return sub?.status === 'unsubscribed';
}

/**
 * Record an opt-in event. Creates or updates the subscription row and appends
 * an immutable event. Safe to call multiple times (idempotent on status).
 */
export async function recordOptIn(params: {
  e164: string;
  source: string;
  keyword?: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<void> {
  const now = new Date();

  await prisma.$transaction([
    prisma.smsSubscription.upsert({
      where: { phone: params.e164 },
      create: {
        phone: params.e164,
        status: 'subscribed',
        subscribedAt: now,
        source: params.source,
      },
      update: {
        status: 'subscribed',
        subscribedAt: now,
        unsubscribedAt: null,
        source: params.source,
        updatedAt: now,
      },
    }),
    prisma.smsSubscriptionEvent.create({
      data: {
        phone: params.e164,
        event: 'opted_in',
        source: params.source,
        keyword: params.keyword,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        occurredAt: now,
      },
    }),
  ]);
}

/**
 * Record an opt-out event. Adds to suppression list and appends an event.
 */
export async function recordOptOut(params: {
  e164: string;
  source: string;
  keyword?: string;
}): Promise<void> {
  const now = new Date();

  await prisma.$transaction([
    prisma.smsSubscription.upsert({
      where: { phone: params.e164 },
      create: {
        phone: params.e164,
        status: 'unsubscribed',
        unsubscribedAt: now,
        source: params.source,
      },
      update: {
        status: 'unsubscribed',
        unsubscribedAt: now,
        source: params.source,
        updatedAt: now,
      },
    }),
    prisma.smsSubscriptionEvent.create({
      data: {
        phone: params.e164,
        event: 'opted_out',
        source: params.source,
        keyword: params.keyword,
        occurredAt: now,
      },
    }),
  ]);
}

// ─── GoHighLevel API client ───────────────────────────────────────────────────

function getGhlConfig() {
  return {
    apiKey: process.env.GHL_API_KEY ?? '',
    locationId: process.env.GHL_LOCATION_ID ?? '',
    fromNumber: process.env.GHL_SMS_FROM_NUMBER ?? '',
  };
}

function ghlConfigured(): boolean {
  const { apiKey, locationId, fromNumber } = getGhlConfig();
  return Boolean(apiKey && locationId && fromNumber);
}

/**
 * Send an SMS via GoHighLevel.
 * Silently skips sending if GHL is not configured (development convenience).
 * Will NOT send to suppressed numbers — callers should check `isSuppressed` first,
 * but this function provides a safety-net check for non-STOP replies.
 */
export async function sendSms(params: {
  to: string;   // E.164
  body: string;
  bypassSuppressionCheck?: boolean; // set true only for STOP confirmation
}): Promise<{ ok: boolean; error?: string }> {
  if (!ghlConfigured()) {
    console.warn('sms_send_skipped', { reason: 'ghl_not_configured', to: params.to });
    return { ok: true }; // non-blocking in dev/staging
  }

  // Suppression safety-net: only bypass for the STOP confirmation itself
  if (!params.bypassSuppressionCheck) {
    const suppressed = await isSuppressed(params.to);
    if (suppressed) {
      console.warn('sms_send_blocked', { reason: 'suppressed', to: params.to });
      return { ok: false, error: 'Number is unsubscribed.' };
    }
  }

  const { apiKey, locationId, fromNumber } = getGhlConfig();

  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/conversations/messages/outbound`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: '2021-04-15',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'SMS',
          locationId,
          fromNumber,
          toNumber: params.to,
          message: params.body,
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('sms_send_error', { status: res.status, body: text, to: params.to });
      return { ok: false, error: `GHL API error ${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    console.error('sms_send_exception', { error: err, to: params.to });
    return { ok: false, error: 'Network error sending SMS.' };
  }
}

/**
 * Upsert a contact in GoHighLevel with the SMS-consent flag and consent timestamp.
 * Called after a successful web-form opt-in.
 */
export async function syncContactToGhl(params: {
  phone: string;  // E.164
  name: string;
  email: string;
  consentTimestamp: Date;
}): Promise<{ ok: boolean; contactId?: string; error?: string }> {
  if (!ghlConfigured()) {
    console.warn('ghl_contact_sync_skipped', { reason: 'ghl_not_configured' });
    return { ok: true };
  }

  const { apiKey, locationId } = getGhlConfig();
  const [firstName, ...rest] = params.name.trim().split(' ');
  const lastName = rest.join(' ') || '';

  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/contacts/upsert`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId,
          phone: params.phone,
          firstName,
          lastName,
          email: params.email,
          tags: ['sms-opted-in'],
          customFields: [
            {
              key: 'sms_consent',
              field_value: 'true',
            },
            {
              key: 'sms_consent_date',
              field_value: params.consentTimestamp.toISOString(),
            },
          ],
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('ghl_contact_sync_error', { status: res.status, body: text });
      return { ok: false, error: `GHL API error ${res.status}` };
    }

    const data = await res.json() as { contact?: { id?: string } };
    return { ok: true, contactId: data?.contact?.id };
  } catch (err) {
    console.error('ghl_contact_sync_exception', { error: err });
    return { ok: false, error: 'Network error syncing contact.' };
  }
}

/**
 * Full opt-in flow triggered by a successful web-form submission:
 *   1. Record subscription state
 *   2. Send opt-in confirmation SMS
 *   3. Sync contact to GoHighLevel
 *
 * Non-fatal: errors are logged but do not throw — the form submission
 * should succeed even if the SMS send or GHL sync has a transient failure.
 */
export async function handleWebFormOptIn(params: {
  e164: string;
  name: string;
  email: string;
  ipAddress: string;
  userAgent: string;
}): Promise<void> {
  const now = new Date();

  // 1. Record opt-in state
  try {
    await recordOptIn({
      e164: params.e164,
      source: 'web_form',
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    });
  } catch (err) {
    console.error('sms_opt_in_record_error', { error: err, phone: params.e164 });
  }

  // 2. Send confirmation SMS
  const smsResult = await sendSms({
    to: params.e164,
    body: SMS_MESSAGES.OPT_IN_CONFIRMATION,
  });
  if (!smsResult.ok) {
    console.error('sms_opt_in_confirmation_failed', { error: smsResult.error, phone: params.e164 });
  }

  // 3. Sync to GoHighLevel
  const ghlResult = await syncContactToGhl({
    phone: params.e164,
    name: params.name,
    email: params.email,
    consentTimestamp: now,
  });
  if (!ghlResult.ok) {
    console.error('ghl_sync_failed', { error: ghlResult.error, phone: params.e164 });
  }
}

/**
 * Handle an inbound STOP keyword:
 *   1. Record opt-out state (suppression list)
 *   2. Send STOP confirmation (the only message allowed after opt-out)
 */
export async function handleInboundStop(params: {
  e164: string;
  keyword: string;
}): Promise<void> {
  try {
    await recordOptOut({
      e164: params.e164,
      source: 'inbound_stop',
      keyword: params.keyword,
    });
  } catch (err) {
    console.error('sms_opt_out_record_error', { error: err, phone: params.e164 });
  }

  await sendSms({
    to: params.e164,
    body: SMS_MESSAGES.STOP_CONFIRMATION,
    bypassSuppressionCheck: true, // must send even though now suppressed
  });
}

/**
 * Handle an inbound START / UNSTOP / SUBSCRIBE keyword:
 *   1. Record re-opt-in state
 *   2. Send START confirmation
 */
export async function handleInboundStart(params: {
  e164: string;
  keyword: string;
}): Promise<void> {
  try {
    await recordOptIn({
      e164: params.e164,
      source: 'inbound_start',
      keyword: params.keyword,
    });
  } catch (err) {
    console.error('sms_reopt_in_record_error', { error: err, phone: params.e164 });
  }

  await sendSms({
    to: params.e164,
    body: SMS_MESSAGES.START_CONFIRMATION,
  });
}

/**
 * Handle an inbound HELP / INFO keyword.
 * Does not change subscription state.
 */
export async function handleInboundHelp(params: { e164: string }): Promise<void> {
  await sendSms({
    to: params.e164,
    body: SMS_MESSAGES.HELP_REPLY,
  });
}
