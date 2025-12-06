import { Metadata } from 'next'

// Force production URL to prevent Vercel deployment URLs
const PRODUCTION_URL = 'https://www.alfaretailers.com'

// Get the absolute URL for the site (ensures www prefix)
export function getAbsoluteUrl(path: string = ''): string {
  // Always use production URL to prevent Vercel deployment URLs in canonical tags
  let baseUrl = PRODUCTION_URL

  // Only use environment variable if it's explicitly set to our production domain
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.includes('www.alfaretailers.com')) {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  }

  // Normalize path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  return `${baseUrl}${cleanPath}`
}

// Get the canonical URL with proper normalization
export function getCanonicalUrl(path: string = ''): string {
  const url = getAbsoluteUrl(path)

  // Remove trailing slash for consistency (except for homepage)
  if (path.length > 1 && url.endsWith('/')) {
    return url.slice(0, -1)
  }

  // Ensure homepage has trailing slash
  if (!path || path === '/') {
    return url.replace(/\/$/, '') + '/'
  }

  return url
}

// Generate consistent metadata for pages
export function generatePageMetadata(params: {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  keywords?: string[]
}): Metadata {
  const { title, description, path, image, noindex, keywords } = params
  const imageUrl = image || getAbsoluteUrl('/og-image.jpg')
  const canonicalUrl = getCanonicalUrl(path)

  return {
    title,
    description,
    keywords: [
      'property management',
      'short-term rental',
      'Airbnb management',
      'vacation rental',
      'property investment',
      'San Antonio property management',
      'Texas short-term rentals',
      ...(keywords || [])
    ],
    authors: [{ name: 'Alfa Retailers' }],
    creator: 'Alfa Retailers',
    publisher: 'Alfa Retailers',
    metadataBase: new URL(getCanonicalUrl()),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: `${title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description,
      images: [imageUrl],
      creator: '@AlfaRetailers',
    },
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    verification: {
      google: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION || '',
    },
  }
}

// Generate structured data for LocalBusiness
export function generateLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Alfa Retailers',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    image: getAbsoluteUrl('/images/logo-alfa.png'),
    url: getAbsoluteUrl(),
    telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(210) 526-1401',
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'info@alfaretailers.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: process.env.BUSINESS_ADDRESS || '12370 Potranco Rd, Suite 207',
      addressLocality: process.env.BUSINESS_CITY || 'San Antonio',
      addressRegion: process.env.BUSINESS_STATE || 'TX',
      postalCode: process.env.BUSINESS_ZIP || '78254',
      addressCountry: process.env.BUSINESS_COUNTRY || 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: parseFloat(process.env.BUSINESS_LATITUDE || '29.42412'),
      longitude: parseFloat(process.env.BUSINESS_LONGITUDE || '-98.4936'),
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '(210) 526-1401',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.facebook.com/AlfaRetailersLLC',
      'https://www.linkedin.com/company/alfa-retailers',
    ],
  }
}

// Generate structured data for Service
export function generateServiceStructuredData(params: {
  name: string
  description: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    provider: {
      '@type': 'LocalBusiness',
      name: process.env.NEXT_PUBLIC_SITE_NAME,
      telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE,
    },
    image: params.image || getAbsoluteUrl('/images/service-default.jpg'),
    serviceType: 'Property Management Service',
    areaServed: {
      '@type': 'Place',
      name: 'San Antonio, Texas',
    },
  }
}

// Generate WebPage structured data
export function generateWebPageStructuredData(params: {
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: params.title,
    description: params.description,
    url: getAbsoluteUrl(params.url),
    image: params.image || getAbsoluteUrl('/og-image.jpg'),
    datePublished: params.datePublished,
    dateModified: params.dateModified || new Date().toISOString(),
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: process.env.NEXT_PUBLIC_SITE_NAME,
      url: getAbsoluteUrl(),
    },
    about: {
      '@type': 'Thing',
      name: 'Short-term rental property management',
    },
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{
  name: string
  url: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  }
}

// Generate Review/FAQ structured data
export function generateReviewStructuredData(params: {
  itemReviewed: string
  reviewBody: string
  authorName: string
  rating: number
  datePublished: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: params.itemReviewed,
    },
    reviewBody: params.reviewBody,
    author: {
      '@type': 'Person',
      name: params.authorName,
    },
    datePublished: params.datePublished,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: params.rating,
      bestRating: 5,
    },
  }
}