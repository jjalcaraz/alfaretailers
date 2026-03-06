import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const DEFAULT_ALLOWED_ORIGINS = [
  'https://alfaretailers.com',
  'https://www.alfaretailers.com',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://127.0.0.1:3000',
  'https://127.0.0.1:3000',
];
const DEFAULT_FORM_TOKEN_TTL_MS = 30 * 60 * 1000;
const DEFAULT_MIN_SUBMIT_MS = 4_000;
const DEFAULT_MAX_SUBMIT_MS = 12 * 60 * 60 * 1000;
const MAX_QUARANTINE_ITEMS = 250;

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  address?: string;
  companyWebsite?: string;
  formStartedAt?: number;
  formAttestationToken?: string;
  turnstileToken?: string;
}

export interface RequestSignals {
  ip: string;
  userAgent: string;
  origin: string | null;
  referer: string | null;
}

export interface BotScoreResult {
  score: number;
  reasons: string[];
  features: Record<string, number | boolean>;
}

interface CounterWindow {
  timestamps: number[];
}

interface ContactMetrics {
  totalSubmissions: number;
  accepted: number;
  quarantined: number;
  blocked: number;
  blockedByReason: Record<string, number>;
  challengeFailures: number;
  rateLimitHits: number;
  lastUpdatedAt: string | null;
}

export interface QuarantineRecord {
  createdAt: string;
  reason: string;
  emailHash: string;
  namePreview: string;
  messagePreview: string;
  botScore: number;
  botReasons: string[];
  ipHash: string;
}

interface ContactGuardConfig {
  allowedOrigins: string[];
  formTokenTtlMs: number;
  minSubmitMs: number;
  maxSubmitMs: number;
  rejectBotScore: number;
  quarantineBotScore: number;
  turnstileSecret: string;
  challengeProvider: 'turnstile';
  failOpenChallenge: boolean;
}

const memoryCounters = new Map<string, CounterWindow>();

const metrics: ContactMetrics = {
  totalSubmissions: 0,
  accepted: 0,
  quarantined: 0,
  blocked: 0,
  blockedByReason: {},
  challengeFailures: 0,
  rateLimitHits: 0,
  lastUpdatedAt: null,
};

const quarantineRecords: QuarantineRecord[] = [];

function nowIso(): string {
  return new Date().toISOString();
}

function safeLower(value: string): string {
  return value.trim().toLowerCase();
}

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes';
}

function parseNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

function parseOrigins(raw: string | undefined): string[] {
  if (!raw) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  const parsed = raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => normalizeOrigin(value));

  return parsed.length > 0 ? parsed : DEFAULT_ALLOWED_ORIGINS;
}

function normalizeOrigin(value: string): string {
  return value.replace(/\/+$/, '').toLowerCase();
}

function getConfig(): ContactGuardConfig {
  return {
    allowedOrigins: parseOrigins(process.env.CONTACT_ALLOWED_ORIGINS),
    formTokenTtlMs: parseNumber(process.env.CONTACT_FORM_TOKEN_TTL_MS, DEFAULT_FORM_TOKEN_TTL_MS),
    minSubmitMs: parseNumber(process.env.CONTACT_MIN_SUBMIT_MS, DEFAULT_MIN_SUBMIT_MS),
    maxSubmitMs: parseNumber(process.env.CONTACT_MAX_SUBMIT_MS, DEFAULT_MAX_SUBMIT_MS),
    rejectBotScore: parseNumber(process.env.CONTACT_BOT_SCORE_REJECT_THRESHOLD, 55),
    quarantineBotScore: parseNumber(process.env.CONTACT_BOT_SCORE_QUARANTINE_THRESHOLD, 35),
    turnstileSecret: process.env.TURNSTILE_SECRET_KEY || '',
    challengeProvider: 'turnstile',
    failOpenChallenge: parseBoolean(process.env.CONTACT_CHALLENGE_FAIL_OPEN, false),
  };
}

function getFormTokenSecret(): string {
  return process.env.CONTACT_FORM_TOKEN_SECRET || process.env.NEXTAUTH_SECRET || '';
}

function toBase64Url(value: string | Buffer): string {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromBase64Url(value: string): Buffer {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, 'base64');
}

