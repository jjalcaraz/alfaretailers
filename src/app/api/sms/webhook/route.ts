/**
 * Inbound SMS Webhook — Alfa Retailers
 *
 * Receives inbound messages forwarded by GoHighLevel (LeadConnector) and
 * processes carrier-mandated keywords: STOP, START, HELP and their variants.
 *
 * GoHighLevel setup:
 *   1. In your GHL sub-account go to Settings → Integrations → Webhooks
 *   2. Add a new webhook pointing to:
 *        https://www.alfaretailers.com/api/sms/webhook
 *   3. Subscribe to the "InboundMessage" event type
 *   4. Set the webhook secret to the value of SMS_WEBHOOK_SECRET env var
 *
 * Required environment variables:
 *   SMS_WEBHOOK_SECRET   — shared secret used to verify GHL webhook signatures
 *
 * Optional (gracefully degraded if absent):
 *   GHL_API_KEY, GHL_LOCATION_ID, GHL_SMS_FROM_NUMBER — for sending replies
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  normalizePhone,
  classifyInboundKeyword,
  handleInboundStop,
  handleInboundStart,
  handleInboundHelp,
} from '@/lib/sms';

// ─── Signature verification ───────────────────────────────────────────────────

/**
 * Verify the GoHighLevel webhook HMAC-SHA256 signature.
 * GHL sends the signature in the `x-ghl-signature` header as:
 *   sha256=<hex-digest>
 *
 * The signature is computed over the raw request body using the shared secret.
 */
function verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.SMS_WEBHOOK_SECRET;

  // If no secret is configured, skip verification in non-production environments
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('sms_webhook_error: SMS_WEBHOOK_SECRET is not set in production');
      return false;
    }
    console.warn('sms_webhook_warn: SMS_WEBHOOK_SECRET not set — skipping signature check in dev');
    return true;
  }

  if (!signatureHeader) {
    return false;
  }

  // Header format: "sha256=<hexdigest>"
  const parts = signatureHeader.split('=');
  if (parts.length !== 2 || parts[0] !== 'sha256') {
    return false;
  }

  const receivedHex = parts[1];
  const expectedHex = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');

  // Constant-time comparison to prevent timing attacks
  try {
    const receivedBuf = Buffer.from(receivedHex, 'hex');
    const expectedBuf = Buffer.from(expectedHex, 'hex');
    if (receivedBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(receivedBuf, expectedBuf);
  } catch {
    return false;
  }
}

// ─── GHL inbound message payload type ────────────────────────────────────────

interface GhlInboundMessage {
  type?: string;           // "InboundMessage"
  locationId?: string;
  contactId?: string;
  conversationId?: string;
  body?: string;           // SMS body text
  from?: string;           // sender phone number (may be E.164 or local)
  to?: string;             // receiving number
  messageType?: string;    // "SMS" | "Email" | etc.
  [key: string]: unknown;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Read raw body for signature verification
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: 'Failed to read request body' }, { status: 400 });
  }

  // Verify webhook authenticity
  const signature = request.headers.get('x-ghl-signature');
  if (!verifyWebhookSignature(rawBody, signature)) {
    console.warn('sms_webhook_rejected: invalid signature');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: GhlInboundMessage;
  try {
    payload = JSON.parse(rawBody) as GhlInboundMessage;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Only process inbound SMS messages
  if (payload.messageType !== 'SMS' && payload.type !== 'InboundMessage') {
    return NextResponse.json({ received: true, skipped: true });
  }

  const fromRaw = payload.from ?? '';
  const body = (payload.body ?? '').trim();

  if (!fromRaw || !body) {
    return NextResponse.json({ received: true, skipped: true });
  }

  // Normalise the sender's number to E.164
  const phoneResult = normalizePhone(fromRaw);
  if (!phoneResult.ok) {
    console.warn('sms_webhook_invalid_phone', { from: fromRaw, error: phoneResult.error });
    // Still return 200 — we don't want GHL to retry a permanently invalid number
    return NextResponse.json({ received: true, skipped: true });
  }

  const e164 = phoneResult.e164;
  const action = classifyInboundKeyword(body);

  console.info('sms_inbound', { phone: e164, action, keyword: body.substring(0, 20) });

  switch (action) {
    case 'opt_out':
      await handleInboundStop({ e164, keyword: body.trim().toUpperCase() });
      break;

    case 'opt_in':
      await handleInboundStart({ e164, keyword: body.trim().toUpperCase() });
      break;

    case 'help':
      await handleInboundHelp({ e164 });
      break;

    case 'unknown':
      // Not a keyword — no automated action needed; GHL handles routing to the inbox
      break;
  }

  // Always return 200 so GHL does not retry
  return NextResponse.json({ received: true, action });
}

/**
 * GET handler — basic health-check so you can verify the webhook URL is reachable
 * without exposing sensitive information.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    service: 'Alfa Retailers SMS Webhook',
    status: 'ok',
    configured: Boolean(process.env.SMS_WEBHOOK_SECRET),
  });
}
