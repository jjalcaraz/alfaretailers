'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const sections = [
  {
    title: 'What Are Cookies?',
    body: 'Cookies are small text files stored on your device to help websites function and improve your experience. We use them for core functionality, analytics, and remembering preferences.',
  },
  {
    title: 'Types of Cookies We Use',
    body: 'Essential cookies keep the site running (security, session management). Analytics cookies help us understand usage so we can improve the site. Preference cookies remember things like language or saved form fields.',
  },
  {
    title: 'Third-Party Cookies',
    body: 'We may use trusted third-party tools (e.g., analytics, performance monitoring). These providers may set their own cookies subject to their privacy policies.',
  },
  {
    title: 'Managing Cookies',
    body: 'Most browsers let you block or delete cookies in settings. Blocking some cookies may impact site functionality. You can also use private/incognito mode to limit cookie storage.',
  },
  {
    title: 'Updates',
    body: 'We may update this Cookie Policy as our site or applicable laws change. Material changes will be noted here with an updated date.',
  },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-500 mb-2">Cookies</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              How Alfa Retailers uses cookies and how you can manage them.
            </p>
          </section>

          <div className="space-y-8">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-slate-200 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)] p-6 sm:p-8 bg-white">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">{section.title}</h2>
                <p className="text-slate-700 leading-relaxed">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-sm text-slate-500 text-center">
            Last updated: {new Date().toLocaleDateString()}. For questions, contact us at info@alfaretailers.com or 210-526-1401.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
