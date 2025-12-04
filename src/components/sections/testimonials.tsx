'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    propertyType: "2-bedroom condo in Miami",
    previousIncome: "$2,800/month",
    newIncome: "$4,200/month",
    increase: "+50%",
    content: "My condo was vacant for 73 days and I was losing thousands every month. Within 2 weeks of signing up with AlfaRetailers, I had my first booking at 50% higher than my previous long-term rent. They handle everything—I just receive the higher payments.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Robert Chen",
    propertyType: "3-bedroom house in Orlando",
    previousIncome: "$3,200/month",
    newIncome: "$5,100/month",
    increase: "+59%",
    content: "I was skeptical about short-term rentals, but the income projection they showed me was too good to ignore. They delivered exactly what they promised—59% more income and I don't have to deal with tenants, cleaning, or maintenance. Completely transformed my investment.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    propertyType: "1-bedroom apartment in Fort Lauderdale",
    previousIncome: "$1,900/month",
    newIncome: "$2,800/month",
    increase: "+47%",
    content: "As a first-time property owner, I was overwhelmed by the vacancy. AlfaRetailers made everything simple. The application was quick, they provided detailed income projections, and now my property earns 47% more while they manage all guest communications and operations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
]

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Property Owners Just Like You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join dozens of property owners who've transformed their vacant rentals into profitable short-term investments
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-brand-blue/5 to-brand-green/5 rounded-2xl p-8 md:p-12 relative">
            <Quote className="h-12 w-12 text-brand-orange/20 absolute top-8 left-8" />

            <div className="relative z-10">
              {/* Testimonial Content */}
              <blockquote className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial].propertyType}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/70 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Previous Income</div>
                  <div className="text-lg font-semibold text-gray-900 line-through">
                    {testimonials[currentTestimonial].previousIncome}
                  </div>
                </div>
                <div className="bg-white/70 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">New Income</div>
                  <div className="text-xl font-bold text-brand-green">
                    {testimonials[currentTestimonial].newIncome}
                  </div>
                </div>
                <div className="bg-brand-orange/10 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Increase</div>
                  <div className="text-xl font-bold text-brand-orange">
                    {testimonials[currentTestimonial].increase}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full p-2 h-10 w-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-brand-orange w-8' : 'bg-gray-300 w-2'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full p-2 h-10 w-10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-orange mb-2">50+</div>
            <div className="text-gray-600">Properties Managed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-blue mb-2">42%</div>
            <div className="text-gray-600">Average Income Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-green mb-2">14</div>
            <div className="text-gray-600">Days to First Booking</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm font-medium">No long-term contracts</span>
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Performance guarantee</span>
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm font-medium">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}