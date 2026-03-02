#!/usr/bin/env node

const baseUrl = (process.env.CONTACT_TEST_BASE_URL || 'http://127.0.0.1:3000').replace(/\/+$/, '')
const endpoint = `${baseUrl}/api/contact`
const contactPageUrl = `${baseUrl}/contact`

function buildHeaders() {
  return {
    'Content-Type': 'application/json',
    Origin: baseUrl,
    Referer: `${contactPageUrl}`,
    'User-Agent': 'contact-security-smoke-test/1.0',
  }
}

async function fetchFormAttestationToken() {
  const response = await fetch(contactPageUrl, {
    headers: {
      'User-Agent': 'contact-security-smoke-test/1.0',
    },
  })

  if (!response.ok) {
    throw new Error(`Unable to load contact page (${response.status})`)
  }

  const html = await response.text()
  const match = html.match(/formAttestationToken\\\":\\\"([^\\]+)\\\"/)

  if (!match || !match[1]) {
    throw new Error('Unable to locate form attestation token in contact page response')
  }

  return match[1]
}

function buildPayload(formAttestationToken, overrides = {}) {
  return {
    name: 'Security Smoke Test',
    email: 'security-smoke-test@example.com',
    phone: '210-555-0000',
    message: 'This is a legitimate-looking test message to validate the contact form anti-bot controls.',
    companyWebsite: '',
    formStartedAt: Date.now() - 8_000,
    formAttestationToken,
    turnstileToken: '',
    ...overrides,
  }
}

async function postPayload(payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  })

  let body = null
  try {
    body = await response.json()
  } catch {
    body = { parseError: true }
  }

  return { status: response.status, body }
}

async function runScenario(name, payloadBuilder, expect) {
  try {
    const payload = payloadBuilder()
    const result = await postPayload(payload)
    const passed = expect(result)

    return {
      name,
      passed,
      status: result.status,
      message: result.body?.message || '',
    }
  } catch (error) {
    return {
      name,
      passed: false,
      status: 0,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function runRateLimitScenario(formAttestationToken) {
  const statuses = []
  for (let index = 0; index < 7; index += 1) {
    const payload = buildPayload(formAttestationToken, {
      email: `security-smoke-${index}@example.com`,
      message: `Rate limit test message #${index} with enough words to avoid validation issues.`,
    })

    const result = await postPayload(payload)
    statuses.push(result.status)
  }

  const passed = statuses.includes(429)
  return {
    name: 'rate_limit_progression',
    passed,
    status: statuses[statuses.length - 1],
    message: `statuses=${statuses.join(',')}`,
  }
}

async function main() {
  console.log(`Running contact security smoke test against ${baseUrl}`)

  const formAttestationToken = await fetchFormAttestationToken()

  const scenarios = [
    () => runScenario(
      'missing_turnstile_token',
      () => buildPayload(formAttestationToken),
      (result) => result.status === 403,
    ),
    () => runScenario(
      'honeypot_filled',
      () => buildPayload(formAttestationToken, { companyWebsite: 'https://spam.example' }),
      (result) => result.status === 400,
    ),
    () => runScenario(
      'submitted_too_fast',
      () => buildPayload(formAttestationToken, { formStartedAt: Date.now() - 500 }),
      (result) => result.status === 400,
    ),
    () => runRateLimitScenario(formAttestationToken),
  ]

  const results = []
  for (const scenario of scenarios) {
    results.push(await scenario())
  }

  let failures = 0
  for (const result of results) {
    const marker = result.passed ? 'PASS' : 'FAIL'
    if (!result.passed) {
      failures += 1
    }
    console.log(`${marker} ${result.name} | status=${result.status} | ${result.message}`)
  }

  if (failures > 0) {
    process.exitCode = 1
    console.error(`Contact security smoke test failed (${failures} failing scenario${failures > 1 ? 's' : ''})`)
    return
  }

  console.log('Contact security smoke test passed')
}

main().catch((error) => {
  console.error('Smoke test failed with unexpected error:', error)
  process.exit(1)
})
