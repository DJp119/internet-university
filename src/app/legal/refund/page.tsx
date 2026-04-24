'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCcw, AlertCircle, CheckCircle2, Clock, Mail, FileCheck, XCircle } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useEffect } from 'react';

const refundInfo = [
  {
    icon: CheckCircle2,
    title: '100% Free Service',
    content: 'All degrees and certificates at Internet University are completely free. We do not charge any fees - our service is supported by ads.',
    color: 'from-green-500 to-emerald-500',
    type: 'eligible',
  },
  {
    icon: AlertCircle,
    title: 'Technical Issues',
    content: 'If you experience any technical issues with your certificate, contact us and we will resolve the problem or provide assistance.',
    color: 'from-orange-500 to-red-500',
    type: 'notice',
  },
  {
    icon: XCircle,
    title: 'No Payment Required',
    content: 'You should never be asked to pay for any degree or certificate. If someone requests payment, please report it to us immediately.',
    color: 'from-gray-500 to-gray-700',
    type: 'not-eligible',
  },
];

const processSteps = [
  {
    step: '1',
    title: 'Contact Us',
    desc: 'Email us at djpatel2003119@gmail.com with your issue and we will get back to you.',
    icon: Mail,
    color: 'from-[#E11D48] to-[#FB7185]',
  },
  {
    step: '2',
    title: 'Review',
    desc: 'Our team will review your request within 2-3 business days and respond.',
    icon: FileCheck,
    color: 'from-[#2563EB] to-[#E11D48]',
  },
  {
    step: '3',
    title: 'Resolution',
    desc: 'We will resolve your issue or provide assistance as needed.',
    icon: CheckCircle2,
    color: 'from-[#FB7185] to-[#2563EB]',
  },
];

const faqs = [
  {
    question: 'Is this really free?',
    answer: 'Yes! All degrees and certificates are 100% free. We show ads on the site to cover our costs, so you never need to pay anything.',
  },
  {
    question: 'What if I experience technical issues?',
    answer: 'Contact us immediately and we will help resolve any issues. We want everyone to be able to get their certificate without problems.',
  },
  {
    question: 'Can I exchange my degree for a different one?',
    answer: 'Yes! You can earn as many degrees as you want, all for free. Just browse our collection and start a new degree anytime.',
  },
  {
    question: 'What if the website is not working?',
    answer: 'If technical issues prevent you from accessing the site, contact us and we\'ll resolve the issue as quickly as possible.',
  },
];

export default function RefundPage() {
  useEffect(() => {
    track('page_viewed', { page: 'refund-policy' });
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
          <RefreshCcw size={16} className="text-[#E11D48]" />
          <span>Refund Policy</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
          Refund &{' '}
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent animate-gradient">
            Exchange
          </span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Last updated: January 1, 2026
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          We want you to be happy with your purchase. Here&apos;s everything you need to know
          about our refund and exchange policies.
        </p>
      </section>

      {/* Refund Info Cards */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="grid gap-6">
          {refundInfo.map((info, index) => (
            <div
              key={info.title}
              className={`bg-white rounded-3xl p-8 shadow-xl border-2 ${
                info.type === 'eligible'
                  ? 'border-green-500 ring-2 ring-green-500/20'
                  : info.type === 'not-eligible'
                  ? 'border-gray-300'
                  : 'border-[#E11D48] ring-2 ring-[#E11D48]/20'
              } transition-all duration-300 hover:shadow-2xl`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <info.icon className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">{info.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{info.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Contact Us for Support
          </h2>
          <p className="text-gray-600 text-lg">We're here to help</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <div
              key={step.step}
              className="relative bg-white rounded-3xl p-8 shadow-xl border border-[#FECDD3] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step Number */}
              <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-black shadow-lg`}>
                {step.step}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5 mt-3 shadow-lg`}>
                <step.icon className="text-white" size={32} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-black text-gray-900 mb-3 text-center">{step.title}</h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#FECDD3]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Clock className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Refund Timeline</h2>
              <p className="text-gray-600">Here&apos;s what to expect after submitting your request</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { time: 'Within 24 hours', event: 'Acknowledgment email sent', color: 'bg-green-500' },
              { time: '2-3 business days', event: 'Review and decision', color: 'bg-blue-500' },
              { time: 'Within 24 hours', event: 'We respond to your inquiry', color: 'bg-green-500' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-3 h-3 ${item.color} rounded-full flex-shrink-0`} />
                <div className="flex-1 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{item.event}</span>
                    <span className="text-sm text-gray-600 font-medium">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Common Questions
          </h2>
          <p className="text-gray-600 text-lg">Quick answers about refunds</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-2xl border border-[#FECDD3] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <summary className="p-5 flex items-center justify-between font-bold text-gray-900 list-none">
                {faq.question}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E11D48] to-[#FB7185] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-open:rotate-45">
                  <span className="text-white text-xl leading-none">+</span>
                </div>
              </summary>
              <div className="px-5 pb-5 pt-0">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#E11D48] via-[#FB7185] to-[#2563EB] rounded-[2.5rem] p-10 text-center text-white shadow-2xl">
          <Mail className="w-16 h-16 mx-auto mb-6 text-white/80" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            Need Help?
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Our team is here to help with any refund questions or concerns.
            We typically respond within 24 hours.
          </p>
          <a
            href="mailto:djpatel2003119@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-[#E11D48] px-8 py-4 rounded-full text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Email Us
            <ArrowLeft size={20} className="rotate-180" />
          </a>
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
          <p className="text-center text-xs text-gray-400 mt-2">
            This site is supported by ads. All degrees are 100% free.
          </p>
        </div>
      </footer>
    </div>
  );
}
