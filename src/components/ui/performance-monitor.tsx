'use client'

import { useEffect } from 'react'

interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and browser environment
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    // Track page load performance
    const trackPerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

      const metrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0,
      }

      // Get Web Vitals if available
      if ('web-vitals' in window) {
        // This would require installing web-vitals package
        // import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        //   getCLS(console.log)
        //   getFID(console.log)
        //   getFCP(console.log)
        //   getLCP(console.log)
        //   getTTFB(console.log)
        // })
      }

      // Send metrics to analytics service (placeholder)
      console.log('Performance Metrics:', metrics)

      // Example: Send to your analytics service
      // fetch('/api/analytics/performance', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metrics)
      // })
    }

    // Track Core Web Vitals
    const trackWebVitals = () => {
      // First Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            console.log('FCP:', entry.startTime)
          }
        })
      }).observe({ type: 'paint', buffered: true })

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          console.log('LCP:', entry.startTime)
        })
      }).observe({ type: 'largest-contentful-paint', buffered: true })

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if ('value' in entry) {
            console.log('CLS:', (entry as any).value)
          }
        })
      }).observe({ type: 'layout-shift', buffered: true })

      // First Input Delay
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry instanceof PerformanceEventTiming) {
            console.log('FID:', entry.processingStart - entry.startTime)
          }
        })
      }).observe({ type: 'first-input', buffered: true })
    }

    // Initialize performance tracking
    if (document.readyState === 'complete') {
      trackPerformance()
      trackWebVitals()
    } else {
      window.addEventListener('load', () => {
        setTimeout(trackPerformance, 0)
        trackWebVitals()
      })
    }
  }, [])

  // This component doesn't render anything
  return null
}

// Hook for measuring component render performance
export function useRenderTime(componentName: string) {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
      return
    }

    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      console.log(`${componentName} render time: ${endTime - startTime}ms`)
    }
  }, [componentName])
}