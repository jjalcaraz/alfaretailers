'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Home, HelpCircle, Info, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Enhanced glass effect with subtle animation
  const isOverlayMode = !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/how-it-works', icon: HelpCircle },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Resources', href: '/faq', icon: MessageCircle },
    { name: 'Contact', href: '/contact', icon: Phone },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isOverlayMode
          ? 'bg-gradient-to-r from-dark via-dark/98 to-dark backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-dark/100 backdrop-blur-lg border-b border-brand-orange/20 shadow-xl'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Enhanced Logo */}
          <Link href="/" className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-4 focus-visible:ring-offset-dark rounded-lg transition-all-smooth hover:scale-105 animate-slide-in-left gpu-accelerated">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange/20 to-brand-blue/20 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-dark/80 backdrop-blur-sm rounded-lg border border-brand-orange/30 p-2 shadow-lg">
                <img
                  src="/images/logo-alfa.png"
                  alt="Alfa Retailers"
                  className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 min-h-[48px] ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-brand-orange/20 to-brand-orange/10 border border-brand-orange/30 shadow-lg shadow-brand-orange/10'
                    : 'text-gray-100 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 drop-shadow-sm'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-dark`}
              >
                <item.icon className="h-4 w-4 mr-3 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative">
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform transition-transform duration-300 ${
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </span>
              </Link>
            ))}
          </div>

          {/* Enhanced CTA Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="hidden xl:flex items-center text-sm text-gray-300 mr-2">
              <Phone className="h-4 w-4 mr-2 text-brand-orange" />
              <span className="font-medium">(210) 526-1401</span>
            </div>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-brand-orange to-brand-orange-600 hover:from-brand-orange-600 hover:to-brand-orange text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-105 focus-visible:ring-4 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark min-h-[52px]"
              asChild
            >
              <Link href="/apply" className="focus-visible:outline-none flex items-center">
                Get Free Analysis
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-4 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-all duration-300 min-h-[48px] min-w-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-dark border border-white/20"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-dark/98 backdrop-blur-xl border-t border-brand-orange/20 shadow-2xl">
            <div className="px-4 pt-6 pb-8 space-y-2">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
                <div className="text-lg font-bold text-white">Menu</div>
                <div className="flex items-center text-sm text-gray-300">
                  <Phone className="h-4 w-4 mr-2 text-brand-orange" />
                  <span className="font-medium">(210) 526-1401</span>
                </div>
              </div>

              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-4 text-base font-semibold rounded-xl transition-all duration-300 min-h-[52px] ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-brand-orange/20 to-brand-orange/10 border-l-4 border-brand-orange shadow-lg'
                      : 'text-gray-100 hover:text-white hover:bg-white/5 border-l-4 border-transparent hover:border-brand-orange/50 drop-shadow-sm'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-dark`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <item.icon className="h-5 w-5 mr-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="flex-1">{item.name}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              ))}

              <div className="pt-6 mt-6 border-t border-gray-700">
                <Button
                  className="w-full bg-gradient-to-r from-brand-orange to-brand-orange-600 hover:from-brand-orange-600 hover:to-brand-orange text-white font-bold shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:shadow-xl min-h-[56px] text-lg focus-visible:ring-4 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                  size="lg"
                  asChild
                >
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)} className="focus-visible:outline-none flex items-center justify-center">
                    Get Free Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
