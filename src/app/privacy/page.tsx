import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Shield, Eye, Lock, Mail, Phone, FileText } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Alfa Retailers',
  description: 'Alfa Retailers Privacy Policy - Learn how we collect, use, and protect your personal information. Your privacy is our priority.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-brand-orange/10 p-4 rounded-full">
                <Shield className="h-12 w-12 text-brand-orange" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-center text-slate-300 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="text-center mt-8 text-sm text-slate-400">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-slate max-w-none">
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Welcome to Alfa Retailers. We respect your privacy and are committed to protecting your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                  visit our website, use our services, or interact with us in other ways.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg mt-4">
                  By using Alfa Retailers' services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Eye className="h-8 w-8 mr-3 text-brand-blue" />
                  Information We Collect
                </h2>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Name, email address, phone number</li>
                      <li>• Property details and address</li>
                      <li>• Financial information for payment processing</li>
                      <li>• Communication preferences</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• IP address and browser information</li>
                      <li>• Device and usage data</li>
                      <li>• Pages visited and time spent</li>
                      <li>• Cookies and tracking technologies</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Property Information</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Property address and details</li>
                      <li>• Property photos and videos</li>
                      <li>• Rental history and performance data</li>
                      <li>• Guest reviews and feedback</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-8 w-8 mr-3 text-brand-orange" />
                  How We Use Your Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-lg p-6">
                    <h3 className="font-semibold text-brand-blue mb-3">Service Delivery</h3>
                    <p className="text-gray-600">
                      To provide property management services, handle bookings, manage guest communications, and optimize rental performance.
                    </p>
                  </div>

                  <div className="bg-brand-green/5 border border-brand-green/20 rounded-lg p-6">
                    <h3 className="font-semibold text-brand-green mb-3">Communication</h3>
                    <p className="text-gray-600">
                      To respond to inquiries, send updates, provide customer support, and send important service notifications.
                    </p>
                  </div>

                  <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-lg p-6">
                    <h3 className="font-semibold text-brand-orange mb-3">Analytics & Improvement</h3>
                    <p className="text-gray-600">
                      To analyze usage patterns, improve our services, develop new features, and enhance user experience.
                    </p>
                  </div>

                  <div className="bg-purple-100 border border-purple-200 rounded-lg p-6">
                    <h3 className="font-semibold text-purple-700 mb-3">Legal & Security</h3>
                    <p className="text-gray-600">
                      To comply with legal obligations, prevent fraud, ensure security, and protect our rights and property.
                    </p>
                  </div>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Information Sharing</h2>

                <p className="text-gray-600 mb-6">
                  We may share your information in the following circumstances:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-brand-blue pl-6 py-3">
                    <h4 className="font-semibold text-gray-900 mb-2">With Your Consent</h4>
                    <p className="text-gray-600">When you explicitly authorize us to share specific information.</p>
                  </div>

                  <div className="border-l-4 border-brand-green pl-6 py-3">
                    <h4 className="font-semibold text-gray-900 mb-2">Service Providers</h4>
                    <p className="text-gray-600">With trusted third-party service providers who help us operate our business (payment processors, booking platforms, etc.).</p>
                  </div>

                  <div className="border-l-4 border-brand-orange pl-6 py-3">
                    <h4 className="font-semibold text-gray-900 mb-2">Legal Requirements</h4>
                    <p className="text-gray-600">When required by law, court order, or to protect our rights, property, or safety.</p>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6 py-3">
                    <h4 className="font-semibold text-gray-900 mb-2">Business Transfers</h4>
                    <p className="text-gray-600">In connection with mergers, acquisitions, or sales of business assets.</p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Lock className="h-8 w-8 mr-3 text-brand-green" />
                  Data Security
                </h2>

                <p className="text-gray-600 mb-6">
                  We implement appropriate technical and organizational measures to protect your personal information:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg mt-1">
                      <Lock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Encryption</h4>
                      <p className="text-gray-600">SSL encryption for data transmission and storage</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg mt-1">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Access Controls</h4>
                      <p className="text-gray-600">Restricted access to authorized personnel only</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg mt-1">
                      <Eye className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Regular Audits</h4>
                      <p className="text-gray-600">Periodic security assessments and updates</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg mt-1">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Compliance</h4>
                      <p className="text-gray-600">GDPR and data protection regulation compliance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights</h2>

                <div className="bg-gray-50 rounded-lg p-8">
                  <p className="text-gray-600 mb-6">
                    You have the following rights regarding your personal information:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg mt-1">
                        <Eye className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Access & Review</h4>
                        <p className="text-gray-600">Request access to and review your personal information</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg mt-1">
                        <Lock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Correction</h4>
                        <p className="text-gray-600">Request correction of inaccurate personal information</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg mt-1">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Deletion</h4>
                        <p className="text-gray-600">Request deletion of your personal information</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg mt-1">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Portability</h4>
                        <p className="text-gray-600">Request transfer of your data to another service</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>

                <div className="bg-gradient-to-r from-brand-blue to-brand-blue/90 rounded-2xl p-8 text-white">
                  <p className="text-lg mb-6">
                    If you have any questions about this Privacy Policy or how we handle your personal information,
                    please don't hesitate to contact us:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-blue-100">privacy@alfaretailers.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-blue-100">210-526-1401</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-blue-400">
                    <p className="text-blue-100 text-sm">
                      We will respond to your inquiry within 30 days of receipt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="border-t-2 border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time to reflect changes in our practices,
                  technology, or legal requirements. We will notify you of any material changes by posting
                  the updated policy on our website and updating the "Last updated" date.
                </p>
                <p className="text-gray-600 mt-4">
                  Your continued use of our services after any changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}