'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Check, ArrowRight } from 'lucide-react'

const features = [
  'Full listing creation and optimization',
  'Dynamic pricing and revenue management',
  'Guest screening and 24/7 communication',
  'Hotel-grade cleaning and turnover coordination',
  'Maintenance coordination and vendor management',
  'Performance reporting with monthly payouts'
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80 mb-3">Pricing</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Straightforward, performance-based</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              We earn when you earn. No setup fees. No nickel-and-diming. Just aligned incentives and clear reporting.
            </p>
          </div>
        </section>

        {/* Plan */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="bg-slate-50 px-6 sm:px-10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-orange font-semibold mb-3">Single plan</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Flat 25% of net rental revenue</h2>
                  <p className="text-slate-600 max-w-2xl">
                    Covers marketing, pricing, guest communications, cleaning coordination, and ongoing operations. You receive payouts monthly with full transparency.
                  </p>
                </div>
                <div className="flex flex-col items-center lg:items-end gap-3">
                  <div className="text-center lg:text-right">
                    <div className="text-4xl sm:text-5xl font-bold text-brand-blue">25%</div>
                    <div className="text-slate-500">of monthly rental revenue</div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/apply"
                      className="inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
                    >
                      Start with Free Analysis
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center border border-slate-300 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-slate-50"
                    >
                      Talk to Our Team
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-0 border-t border-slate-200">
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900">Included services</h3>
                  <ul className="space-y-3">
                    {features.map((item) => (
                      <li key={item} className="flex items-start text-slate-700">
                        <Check className="h-5 w-5 text-brand-green mr-3 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-slate-50 space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900">Notes</h3>
                  <ul className="space-y-3 text-slate-700">
                    <li>Cleaning and turnover costs are passed through at vendor rates.</li>
                    <li>Owner-reserved dates are supported; pricing adjusts automatically around them.</li>
                    <li>No long-term lock-in; pause or cancel with 30 days notice.</li>
                    <li>Have a larger portfolio or unique needs? We can tailor the percentage for volume or specialized services.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
