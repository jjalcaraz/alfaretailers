import { Metadata } from 'next'
import Link from 'next/link'
import { MessageSquare, Shield, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SMS Terms & Conditions | Alfa Retailers',
  description:
    'Alfa Retailers SMS Terms & Conditions — program description, opt-in/opt-out instructions, message frequency, costs, and carrier information.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.alfaretailers.com/sms-terms' },
}

const sections = [
  {
    number: '1',
    title: 'Program Description',
    content:
      'When you opt in, Alfa Retailers will send SMS messages including consultation booking links, appointment confirmations, missed-call follow-ups, and customer support updates.',
  },
  {
    number: '2',
    title: 'How to Opt In',
    content: (
      <>
        You can opt in by checking the SMS consent box and providing your phone number on our contact
        form at{' '}
        <Link
          href="/contact"
          className="text-brand-blue underline hover:text-brand-blue/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
        >
          https://www.alfaretailers.com/contact
        </Link>
        .
      </>
    ),
  },
  {
    number: '3',
    title: 'Message Frequency',
    content: 'Message frequency varies based on your interactions with us.',
  },
  {
    number: '4',
    title: 'Cost',
    content:
      'Message and data rates may apply. Alfa Retailers does not charge for the messages; standard rates from your mobile carrier apply.',
  },
  {
    number: '5',
    title: 'Opt-Out',
    content:
      'You can cancel the SMS service at any time by replying STOP. After you reply STOP, we will send a confirmation message and no further messages will be sent. To rejoin, opt in again.',
  },
  {
    number: '6',
    title: 'Help',
    content: (
      <>
        Reply HELP for assistance, or contact us at{' '}
        <a
          href="mailto:juanalcaraz@alfaretailers.com"
          className="text-brand-blue underline hover:text-brand-blue/80"
        >
          juanalcaraz@alfaretailers.com
        </a>
        .
      </>
    ),
  },
  {
    number: '7',
    title: 'Carriers',
    content: 'Carriers are not liable for delayed or undelivered messages.',
  },
  {
    number: '8',
    title: 'Privacy',
    content: (
      <>
        Your mobile information will not be shared with third parties or affiliates for marketing purposes. See our{' '}
        <Link
          href="/privacy-policy"
          className="text-brand-blue underline hover:text-brand-blue/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
        >
          Privacy Policy
        </Link>{' '}
        for details.
      </>
    ),
  },
]

export default function SmsTerms() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-brand-blue/20 p-4 rounded-full">
                <MessageSquare className="h-12 w-12 text-brand-blue" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">
              SMS Terms &amp; Conditions
            </h1>
            <p className="text-xl text-center text-slate-300 max-w-3xl mx-auto">
              Alfa Retailers
            </p>
            <div className="text-center mt-8 text-sm text-slate-400">
              Last updated: June 20, 2026
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Quick-reference summary box */}
            <div className="mb-12 rounded-2xl bg-brand-blue/5 border-2 border-brand-blue/20 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Summary</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue font-bold mt-0.5">→</span>
                  <span><strong>What you'll receive:</strong> Consultation booking links, appointment confirmations, missed-call follow-ups, and customer support updates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue font-bold mt-0.5">→</span>
                  <span><strong>To opt out:</strong> Reply <strong>STOP</strong> at any time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue font-bold mt-0.5">→</span>
                  <span><strong>For help:</strong> Reply <strong>HELP</strong> or email <a href="mailto:juanalcaraz@alfaretailers.com" className="text-brand-blue underline">juanalcaraz@alfaretailers.com</a>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue font-bold mt-0.5">→</span>
                  <span><strong>Cost:</strong> Message and data rates may apply. We don't charge for messages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue font-bold mt-0.5">→</span>
                  <span><strong>Your data:</strong> Never shared with third parties for marketing purposes.</span>
                </li>
              </ul>
            </div>

            {/* Numbered sections — verbatim carrier-compliant copy */}
            <div className="space-y-8">
              {sections.map((section) => (
                <article
                  key={section.number}
                  className="rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 bg-white"
                >
                  <h2 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white text-sm font-bold flex-shrink-0">
                      {section.number}
                    </span>
                    {section.title}
                  </h2>
                  <p className="text-slate-700 leading-relaxed">{section.content}</p>
                </article>
              ))}
            </div>

            {/* Contact block */}
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-blue/90 p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shield className="h-6 w-6" />
                Contact Alfa Retailers
              </h2>
              <p className="text-blue-100 mb-6">
                For questions about these SMS Terms, to opt out, or to request records of your consent:
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:juanalcaraz@alfaretailers.com" className="text-blue-100 hover:text-white underline">
                      juanalcaraz@alfaretailers.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-blue-100">(210) 526-1401</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-blue-400 text-blue-100 text-sm">
                Alfa Retailers · 12370 Potranco Rd, Suite 207 · San Antonio, TX 78254 ·{' '}
                <Link href="/privacy-policy" className="underline hover:text-white">Privacy Policy</Link>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  )
}
