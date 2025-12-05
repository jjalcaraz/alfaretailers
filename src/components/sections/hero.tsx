'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Home, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AnimatedSection, AnimatedContainer, AnimatedItem } from '@/components/ui/animations'

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <AnimatedSection animation="slideUp" delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Stop Losing Money on
            <span className="block text-brand-orange"> Empty Properties</span>
          </h1>
        </AnimatedSection>

        {/* Subheadline */}
        <AnimatedSection animation="slideUp" delay={0.4}>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            The average vacant long-term rental costs owners <span className="font-bold text-brand-orange">$3,200+ per month</span> in lost revenue.
            We convert your stagnant property into a high-income short-term rental—<span className="font-semibold underline decoration-2 decoration-brand-orange/50">completely managed</span>.
          </p>
        </AnimatedSection>

        {/* Value Proposition */}
        <AnimatedSection animation="slideUp" delay={0.5}>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="font-medium">40% More Income</span>
              </div>
              <div className="hidden sm:block text-white/60">•</div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="font-medium">Zero Management Hassle</span>
              </div>
              <div className="hidden sm:block text-white/60">•</div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="font-medium">Proven Results</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Buttons */}
        <AnimatedSection animation="slideUp" delay={0.6}>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-lg px-8 py-6 h-auto group shadow-xl"
                asChild
              >
                <Link href="/apply">
                  Calculate Your Potential Income
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-lg px-8 py-6 h-auto group shadow-xl"
                asChild
              >
                <Link href="/how-it-works">
                  See How It Works
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-brand-green hover:bg-brand-green/90 text-white font-semibold text-lg px-8 py-6 h-auto group shadow-xl"
                asChild
              >
                <Link href="/contact">
                  Contact Our Team
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Trust Badges */}
        <AnimatedContainer>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <AnimatedItem>
              <div className="flex flex-col items-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                  className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3"
                >
                  <Home className="h-8 w-8 text-brand-orange" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-3xl font-bold"
                >
                  50+
                </motion.div>
                <div className="text-sm text-white/80">Properties Under Management</div>
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <div className="flex flex-col items-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3"
                >
                  <TrendingUp className="h-8 w-8 text-brand-orange" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-3xl font-bold"
                >
                  $2.4M+
                </motion.div>
                <div className="text-sm text-white/80">Additional Owner Revenue</div>
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <div className="flex flex-col items-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                  className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3"
                >
                  <Shield className="h-8 w-8 text-brand-orange" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="text-3xl font-bold"
                >
                  42%
                </motion.div>
                <div className="text-sm text-white/80">Average Monthly Income Increase</div>
              </div>
            </AnimatedItem>
          </div>
        </AnimatedContainer>

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
