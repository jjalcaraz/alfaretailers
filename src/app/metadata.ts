import type { Metadata } from 'next'
import { getBaseUrl } from '@/lib/utils'

// Base metadata for the site
export const baseMetadata: Metadata = {
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
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    canonical: getBaseUrl(),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: getBaseUrl(),
    title: 'Alfa Retailers - Transform Your Empty Rental into a Profit Machine | 42% More Income',
    description: 'Stop losing $3,200+ monthly on vacant properties. Average clients see 42% higher income with our proven short-term rental management system.',
    siteName: 'Alfa Retailers',
    images: [
      {
        url: '/images/hero-bg-livingroom.jpg',
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
    images: ['/images/hero-bg-livingroom.jpg'],
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

// Page-specific metadata
export const pageMetadata: Record<string, Metadata> = {
  home: {
    ...baseMetadata,
    title: 'Alfa Retailers - Transform Your Empty Rental into a Profit Machine | 42% More Income',
    description: baseMetadata.description,
  },
  'how-it-works': {
    title: 'How It Works - Our Proven Property Management Process',
    description: 'Discover our step-by-step process for transforming your vacant property into a profitable short-term rental. From analysis to management, we handle everything.',
    openGraph: {
      ...baseMetadata.openGraph,
      title: 'How It Works - Our Proven Property Management Process',
      description: 'Discover our step-by-step process for transforming your vacant property into a profitable short-term rental.',
      url: `${getBaseUrl()}/how-it-works`,
    },
  },
  apply: {
    title: 'Apply Now - Start Your Property Management Journey',
    description: 'Get your free property analysis and start earning 42% more income. Complete our simple application to transform your vacant rental into a profit machine.',
    openGraph: {
      ...baseMetadata.openGraph,
      title: 'Apply Now - Start Your Property Management Journey',
      description: 'Get your free property analysis and start earning 42% more income. Complete our simple application today.',
      url: `${getBaseUrl()}/apply`,
    },
  },
  about: {
    title: 'About Alfa Retailers - Texas Property Management Experts',
    description: 'Learn about Alfa Retailers, your trusted partner for short-term rental property management in San Antonio and throughout Texas.',
    openGraph: {
      ...baseMetadata.openGraph,
      title: 'About Alfa Retailers - Texas Property Management Experts',
      description: 'Learn about Alfa Retailers, your trusted partner for short-term rental property management in Texas.',
      url: `${getBaseUrl()}/about`,
    },
  },
  faq: {
    title: 'Frequently Asked Questions - Property Management Services',
    description: 'Get answers to common questions about short-term rental management, pricing, services, and how Alfa Retailers can help maximize your property income.',
    openGraph: {
      ...baseMetadata.openGraph,
      title: 'Frequently Asked Questions - Property Management Services',
      description: 'Get answers to common questions about short-term rental management and how we can help maximize your property income.',
      url: `${getBaseUrl()}/faq`,
    },
  },
  contact: {
    title: 'Contact Alfa Retailers - Property Management Experts',
    description: 'Get in touch with our property management team for a free consultation. Call us at 210-526-1401 or visit our San Antonio office.',
    openGraph: {
      ...baseMetadata.openGraph,
      title: 'Contact Alfa Retailers - Property Management Experts',
      description: 'Get in touch with our property management team for a free consultation. Call 210-526-1401.',
      url: `${getBaseUrl()}/contact`,
    },
  },
  privacy: {
    title: 'Privacy Policy - Alfa Retailers Property Management',
    description: 'Read our comprehensive privacy policy to understand how we collect, use, and protect your personal information at Alfa Retailers.',
    openGraph: {
      ...baseMetadata.openGraph,
      title: 'Privacy Policy - Alfa Retailers Property Management',
      description: 'Read our comprehensive privacy policy to understand how we protect your personal information.',
      url: `${getBaseUrl()}/privacy`,
    },
    robots: {
      index: true,
      follow: true,
    },
  },
}