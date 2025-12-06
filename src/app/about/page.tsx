import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Users, TrendingUp, Award, Shield, Home, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                About Alfa Retailers
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're transforming the property management industry by helping owners convert stagnant long-term rentals into profitable short-term vacation rentals.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2020, Alfa Retailers emerged from a simple observation: countless property owners were struggling with vacant properties while the short-term rental market was booming.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our founders, experienced in both real estate and hospitality, saw an opportunity to bridge this gap. We developed a comprehensive management system that handles everything from property optimization to guest communication.
                </p>
                <p className="text-lg text-gray-600">
                  Today, we manage over 50 properties across major markets, helping property owners increase their income by an average of 40% while providing exceptional experiences for guests.
                </p>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-blue mb-2">50+</div>
                    <div className="text-gray-600">Properties Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-orange mb-2">$2M+</div>
                    <div className="text-gray-600">Owner Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-green mb-2">40%</div>
                    <div className="text-gray-600">Average Income Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-blue mb-2">98%</div>
                    <div className="text-gray-600">Guest Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Mission & Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're committed to maximizing property value while delivering exceptional guest experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="bg-brand-blue p-3 rounded-lg inline-block mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Maximize Returns
                </h3>
                <p className="text-gray-600">
                  We use data-driven strategies to optimize pricing and occupancy, ensuring our property owners achieve maximum returns on their investments.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="bg-brand-orange p-3 rounded-lg inline-block mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Exceptional Service
                </h3>
                <p className="text-gray-600">
                  From 24/7 guest support to professional cleaning services, we ensure every guest has an outstanding experience.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="bg-brand-green p-3 rounded-lg inline-block mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Trust & Transparency
                </h3>
                <p className="text-gray-600">
                  We believe in complete transparency with our clients, providing detailed reporting and monthly performance updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Expertise */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Alfa Retailers?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We combine local market expertise with cutting-edge technology to deliver superior results
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-blue p-2 rounded-lg mr-4">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Local Market Expertise
                    </h3>
                    <p className="text-gray-600">
                      Our team understands local regulations, market dynamics, and neighborhood trends to position your property for success.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-orange p-2 rounded-lg mr-4">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Professional Photography
                    </h3>
                    <p className="text-gray-600">
                      We invest in professional photography and compelling listings that attract high-quality guests and command premium rates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-green p-2 rounded-lg mr-4">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Dynamic Pricing
                    </h3>
                    <p className="text-gray-600">
                      Our algorithms adjust pricing based on demand, seasonality, and local events to maximize your occupancy and revenue.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-blue p-2 rounded-lg mr-4">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      24/7 Guest Support
                    </h3>
                    <p className="text-gray-600">
                      Our team provides round-the-clock support for guests, handling everything from check-in to emergency situations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-orange p-2 rounded-lg mr-4">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Comprehensive Insurance
                    </h3>
                    <p className="text-gray-600">
                      We maintain comprehensive insurance coverage to protect your property and provide peace of mind for both owners and guests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand-green p-2 rounded-lg mr-4">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Proven Track Record
                    </h3>
                    <p className="text-gray-600">
                      With over 50 properties under management and a 98% guest satisfaction rate, we have a proven track record of success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Leadership Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experienced professionals dedicated to your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                    alt="Sarah Johnson - CEO & Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sarah Johnson
                </h3>
                <p className="text-brand-orange font-medium mb-2">
                  CEO & Founder
                </p>
                <p className="text-gray-600 text-sm">
                  15+ years in real estate and hospitality management
                </p>
              </div>

              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                    alt="Michael Chen - Chief Operations Officer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Michael Chen
                </h3>
                <p className="text-brand-orange font-medium mb-2">
                  Chief Operations Officer
                </p>
                <p className="text-gray-600 text-sm">
                  Expert in scaling property management operations
                </p>
              </div>

              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                    alt="Emily Rodriguez - Head of Customer Success"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Emily Rodriguez
                </h3>
                <p className="text-brand-orange font-medium mb-2">
                  Head of Customer Success
                </p>
                <p className="text-gray-600 text-sm">
                  Dedicated to exceptional owner and guest experiences
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-blue/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Property?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the 50+ property owners who are already earning more with Alfa Retailers
            </p>
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-8 h-auto py-6"
              asChild
            >
              <Link href="/apply">
                Get Your Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}