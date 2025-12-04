'use client'

import { useState } from 'react'
import { ArrowRight, Home, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful modern property with stunning views"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Your Property's Been
          <span className="block text-brand-orange"> Sitting Empty?</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform your stagnant long-term rental into a profitable short-term rental.
          We manage everything from listings to check-ins.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-lg px-8 py-6 h-auto group"
            asChild
          >
            <Link href="/apply">
              Get Your Free Rental Analysis
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-gray-900 font-semibold text-lg px-8 py-6 h-auto"
            asChild
          >
            <Link href="/how-it-works">
              See How It Works
            </Link>
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
              <Home className="h-8 w-8 text-brand-orange" />
            </div>
            <div className="text-3xl font-bold">50+</div>
            <div className="text-sm text-white/80">Properties Managed</div>
          </div>

          <div className="flex flex-col items-center text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
              <TrendingUp className="h-8 w-8 text-brand-orange" />
            </div>
            <div className="text-3xl font-bold">$2M+</div>
            <div className="text-sm text-white/80">Owner Earnings</div>
          </div>

          <div className="flex flex-col items-center text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3">
              <Shield className="h-8 w-8 text-brand-orange" />
            </div>
            <div className="text-3xl font-bold">40%</div>
            <div className="text-sm text-white/80">Average Income Increase</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}