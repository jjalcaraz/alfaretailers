'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, Home, BedDouble } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const propertyTypes = [
  { value: 'apartment', label: 'Apartment', basePrice: 120 },
  { value: 'house', label: 'House', basePrice: 200 },
  { value: 'condo', label: 'Condo', basePrice: 150 },
  { value: 'townhouse', label: 'Townhouse', basePrice: 180 },
  { value: 'villa', label: 'Villa', basePrice: 350 }
]

const cities = [
  { value: 'miami', label: 'Miami, FL', multiplier: 1.8 },
  { value: 'new-york', label: 'New York, NY', multiplier: 2.2 },
  { value: 'los-angeles', label: 'Los Angeles, CA', multiplier: 1.9 },
  { value: 'chicago', label: 'Chicago, IL', multiplier: 1.5 },
  { value: 'houston', label: 'Houston, TX', multiplier: 1.3 },
  { value: 'phoenix', label: 'Phoenix, AZ', multiplier: 1.4 },
  { value: 'philadelphia', label: 'Philadelphia, PA', multiplier: 1.4 },
  { value: 'san-antonio', label: 'San Antonio, TX', multiplier: 1.2 }
]

const amenities = [
  { id: 'pool', label: 'Pool', value: 30 },
  { id: 'wifi', label: 'High-Speed WiFi', value: 10 },
  { id: 'parking', label: 'Parking', value: 20 },
  { id: 'gym', label: 'Gym/Fitness', value: 15 },
  { id: 'workspace', label: 'Dedicated Workspace', value: 15 },
  { id: 'pet-friendly', label: 'Pet Friendly', value: 25 },
  { id: 'ac', label: 'Air Conditioning', value: 20 },
  { id: 'kitchen', label: 'Full Kitchen', value: 25 }
]

export function IncomeCalculator() {
  const [propertyType, setPropertyType] = useState('apartment')
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const [city, setCity] = useState('miami')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [isCalculated, setIsCalculated] = useState(false)

  const calculateIncome = () => {
    const baseProperty = propertyTypes.find(p => p.value === propertyType)
    const cityMultiplier = cities.find(c => c.value === city)?.multiplier || 1

    let dailyRate = baseProperty?.basePrice || 100
    dailyRate += (bedrooms - 1) * 30
    dailyRate += (bathrooms - 1) * 15

    selectedAmenities.forEach(amenityId => {
      const amenity = amenities.find(a => a.id === amenityId)
      dailyRate += amenity?.value || 0
    })

    dailyRate *= cityMultiplier

    const monthlyIncome = dailyRate * 25 * 0.75 // 25 days/month, 75% occupancy
    const longTermMonthly = (dailyRate * 30 * 0.6) / 3 // Typical long-term rate
    const increase = ((monthlyIncome - longTermMonthly) / longTermMonthly) * 100

    return {
      dailyRate: Math.round(dailyRate),
      monthlyIncome: Math.round(monthlyIncome),
      longTermMonthly: Math.round(longTermMonthly),
      increase: Math.round(increase),
      annualIncome: Math.round(monthlyIncome * 12)
    }
  }

  const handleCalculate = () => {
    setIsCalculated(true)
  }

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    )
  }

  const results = calculateIncome()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-brand-blue/10 p-3 rounded-full">
              <Calculator className="h-8 w-8 text-brand-blue" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Could You Earn?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get an instant estimate of your property's short-term rental income potential
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="space-y-6">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="inline h-4 w-4 mr-2" />
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
              >
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms and Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BedDouble className="inline h-4 w-4 mr-2" />
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Bedroom' : 'Bedrooms'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                >
                  {[1,1.5,2,2.5,3,3.5,4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Bathroom' : 'Bathrooms'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
              >
                {cities.map(c => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amenities (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {amenities.map(amenity => (
                  <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="w-4 h-4 text-brand-blue border-gray-300 rounded focus:ring-brand-blue"
                    />
                    <span className="text-sm text-gray-700">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <Button
              onClick={handleCalculate}
              size="lg"
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold"
            >
              Calculate My Earnings
            </Button>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-brand-blue/5 to-brand-orange/5 rounded-2xl p-8">
            {isCalculated ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Income Estimate
                </h3>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Daily Rate</div>
                    <div className="text-4xl font-bold text-brand-orange">
                      ${results.dailyRate}
                    </div>
                    <div className="text-sm text-gray-600">per night</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Short-term Monthly</div>
                    <div className="text-2xl font-bold text-brand-blue">
                      ${results.monthlyIncome}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Long-term Monthly</div>
                    <div className="text-2xl font-bold text-gray-700">
                      ${results.longTermMonthly}
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-700 mb-1">Potential Increase</div>
                      <div className="text-3xl font-bold text-green-600">
                        +{results.increase}%
                      </div>
                    </div>
                    <TrendingUp className="h-12 w-12 text-green-600" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Annual potential income: <span className="font-bold text-brand-blue">${results.annualIncome.toLocaleString()}</span>
                  </p>
                  <Button
                    size="lg"
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-8 group"
                    asChild
                  >
                    <Link href="/apply">
                      Get Detailed Analysis
                      <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to See Your Earnings?
                </h3>
                <p className="text-gray-600 mb-6">
                  Fill in your property details to get an instant income estimate
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}