import { FileText, BarChart3, Rocket, CheckCircle, Clock, Calendar, Shield, ArrowRight, Users, Home, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const processSteps = [
  {
    number: 1,
    icon: FileText,
    title: 'Apply',
    description: 'Submit your property details for a free evaluation',
    details: [
      'Simple online application',
      'Property information upload',
      'No obligation or commitment',
      'Response within 48 hours',
    ],
    color: 'bg-brand-blue',
    image: 'https://source.unsplash.com/featured/?property&house&800',
  },
  {
    number: 2,
    icon: BarChart3,
    title: 'Evaluate',
    description: 'We analyze your property\'s potential and create strategy',
    details: [
      'Market analysis and pricing strategy',
      'Income projection report',
      'Optimization recommendations',
      'Custom management plan',
    ],
    color: 'bg-brand-green',
    image: 'https://source.unsplash.com/featured/?analytics&business&800',
  },
  {
    number: 3,
    icon: Rocket,
    title: 'Launch',
    description: 'We list and manage your property on Airbnb and other platforms',
    details: [
      'Professional photography',
      'Listing creation and optimization',
      'Guest communication',
      'Cleaning and maintenance coordination',
    ],
    color: 'bg-brand-orange',
    image: 'https://source.unsplash.com/featured/?celebration&success&800',
  },
]

const services = [
  { icon: Camera,   title: 'Professional Photography',  description: 'High-quality photos and virtual tours to showcase your property\'s best features' },
  { icon: Home,     title: 'Property Optimization',     description: 'Expert recommendations to maximize appeal and rental value' },
  { icon: Users,    title: 'Guest Management',          description: '24/7 guest communication, check-in coordination, and support' },
  { icon: Shield,   title: 'Property Protection',       description: 'Comprehensive insurance and security measures for peace of mind' },
  { icon: Calendar, title: 'Booking Management',        description: 'Dynamic pricing, calendar management, and availability optimization' },
  { icon: Clock,    title: 'Maintenance Coordination',  description: 'Regular cleaning, repairs, and upkeep services' },
]

const included = [
  { category: 'Marketing & Listings', items: ['Professional photography and virtual tours', 'Optimized listings on Airbnb, VRBO, and more', 'Dynamic pricing strategy', 'Targeted marketing campaigns'] },
  { category: 'Guest Management',     items: ['24/7 guest communication and support', 'Seamless check-in and check-out process', 'Guest screening and verification', 'Review management and reputation building'] },
  { category: 'Property Management',  items: ['Professional cleaning between stays', 'Regular maintenance and repairs', 'Inventory management and restocking', 'Property inspections and quality control'] },
  { category: 'Financial Services',   items: ['Monthly financial reporting', 'Secure online payment processing', 'Tax documentation and assistance', 'Performance analytics and insights'] },
]

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">How It Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From stagnant listing to profitable short-term rental in 3 simple steps. Our comprehensive process ensures maximum returns with minimal hassle.
          </p>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{step.title}</h2>
                        <p className="text-lg text-gray-600">{step.description}</p>
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
                    <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold" asChild>
                      <Link href="/apply">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <img src={step.image} alt={step.title} className="w-full h-96 object-cover" />
                    </div>
                    <div className={`absolute -bottom-6 ${isEven ? 'left-6' : 'right-6'} bg-white rounded-xl p-4 shadow-lg max-w-xs`}>
                      <div className="flex items-center">
                        <div className={`${step.color} p-2 rounded-lg mr-3`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Step {step.number}</h3>
                          <p className="text-sm text-gray-600">{step.title}</p>
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

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Typical Timeline to Launch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">From application to first booking in just 3 weeks</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-brand-blue/20" />
            <div className="space-y-12">
              {[
                { n: '1', day: 'Day 1–2',   body: 'Application review and initial property assessment',         side: 'left'  },
                { n: '2', day: 'Day 3–7',   body: 'Detailed market analysis and income projection report',      side: 'right' },
                { n: '3', day: 'Day 8–14',  body: 'Property preparation, photography, and listing optimization', side: 'left'  },
                { n: '4', day: 'Day 15–21', body: 'Go live on all platforms and welcome your first guests',     side: 'right', color: 'bg-brand-green' },
              ].map(({ n, day, body, side, color = 'bg-brand-blue' }) => (
                <div key={n} className="flex items-center">
                  {side === 'left' ? (
                    <>
                      <div className="flex-1 text-right pr-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm inline-block text-left">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{day}</h3>
                          <p className="text-gray-600">{body}</p>
                        </div>
                      </div>
                      <div className={`${color} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold z-10`}>{n}</div>
                      <div className="flex-1 pl-8" />
                    </>
                  ) : (
                    <>
                      <div className="flex-1 pr-8" />
                      <div className={`${color} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold z-10`}>{n}</div>
                      <div className="flex-1 text-left pl-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm inline-block">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{day}</h3>
                          <p className="text-gray-600">{body}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Complete Service Package</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to succeed in the short-term rental market</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.title} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-brand-blue p-3 rounded-lg inline-block mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Included in Our Management Service</h2>
              <p className="text-xl text-gray-600">Comprehensive management designed to maximize your returns</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {included.map(({ category, items }) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-blue/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Maximize Your Property's Potential?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 50+ property owners who are already earning more with our expert management
          </p>
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-8 h-auto py-6" asChild>
            <Link href="/apply">
              Start Your Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      </main>
    </div>
  )
}
