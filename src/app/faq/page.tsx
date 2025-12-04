'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Home, DollarSign, Shield, Calendar, Users, FileText, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const faqCategories = [
  {
    id: 'process',
    name: 'Process & Onboarding',
    icon: Home,
    color: 'bg-brand-blue',
    questions: [
      {
        question: 'How do I get started with AlfaRetailers?',
        answer: 'Getting started is easy! Simply fill out our online application form with your property details. We\'ll review your information and provide a free, no-obligation analysis within 48 hours. If you decide to move forward, we\'ll handle everything from photography to listing creation.'
      },
      {
        question: 'What types of properties do you manage?',
        answer: 'We manage a wide variety of properties including apartments, houses, condos, townhouses, and villas. Ideally, your property should be in good condition, fully furnished, and located in a desirable area with strong short-term rental demand.'
      },
      {
        question: 'How long does the onboarding process take?',
        answer: 'Typically, the entire process from application to going live takes 15-21 days. This includes property analysis, professional photography, listing optimization, and platform setup. We\'ll provide you with a detailed timeline once we begin working together.'
      },
      {
        question: 'Do I need to be present during guest stays?',
        answer: 'No! That\'s one of the biggest benefits of our service. We handle everything including check-ins, guest communication, cleaning, and maintenance. Many of our property owners live out of state or even internationally.'
      }
    ]
  },
  {
    id: 'financial',
    name: 'Pricing & Revenue',
    icon: DollarSign,
    color: 'bg-brand-green',
    questions: [
      {
        question: 'How much does your management service cost?',
        answer: 'Our management fee is typically 20-25% of the rental revenue, which covers all our services including marketing, guest management, cleaning coordination, and 24/7 support. We believe in transparent pricing with no hidden fees.'
      },
      {
        question: 'How much more can I earn with short-term rentals?',
        answer: 'While results vary by property and location, our clients typically see a 30-50% increase in revenue compared to traditional long-term rentals. We\'ll provide you with a detailed income projection during the evaluation process.'
      },
      {
        question: 'How and when do I get paid?',
        answer: 'We provide monthly statements and process payments within 5 business days of month-end. You\'ll receive a detailed report showing all income, expenses, and your net earnings. Payments can be made via direct deposit or check.'
      },
      {
        question: 'What expenses am I responsible for?',
        answer: 'Property owners are typically responsible for utilities, property taxes, insurance, HOA fees, and major repairs/maintenance. We handle cleaning supplies, marketing costs, and day-to-day management expenses.'
      }
    ]
  },
  {
    id: 'property',
    name: 'Property Management',
    icon: Shield,
    color: 'bg-brand-orange',
    questions: [
      {
        question: 'How do you ensure my property is protected?',
        answer: 'We require all guests to complete our verification process, collect security deposits, and provide comprehensive insurance coverage. We also conduct regular property inspections and have a 24/7 emergency response team.'
      },
      {
        question: 'Who handles cleaning and maintenance?',
        answer: 'We coordinate professional cleaning between every guest stay and manage all maintenance requests. We work with trusted, insured vendors and provide you with detailed reports of all work performed.'
      },
      {
        question: 'How do you handle guest emergencies or issues?',
        answer: 'Our team provides 24/7 guest support and has established protocols for emergencies. We can handle everything from lockouts to maintenance issues, ensuring your property is always protected and guests are taken care of.'
      },
      {
        question: 'Will my property be available for personal use?',
        answer: 'Absolutely! Many of our owners use their properties for personal stays. We have a system for blocking dates and managing your personal reservations. Just let us know your preferred schedule, and we\'ll work around it.'
      }
    ]
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    icon: FileText,
    color: 'bg-brand-blue',
    questions: [
      {
        question: 'Are short-term rentals legal in my area?',
        answer: 'Regulations vary significantly by city and state. We stay current on all local regulations and ensure your property operates legally. We\'ll inform you of any specific requirements during the evaluation process.'
      },
      {
        question: 'What insurance coverage do I need?',
        answer: 'You\'ll need landlord insurance that covers short-term rentals. We can recommend providers and help ensure you have appropriate coverage. Additionally, our platform provides liability protection for bookings made through our system.'
      },
      {
        question: 'How do you handle taxes?',
        answer: 'We collect and remit applicable occupancy taxes where required and provide you with annual tax summaries for easy filing. However, you should consult with a tax professional for advice specific to your situation.'
      },
      {
        question: 'What happens if a guest causes damage?',
        answer: 'We collect security deposits and have a thorough screening process. In case of damage, we document everything, work with your insurance if needed, and handle the entire claims process for you.'
      }
    ]
  }
]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('process')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-blue/5 to-brand-orange/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-brand-blue/10 p-4 rounded-full">
                  <HelpCircle className="h-12 w-12 text-brand-blue" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about our property management service and how we help maximize your rental income.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Category Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Categories
                  </h3>
                  {faqCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          activeCategory === category.id
                            ? 'bg-brand-blue text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`${activeCategory === category.id ? 'bg-white/20' : category.color} p-2 rounded-lg mr-3`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Questions and Answers */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {faqCategories
                    .find((category) => category.id === activeCategory)
                    ?.questions.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(`${activeCategory}-${index}`)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 text-left">
                            {item.question}
                          </h3>
                          {expandedQuestion === `${activeCategory}-${index}` ? (
                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0 ml-4" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0 ml-4" />
                          )}
                        </button>
                        {expandedQuestion === `${activeCategory}-${index}` && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Help Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our team is here to help you understand how we can maximize your property's potential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-brand-blue p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Talk to Our Team
                </h3>
                <p className="text-gray-600 mb-4">
                  Schedule a free consultation to discuss your property and get personalized recommendations.
                </p>
                <Button
                  variant="outline"
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                  asChild
                >
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>

              <div className="text-center">
                <div className="bg-brand-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Property Analysis
                </h3>
                <p className="text-gray-600 mb-4">
                  Get a detailed analysis of your property's earning potential with no obligation.
                </p>
                <Button
                  variant="outline"
                  className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                  asChild
                >
                  <Link href="/apply">Free Analysis</Link>
                </Button>
              </div>

              <div className="text-center">
                <div className="bg-brand-green p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Download Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  Get our comprehensive guide to short-term rental success.
                </p>
                <Button
                  variant="outline"
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                >
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-brand-blue to-brand-blue/90 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Join 50+ property owners who are already earning more with AlfaRetailers. Get your free analysis today.
              </p>
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-8"
                asChild
              >
                <Link href="/apply">
                  Start Your Free Analysis
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}