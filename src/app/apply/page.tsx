'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Home, MapPin, DollarSign, FileText, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Calendar, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection, AnimatedItem } from '@/components/ui/animations'

interface FormData {
  // Step 1: Property Owner Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Step 2: Property Details
  propertyType: string
  address: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  squareFootage: number
  yearBuilt: number

  // Step 3: Current Situation
  currentlyListed: boolean
  listingDuration: string
  currentRent: number
  vacancyMonths: string
  reasonForVacancy: string

  // Step 4: Property Features
  furnished: boolean
  amenities: string[]
  propertyCondition: string
  photosAvailable: boolean
  accessNotes: string

  // Step 5: Goals & Expectations
  targetIncome: string
  timeline: string
  concerns: string[]
  additionalInfo: string
}

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 0,
    yearBuilt: new Date().getFullYear(),
    currentlyListed: false,
    listingDuration: '',
    currentRent: 0,
    vacancyMonths: '',
    reasonForVacancy: '',
    furnished: false,
    amenities: [],
    propertyCondition: '',
    photosAvailable: false,
    accessNotes: '',
    targetIncome: '',
    timeline: '',
    concerns: [],
    additionalInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const propertyTypes = [
    'Apartment', 'House', 'Condo', 'Townhouse', 'Villa', 'Studio', 'Loft', 'Other'
  ]

  const amenityOptions = [
    'Pool', 'Gym/Fitness', 'Parking', 'High-Speed WiFi', 'Air Conditioning',
    'Full Kitchen', 'Laundry', 'Balcony/Patio', 'Pet-Friendly', 'Smart TV',
    'Workspace', 'Security System', 'Elevator', 'Garden/Yard'
  ]

  const concernsOptions = [
    'Property Damage', 'Guest Vetting', 'Legal/Regulations', 'Time Commitment',
    'Pricing Strategy', 'Cleaning/Maintenance', 'Insurance', 'Taxes'
  ]

  const totalSteps = 5

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const toggleConcern = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <main>
          <section className="py-20 bg-gradient-to-br from-brand-green/5 to-brand-blue/5">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-brand-green p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  Application Submitted Successfully!
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Thank you for your interest in AlfaRetailers! We've received your application and our team will review it within 48 hours.
                </p>

                <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">What happens next?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-brand-blue p-2 rounded-lg mr-4">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Within 48 Hours</h3>
                        <p className="text-gray-600">Our team will review your property details and contact you to discuss your options.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-brand-orange p-2 rounded-lg mr-4">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Property Analysis</h3>
                        <p className="text-gray-600">We'll provide a detailed analysis of your property's short-term rental potential.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-brand-green p-2 rounded-lg mr-4">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Custom Strategy</h3>
                        <p className="text-gray-600">You'll receive a personalized management plan and income projection.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold px-8"
                    asChild
                  >
                    <a href="/">Return to Homepage</a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold px-8"
                    asChild
                  >
                    <a href="/contact">Contact Our Team</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <main>
        {/* Progress Bar */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-brand-blue">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-brand-blue h-2 rounded-full"
                initial={{ width: '20%' }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeIn" delay={0.2}>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Get Your Free Property Analysis
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Tell us about your property and we'll show you how much you could be earning with short-term rentals.
                </p>
              </div>
            </AnimatedSection>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Property Owner Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-brand-blue p-3 rounded-full mr-4">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Property Owner Information</h2>
                        <p className="text-gray-600">Let us know who you are</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Property Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-brand-orange p-3 rounded-full mr-4">
                        <Home className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
                        <p className="text-gray-600">Tell us about your property</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Property Type *
                          </label>
                          <select
                            required
                            value={formData.propertyType}
                            onChange={(e) => updateFormData('propertyType', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          >
                            <option value="">Select property type</option>
                            {propertyTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Year Built
                          </label>
                          <input
                            type="number"
                            value={formData.yearBuilt}
                            onChange={(e) => updateFormData('yearBuilt', parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => updateFormData('city', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.state}
                            onChange={(e) => updateFormData('state', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.zipCode}
                            onChange={(e) => updateFormData('zipCode', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bedrooms *
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.bedrooms}
                            onChange={(e) => updateFormData('bedrooms', parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bathrooms *
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            step="0.5"
                            value={formData.bathrooms}
                            onChange={(e) => updateFormData('bathrooms', parseFloat(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Square Footage
                          </label>
                          <input
                            type="number"
                            value={formData.squareFootage}
                            onChange={(e) => updateFormData('squareFootage', parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Current Situation */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-brand-green p-3 rounded-full mr-4">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Current Situation</h2>
                        <p className="text-gray-600">Help us understand your current rental situation</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Is your property currently listed for rent?
                        </label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={formData.currentlyListed === true}
                              onChange={() => updateFormData('currentlyListed', true)}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={formData.currentlyListed === false}
                              onChange={() => updateFormData('currentlyListed', false)}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>

                      {formData.currentlyListed && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            How long has it been listed?
                          </label>
                          <select
                            value={formData.listingDuration}
                            onChange={(e) => updateFormData('listingDuration', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          >
                            <option value="">Select duration</option>
                            <option value="0-30">Less than 1 month</option>
                            <option value="30-60">1-2 months</option>
                            <option value="60-90">2-3 months</option>
                            <option value="90+">More than 3 months</option>
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current monthly rent (if any)
                        </label>
                        <input
                          type="number"
                          value={formData.currentRent}
                          onChange={(e) => updateFormData('currentRent', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          How many months has the property been vacant in the last year?
                        </label>
                        <select
                          value={formData.vacancyMonths}
                          onChange={(e) => updateFormData('vacancyMonths', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        >
                          <option value="">Select vacancy period</option>
                          <option value="0">None - always occupied</option>
                          <option value="1-2">1-2 months</option>
                          <option value="3-6">3-6 months</option>
                          <option value="6+">More than 6 months</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Why do you think the property isn't renting?
                        </label>
                        <textarea
                          value={formData.reasonForVacancy}
                          onChange={(e) => updateFormData('reasonForVacancy', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          placeholder="Help us understand any challenges you're facing..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Property Features */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-brand-blue p-3 rounded-full mr-4">
                        <Home className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Property Features</h2>
                        <p className="text-gray-600">Tell us about your property's features and condition</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Is the property furnished?
                        </label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={formData.furnished === true}
                              onChange={() => updateFormData('furnished', true)}
                              className="mr-2"
                            />
                            Fully furnished
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={formData.furnished === false}
                              onChange={() => updateFormData('furnished', false)}
                              className="mr-2"
                            />
                            Unfurnished
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          What amenities does your property have? (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {amenityOptions.map(amenity => (
                            <label key={amenity} className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.amenities.includes(amenity)}
                                onChange={() => toggleAmenity(amenity)}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700">{amenity}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property condition
                        </label>
                        <select
                          value={formData.propertyCondition}
                          onChange={(e) => updateFormData('propertyCondition', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        >
                          <option value="">Select condition</option>
                          <option value="excellent">Excellent - like new</option>
                          <option value="good">Good - well maintained</option>
                          <option value="fair">Fair - some updates needed</option>
                          <option value="needs-renovation">Needs renovation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Do you have photos of the property?
                        </label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={formData.photosAvailable === true}
                              onChange={() => updateFormData('photosAvailable', true)}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={formData.photosAvailable === false}
                              onChange={() => updateFormData('photosAvailable', false)}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Access notes (special instructions for showing the property)
                        </label>
                        <textarea
                          value={formData.accessNotes}
                          onChange={(e) => updateFormData('accessNotes', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          placeholder="Any special access requirements or showing instructions..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Goals & Expectations */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-brand-orange p-3 rounded-full mr-4">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Goals & Expectations</h2>
                        <p className="text-gray-600">Help us understand what you're hoping to achieve</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What is your target monthly income?
                        </label>
                        <select
                          value={formData.targetIncome}
                          onChange={(e) => updateFormData('targetIncome', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        >
                          <option value="">Select target income</option>
                          <option value="2000-3000">$2,000 - $3,000</option>
                          <option value="3000-4000">$3,000 - $4,000</option>
                          <option value="4000-5000">$4,000 - $5,000</option>
                          <option value="5000-7000">$5,000 - $7,000</option>
                          <option value="7000+">$7,000+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          When would you like to start?
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => updateFormData('timeline', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                        >
                          <option value="">Select timeline</option>
                          <option value="immediately">Immediately</option>
                          <option value="2-weeks">Within 2 weeks</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="2-months">Within 2 months</option>
                          <option value="3-months">Within 3 months</option>
                          <option value="just-exploring">Just exploring options</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          What are your main concerns about short-term rentals? (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {concernsOptions.map(concern => (
                            <label key={concern} className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.concerns.includes(concern)}
                                onChange={() => toggleConcern(concern)}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700">{concern}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional information or questions
                        </label>
                        <textarea
                          value={formData.additionalInfo}
                          onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                          placeholder="Is there anything else you'd like us to know about your property or situation?"
                        />
                      </div>

                      <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-xl p-6">
                        <div className="flex items-start">
                          <AlertCircle className="h-6 w-6 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-brand-blue mb-2">What happens next?</h3>
                            <p className="text-sm text-gray-700">
                              After submitting your application, our team will review your property details and contact you within 48 hours with a personalized analysis and recommendations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <div className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </div>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}