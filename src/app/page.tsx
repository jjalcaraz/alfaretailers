import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Testimonials } from '@/components/sections/testimonials'
import { IncomeCalculator } from '@/components/sections/income-calculator'
import { FAQ } from '@/components/sections/faq'
import { SocialProof } from '@/components/ui/social-proof'
import { StickyCTA } from '@/components/ui/sticky-cta'
import { TrustBadges } from '@/components/sections/trust-badges'
import { PerformanceMonitor } from '@/components/ui/performance-monitor'
import { Metadata } from 'next'
import { pageMetadata } from './metadata'

export const metadata: Metadata = pageMetadata.home

export default function Home() {
  return (
    <div className="min-h-screen">
      <PerformanceMonitor />
      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <SocialProof />
        </div>
        <TrustBadges />
        <HowItWorks />
        <Testimonials />
        <IncomeCalculator />
        <FAQ />
      </main>
      <StickyCTA />
    </div>
  )
}