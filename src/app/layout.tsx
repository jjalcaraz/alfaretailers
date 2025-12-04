import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: {
    default: 'AlfaRetailers - Transform Your Empty Rental into a Profit Machine | 42% More Income',
    template: '%s | AlfaRetailers'
  },
  description: 'Stop losing $3,200+ monthly on vacant properties. Convert your stagnant long-term rental into a profitable short-term rental. Average clients see 42% higher income. Free analysis in 5 minutes.',
  keywords: [
    'property management',
    'short-term rental',
    'Airbnb management',
    'vacation rental',
    'property investment',
    'rental income optimization',
    'vacant property management',
    'Airbnb co-hosting',
    'short-term rental management',
    'increase rental income',
    'vacant property solutions',
    'Miami property management',
    'Florida short-term rentals'
  ],
  authors: [{ name: 'AlfaRetailers' }],
  creator: 'AlfaRetailers',
  publisher: 'AlfaRetailers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://alfaretailers.com'),
  alternates: {
    canonical: 'https://alfaretailers.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alfaretailers.com',
    title: 'AlfaRetailers - Transform Your Empty Rental into a Profit Machine | 42% More Income',
    description: 'Stop losing $3,200+ monthly on vacant properties. Average clients see 42% higher income with our proven short-term rental management system.',
    siteName: 'AlfaRetailers',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AlfaRetailers - Property Management Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlfaRetailers - Transform Your Empty Rental into a Profit Machine',
    description: 'Stop losing $3,200+ monthly on vacant properties. Average clients see 42% higher income. Free analysis in 5 minutes.',
    images: ['/twitter-image.jpg'],
    creator: '@AlfaRetailers',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className="font-sans">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}