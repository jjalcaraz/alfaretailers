import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-brand-blue mb-4">
              Alfa Retailers
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transform your stagnant long-term rental into a profitable short-term rental.
              We manage everything from listings to check-ins.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white transition-colors">
                  Property Analysis
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3 text-brand-orange" />
                <span>210-526-1401</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3 text-brand-orange" />
                <span>info@alfaretailers.com</span>
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="h-5 w-5 mr-3 text-brand-orange mt-0.5" />
                <span className="text-sm">
                  Office<br />
                  12370 Potranco Rd, Suite 207<br />
                  San Antonio, TX 78254
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <Link
                href="/apply"
                className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Get Free Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Alfa Retailers. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
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
