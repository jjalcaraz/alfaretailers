'use client'

import { useEffect } from 'react'
import { getAbsoluteUrl } from '@/lib/seo-utils'

/**
 * Page-level structured data component
 * Renders JSON-LD structured data for specific pages
 *
 * @example
 * <PageStructuredData type="AboutPage" />
 * <PageStructuredData type="ContactPage" />
 * <PageStructuredData type="FAQPage" questions={faqItems} />
 */

interface FAQItem {
  question: string
  answer: string
}

interface PageStructuredDataProps {
  type: 'AboutPage' | 'ContactPage' | 'FAQPage' | 'ServicePage' | 'HowItWorksPage'
  data?: {
    title?: string
    description?: string
    url?: string
    questions?: FAQItem[]
    serviceName?: string
    serviceDescription?: string
  }
}

export function PageStructuredData({ type, data = {} }: PageStructuredDataProps) {
  useEffect(() => {
    let structuredData: Record<string, any> = {}

    switch (type) {
      case 'AboutPage':
        structuredData = generateAboutPageStructuredData(data.title, data.description, data.url)
        break
      case 'ContactPage':
        structuredData = generateContactPageStructuredData(data.title, data.description, data.url)
        break
      case 'FAQPage':
        structuredData = generateFAQPageStructuredData(data.questions || [])
        break
      case 'ServicePage':
        structuredData = generateServicePageStructuredData(data.serviceName, data.serviceDescription)
        break
      case 'HowItWorksPage':
        structuredData = generateHowItWorksPageStructuredData(data.title, data.description, data.url)
        break
    }

    if (Object.keys(structuredData).length > 0) {
      const scriptId = `page-structured-data-${type.toLowerCase()}`

      // Create or update script tag
      let script = document.getElementById(scriptId) as HTMLScriptElement
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)

      return () => {
        // Cleanup on unmount
        const existingScript = document.getElementById(scriptId)
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript)
        }
      }
    }
  }, [type, data])

  return null // This component only adds JSON-LD to the head
}

// Generators for different page types

function generateAboutPageStructuredData(
  title = 'About Alfa Retailers',
  description = 'Learn about Alfa Retailers, your trusted partner for short-term rental property management in San Antonio and throughout Texas.',
  url = '/about'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Alfa Retailers',
      description,
      url: getAbsoluteUrl(url),
      foundingDate: '2020',
      founders: [
        {
          '@type': 'Person',
          name: 'Alfa Retailers Leadership Team'
        }
      ],
      areaServed: {
        '@type': 'Place',
        name: 'San Antonio, Texas'
      },
      knowsAbout: [
        'Short-term rental management',
        'Property investment',
        'Vacation rental optimization',
        'Airbnb management',
        'Property income maximization'
      ]
    }
  }
}

function generateContactPageStructuredData(
  title = 'Contact Alfa Retailers',
  description = 'Get in touch with our property management team for a free consultation.',
  url = '/contact'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Alfa Retailers',
      url: getAbsoluteUrl(),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '210-526-1401',
        contactType: 'customer service',
        email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'info@alfaretailers.com',
        availableLanguage: ['English'],
        areaServed: 'US',
        contactOption: ['TollFree']
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '12370 Potranco Rd, Suite 207',
        addressLocality: 'San Antonio',
        addressRegion: 'TX',
        postalCode: '78254',
        addressCountry: 'US'
      }
    }
  }
}

function generateFAQPageStructuredData(questions: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  }
}

function generateServicePageStructuredData(serviceName?: string, serviceDescription?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName || 'Short-term Rental Management Service',
    description: serviceDescription || 'Complete management service for converting vacant long-term rentals into profitable short-term rentals',
    provider: {
      '@type': 'Organization',
      name: 'Alfa Retailers',
      url: getAbsoluteUrl()
    },
    serviceType: 'Property Management Service',
    areaServed: {
      '@type': 'Place',
      name: 'San Antonio, Texas'
    },
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'USD',
      description: 'Monthly management fee',
      availability: 'https://schema.org/InStock'
    }
  }
}

function generateHowItWorksPageStructuredData(
  title = 'How It Works - Short-term Rental Management Process',
  description = 'Discover our step-by-step process for transforming your vacant property into a profitable short-term rental.',
  url = '/how-it-works'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    image: getAbsoluteUrl('/images/how-it-works.jpg'),
    step: [
      {
        '@type': 'HowToStep',
        name: 'Property Analysis',
        text: 'We analyze your property\'s potential using market data and comparable listings.',
        image: getAbsoluteUrl('/images/step-1.jpg')
      },
      {
        '@type': 'HowToStep',
        name: 'Professional Setup',
        text: 'Professional photography, listing creation, and property optimization.',
        image: getAbsoluteUrl('/images/step-2.jpg')
      },
      {
        '@type': 'HowToStep',
        name: 'Guest Management',
        text: '24/7 guest communication, booking management, and coordination.',
        image: getAbsoluteUrl('/images/step-3.jpg')
      },
      {
        '@type': 'HowToStep',
        name: 'Income Reporting',
        text: 'Detailed monthly reports showing income, expenses, and performance metrics.',
        image: getAbsoluteUrl('/images/step-4.jpg')
      }
    ]
  }
}

/**
 * Server component version for static structured data
 */
export function StaticPageStructuredData({
  type,
  data = {}
}: PageStructuredDataProps) {
  let structuredData: Record<string, any> = {}

  switch (type) {
    case 'AboutPage':
      structuredData = generateAboutPageStructuredData(data.title, data.description, data.url)
      break
    case 'ContactPage':
      structuredData = generateContactPageStructuredData(data.title, data.description, data.url)
      break
    case 'FAQPage':
      structuredData = generateFAQPageStructuredData(data.questions || [])
      break
    case 'ServicePage':
      structuredData = generateServicePageStructuredData(data.serviceName, data.serviceDescription)
      break
    case 'HowItWorksPage':
      structuredData = generateHowItWorksPageStructuredData(data.title, data.description, data.url)
      break
  }

  if (Object.keys(structuredData).length === 0) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
