'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { useEffect } from 'react'
import { generateBreadcrumbStructuredData } from '@/lib/seo-utils'

export interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

/**
 * Breadcrumb component with Schema.org BreadcrumbList structured data
 *
 * Usage:
 * 1. Automatic: Uses current pathname to generate breadcrumbs
 * 2. Manual: Pass items prop for custom breadcrumbs
 *
 * @example
 * <Breadcrumbs />
 * <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]} />
 */
export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()

  // Auto-generate breadcrumb items from pathname if not provided
  const autoItems: BreadcrumbItem[] = items || (() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Convert slug to readable title
      const title = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({
        name: title,
        url: currentPath
      })
    })

    return breadcrumbs
  })()

  // Generate structured data
  useEffect(() => {
    const structuredData = generateBreadcrumbStructuredData(autoItems)

    // Create or update script tag
    let script = document.getElementById('breadcrumb-structured-data') as HTMLScriptElement
    if (!script) {
      script = document.createElement('script') as HTMLScriptElement
      script.id = 'breadcrumb-structured-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById('breadcrumb-structured-data')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [autoItems])

  if (autoItems.length <= 1) {
    return null // Don't show breadcrumbs on homepage
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1 text-sm text-gray-600 ${className}`}
    >
      <ol className="flex items-center space-x-1">
        {autoItems.map((item, index) => {
          const isLast = index === autoItems.length - 1

          return (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-1 text-gray-400 flex-shrink-0" />
              )}

              {item.url === '/' ? (
                <Link
                  href="/"
                  className="flex items-center hover:text-brand-blue transition-colors"
                  aria-label="Go to homepage"
                >
                  <Home className="h-4 w-4" />
                </Link>
              ) : isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-brand-blue transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * Server component version for static breadcrumb generation
 * Use this when you need SSR and know the path in advance
 */
export function StaticBreadcrumbs({
  items,
  className = ''
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  const structuredData = generateBreadcrumbStructuredData(items)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-1 text-sm text-gray-600 ${className}`}
      >
        <ol className="flex items-center space-x-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-1 text-gray-400 flex-shrink-0" />
                )}

                {item.url === '/' ? (
                  <Link
                    href="/"
                    className="flex items-center hover:text-brand-blue transition-colors"
                    aria-label="Go to homepage"
                  >
                    <Home className="h-4 w-4" />
                  </Link>
                ) : isLast ? (
                  <span className="font-medium text-gray-900" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-brand-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
