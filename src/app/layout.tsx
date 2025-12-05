import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: {
    default: 'Alfa Retailers - Transform Your Empty Rental into a Profit Machine | 42% More Income',
    template: '%s | Alfa Retailers'
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
    'San Antonio property management',
    'Texas short-term rentals',
    'Airbnb property management San Antonio',
    'vacation rental management Texas',
    'property management services',
    'Rental property income maximization',
    'short-term rental returns',
    'property management company San Antonio'
  ],
  authors: [{ name: 'Alfa Retailers' }],
  creator: 'Alfa Retailers',
  publisher: 'Alfa Retailers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.alfaretailers.com'),
  alternates: {
    canonical: 'https://www.alfaretailers.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.alfaretailers.com',
    title: 'Alfa Retailers - Transform Your Empty Rental into a Profit Machine | 42% More Income',
    description: 'Stop losing $3,200+ monthly on vacant properties. Average clients see 42% higher income with our proven short-term rental management system.',
    siteName: 'Alfa Retailers',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alfa Retailers - Property Management Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfa Retailers - Transform Your Empty Rental into a Profit Machine',
    description: 'Stop losing $3,200+ monthly on vacant properties. Average clients see 42% higher income. Free analysis in 5 minutes.',
    images: ['/twitter-image.jpg'],
    creator: '@Alfa Retailers',
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
  // Additional SEO meta tags
  other: {
    'theme-color': '#2563eb',
    'msapplication-TileColor': '#2563eb',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Alfa Retailers',
    'application-name': 'Alfa Retailers',
    'msapplication-config': '/browserconfig.xml',
    'mobile-web-app-capable': 'yes',
  },
  // Viewport and additional meta
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
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
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
