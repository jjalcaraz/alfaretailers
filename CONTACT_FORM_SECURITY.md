# Contact Form Human-Only Safeguard

## Design summary
This implementation enforces a layered, server-side anti-bot gate in `POST /api/contact` so direct endpoint abuse is blocked even when frontend JavaScript is bypassed. The stack combines Turnstile verification, CSRF-style form attestation, origin checks, honeypot/timing gates, multi-dimensional rate limiting, and bot-likeness scoring with quarantine for suspicious-but-not-definitive submissions.

## Threat model
### Targeted abuse patterns
- Scripted POSTs that skip the frontend and send JSON directly to `/api/contact`.
- Headless browser automation that fills visible fields and mimics real contact details.
- Credential-stuffed sender identity (real email/phone) with gibberish message payloads.
- High-volume replay from the same IP, rotating user agents, or repeated email identity.
- CSRF-style cross-site form submissions from untrusted origins.

### Defensive goals
- Reject automation early and consistently on the server.
- Preserve legitimate leads by using a score+quarantine layer (not only hard rejections).
- Avoid exposing thresholds and internals to attackers.
- Keep data collection minimal and avoid storing raw PII unless necessary.

## Implementation map (where checks are enforced)
### Backend enforcement point
All required checks are enforced in:
- `src/app/api/contact/route.ts` inside `POST` handler.

### Security modules
- `src/lib/security/contact-guard.ts`
  - Signed form attestation token issue/verify
  - Origin/Referer validation
  - Per-IP, per-IP+UA, per-email rate limits
  - Timing validation
  - Bot scoring (`botScore`) and reject/quarantine thresholds
  - Turnstile server verification
  - In-memory metrics and quarantine record storage

### Frontend integration points
- `src/app/contact/page.tsx`
  - Issues signed attestation token server-side and passes to form.
- `src/components/forms/contact-form.tsx`
  - Renders Turnstile widget.
  - Sends `formAttestationToken`, `turnstileToken`, honeypot, and render timestamp.

### Email hardening
- `src/lib/email.ts`
  - Recipient is server-owned only.
  - `CONTACT_NOTIFICATION_RECIPIENTS` filtered by `CONTACT_ALLOWED_RECIPIENT_DOMAINS`.
  - Header injection defenses (newline stripping in `to`, `from`, `subject`).

## Defense layers implemented
### A) Primary bot challenge
- Cloudflare Turnstile is integrated on frontend and verified server-side.
- Verification endpoint: `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
- Failure defaults to fail-closed (`CONTACT_CHALLENGE_FAIL_OPEN=false`).

### B) Honeypot + field strategy
- Honeypot field: `companyWebsite`.
- Hidden off-screen in form UI.
- Server rejects non-empty value.
- Hidden form render timestamp (`formStartedAt`) validated server-side.

### C) Rate limiting + abuse controls
Server checks:
- IP: `5/min`, `30/hour`
- IP+UserAgent: `20/hour`
- Email: `3/hour`

All thresholds configurable via env vars.

### D) Validation and bot-likeness scoring
`botScore(submission)` evaluates multiple signals:
- Minimum length (`message >= 20`)
- Low vowel ratio
- High entropy
- Long repeated character runs
- Excessive mixed-case transitions
- High symbol/digit ratio
- Single-token/no-space payloads
- Base64-like/randomized name patterns

Outcomes:
- `score >= reject threshold`: blocked
- `quarantine threshold <= score < reject`: quarantined (no email sent)

### E) Transport and email hardening
- Internal recipient allowlist enforcement in email service.
- No user-controlled recipient routing.
- Subject/address sanitization against header injection.
- Optional async dispatch mode: `CONTACT_EMAIL_QUEUE_MODE=async`.
- Quarantine mode stores suspicious submissions for review instead of emailing.

### F) Observability
In-memory metrics include:
- `totalSubmissions`, `accepted`, `blocked`, `quarantined`
- `blockedByReason`
- `challengeFailures`, `rateLimitHits`

Protected metrics endpoint:
- `GET /api/contact`
- Access: development mode OR header/query key matching `CONTACT_METRICS_ADMIN_KEY`.

## Recommended initial thresholds
- `CONTACT_RATE_LIMIT_IP_PER_MINUTE=5`
- `CONTACT_RATE_LIMIT_IP_PER_HOUR=30`
- `CONTACT_RATE_LIMIT_IP_UA_PER_HOUR=20`
- `CONTACT_RATE_LIMIT_EMAIL_PER_HOUR=3`
- `CONTACT_MIN_SUBMIT_MS=4000`
- `CONTACT_BOT_SCORE_QUARANTINE_THRESHOLD=35`
- `CONTACT_BOT_SCORE_REJECT_THRESHOLD=55`

These are conservative defaults intended to block obvious spam while minimizing false positives.

## Accessibility and usability considerations
- Turnstile is chosen for lower user friction compared with image CAPTCHAs.
- Human verification state is shown clearly in form UI.
- Generic failure messages avoid leaking anti-abuse internals.
- If challenge is unavailable, form does not submit and provides fallback contact guidance.

## Privacy and data minimization
- Logs store hashes/previews and feature-level signals, not full raw payload archives by default.
- Quarantine records use hashed email/IP and short previews for tuning.
- Sensitive routing decisions remain server-side.

## Test plan
### Manual tests
1. Valid human path
- Open `/contact`, complete Turnstile, submit normal message.
- Expect `200 success`, notification email, auto-reply, `accepted` metric increment.

2. Direct POST without challenge
- `curl` POST to `/api/contact` without `turnstileToken`.
- Expect block (403/400 generic error).

3. Honeypot hit
- Submit with `companyWebsite='https://spam.example'`.
- Expect blocked and `honeypot_filled` metric reason.

4. Too-fast submit
- Send with current timestamp (e.g., `formStartedAt = now - 500`).
- Expect `submitted_too_fast` block.

5. Gibberish payload
- Name/message like `eZIaHIcjKPHTMSbPrHsqQYbn` and `ayiNAlmLDMHQTeTwbNJ`.
- Expect bot-score reject or quarantine depending on score.

6. Rate limiting
- Send 6+ requests from same IP in under a minute.
- Expect generic `429` responses.

7. Origin validation
- Send cross-origin `Origin: https://evil.example`.
- Expect block.

### Simulated bot traffic (scriptable)
Use a local script or load tool to generate combinations:
- Missing challenge tokens
- Randomized names/messages
- Repeated email with varying IP/UA
- Burst traffic to confirm each limiter dimension trips as expected

Included smoke test:
- `npm run test:contact-security` (requires app running and reachable at `CONTACT_TEST_BASE_URL`, default `http://127.0.0.1:3000`)
- Script path: `scripts/contact-security-smoke-test.mjs`

Success criteria:
- Automated traffic blocked/quarantined
- Legitimate submissions still accepted
- Metrics show expected reason distribution

## Rollout plan
1. Set env vars (Turnstile keys, token secret, allowed origins, thresholds).
2. Deploy with default thresholds and `CONTACT_EMAIL_QUEUE_MODE=sync`.
3. Monitor `GET /api/contact` metrics daily for 7 days.
4. Tune bot score thresholds based on quarantine/false-positive observations.
5. If multi-instance traffic grows, migrate rate limit storage to Redis (shared state) and retain in-memory fallback for local/dev.

## Redis migration note
Current implementation uses in-memory counters/quarantine storage, which is process-local.
For horizontally scaled production, replace `consumeWindow` with a Redis-backed atomic counter + expiry strategy.
