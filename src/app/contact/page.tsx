import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/forms/contact-form'

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions about our property management services? We're here to help you maximize your property's potential.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ContactForm
                title="Send Us a Message"
                description="Fill out the form below and we'll get back to you within 24 hours."
                showPropertyFields={false}
              />

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Contact Information
                </h2>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="bg-brand-blue p-3 rounded-lg mr-4">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Phone
                        </h3>
                        <p className="text-gray-600 mb-1">
                          210-526-1401
                        </p>
                        <p className="text-sm text-gray-500">
                          Mon-Fri: 9AM-6PM EST
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="bg-brand-orange p-3 rounded-lg mr-4">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Email
                        </h3>
                        <p className="text-gray-600 mb-1">
                          info@alfaretailers.com
                        </p>
                        <p className="text-sm text-gray-500">
                          We respond within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="bg-brand-green p-3 rounded-lg mr-4">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Office
                        </h3>
                        <p className="text-gray-600">
                          Office<br />
                          12370 Potranco Rd, Suite 207<br />
                          San Antonio, TX 78254
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start">
                      <div className="bg-brand-blue p-3 rounded-lg mr-4">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Business Hours
                        </h3>
                        <p className="text-gray-600 mb-1">
                          Monday - Friday: 9:00 AM - 6:00 PM EST
                        </p>
                        <p className="text-gray-600 mb-1">
                          Saturday: 10:00 AM - 4:00 PM EST
                        </p>
                        <p className="text-gray-600">
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-12 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get a free, no-obligation analysis of your property's earning potential.
                  </p>
                  <Button
                    size="lg"
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-8"
                    asChild
                  >
                    <a href="/apply">
                      Get Free Analysis
                    </a>
                  </Button>
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
