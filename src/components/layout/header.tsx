'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone, Home, HelpCircle, Info, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Glassy midnight tint over hero; stays solid once scrolled
  const isOverlayMode = pathname === '/' && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
    { name: 'About', href: '/about', icon: Info },
    { name: 'FAQ', href: '/faq', icon: MessageCircle },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOverlayMode
          ? 'bg-gradient-to-r from-slate-950/85 via-slate-900/80 to-slate-950/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(15,23,42,0.35)]'
          : 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 shadow-[0_6px_24px_rgba(15,23,42,0.35)]'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white transition-colors">
              AlfaRetailers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isActive(item.href)
                    ? 'text-white bg-white/10 border-white/30 shadow-sm'
                    : 'text-slate-100/80 hover:text-white hover:bg-white/10 border-transparent'
                }`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              size="sm"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold shadow-[0_10px_25px_rgba(234,88,12,0.35)]"
              asChild
            >
              <Link href="/apply">
                Get Free Analysis
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white transition-colors hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 border-t border-slate-800 shadow-xl backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-3 text-base font-medium rounded-md transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-white/10 text-white border-l-4 border-white/30'
                      : 'text-slate-100/90 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-white/5">
                <Button
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold shadow-[0_10px_25px_rgba(234,88,12,0.35)]"
                  size="sm"
                  asChild
                >
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Free Analysis
                  </Link>
                </Button>
              </div>
              <div className="px-3 py-3 text-sm text-slate-200/80 border-t border-white/5">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-brand-orange" />
                  <span className="font-medium">Call: (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
