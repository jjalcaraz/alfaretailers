'use client'

import Script from 'next/script'

// Declare gtag on the Window interface
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: window.document.title,
            page_location: window.location.href,
            cookie_flags: 'SameSite=Lax;Secure',
            custom_map: {
              'custom_parameter_1': 'property_type',
              'custom_parameter_2': 'lead_source'
            }
          });
        `}
      </Script>
    </>
  )
}

// Custom event tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    })
  }
}

// Business-specific tracking functions
export const trackLeadSubmission = (email: string, phone?: string) => {
  trackEvent('lead_submission', 'contact_form', phone ? 'with_phone' : 'email_only')
}

export const trackIncomeCalculation = (estimatedIncome: number) => {
  trackEvent('income_calculation', 'calculator', 'estimated_income', estimatedIncome)
}

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_location: url,
      page_title: title || document.title
    })
  }
}