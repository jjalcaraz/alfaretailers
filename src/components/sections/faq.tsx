'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, DollarSign, Home, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const faqCategories = [
  {
    id: 'process',
    title: 'Process & Onboarding',
    icon: Home,
    color: 'bg-brand-blue',
    questions: [
      {
        q: 'How long does the onboarding process take?',
        a: 'Typically 2-3 weeks from application to going live. This includes property analysis, setup preparation, and launch on rental platforms.'
      },
      {
        q: 'What documents do I need to provide?',
        a: 'Basic property documents: proof of ownership, property photos, any existing rental agreements, and local regulations or HOA requirements.'
      },
      {
        q: 'Do I need to prepare my property before listing?',
        a: 'We provide a comprehensive preparation checklist. Most properties need basic cleaning and minor staging, which we can help coordinate.'
      },
      {
        q: 'Can I still use my property occasionally?',
        a: 'Yes! We offer flexible management plans that can accommodate owner stays with advance notice.'
      }
    ]
  },
  {
    id: 'fees',
    title: 'Fees & Pricing',
    icon: DollarSign,
    color: 'bg-brand-green',
    questions: [
      {
        q: 'How much does Alfa Retailers charge?',
        a: 'We work on a commission basis, typically 20-25% of rental income. No upfront fees or hidden charges.'
      },
      {
        q: 'Are there any setup costs?',
        a: 'No setup costs for most properties. Professional photography and basic staging are included in our service.'
      },
      {
        q: 'Who pays for cleaning and maintenance?',
        a: 'Cleaning costs are covered by guests. Maintenance costs are discussed on a case-by-case basis and can be deducted from rental income.'
      },
      {
        q: 'When do I get paid?',
        a: 'You receive monthly statements and payments within 7 days after month-end. All transactions are fully transparent.'
      }
    ]
  },
  {
    id: 'management',
    title: 'Management Services',
    icon: Shield,
    color: 'bg-brand-orange',
    questions: [
      {
        q: 'What do you actually manage?',
        a: 'Everything: listing creation, guest communication, booking management, cleaning coordination, maintenance handling, and performance reporting.'
      },
      {
        q: 'How do you handle difficult guests?',
        a: 'We have extensive experience with guest screening and management. We handle all communication professionally and follow platform guidelines.'
      },
      {
        q: 'Do you manage multiple platforms?',
        a: 'Yes! We list your property on Airbnb, VRBO, Booking.com, and other relevant platforms to maximize occupancy.'
      },
      {
        q: 'How do you handle emergencies?',
        a: 'We provide 24/7 support for emergencies and have a network of trusted local service providers.'
      }
    ]
  },
  {
    id: 'timeline',
    title: 'Timeline & Results',
    icon: Clock,
    color: 'bg-purple-600',
    questions: [
      {
        q: 'When will I see results?',
        a: 'Most properties start receiving bookings within the first week. Full occupancy typically achieved within 30-60 days depending on season and location.'
      },
      {
        q: 'Can you guarantee income results?',
        a: 'While we can\'t guarantee exact results, we provide realistic projections based on market data and our track record shows 40% average income increase.'
      },
      {
        q: 'How do you optimize pricing?',
        a: 'We use dynamic pricing algorithms that adjust rates based on demand, season, local events, and competitor analysis.'
      },
      {
        q: 'What if I want to cancel the service?',
        a: 'We offer flexible month-to-month agreements with 30-day notice period. No long-term commitments.'
      }
    ]
  }
]

export function FAQ() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openQuestions, setOpenQuestions] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId)
  }

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-brand-blue/10 p-3 rounded-full">
              <HelpCircle className="h-8 w-8 text-brand-blue" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our property management service
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {faqCategories.map((category) => {
            const Icon = category.icon
            const isOpen = openCategory === category.id

            return (
              <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`${category.color} p-2 rounded-lg mr-4`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {/* Category Questions */}
                {isOpen && (
                  <div className="border-t border-gray-200">
                    {category.questions.map((faq, index) => {
                      const questionId = `${category.id}-${index}`
                      const isQuestionOpen = openQuestions.includes(questionId)

                      return (
                        <div key={questionId} className="border-b border-gray-100 last:border-b-0">
                          <button
                            onClick={() => toggleQuestion(questionId)}
                            className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{faq.q}</h4>
                              {isQuestionOpen ? (
                                <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                          {isQuestionOpen && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still Have Questions Section */}
        <div className="bg-gradient-to-r from-brand-blue to-brand-orange rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Still Have Questions?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our property experts are here to help. Get personalized answers and a free income analysis for your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-brand-blue hover:bg-gray-100 font-semibold shadow-[0_10px_25px_rgba(255,255,255,0.35)]"
              asChild
            >
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-brand-blue hover:bg-gray-100 font-semibold"
              asChild
            >
              <Link href="/apply">
                Get Free Analysis
              </Link>
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center text-sm text-gray-600 mb-4">
            <Shield className="h-4 w-4 mr-2 text-brand-blue" />
            Trusted by 50+ property owners nationwide
          </div>
          <div className="flex justify-center items-center space-x-8 text-xs text-gray-500">
            <span>✓ No hidden fees</span>
            <span>✓ 30-day satisfaction guarantee</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}