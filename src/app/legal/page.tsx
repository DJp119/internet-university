'use client';

import Link from 'next/link';
import { FileText, Shield, ArrowLeft, Scale, FileCheck, Heart } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useEffect } from 'react';

const policyCards = [
  {
    icon: Scale,
    title: 'Terms of Service',
    description: 'Rules and guidelines for using Internet University. By using our service, you agree to these terms.',
    color: 'from-[#E11D48] to-[#FB7185]',
    href: '/legal/terms',
    topics: ['Acceptable Use', 'User Responsibilities', 'Prohibited Conduct', 'Termination'],
  },
  {
    icon: Shield,
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal information. Your privacy matters to us.',
    color: 'from-[#2563EB] to-[#E11D48]',
    href: '/legal/privacy',
    topics: ['Data Collection', 'Usage', 'Third Parties', 'Your Rights'],
  },
  {
    icon: FileCheck,
    title: 'Refund Policy',
    description: 'Information about our refund process. Since products are digital, refunds are limited.',
    color: 'from-[#FB7185] to-[#2563EB]',
    href: '/legal/refund',
    topics: ['Eligibility', 'Process', 'Timeline', 'Contact'],
  },
  {
    icon: FileText,
    title: 'Cookie Policy',
    description: 'How we use cookies and similar technologies to improve your experience.',
    color: 'from-purple-500 to-indigo-500',
    href: '/legal/cookies',
    topics: ['Types of Cookies', 'Purpose', 'Management', 'Third Parties'],
  },
];

export default function LegalPage() {
  useEffect(() => {
    track('page_viewed', { page: 'legal' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF1F2] overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Header */}
      <header className="relative border-b border-[#FECDD3] bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-lg font-black text-gray-900">Internet University</h1>
                <p className="text-xs text-gray-500">Est. 2026</p>
              </div>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg border border-[#FECDD3] mb-6">
          <FileText size={16} className="text-[#E11D48]" />
          <span>Legal Documents</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          Terms &{' '}
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent animate-gradient">
            Policies
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Transparency is important to us. Here&apos;s everything you need to know about using Internet University.
        </p>
      </section>

      {/* Policy Cards */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 gap-6">
          {policyCards.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              onClick={() => {
                track('policy_clicked', { policy: card.title });
              }}
              className="group bg-white rounded-3xl p-8 shadow-xl border border-[#FECDD3] hover:shadow-2xl hover:border-transparent transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="text-white" size={28} />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#E11D48] transition-colors">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-5 leading-relaxed">{card.description}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-6">
                {card.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Learn More */}
              <div className="flex items-center gap-2 text-[#E11D48] font-bold group-hover:gap-3 transition-all duration-300">
                <span>Read More</span>
                <ArrowLeft size={16} className="rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Important Notice */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-[2.5rem] p-8 text-white shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              <Heart className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black mb-2">Important Notice</h3>
              <p className="text-white/90 leading-relaxed">
                Internet University is for <strong>entertainment purposes only</strong>.
                Our degrees are not affiliated with any actual educational institution and
                should not be presented as real academic credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#FECDD3] text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about our policies, feel free to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Contact Us
            <ArrowLeft size={18} className="rotate-180" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#FECDD3] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <Link href="/pricing" className="hover:text-[#E11D48] transition-colors cursor-pointer">
              Pricing
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/legal" className="hover:text-[#E11D48] transition-colors cursor-pointer font-medium">
              Terms & Policies
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/contact" className="hover:text-[#E11D48] transition-colors cursor-pointer">
              Contact
            </Link>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            © 2026 Internet University. For entertainment purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
