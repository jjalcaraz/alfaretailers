'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Star, CheckCircle, TrendingUp, Users, Home, ThumbsUp } from 'lucide-react'

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for your peace of mind",
      color: "brand-blue"
    },
    {
      icon: Award,
      title: "Award Winning Service",
      description: "Recognized as the best property management service",
      color: "brand-orange"
    },
    {
      icon: Users,
      title: "500+ Happy Clients",
      description: "Trusted by hundreds of property owners",
      color: "brand-green"
    },
    {
      icon: TrendingUp,
      title: "42% Average Increase",
      description: "Average income boost for our clients",
      color: "brand-blue"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Austin, TX",
      rating: 5,
      comment: "Alfa Retailers transformed my vacant property into a $5,000/month goldmine. Completely hands-off!",
      result: "$5,200/month income"
    },
    {
      name: "Michael Chen",
      location: "San Antonio, TX",
      rating: 5,
      comment: "I was skeptical at first, but the results speak for themselves. 45% increase in revenue!",
      result: "45% revenue increase"
    },
    {
      name: "Emily Rodriguez",
      location: "Houston, TX",
      rating: 5,
      comment: "Professional team, excellent communication, and outstanding results. Highly recommend!",
      result: "$3,800/month income"
    }
  ]

  const stats = [
    { number: "500+", label: "Properties Managed", icon: Home },
    { number: "98%", label: "Client Satisfaction", icon: ThumbsUp },
    { number: "42%", label: "Average Income Boost", icon: TrendingUp },
    { number: "24/7", label: "Guest Support", icon: CheckCircle }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-light to-light-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Trust Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-center mb-4 font-display">
            Why <span className="text-brand-orange">Property Owners Trust</span> Alfa Retailers
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We're not just another property management company. We're your partners in maximizing your investment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-brand-${badge.color}/20`}>
                  <div className={`w-16 h-16 bg-brand-${badge.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <badge.icon className={`h-8 w-8 text-brand-${badge.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{badge.title}</h3>
                  <p className="text-gray-600">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-brand-orange to-brand-blue rounded-3xl p-8 lg:p-12 text-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                  <div className="text-3xl lg:text-4xl font-black mb-2 font-display">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base opacity-90">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-black text-center mb-12 font-display">
            What Our <span className="text-brand-orange">Clients Say</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                  {/* Rating Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{testimonial.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-brand-orange">{testimonial.result}</div>
                    </div>
                  </div>

                  {/* Background decoration */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-orange/5 rounded-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Seals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-semibold">BBB Accredited</span>
              </div>
              <div className="text-gray-300">•</div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">SSL Secured</span>
              </div>
              <div className="text-gray-300">•</div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-purple-500" />
                <span className="font-semibold">Top Rated</span>
              </div>
              <div className="text-gray-300">•</div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-500" />
                <span className="font-semibold">500+ Reviews</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}