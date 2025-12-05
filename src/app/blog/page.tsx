'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'

type Post = {
  title: string
  slug: string
  excerpt: string
  date: string
  readTime: string
  tag: string
}

const posts: Post[] = [
  {
    title: 'From Vacant to Booked Solid: Pricing Moves That Work',
    slug: '#',
    excerpt:
      'How dynamic pricing, length-of-stay rules, and event calendars combine to unlock higher ADR without killing occupancy.',
    date: 'Feb 2025',
    readTime: '6 min read',
    tag: 'Revenue',
  },
  {
    title: 'Staging Fast: A 7-Day Launch Checklist',
    slug: '#',
    excerpt:
      'The exact photography, furnishing, and copy steps we use to take a property from empty to guest-ready in one week.',
    date: 'Jan 2025',
    readTime: '5 min read',
    tag: 'Operations',
  },
  {
    title: 'Guest Experience That Drives 4.9★ Reviews',
    slug: '#',
    excerpt:
      'Response times, automation, and on-the-ground playbooks that keep guests happy and support premium pricing.',
    date: 'Dec 2024',
    readTime: '7 min read',
    tag: 'Experience',
  },
  {
    title: 'Owner FAQ: Fees, Cleanings, and Blocking Dates',
    slug: '#',
    excerpt:
      'Transparent answers to the most common questions owners ask before switching from long-term to short-term.',
    date: 'Nov 2024',
    readTime: '4 min read',
    tag: 'Owners',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="pt-20 pb-16">
        {/* Hero */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200/80 mb-3">Insights</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">The Alfa Retailers Blog</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Playbooks, pricing tactics, and operations tips to turn vacant rentals into reliable revenue.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)] p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
                  <span className="inline-flex items-center gap-1"><Tag className="h-4 w-4" /> {post.tag}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{post.title}</h2>
                <p className="text-slate-700 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <Link href={post.slug} className="text-brand-blue font-semibold inline-flex items-center hover:text-brand-blue/80">
                    Read more
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                  <div className="h-9 px-3 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold flex items-center">
                    {post.tag}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-brand-blue to-brand-green text-white rounded-3xl py-12 shadow-xl">
            <h3 className="text-3xl font-bold mb-3">Get insights tailored to your property</h3>
            <p className="text-white/85 mb-6">Request a free analysis and we’ll share a custom launch and pricing plan for your address.</p>
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
