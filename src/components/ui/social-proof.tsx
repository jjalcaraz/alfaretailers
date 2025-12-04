'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Clock, CheckCircle } from 'lucide-react'

interface SocialProofData {
  activeAnalysis: number
  recentApplications: number
  currentSavings: string
  updateTime: string
}

export function SocialProof() {
  const [data, setData] = useState<SocialProofData>({
    activeAnalysis: 12,
    recentApplications: 8,
    currentSavings: "$127,450",
    updateTime: "Just now"
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        activeAnalysis: Math.max(8, Math.floor(Math.random() * 15) + 5),
        recentApplications: Math.max(5, Math.floor(Math.random() * 12) + 3),
        currentSavings: `$${(Math.floor(Math.random() * 50000) + 100000).toLocaleString()}`,
        updateTime: Math.random() > 0.5 ? "Just now" : `${Math.floor(Math.random() * 5) + 1} min ago`
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-brand-blue/5 to-brand-green/5 border border-brand-blue/20 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Section - Activity */}
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Users className="h-4 w-4 text-brand-blue ml-3" />
            </div>
            <div className="ml-2">
              <div className="text-sm font-semibold text-gray-900">
                {data.activeAnalysis} owners analyzing
              </div>
              <div className="text-xs text-gray-600">
                {data.recentApplications} applied today
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Savings */}
        <div className="hidden sm:flex items-center gap-2 px-4 border-l border-r border-gray-200">
          <TrendingUp className="h-4 w-4 text-brand-green" />
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {data.currentSavings} saved this month
            </div>
            <div className="text-xs text-gray-600">by our clients</div>
          </div>
        </div>

        {/* Right Section - Trust */}
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-brand-orange" />
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">98%</span> satisfaction rate
          </div>
          <div className="text-xs text-gray-500 ml-2 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {data.updateTime}
          </div>
        </div>
      </div>
    </div>
  )
}