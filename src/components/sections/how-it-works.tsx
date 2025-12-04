'use client'

import { FileText, BarChart3, Rocket, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const steps = [
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
    color: "bg-brand-blue"
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
    color: "bg-brand-green"
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
    color: "bg-brand-orange"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From stagnant listing to profitable short-term rental in 3 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {/* Step Number & Icon */}
                <div className="flex flex-col items-center mb-6">
                  <div className={`${step.color} text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4`}>
                    {step.number}
                  </div>
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <Icon className="h-8 w-8 text-gray-700" />
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {step.description}
                </p>

                {/* Step Details */}
                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="flex items-center justify-center">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Typical Timeline to Launch
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-lg p-4 mb-3">
                <div className="text-2xl font-bold">Day 1-2</div>
              </div>
              <p className="text-sm text-gray-600">Application review</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-lg p-4 mb-3">
                <div className="text-2xl font-bold">Day 3-7</div>
              </div>
              <p className="text-sm text-gray-600">Property analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-blue text-white rounded-lg p-4 mb-3">
                <div className="text-2xl font-bold">Day 8-14</div>
              </div>
              <p className="text-sm text-gray-600">Setup & preparation</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-green text-white rounded-lg p-4 mb-3">
                <div className="text-2xl font-bold">Day 15-21</div>
              </div>
              <p className="text-sm text-gray-600">Go live & earn</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Maximize Your Property's Potential?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 50+ property owners who are already earning more with our expert management
          </p>
          <Button
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-8 py-6 h-auto group"
            asChild
          >
            <Link href="/apply">
              Start Your Free Analysis
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}