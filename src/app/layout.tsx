import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AlfaRetailers - Transform Your Property into Profit',
    template: '%s | AlfaRetailers'
  },
  description: 'Convert your stagnant long-term rental into a profitable short-term rental. We manage everything from listing to check-ins. Get your free rental analysis today.',
  keywords: ['property management', 'short-term rental', 'Airbnb', 'vacation rental', 'property investment'],
  authors: [{ name: 'AlfaRetailers' }],
  creator: 'AlfaRetailers',
  metadataBase: new URL('https://alfaretailers.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alfaretailers.com',
    title: 'AlfaRetailers - Transform Your Property into Profit',
    description: 'Convert your stagnant long-term rental into a profitable short-term rental. We manage everything.',
    siteName: 'AlfaRetailers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlfaRetailers - Transform Your Property into Profit',
    description: 'Convert your stagnant long-term rental into a profitable short-term rental.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}