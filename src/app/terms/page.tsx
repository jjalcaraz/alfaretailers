'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const sections = [
  {
    title: 'Services & Scope',
    body: `We provide short-term rental management, including listing creation, pricing, guest communication, cleaning coordination, and maintenance coordination. We do not provide legal, tax, or insurance advice. Owners remain responsible for complying with local regulations and ensuring the property is safe, habitable, and insured.`,
  },
  {
    title: 'Fees & Payouts',
    body: `Management fees are percentage-based on rental revenue as set in your service agreement. Cleaning and turnover expenses are pass-through at vendor rates. Payouts are sent monthly with reporting on revenue, fees, and pass-through costs. Any taxes, permitting, or compliance costs are the owner’s responsibility.`,
  },
  {
    title: 'Owner Obligations',
    body: `You must provide accurate property details, maintain utilities, and keep required permits and insurance current. You agree to notify us of any issues that could impact guest safety or bookings. You authorize us to act on your behalf within the agreed service scope to manage listings, pricing, guest communication, and vendor coordination.`,
  },
  {
    title: 'Guest Issues & Damages',
    body: `We manage guest communications and reasonable resolutions. When damages occur, we will pursue collection from guests via platform claims processes where applicable. Owners are responsible for repairs and insurance claims beyond what is recovered from guests.`,
  },
  {
    title: 'Cancellations & Changes',
    body: `Either party may terminate with 30 days notice unless otherwise stated in your agreement. Owner-reserved dates should be provided in advance; pricing and availability will adjust around them. We reserve the right to pause or cancel bookings if safety, compliance, or payment issues arise.`,
  },
  {
    title: 'Liability',
    body: `To the fullest extent permitted by law, our liability is limited to direct damages up to the fees paid to us in the three months preceding the event giving rise to the claim. We are not liable for indirect or consequential damages, loss of income, or loss of goodwill.`,
  },
  {
    title: 'Privacy & Data',
    body: `We handle personal data in accordance with our Privacy Policy. You agree not to share guest data beyond what is necessary for service delivery and to comply with applicable privacy laws.`,
  },
  {
    title: 'Governing Law',
    body: `These Terms are governed by the laws of the State of Texas, without regard to conflicts of law principles. Any disputes will be resolved in state or federal courts located in Bexar County, Texas.`,
  },
  {
    title: 'Updates',
    body: `We may update these Terms from time to time. Continued use of our services after changes take effect constitutes acceptance of the revised Terms. If a material change affects your rights, we will notify you through reasonable means.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-500 mb-2">Terms of Service</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Service Terms & Conditions</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Simple, transparent terms for partnering with Alfa Retailers. These apply alongside any signed service agreement.
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
