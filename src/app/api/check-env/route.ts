import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasTurnstileSiteKey: !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    siteKeyLength: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.length || 0,
    siteKeyPrefix: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.substring(0, 10) || 'NOT_SET',
    hasTurnstileSecret: !!process.env.TURNSTILE_SECRET_KEY,
    nodeEnv: process.env.NODE_ENV,
  })
}
