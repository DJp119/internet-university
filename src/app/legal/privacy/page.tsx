'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Database, Lock, User, Globe, Cookie, Mail, Trash2, Download } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useEffect } from 'react';

const sections = [
  {
    icon: Eye,
    title: '1. Information We Collect',
    subtitle: 'We collect information to provide you with the best experience',
    color: 'from-[#E11D48] to-[#FB7185]',
    content: [
      {
        heading: 'Information You Provide',
        text: 'When you purchase a degree, we collect your name, email address, and payment information. You may also choose to provide additional information for your profile page.',
      },
      {
        heading: 'Automatically Collected Information',
        text: 'We automatically collect certain information when you visit our website, including your IP address, browser type, device information, and pages visited.',
      },
      {
        heading: 'Cookies and Similar Technologies',
        text: 'We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services.',
      },
    ],
  },
  {
    icon: Database,
    title: '2. How We Use Your Information',
    subtitle: 'Your information helps us serve you better',
    color: 'from-[#2563EB] to-[#E11D48]',
    content: [
      {
        heading: 'Service Delivery',
        text: 'To process your purchases, deliver certificates, and maintain your profile page.',
      },
      {
        heading: 'Communication',
        text: 'To send you order confirmations, updates, and respond to your inquiries.',
      },
      {
        heading: 'Improvement',
        text: 'To analyze usage patterns and improve our website and services.',
      },
      {
        heading: 'Security',
        text: 'To detect and prevent fraud, abuse, and ensure the security of our services.',
      },
      {
        heading: 'Legal Compliance',
        text: 'To comply with applicable laws and regulations.',
      },
    ],
  },
  {
    icon: Lock,
    title: '3. Information Sharing',
    subtitle: 'We do not sell your personal information',
    color: 'from-[#FB7185] to-[#2563EB]',
    important: true,
    content: [
      {
        heading: 'We Do NOT Sell Your Data',
        text: 'Your personal information is never sold to third parties. We believe your data is yours, not a commodity.',
      },
      {
        heading: 'Service Providers',
        text: 'We may share information with trusted service providers who assist us in operating our website and processing payments (e.g., Razorpay for payment processing).',
      },
      {
        heading: 'Legal Requirements',
        text: 'We may disclose information if required by law or to protect our rights and safety.',
      },
    ],
  },
  {
    icon: Globe,
    title: '4. Data Security',
    subtitle: 'We take reasonable measures to protect your information',
    color: 'from-purple-500 to-indigo-500',
    content: [
      {
        heading: 'Security Measures',
        text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
      },
      {
        heading: 'Payment Security',
        text: 'All payment transactions are processed through secure, PCI-compliant payment gateways. We do not store your credit card information.',
      },
      {
        heading: 'Limitation',
        text: 'While we strive to protect your information, no method of transmission over the internet is 100% secure.',
      },
    ],
  },
  {
    icon: Cookie,
    title: '5. Cookies and Tracking',
    subtitle: 'You can control cookie preferences',
    color: 'from-orange-500 to-red-500',
    content: [
      {
        heading: 'Types of Cookies We Use',
        text: 'Essential cookies for website functionality, analytics cookies to understand usage, and preference cookies to remember your settings.',
      },
      {
        heading: 'Third-Party Cookies',
        text: 'We use Vercel Analytics to understand website usage. We also use Google AdSense to display ads, which may set their own cookies for ad personalization and measurement.',
      },
      {
        heading: 'Advertising',
        text: 'We display ads through Google AdSense to keep our services free. Google may use cookies and web beacons to serve relevant ads. You can opt-out of personalized advertising through Google Ads Settings.',
      },
      {
        heading: 'Your Choices',
        text: 'You can control cookies through your browser settings. However, disabling cookies may affect website functionality.',
      },
    ],
  },
  {
    icon: User,
    title: '6. Your Rights',
    subtitle: 'You have control over your personal information',
    color: 'from-green-500 to-emerald-500',
    content: [
      {
        heading: 'Access',
        text: 'You can request a copy of the personal information we hold about you.',
      },
      {
        heading: 'Correction',
        text: 'You can request correction of inaccurate or incomplete information.',
      },
      {
        heading: 'Deletion',
        text: 'You can request deletion of your personal information, subject to legal obligations.',
      },
      {
        heading: 'Opt-Out',
        text: 'You can opt-out of marketing communications at any time.',
      },
    ],
  },
  {
    icon: Mail,
    title: '7. Contact Us',
    subtitle: 'We\'re here to help with any privacy questions',
    color: 'from-pink-500 to-rose-500',
    content: [
      {
        heading: 'Privacy Contact Information',
        text: 'For privacy-related questions, please contact us at internetuni@example.com.',
      },
    ],
  },
];

const rights = [
  { icon: Download, title: 'Right to Access', desc: 'Get a copy of your data' },
  { icon: Trash2, title: 'Right to Deletion', desc: 'Request data removal' },
  { icon: User, title: 'Right to Correction', desc: 'Fix inaccurate data' },
  { icon: Mail, title: 'Right to Opt-Out', desc: 'Unsubscribe from marketing' },
];

export default function PrivacyPage() {
  useEffect(() => {
    track('page_viewed', { page: 'privacy-policy' });
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
              href="/legal"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Legal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-4xl mx-auto px-4 py-16">
        <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg border border-[#FECDD3] mb-6">
          <Shield size={16} className="text-[#E11D48]" />
          <span>Privacy Policy</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
          Your Privacy{' '}
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent animate-gradient">
            Matters
          </span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Last updated: January 1, 2026
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          At Internet University, we take your privacy seriously. This policy explains what information
          we collect, how we use it, and your rights regarding your personal data.
        </p>
      </section>

      {/* Your Rights Cards */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-4 gap-4">
          {rights.map((right, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 shadow-lg border border-[#FECDD3] text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-xl flex items-center justify-center mx-auto mb-3">
                <right.icon className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{right.title}</h3>
              <p className="text-xs text-gray-600">{right.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`bg-white rounded-3xl p-8 shadow-xl border ${
                section.important ? 'border-[#E11D48] ring-2 ring-[#E11D48]/20' : 'border-[#FECDD3]'
              } transition-all duration-300 hover:shadow-2xl`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <section.icon className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-gray-600 text-sm mt-1">{section.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 mt-5">
                {section.content.map((item, idx) => (
                  <div key={idx} className="pl-16">
                    <h3 className="font-bold text-gray-900 mb-2">{item.heading}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Summary */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#E11D48] via-[#FB7185] to-[#2563EB] rounded-[2.5rem] p-10 text-white shadow-2xl">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              We Don&apos;t Sell Your Data
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Your personal information is used only to provide you with our services.
              We never sell, rent, or trade your data with third parties.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#E11D48] px-8 py-4 rounded-full text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Contact Us
              <ArrowLeft size={20} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#FECDD3] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#E11D48] transition-colors cursor-pointer font-medium">
              Home
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/donate" className="hover:text-[#E11D48] transition-colors cursor-pointer">
              Donate
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/pricing" className="hover:text-[#E11D48] transition-colors cursor-pointer">
              How It Works
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
