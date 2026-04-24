'use client';

import Link from 'next/link';
import { Home, Mail, Phone, MapPin, User, Heart } from 'lucide-react';
import AdBanner from '@/components/ads/AdBanner';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">Internet University</h1>
              <p className="text-xs text-gray-500">Est. 2026</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12 slide-up">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            Get in touch with Internet University
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 slide-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              {/* Legal Name */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Legal Name</p>
                  <p className="text-gray-900 font-bold">DARSHAN JATINKUMAR PATEL</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Address</p>
                  <p className="text-gray-900">
                    C1, Devcity Bunglows, Near Sayona city,<br />
                    R. C. Technical Road, Near Prasang Party Plot Rd,<br />
                    Ghatlodiya, Ahmedabad, 380061,<br />
                    Gujarat, India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
                  <a href="mailto:djpatel2003119@gmail.com" className="text-indigo-600 hover:underline font-medium">
                    djpatel2003119@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Phone</p>
                  <a href="tel:+916355549958" className="text-indigo-600 hover:underline font-medium">
                    +91 63555 49958
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 slide-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Links
              </h2>
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors p-3 rounded-xl hover:bg-indigo-50">
                  <Home size={20} />
                  <span className="font-medium">Home</span>
                </Link>
                <Link href="/donate" className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors p-3 rounded-xl hover:bg-indigo-50">
                  <Heart size={20} className="text-[#E11D48]" />
                  <span className="font-medium">Donate</span>
                </Link>
                <Link href="/leaderboard" className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors p-3 rounded-xl hover:bg-indigo-50">
                  <span className="text-xl">🏆</span>
                  <span className="font-medium">Leaderboard</span>
                </Link>
              </div>
            </div>

            {/* Ad Placement */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 slide-up" style={{ animationDelay: '150ms' }}>
              <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
              <AdBanner slot="9988776655" format="auto" />
            </div>

            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl shadow-xl p-8 text-white slide-up" style={{ animationDelay: '200ms' }}>
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-xl font-bold mb-2">Join 10,000+ Graduates</h3>
              <p className="text-indigo-100">Start your degree journey today!</p>
              <Link href="/" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-bold mt-4 hover:bg-indigo-50 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🎓</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Internet University</p>
                  <p className="text-xs text-gray-500">Est. 2026</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Earn the degree the internet thinks you deserve.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
              <p className="text-sm text-gray-600 mb-2">DARSHAN JATINKUMAR PATEL</p>
              <p className="text-sm text-gray-500 mb-2">
                C1, Devcity Bunglows, Ghatlodiya,<br />
                Ahmedabad, Gujarat 380061, India
              </p>
              <p className="text-sm text-gray-500">
                <a href="mailto:djpatel2003119@gmail.com" className="hover:text-indigo-600">djpatel2003119@gmail.com</a>
              </p>
              <p className="text-sm text-gray-500">
                <a href="tel:+916355549958" className="hover:text-indigo-600">+91 63555 49958</a>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/" className="block text-gray-600 hover:text-indigo-600">Home</Link>
                <Link href="/donate" className="block text-gray-600 hover:text-indigo-600">Donate</Link>
                <Link href="/leaderboard" className="block text-gray-600 hover:text-indigo-600">Leaderboard</Link>
                <Link href="/contact" className="block text-gray-600 hover:text-indigo-600">Contact Us</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 Internet University. All rights reserved.</p>
            <p className="mt-2 text-xs">For entertainment purposes only. Not affiliated with any actual university.</p>
            <p className="mt-2 text-xs text-gray-400">This site is supported by ads. All degrees are 100% free.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
