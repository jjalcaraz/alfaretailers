'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Loader2, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  propertyType: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  address: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  className?: string
  showPropertyFields?: boolean
  title?: string
  description?: string
}

export function ContactForm({
  className,
  showPropertyFields = false,
  title = "Get in Touch",
  description = "Have questions about our property management services? We're here to help!"
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setSubmitMessage(result.message)
        reset()
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "bg-green-50 border border-green-200 rounded-xl p-8 text-center",
          className
        )}
      >
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          Thank You for Your Inquiry!
        </h3>
        <p className="text-green-700 mb-4">
          {submitMessage}
        </p>
        <p className="text-green-600 text-sm">
          We'll get back to you within 24 hours.
        </p>
        <Button
          onClick={() => {
            setSubmitStatus('idle')
            setSubmitMessage('')
          }}
          variant="outline"
          className="mt-4 border-green-300 text-green-700 hover:bg-green-50"
        >
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <div className={cn("bg-white rounded-xl shadow-lg p-8", className)}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

  
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              {...register('name')}
              type="text"
              className={cn(
                "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors",
                errors.name ? "border-red-300" : "border-gray-300"
              )}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              className={cn(
                "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors",
                errors.email ? "border-red-300" : "border-gray-300"
              )}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors"
            placeholder="(210) 555-0123"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {showPropertyFields && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                {...register('propertyType')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors"
              >
                <option value="">Select type</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Villa">Villa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                {...register('bedrooms')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors"
              >
                <option value="">Select</option>
                <option value="Studio">Studio</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>
            </div>

            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <select
                {...register('bathrooms')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors"
              >
                <option value="">Select</option>
                <option value="1">1 Bathroom</option>
                <option value="2">2 Bathrooms</option>
                <option value="3">3 Bathrooms</option>
                <option value="4">4 Bathrooms</option>
                <option value="5+">5+ Bathrooms</option>
              </select>
            </div>
          </div>
        )}

        {showPropertyFields && (
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Property Address
            </label>
            <input
              {...register('address')}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors"
              placeholder="123 Main St, San Antonio, TX 78201"
            />
          </div>
        )}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            {...register('message')}
            rows={5}
            className={cn(
              "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-colors resize-none",
              errors.message ? "border-red-300" : "border-gray-300"
            )}
            placeholder="Tell us about your property and how we can help..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{submitMessage}</p>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-4 px-6 h-auto text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </>
            )}
          </Button>
        </motion.div>

        <p className="text-center text-sm text-gray-500">
          We respect your privacy and never share your information.
        </p>
      </form>
    </div>
  )
}