function hashValue(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function shortHash(value: string): string {
  return hashValue(value).slice(0, 16);
}

function userAgentHash(userAgent: string): string {
  return shortHash(userAgent || 'unknown');
}

function signTokenPayload(encodedPayload: string, secret: string): string {
  return toBase64Url(createHmac('sha256', secret).update(encodedPayload).digest());
}

function parseToken(token: string): { payloadB64: string; signatureB64: string } | null {
  const parts = token.split('.');
  if (parts.length !== 2) {
    return null;
  }

  if (!parts[0] || !parts[1]) {
    return null;
  }

  return {
    payloadB64: parts[0],
    signatureB64: parts[1],
  };
}

export function issueContactFormAttestationToken(userAgent: string): string {
  const secret = getFormTokenSecret();
  if (!secret) {
    return '';
  }

  const config = getConfig();
  const issuedAt = Date.now();
  const payload = {
    iat: issuedAt,
    exp: issuedAt + config.formTokenTtlMs,
    nonce: toBase64Url(randomBytes(12)),
    uah: userAgentHash(userAgent),
  };

  const payloadB64 = toBase64Url(JSON.stringify(payload));
  const signature = signTokenPayload(payloadB64, secret);

  return `${payloadB64}.${signature}`;
}

export function verifyContactFormAttestationToken(token: string | undefined, userAgent: string): { ok: boolean; reason: string } {
  const secret = getFormTokenSecret();
  if (!secret) {
    return { ok: process.env.NODE_ENV !== 'production', reason: 'missing_form_token_secret' };
  }

  if (!token) {
    return { ok: false, reason: 'missing_form_token' };
  }

  const parsed = parseToken(token);
  if (!parsed) {
    return { ok: false, reason: 'malformed_form_token' };
  }

  const expectedSig = signTokenPayload(parsed.payloadB64, secret);
  const expectedBuffer = Buffer.from(expectedSig);
  const receivedBuffer = Buffer.from(parsed.signatureB64);

  if (expectedBuffer.length !== receivedBuffer.length || !timingSafeEqual(expectedBuffer, receivedBuffer)) {
    return { ok: false, reason: 'invalid_form_token_signature' };
  }

  try {
    const decoded = fromBase64Url(parsed.payloadB64).toString('utf8');
    const payload = JSON.parse(decoded) as { iat: number; exp: number; uah: string };
    const now = Date.now();

    if (!payload.iat || !payload.exp || !payload.uah) {
      return { ok: false, reason: 'invalid_form_token_payload' };
    }

    if (payload.exp < now) {
      return { ok: false, reason: 'expired_form_token' };
    }

    if (payload.iat > now + 5_000) {
      return { ok: false, reason: 'future_form_token' };
    }

    if (payload.uah !== userAgentHash(userAgent)) {
      return { ok: false, reason: 'form_token_user_agent_mismatch' };
    }

    return { ok: true, reason: 'ok' };
  } catch {
    return { ok: false, reason: 'form_token_decode_error' };
  }
}

export function validateOriginSignals(signals: RequestSignals): { ok: boolean; reason: string } {
  const config = getConfig();
  const allowed = new Set(config.allowedOrigins.map(normalizeOrigin));

  const hasOrigin = Boolean(signals.origin);
  const hasReferer = Boolean(signals.referer);

  if (!hasOrigin && !hasReferer) {
    return { ok: false, reason: 'missing_origin_and_referer' };
  }

  if (signals.origin) {
    const origin = normalizeOrigin(signals.origin);
    if (!allowed.has(origin)) {
      return { ok: false, reason: 'origin_not_allowed' };
    }
  }

  if (signals.referer) {
    try {
      const refererOrigin = normalizeOrigin(new URL(signals.referer).origin);
      if (!allowed.has(refererOrigin)) {
        return { ok: false, reason: 'referer_not_allowed' };
      }
    } catch {
      return { ok: false, reason: 'invalid_referer' };
    }
  }

  return { ok: true, reason: 'ok' };
}

function consumeWindow(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const existing = memoryCounters.get(key);
  const filtered = existing ? existing.timestamps.filter((timestamp) => now - timestamp <= windowMs) : [];

  if (filtered.length >= maxRequests) {
    memoryCounters.set(key, { timestamps: filtered });
    return false;
  }

  filtered.push(now);
  memoryCounters.set(key, { timestamps: filtered });
  return true;
}

export function applyRateLimits(email: string, signals: RequestSignals): { ok: boolean; reason: string } {
  const ip = signals.ip || 'unknown';
  const userAgent = signals.userAgent || 'unknown';
  const normalizedEmail = safeLower(email);
  const minuteKey = `contact:ip:${ip}:60s`;
  const hourKey = `contact:ip:${ip}:1h`;
  const ipUaKey = `contact:ipua:${shortHash(`${ip}:${userAgent}`)}:1h`;
  const emailKey = `contact:email:${normalizedEmail}:1h`;

  const checks: Array<{ key: string; max: number; windowMs: number; reason: string }> = [
    { key: minuteKey, max: parseNumber(process.env.CONTACT_RATE_LIMIT_IP_PER_MINUTE, 5), windowMs: 60_000, reason: 'rate_limit_ip_minute' },
    { key: hourKey, max: parseNumber(process.env.CONTACT_RATE_LIMIT_IP_PER_HOUR, 30), windowMs: 60 * 60_000, reason: 'rate_limit_ip_hour' },
    { key: ipUaKey, max: parseNumber(process.env.CONTACT_RATE_LIMIT_IP_UA_PER_HOUR, 20), windowMs: 60 * 60_000, reason: 'rate_limit_ip_ua_hour' },
    { key: emailKey, max: parseNumber(process.env.CONTACT_RATE_LIMIT_EMAIL_PER_HOUR, 3), windowMs: 60 * 60_000, reason: 'rate_limit_email_hour' },
  ];

  for (const check of checks) {
    const allowed = consumeWindow(check.key, check.max, check.windowMs);
    if (!allowed) {
      return { ok: false, reason: check.reason };
    }
  }

  return { ok: true, reason: 'ok' };
}

function lettersOnly(value: string): string {
  return value.replace(/[^a-z]/gi, '');
}

function vowelRatio(value: string): number {
  const letters = lettersOnly(value.toLowerCase());
  if (letters.length === 0) {
    return 0;
  }

  const vowels = (letters.match(/[aeiou]/g) || []).length;
  return vowels / letters.length;
}

function symbolDigitRatio(value: string): number {
  const chars = value.replace(/\s/g, '');
  if (chars.length === 0) {
    return 0;
  }

  const symbolDigits = (chars.match(/[^a-z]/gi) || []).length;
  return symbolDigits / chars.length;
}

function repeatedRunLength(value: string): number {
  let maxRun = 1;
  let currentRun = 1;

  for (let index = 1; index < value.length; index += 1) {
    if (value[index] === value[index - 1]) {
      currentRun += 1;
      if (currentRun > maxRun) {
        maxRun = currentRun;
      }
    } else {
      currentRun = 1;
    }
  }

  return maxRun;
}

function caseTransitionRatio(value: string): number {
  const letters = value.replace(/[^a-z]/gi, '');
  if (letters.length < 2) {
    return 0;
  }

  let transitions = 0;
  for (let index = 1; index < letters.length; index += 1) {
    const previousIsUpper = letters[index - 1] === letters[index - 1].toUpperCase();
    const currentIsUpper = letters[index] === letters[index].toUpperCase();
    if (previousIsUpper !== currentIsUpper) {
      transitions += 1;
    }
  }

  return transitions / (letters.length - 1);
}

function shannonEntropy(value: string): number {
  if (!value.length) {
    return 0;
  }

  const charCounts = new Map<string, number>();
  for (const char of value) {
    charCounts.set(char, (charCounts.get(char) ?? 0) + 1);
  }

  let entropy = 0;
  for (const count of Array.from(charCounts.values())) {
    const probability = count / value.length;
    entropy -= probability * Math.log2(probability);
  }

  return entropy;
}

function longestToken(value: string): number {
  return value
    .trim()
    .split(/\s+/)
    .reduce((max, token) => Math.max(max, token.length), 0);
}

function looksBase64Like(value: string): boolean {
  return /^[A-Za-z0-9+/=_-]{16,}$/.test(value) && !/\s/.test(value);
}

export function botScore(payload: ContactPayload): BotScoreResult {
  const name = payload.name.trim();
  const message = payload.message.trim();

  const messageVowelRatio = vowelRatio(message);
  const nameVowelRatio = vowelRatio(name);
  const messageEntropy = shannonEntropy(message.replace(/\s/g, ''));
  const messageNoSpaces = !/\s/.test(message);
  const messageLongestToken = longestToken(message);
  const messageLongestTokenRatio = message.length > 0 ? messageLongestToken / message.length : 0;
  const messageSymbolDigitRatio = symbolDigitRatio(message);
  const messageCaseTransitionRatio = caseTransitionRatio(message);
  const nameCaseTransitionRatio = caseTransitionRatio(name);
  const maxRepeatedRun = Math.max(repeatedRunLength(name), repeatedRunLength(message));

  const reasons: string[] = [];
  let score = 0;

  if (message.length < 20) {
    score += 20;
    reasons.push('message_too_short');
  }

  if (messageNoSpaces && message.length > 22) {
    score += 24;
    reasons.push('single_token_message');
  }

  if (messageLongestTokenRatio > 0.9 && message.length > 24) {
    score += 22;
    reasons.push('mostly_single_token');
  }

  if (messageVowelRatio < 0.2 && lettersOnly(message).length > 12) {
    score += 12;
    reasons.push('low_message_vowel_ratio');
  }

  if (nameVowelRatio < 0.2 && lettersOnly(name).length > 5) {
    score += 10;
    reasons.push('low_name_vowel_ratio');
  }

  if (messageEntropy > 4.25 && message.length >= 20) {
    score += 18;
    reasons.push('high_message_entropy');
  }

  if (messageSymbolDigitRatio > 0.35) {
    score += 14;
    reasons.push('high_symbol_digit_ratio');
  }

  if (messageCaseTransitionRatio > 0.42 || nameCaseTransitionRatio > 0.45) {
    score += 12;
    reasons.push('excessive_case_transitions');
  }

  if (maxRepeatedRun >= 5) {
    score += 10;
    reasons.push('long_repeated_character_run');
  }

  if (looksBase64Like(name)) {
    score += 26;
    reasons.push('base64_like_name');
  }

  if (!/\s/.test(name) && name.length >= 24) {
    score += 12;
    reasons.push('long_single_token_name');
  }

  return {
    score,
    reasons,
    features: {
      messageLength: message.length,
      messageEntropy,
      messageVowelRatio,
      messageNoSpaces,
      messageLongestToken,
      messageLongestTokenRatio,
      messageSymbolDigitRatio,
      messageCaseTransitionRatio,
      nameLength: name.length,
      nameVowelRatio,
      nameCaseTransitionRatio,
      maxRepeatedRun,
    },
  };
}

export function evaluateTiming(formStartedAt: number | undefined): { ok: boolean; reason: string; elapsedMs: number } {
  if (!formStartedAt || !Number.isInteger(formStartedAt)) {
    return { ok: false, reason: 'missing_form_timestamp', elapsedMs: 0 };
  }

  const config = getConfig();
  const elapsedMs = Date.now() - formStartedAt;

  if (elapsedMs < config.minSubmitMs) {
    return { ok: false, reason: 'submitted_too_fast', elapsedMs };
  }

  if (elapsedMs > config.maxSubmitMs) {
    return { ok: false, reason: 'stale_form_submission', elapsedMs };
  }

  return { ok: true, reason: 'ok', elapsedMs };
}

export function recordAccepted(): void {
  metrics.totalSubmissions += 1;
  metrics.accepted += 1;
  metrics.lastUpdatedAt = nowIso();
}

export function recordQuarantined(reason: string): void {
  metrics.totalSubmissions += 1;
  metrics.quarantined += 1;
  metrics.blockedByReason[reason] = (metrics.blockedByReason[reason] || 0) + 1;
  metrics.lastUpdatedAt = nowIso();
}

export function recordBlocked(reason: string): void {
  metrics.totalSubmissions += 1;
  metrics.blocked += 1;
  metrics.blockedByReason[reason] = (metrics.blockedByReason[reason] || 0) + 1;
  if (reason.startsWith('rate_limit_')) {
    metrics.rateLimitHits += 1;
  }
  if (reason.startsWith('captcha_') || reason.includes('challenge')) {
    metrics.challengeFailures += 1;
  }
  metrics.lastUpdatedAt = nowIso();
}

function sanitizePreview(value: string, maxLength: number): string {
  return value
    .replace(/[\r\n]+/g, ' ')
    .replace(/[\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function storeQuarantineRecord(payload: ContactPayload, reason: string, scoreResult: BotScoreResult, signals: RequestSignals): void {
  const record: QuarantineRecord = {
    createdAt: nowIso(),
    reason,
    emailHash: shortHash(payload.email.toLowerCase()),
    namePreview: sanitizePreview(payload.name, 80),
    messagePreview: sanitizePreview(payload.message, 160),
    botScore: scoreResult.score,
    botReasons: scoreResult.reasons,
    ipHash: shortHash(signals.ip),
  };

  quarantineRecords.unshift(record);
  if (quarantineRecords.length > MAX_QUARANTINE_ITEMS) {
    quarantineRecords.length = MAX_QUARANTINE_ITEMS;
  }
}

export function getContactMetricsSnapshot(): { metrics: ContactMetrics; quarantine: QuarantineRecord[] } {
  return {
    metrics: {
      ...metrics,
      blockedByReason: { ...metrics.blockedByReason },
    },
    quarantine: [...quarantineRecords],
  };
}

export function shouldQuarantine(scoreResult: BotScoreResult): boolean {
  const config = getConfig();
  return scoreResult.score >= config.quarantineBotScore && scoreResult.score < config.rejectBotScore;
}

export function shouldRejectForBotScore(scoreResult: BotScoreResult): boolean {
  return scoreResult.score >= getConfig().rejectBotScore;
}

export function buildLogContext(payload: ContactPayload, signals: RequestSignals, scoreResult?: BotScoreResult): Record<string, unknown> {
  return {
    timestamp: nowIso(),
    emailHash: shortHash(payload.email.toLowerCase()),
    ipHash: shortHash(signals.ip),
    userAgentHash: shortHash(signals.userAgent || 'unknown'),
    messageLength: payload.message.length,
    nameLength: payload.name.length,
    botScore: scoreResult?.score,
    botReasons: scoreResult?.reasons,
  };
}

export async function verifyHumanChallenge(turnstileToken: string | undefined, signals: RequestSignals): Promise<{ ok: boolean; reason: string }> {
  const config = getConfig();

  if (config.challengeProvider !== 'turnstile') {
    return { ok: false, reason: 'unsupported_challenge_provider' };
  }

  if (!config.turnstileSecret) {
    return { ok: process.env.NODE_ENV !== 'production', reason: 'missing_turnstile_secret' };
  }

  if (!turnstileToken) {
    return { ok: false, reason: 'missing_turnstile_token' };
  }

  const params = new URLSearchParams();
  params.set('secret', config.turnstileSecret);
  params.set('response', turnstileToken);
  if (signals.ip && signals.ip !== 'unknown') {
    params.set('remoteip', signals.ip);
  }

  const timeoutMs = parseNumber(process.env.CONTACT_CHALLENGE_TIMEOUT_MS, 4_000);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      return { ok: false, reason: 'captcha_http_error' };
    }

    const result = await response.json() as {
      success?: boolean;
      'error-codes'?: string[];
      action?: string;
    };

    if (!result.success) {
      const code = result['error-codes']?.[0] || 'captcha_verification_failed';
      return { ok: false, reason: `captcha_${code}` };
    }

    return { ok: true, reason: 'ok' };
  } catch {
    if (config.failOpenChallenge && process.env.NODE_ENV !== 'production') {
      return { ok: true, reason: 'challenge_unavailable_fail_open' };
    }
    return { ok: false, reason: 'challenge_unavailable' };
  } finally {
    clearTimeout(timeout);
  }
}

export function getRecommendedThresholds(): Record<string, number> {
  return {
    ipPerMinute: parseNumber(process.env.CONTACT_RATE_LIMIT_IP_PER_MINUTE, 5),
    ipPerHour: parseNumber(process.env.CONTACT_RATE_LIMIT_IP_PER_HOUR, 30),
    ipUaPerHour: parseNumber(process.env.CONTACT_RATE_LIMIT_IP_UA_PER_HOUR, 20),
    emailPerHour: parseNumber(process.env.CONTACT_RATE_LIMIT_EMAIL_PER_HOUR, 3),
    minSubmitMs: parseNumber(process.env.CONTACT_MIN_SUBMIT_MS, DEFAULT_MIN_SUBMIT_MS),
    rejectBotScore: parseNumber(process.env.CONTACT_BOT_SCORE_REJECT_THRESHOLD, 55),
    quarantineBotScore: parseNumber(process.env.CONTACT_BOT_SCORE_QUARANTINE_THRESHOLD, 35),
  };
}
