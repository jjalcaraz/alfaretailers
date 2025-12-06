import { generateLocalBusinessStructuredData, generateWebPageStructuredData, getAbsoluteUrl } from '@/lib/seo-utils'

export function EnhancedStructuredData() {
  const localBusinessData = generateLocalBusinessStructuredData()
  const siteUrl = getAbsoluteUrl()

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alfa Retailers",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo-alfa.png`,
    "description": "Professional short-term rental management service that transforms vacant properties into profitable investments",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": process.env.NEXT_PUBLIC_BUSINESS_PHONE || "210-526-1401",
      "contactType": "customer service",
      "email": process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@alfaretailers.com",
      "availableLanguage": ["English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "12370 Potranco Rd, Suite 207",
      "addressLocality": "San Antonio",
      "addressRegion": "TX",
      "postalCode": "78254",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.42412,
      "longitude": -98.4936
    },
    "sameAs": [
      "https://www.facebook.com/AlfaRetailersLLC",
      "https://www.linkedin.com/company/alfa-retailers"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 47,
      "bestRating": 5,
      "worstRating": 1
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00"
    ],
    "priceRange": "$$"
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Short-term Rental Management",
    "description": "Complete management service for converting vacant long-term rentals into profitable short-term rentals",
    "provider": {
      "@type": "Organization",
      "name": "Alfa Retailers"
    },
    "serviceType": "Property Management Service",
    "areaServed": {
      "@type": "Place",
      "name": "San Antonio, Texas"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Property Management Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Property Analysis",
            "description": "Free rental income analysis and optimization report"
          },
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Management Service",
            "description": "Complete short-term rental management including listings, guest communication, cleaning coordination"
          },
          "priceCurrency": "USD",
          "price": "299",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "299",
            "priceCurrency": "USD",
            "billingDuration": "P1M",
            "referenceQuantity": {
              "@type": "QuantitativeValue",
              "value": 1,
              "unitCode": "MONTH"
            }
          },
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  }

  const webPageData = generateWebPageStructuredData({
    title: "Alfa Retailers - Short-term Rental Management San Antonio",
    description: "Transform your vacant property into a profitable short-term rental. Professional management service with 42% average income increase.",
    url: "/",
    image: "/images/og-image.jpg"
  })

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much more income can I make with short-term rentals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our clients see an average of 42% higher monthly income compared to traditional long-term rentals. Some properties see increases of 50-60% depending on location, amenities, and season."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to start earning income?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most properties start generating income within 14-21 days. This includes property analysis, photography, listing creation, and your first guest booking."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in your management service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our comprehensive service includes professional photography, multi-platform listing creation, 24/7 guest communication, cleaning coordination, maintenance management, and detailed monthly reporting."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any long-term contracts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, we don't require long-term contracts. We believe in earning your business through results every month. You can cancel our service anytime with 30 days notice."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData)
        }}
      />
    </>
  )
}