import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Eye, Lock, Mail, Phone, FileText, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Alfa Retailers',
  description:
    'Alfa Retailers Privacy Policy — learn how we collect, use, and protect your personal information, including how we handle SMS consent data.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.alfaretailers.com/privacy-policy' },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-brand-orange/10 p-4 rounded-full">
                <Shield className="h-12 w-12 text-brand-orange" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">Privacy Policy</h1>
            <p className="text-xl text-center text-slate-300 max-w-3xl mx-auto">
              Your privacy matters to us. This policy explains how Alfa Retailers collects, uses, and protects your personal information.
            </p>
            <div className="text-center mt-8 text-sm text-slate-400">
              Last updated: June 20, 2026
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Welcome to Alfa Retailers (<strong>https://www.alfaretailers.com/</strong>). We are committed to protecting your personal information
                and your right to privacy. This Privacy Policy describes what information we collect, why we collect it,
                how we use it, and your choices.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mt-4">
                By using our website or services you agree to the collection and use of information as described here.
              </p>
            </div>

            {/* SMS / Mobile — the critical A2P compliance section */}
            <div className="mb-12 rounded-2xl border-2 border-brand-blue/30 bg-blue-50 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-brand-blue flex-shrink-0" />
                Mobile Information and SMS Consent
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
                Information shared with subcontractors in support services, such as customer service, is permitted.
                All other use case categories exclude text messaging originator opt-in data and consent; this information
                will not be shared with any third parties. The phone numbers and consent collected for SMS messaging are
                used solely by Alfa Retailers to deliver the messages you have opted in to receive.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mt-4">
                SMS consent is collected via a standalone, unchecked checkbox on our contact form at{' '}
                <Link href="/contact" className="text-brand-blue underline hover:text-brand-blue/80">
                  https://www.alfaretailers.com/contact
                </Link>
                . Consent is never a condition of purchase and is never bundled with general Terms of Service acceptance.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mt-4">
                You may opt out of SMS messages at any time by replying <strong>STOP</strong> to any message we send.
                After opting out you will receive a single confirmation message and no further messages will be sent.
                Reply <strong>HELP</strong> for assistance or contact{' '}
                <a href="mailto:juanalcaraz@alfaretailers.com" className="text-brand-blue underline hover:text-brand-blue/80">
                  juanalcaraz@alfaretailers.com
                </a>
                .
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Eye className="h-8 w-8 text-brand-blue" />
                Information We Collect
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Information you provide directly</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Name, email address, phone number</li>
                    <li>• Property details and address</li>
                    <li>• Messages and inquiries submitted via our contact form</li>
                    <li>• SMS consent records (phone number, timestamp, IP address, page URL, and exact consent language)</li>
                    <li>• Financial information for payment processing</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically collected information</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• IP address and browser information</li>
                    <li>• Device and usage data</li>
                    <li>• Pages visited and time spent</li>
                    <li>• Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="h-8 w-8 text-brand-orange" />
                How We Use Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-lg p-6">
                  <h3 className="font-semibold text-brand-blue mb-3">Service Delivery</h3>
                  <p className="text-gray-600">
                    To provide property management services, handle bookings, manage guest communications, and optimize rental performance.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-700 mb-3">Communication</h3>
                  <p className="text-gray-600">
                    To respond to inquiries and — when you have opted in — to send SMS messages including consultation booking links,
                    appointment confirmations, missed-call follow-ups, and customer support updates.
                  </p>
                </div>
                <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-lg p-6">
                  <h3 className="font-semibold text-brand-orange mb-3">Analytics &amp; Improvement</h3>
                  <p className="text-gray-600">
                    To analyze usage patterns, improve our services, and enhance user experience.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-700 mb-3">Legal &amp; Security</h3>
                  <p className="text-gray-600">
                    To comply with legal obligations, prevent fraud, ensure security, and protect our rights.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Retention</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We retain personal data only for as long as necessary to fulfill the purposes described in this policy or as required by law.
                SMS consent logs are retained for a minimum of five (5) years to satisfy carrier and regulatory record-keeping requirements.
                You may request deletion of your personal information at any time by contacting us at{' '}
                <a href="mailto:juanalcaraz@alfaretailers.com" className="text-brand-blue underline hover:text-brand-blue/80">
                  juanalcaraz@alfaretailers.com
                </a>
                ; we will respond within 30 days.
              </p>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Information Sharing</h2>
              <p className="text-gray-600 mb-6 text-lg">
                We do <strong>not</strong> sell your personal information. We may share your information only in the following limited circumstances:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-brand-blue pl-6 py-3">
                  <h4 className="font-semibold text-gray-900 mb-2">Service Providers</h4>
                  <p className="text-gray-600">With trusted third-party providers who help us operate our business (e.g., payment processors, booking platforms, email delivery). These providers are contractually prohibited from using your data for any other purpose.</p>
                </div>
                <div className="border-l-4 border-green-400 pl-6 py-3">
                  <h4 className="font-semibold text-gray-900 mb-2">With Your Consent</h4>
                  <p className="text-gray-600">When you have explicitly authorized us to share specific information.</p>
                </div>
                <div className="border-l-4 border-brand-orange pl-6 py-3">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Requirements</h4>
                  <p className="text-gray-600">When required by law, court order, or to protect our rights, property, or safety.</p>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lock className="h-8 w-8 text-green-600" />
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                We implement appropriate technical and organizational measures — including SSL encryption, access controls, and regular security assessments —
                to protect your personal information from unauthorized access, disclosure, or loss.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                No system is completely secure. If you have reason to believe that your interaction with us is no longer secure,
                please notify us immediately at{' '}
                <a href="mailto:juanalcaraz@alfaretailers.com" className="text-brand-blue underline hover:text-brand-blue/80">
                  juanalcaraz@alfaretailers.com
                </a>
                .
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights</h2>
              <div className="bg-gray-50 rounded-lg p-8 space-y-4">
                <p className="text-gray-600 mb-4 text-lg">You have the right to:</p>
                <ul className="text-gray-600 space-y-3 text-lg">
                  <li>• <strong>Access</strong> — request a copy of the personal information we hold about you.</li>
                  <li>• <strong>Correction</strong> — request that we correct inaccurate information.</li>
                  <li>• <strong>Deletion</strong> — request that we delete your personal information (subject to legal retention obligations).</li>
                  <li>• <strong>Opt-out of SMS</strong> — reply STOP to any text message or email us at juanalcaraz@alfaretailers.com.</li>
                  <li>• <strong>Portability</strong> — request a machine-readable export of your data.</li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <div className="bg-gradient-to-r from-brand-blue to-brand-blue/90 rounded-2xl p-8 text-white">
                <p className="text-lg mb-6">
                  For any questions about this Privacy Policy or your personal information, contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:juanalcaraz@alfaretailers.com" className="text-blue-100 hover:text-white underline">
                        juanalcaraz@alfaretailers.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-blue-100">(210) 526-1401</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-400 text-blue-100 text-sm">
                  Alfa Retailers · 12370 Potranco Rd, Suite 207 · San Antonio, TX 78254<br />
                  We will respond to your inquiry within 30 days of receipt.
                </div>
              </div>
            </div>

            {/* Policy Updates */}
            <div className="border-t-2 border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will post the revised policy on this page and update the "Last updated" date.
                Material changes will be communicated through reasonable means. Continued use of our services after changes take effect constitutes acceptance.
              </p>
              <p className="mt-6 text-gray-500 text-sm">
                For our SMS-specific terms, see our{' '}
                <Link href="/sms-terms" className="text-brand-blue underline hover:text-brand-blue/80">
                  SMS Terms &amp; Conditions
                </Link>
                .
              </p>
            </div>

          </div>
        </section>
      </main>
    </div>
  )
}
