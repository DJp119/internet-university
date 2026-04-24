'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertCircle, Scale, Shield, UserCheck, Ban } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useEffect } from 'react';

const sections = [
  {
    icon: Scale,
    title: '1. Acceptance of Terms',
    content: `By accessing and using Internet University, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    color: 'from-[#E11D48] to-[#FB7185]',
  },
  {
    icon: UserCheck,
    title: '2. Eligibility',
    content: `You must be at least 13 years old to use this service. By using this service, you represent and warrant that you meet this age requirement. Users under 18 should review these terms with a parent or guardian.`,
    color: 'from-[#2563EB] to-[#E11D48]',
  },
  {
    icon: Shield,
    title: '3. Entertainment Purpose Disclaimer',
    content: `Internet University is provided for entertainment and amusement purposes only. The "degrees" and "certificates" offered are novelty items and do not represent actual academic credentials. They are not affiliated with any accredited educational institution and should not be presented as real qualifications on resumes, job applications, or official documents.`,
    color: 'from-[#FB7185] to-[#2563EB]',
    important: true,
  },
  {
    icon: CheckCircle2,
    title: '4. User Account',
    content: `To access certain features, you may need to create an account. You are responsible for maintaining the security of your account and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account.`,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Ban,
    title: '5. Prohibited Conduct',
    content: `You agree not to: (a) Use the service for any illegal purpose; (b) Attempt to gain unauthorized access to our systems; (c) Interfere with the proper working of the service; (d) Abuse or harass other users; (e) Attempt to manipulate or exploit our payment systems; (f) Share your account credentials with others.`,
    color: 'from-orange-500 to-red-500',
    list: [
      'No illegal activities',
      'No hacking attempts',
      'No service interference',
      'No user harassment',
      'No payment fraud',
      'No account sharing',
    ],
  },
  {
    icon: Scale,
    title: '6. Intellectual Property',
    content: `All content, features, and functionality of Internet University, including but not limited to text, graphics, logos, and software, are owned by us and protected by copyright and intellectual property laws. You may not copy, reproduce, or distribute our content without permission.`,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: AlertCircle,
    title: '7. Limitation of Liability',
    content: `Internet University is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service, including but not limited to direct, indirect, incidental, or consequential damages. We do not guarantee that the service will be uninterrupted or error-free.`,
    color: 'from-gray-500 to-gray-700',
    important: true,
  },
  {
    icon: Shield,
    title: '8. Indemnification',
    content: `You agree to indemnify and hold harmless Internet University, its owners, employees, and affiliates from any claims, damages, or expenses arising from your use of the service, your violation of these terms, or your infringement of any third-party rights.`,
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Ban,
    title: '9. Termination',
    content: `We reserve the right to suspend or terminate your access to the service at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties, or for any other reason.`,
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Scale,
    title: '10. Changes to Terms',
    content: `We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms. We encourage you to review these terms periodically for updates.`,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Shield,
    title: '11. Governing Law',
    content: `These terms shall be governed by the laws of India. Any disputes arising from these terms or your use of the service shall be subject to the exclusive jurisdiction of courts in Ahmedabad, Gujarat.`,
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: UserCheck,
    title: '12. Contact Information',
    content: `For questions about these Terms of Service, please contact us at darshan2003911@gmail.com We will respond to inquiries within a reasonable timeframe.`,
    color: 'from-pink-500 to-rose-500',
  },
];

export default function TermsPage() {
  useEffect(() => {
    track('page_viewed', { page: 'terms-of-service' });
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
          <Scale size={16} className="text-[#E11D48]" />
          <span>Terms of Service</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
          Terms of{' '}
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent animate-gradient">
            Service
          </span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Last updated: January 1, 2026
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Welcome to Internet University. Please read these terms carefully before using our service.
          These terms govern your use of our website and all related services.
        </p>
      </section>

      {/* Terms Sections */}
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
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <section.icon className="text-white" size={24} />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {section.content}
              </p>

              {/* List items if present */}
              {section.list && (
                <ul className="grid sm:grid-cols-2 gap-3 mt-5">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Acceptance CTA */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#E11D48] via-[#FB7185] to-[#2563EB] rounded-[2.5rem] p-10 text-center text-white shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            By Using Internet University
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            You acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-[#E11D48] px-8 py-4 rounded-full text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            I Understand
            <ArrowLeft size={20} className="rotate-180" />
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
