import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Shield, TrendingUp, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-dark via-dark to-dark-light text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Top Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-brand-orange via-brand-blue to-brand-green"></div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Company Info - 4 columns */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <h3 className="text-4xl font-bold text-white mb-6 tracking-tight">
                Alfa Retailers
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                Transform your stagnant long-term rental into a profitable short-term rental.
                We manage everything from listings to check-ins, maximizing your investment potential.
              </p>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center bg-gradient-to-r from-brand-green/10 to-transparent p-3 rounded-lg border border-brand-green/20">
                <div className="w-3 h-3 bg-brand-green rounded-full mr-3 animate-pulse"></div>
                <span className="text-white font-semibold">98% Client Satisfaction</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-brand-blue/10 to-transparent p-3 rounded-lg border border-brand-blue/20">
                <Shield className="h-5 w-5 mr-3 text-brand-blue" />
                <span className="text-white font-semibold">Licensed & Fully Insured</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-brand-orange/10 to-transparent p-3 rounded-lg border border-brand-orange/20">
                <TrendingUp className="h-5 w-5 mr-3 text-brand-orange" />
                <span className="text-white font-semibold">42% Average Income Increase</span>
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm font-medium">Follow Us:</span>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/AlfaRetailersLLC"
                  className="group relative w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-4 focus:ring-offset-dark border border-white/10"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
                <a
                  href="https://twitter.com"
                  className="group relative w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-4 focus:ring-offset-dark border border-white/10"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
                <a
                  href="https://instagram.com"
                  className="group relative w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-4 focus:ring-offset-dark border border-white/10"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="group relative w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-4 focus:ring-offset-dark border border-white/10"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links - 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-xl font-bold text-white mb-8 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-brand-orange to-brand-orange-600 rounded-lg flex items-center justify-center mr-3">
                <ArrowRight className="h-4 w-4 text-white" />
              </span>
              Services
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/how-it-works"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10"
                >
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  How It Works
                  <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10"
                >
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Property Analysis
                  <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10"
                >
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Success Stories
                  <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10"
                >
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Pricing Plans
                  <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links - 3 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold text-white mb-8">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10"
                >
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10"
                >
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10"
                >
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10"
                >
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - 4 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-xl font-bold text-white mb-8 flex items-center">
              <Award className="h-6 w-6 mr-3 text-brand-orange" />
              Contact Us
            </h4>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6">
              <div className="space-y-6">
                <div className="group flex items-start text-gray-300 hover:text-white transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-brand-orange/30 transition-colors duration-300 flex-shrink-0">
                    <Phone className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Phone</div>
                    <div className="text-lg">(210) 526-1401</div>
                    <div className="text-sm text-gray-400">Mon-Fri 9AM-6PM CST</div>
                  </div>
                </div>

                <div className="group flex items-start text-gray-300 hover:text-white transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-brand-blue/30 transition-colors duration-300 flex-shrink-0">
                    <Mail className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Email</div>
                    <div className="text-lg">info@alfaretailers.com</div>
                    <div className="text-sm text-gray-400">24/7 Support</div>
                  </div>
                </div>

                <div className="group flex items-start text-gray-300 hover:text-white transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-green/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-brand-green/30 transition-colors duration-300 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-brand-green" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Office</div>
                    <div className="text-lg">
                      12370 Potranco Rd, Suite 207<br />
                      San Antonio, TX 78254
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <Button
              className="w-full bg-gradient-to-r from-brand-orange to-brand-orange-600 hover:from-brand-orange-600 hover:to-brand-orange text-white font-bold px-6 py-4 rounded-xl shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark min-h-[56px] text-lg group"
              asChild
            >
              <Link href="/apply" className="focus-visible:outline-none flex items-center justify-center">
                Get Free Analysis
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Bar */}
      <div className="relative border-t border-gray-700/50 bg-gradient-to-r from-dark/80 to-dark-light/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-gray-300 text-base">
              © {currentYear} <span className="font-semibold text-white">Alfa Retailers</span>. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-base">
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10 font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10 font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus:ring-offset-dark border border-transparent hover:border-white/10 font-medium"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}