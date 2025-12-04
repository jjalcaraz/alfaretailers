'use client'

import { useState, useEffect } from 'react'
import { X, Calculator, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollY = window.scrollY

        // Show CTA after user scrolls past hero
        if (scrollY > heroBottom + 100 && !isDismissed) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:bottom-8 md:left-8 md:right-8 md:max-w-md md:mx-auto"
        >
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 relative">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss CTA"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="bg-brand-orange/10 p-3 rounded-lg">
                <Calculator className="h-6 w-6 text-brand-orange" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  Calculate Your Potential Income
                </div>
                <div className="text-sm text-gray-600">
                  See how much you could be earning in minutes
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className="bg-brand-orange hover:bg-brand-orange/90 text-white whitespace-nowrap"
                asChild
              >
                <Link href="/apply">
                  Calculate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                  Free Analysis
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                  No Obligation
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                  42% Avg Increase
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}