import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FileText, BarChart3, Rocket, CheckCircle, Clock, Calendar, Shield, ArrowRight, Users, Home, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const processSteps = [
  {
    number: 1,
    icon: FileText,
    title: "Apply",
    description: "Submit your property details for a free evaluation",
    details: [
      "Simple online application",
      "Property information upload",
      "No obligation or commitment",
      "Response within 48 hours"
    ],
    color: "bg-brand-blue",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    number: 2,
    icon: BarChart3,
    title: "Evaluate",
    description: "We analyze your property's potential and create strategy",
    details: [
      "Market analysis and pricing strategy",
      "Income projection report",
      "Optimization recommendations",
      "Custom management plan"
    ],
    color: "bg-brand-green",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    number: 3,
    icon: Rocket,
    title: "Launch",
    description: "We list and manage your property on Airbnb and other platforms",
    details: [
      "Professional photography",
      "Listing creation and optimization",
      "Guest communication",
      "Cleaning and maintenance coordination"
    ],
    color: "bg-brand-orange",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
]

const services = [
  {
    icon: Camera,
    title: "Professional Photography",
    description: "High-quality photos and virtual tours to showcase your property's best features"
  },
  {
    icon: Home,
    title: "Property Optimization",
    description: "Expert recommendations to maximize appeal and rental value"
  },
  {
    icon: Users,
    title: "Guest Management",
    description: "24/7 guest communication, check-in coordination, and support"
  },
  {
    icon: Shield,
    title: "Property Protection",
    description: "Comprehensive insurance and security measures for peace of mind"
  },
  {
    icon: Calendar,
    title: "Booking Management",
    description: "Dynamic pricing, calendar management, and availability optimization"
  },
  {
    icon: Clock,
    title: "Maintenance Coordination",
    description: "Regular cleaning, repairs, and upkeep services"
  }
]

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                How It Works
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From stagnant listing to profitable short-term rental in 3 simple steps. Our comprehensive process ensures maximum returns with minimal hassle.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                const isEven = index % 2 === 1

                return (
                  <div key={step.number} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <div>
                      <div className="flex items-center mb-6">
                        <div className={`${step.color} text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4`}>
                          {step.number}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {step.title}
                          </h2>
                          <p className="text-lg text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        size="lg"
                        className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold"
                        asChild
                      >
                        <Link href="/apply">
                          Get Started
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-96 object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-6 ${isEven ? 'left-6' : 'right-6'} bg-white rounded-xl p-4 shadow-lg max-w-xs`}>
                        <div className="flex items-center">
                          <div className={`${step.color} p-2 rounded-lg mr-3`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Step {step.number}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {step.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Typical Timeline to Launch
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From application to first booking in just 3 weeks
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-brand-blue/20"></div>

              <div className="space-y-12">
                <div className="flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm inline-block text-left">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Day 1-2
                      </h3>
                      <p className="text-gray-600">
                        Application review and initial property assessment
                      </p>
                    </div>
                  </div>
                  <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center font-bold z-10">
                    1
                  </div>
                  <div className="flex-1 pl-8"></div>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center font-bold z-10">
                    2
                  </div>
                  <div className="flex-1 text-left pl-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm inline-block">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Day 3-7
                      </h3>
                      <p className="text-gray-600">
                        Detailed market analysis and income projection report
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm inline-block text-left">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Day 8-14
                      </h3>
                      <p className="text-gray-600">
                        Property preparation, photography, and listing optimization
                      </p>
                    </div>
                  </div>
                  <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center font-bold z-10">
                    3
                  </div>
                  <div className="flex-1 pl-8"></div>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center font-bold z-10">
                    4
                  </div>
                  <div className="flex-1 text-left pl-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm inline-block">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Day 15-21
                      </h3>
                      <p className="text-gray-600">
                        Go live on all platforms and welcome your first guests
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Complete Service Package
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to succeed in the short-term rental market
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="bg-brand-blue p-3 rounded-lg inline-block mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-12 shadow-lg">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  What's Included in Our Management Service
                </h2>
                <p className="text-xl text-gray-600">
                  Comprehensive management designed to maximize your returns
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Marketing & Listings
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Professional photography and virtual tours</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Optimized listings on Airbnb, VRBO, and more</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Dynamic pricing strategy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Targeted marketing campaigns</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Guest Management
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">24/7 guest communication and support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Seamless check-in and check-out process</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Guest screening and verification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Review management and reputation building</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Property Management
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Professional cleaning between stays</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Regular maintenance and repairs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Inventory management and restocking</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Property inspections and quality control</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Financial Services
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Monthly financial reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Secure online payment processing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Tax documentation and assistance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Performance analytics and insights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-blue/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Maximize Your Property's Potential?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 50+ property owners who are already earning more with our expert management
            </p>
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-8 h-auto py-6"
              asChild
            >
              <Link href="/apply">
                Start Your Free Analysis
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