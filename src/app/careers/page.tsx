'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MapPin, Clock, ArrowRight } from 'lucide-react'

type Role = {
  title: string
  location: string
  type: string
  summary: string
}

const roles: Role[] = [
  {
    title: 'Revenue & Pricing Analyst',
    location: 'Remote / US',
    type: 'Full-time',
    summary: 'Own pricing, pacing, and channel strategy for a growing portfolio. You love data, spreadsheets, and turning insights into higher ADR.',
  },
  {
    title: 'Guest Experience Lead',
    location: 'Remote / US',
    type: 'Full-time',
    summary: 'Be the voice of Alfa Retailers to guests—fast responses, smart resolutions, and playbooks that keep reviews at 4.9★.',
  },
  {
    title: 'Market Operations Coordinator',
    location: 'San Antonio, TX (Hybrid)',
    type: 'Full-time',
    summary: 'Coordinate turnovers, vendors, and on-site needs. You keep cleaners, maintenance, and inventory flowing without surprises.',
  },
  {
    title: 'Owner Success Manager',
    location: 'Remote / US',
    type: 'Full-time',
    summary: 'Partner with property owners, share performance insights, and ensure onboarding through launch is smooth and transparent.',
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="pt-20 pb-16">
        {/* Hero */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80 mb-3">Careers</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Build the future of smart rentals</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Join Alfa Retailers to turn vacant rentals into thriving hospitality-grade stays. We move fast, measure everything, and delight guests and owners alike.
            </p>
          </div>
        </section>

        {/* Roles */}
        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
            {roles.map((role) => (
              <article key={role.title} className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">{role.title}</h2>
                  <span className="text-sm font-semibold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full">{role.type}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {role.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> Apply by: Rolling</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{role.summary}</p>
                <div className="mt-auto">
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-brand-blue font-semibold hover:text-brand-blue/80"
                  >
                    Introduce yourself
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-brand-blue to-brand-green text-white rounded-3xl py-12 shadow-xl">
            <h3 className="text-3xl font-bold mb-3">Don’t see your role?</h3>
            <p className="text-white/85 mb-6">Send your resume and a note on how you can help owners earn more. We review every message.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-brand-blue font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link
                href="mailto:info@alfaretailers.com"
                className="inline-flex items-center justify-center border border-white/60 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Email Your Resume
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
