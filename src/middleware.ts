import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = url.hostname

  // Force HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

  // Force WWW domain
  if (hostname === 'alfaretailers.com') {
    url.hostname = 'www.alfaretailers.com'
    return NextResponse.redirect(url, 301)
  }

  // Add trailing slash to homepage for consistency
  if (url.pathname === '' && !url.pathname.endsWith('/')) {
    url.pathname = '/'
    return NextResponse.redirect(url, 301)
  }

  // Remove trailing slash from non-homepage URLs for consistency
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }

  // Add security headers
  const response = NextResponse.next()

  // HSTS (only in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}