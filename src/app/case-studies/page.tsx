'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArrowRight, Building2, Home, Hotel, TrendingUp } from 'lucide-react'

const caseStudies = [
  {
    title: 'Idle Condo to 92% Occupancy',
    location: 'Downtown Miami, FL',
    propertyType: '2-bed condo',
    stats: [
      { label: 'Monthly income lift', value: '+47%' },
      { label: 'Avg. occupancy', value: '92%' },
      { label: 'Time to first booking', value: '11 days' },
    ],
    summary:
      'Owner struggled with 73 vacant days. We overhauled pricing, relaunched with pro photos, and activated multi-platform distribution. Net income beat the previous long-term lease by nearly half.',
  },
  {
    title: 'Stale Listing to Premium Bookings',
    location: 'San Antonio, TX',
    propertyType: '3-bed single family',
    stats: [
      { label: 'Revenue increase', value: '+52%' },
      { label: 'Nights booked', value: '24 / month' },
      { label: 'Guest rating', value: '4.9★' },
    ],
    summary:
      'House sat vacant after a long-term tenant exit. We added a mid-century staging package, optimized minimum-night rules, and secured repeat military and corporate travel stays.',
  },
  {
    title: 'Seasonal Slump Turnaround',
    location: 'Orlando, FL',
    propertyType: '4-bed vacation home',
    stats: [
      { label: 'Off-season ADR lift', value: '+32%' },
      { label: 'Cleaning SLA', value: '4 hrs' },
      { label: 'Direct bookings', value: '+18%' },
    ],
    summary:
      'Bookings collapsed in shoulder months. We introduced dynamic pricing, direct-book offers for past guests, and partnered with local event planners to fill the calendar year-round.',
  },
  {
    title: 'Portfolio Stabilization for an Investor',
    location: 'Tampa, FL',
    propertyType: '5-unit mix of condos',
    stats: [
      { label: 'Portfolio NOI lift', value: '+41%' },
      { label: 'Avg. response time', value: '6 min' },
      { label: 'Maintenance tickets', value: '-28%' },
    ],
    summary:
      'Fragmented self-management caused guest churn. We centralized ops, deployed smart locks/thermostats, and standardized cleaners. Consistency drove better reviews and higher nightly rates.',
  },
]

const icons = [Home, Building2, Hotel, TrendingUp]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80 mb-4">Case Studies</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Proof that vacant units can outperform</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              See how Alfa Retailers optimized pricing, marketing, and operations to turn idle properties into reliable revenue across different markets and asset types.
            </p>
          </div>
        </section>

        {/* Case Study Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
            {caseStudies.map((item, idx) => {
              const Icon = icons[idx % icons.length]
              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] overflow-hidden bg-white">
                  <div className="flex items-center justify-between px-6 pt-6">
                    <div>
                      <p className="text-sm text-brand-orange font-semibold">{item.location}</p>
                      <h2 className="text-2xl font-bold text-slate-900">{item.title}</h2>
                      <p className="text-sm text-slate-500">{item.propertyType}</p>
                    </div>
                    <div className="h-11 w-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="px-6 py-4 grid grid-cols-3 gap-4">
                    {item.stats.map((stat) => (
                      <div key={stat.label} className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-center">
                        <div className="text-lg font-semibold text-slate-900">{stat.value}</div>
                        <div className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <p className="px-6 pb-6 text-slate-700 leading-relaxed">{item.summary}</p>
                </article>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-brand-blue to-brand-green text-white rounded-3xl py-12 shadow-xl">
            <h3 className="text-3xl font-bold mb-3">Ready to write your own success story?</h3>
            <p className="text-white/85 mb-6">Get a free revenue analysis and a customized launch plan for your property.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center bg-white text-brand-blue font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Free Analysis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/60 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
