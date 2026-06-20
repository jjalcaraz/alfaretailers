import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Privacy Policy | Alfa Retailers',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.alfaretailers.com/privacy-policy' },
}

// Permanently redirect legacy /privacy → /privacy-policy
export default function PrivacyRedirect() {
  redirect('/privacy-policy')
}
