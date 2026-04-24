'use client';

import Link from 'next/link';
import { Check, Sparkles, Zap, Gift, Shield, Clock, TrendingUp, Star, Users, Award, Globe, Heart } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useEffect, useState } from 'react';

const features = [
  {
    icon: Gift,
    title: '100% Free',
    desc: 'All degrees are completely free. No hidden fees, no subscriptions.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Clock,
    title: '2 Minute Completion',
    desc: 'Quick checklists you can finish during your chai break.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Award,
    title: 'Instant Certificate',
    desc: 'Get your official certificate immediately after completing all tasks.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: TrendingUp,
    title: 'Social Clout',
    desc: 'Flex your degrees on Instagram, LinkedIn, and everywhere else.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: Users,
    title: 'Join 10,000+ Graduates',
    desc: 'Become part of our growing community of internet scholars.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: Globe,
    title: 'Leaderboard',
    desc: 'Compete with others and see where you rank among graduates.',
    color: 'from-red-500 to-pink-600',
  },
];

const faqs = [
  {
    question: 'Is this really free?',
    answer: 'Yes! 100% free. We show ads on the site to keep the lights on, so you can enjoy all our degrees without paying a single rupee.',
  },
  {
    question: 'What do I get after completing a degree?',
    answer: 'You instantly receive access to your official certificate with your name on it! Download it as PNG or PDF, share it on social media, and flex your internet credentials to the world.',
  },
  {
    question: 'Is this a real university?',
    answer: 'No! Internet University is purely for entertainment purposes. Our degrees are meme-worthy credentials designed to make you laugh and give you something fun to share with friends. Not affiliated with any actual educational institution.',
  },
  {
    question: 'How long does it take to complete a degree?',
    answer: 'Most users complete a degree in about 2 minutes. The checklists are designed to be quick, fun, and hilariously relatable. Perfect for a quick laugh during your break!',
  },
  {
    question: 'Can I earn multiple degrees?',
    answer: 'Absolutely! There is no limit. Browse all our degrees, complete as many checklists as you want, and build your collection of internet credentials.',
  },
  {
    question: 'How is this free? Are you selling my data?',
    answer: 'Nope! We show Google ads on the site, which generates enough revenue to keep things running. Your data stays private - see our Privacy Policy for details.',
  },
];

export default function PricingPage() {
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    track('page_viewed', { page: 'pricing' });
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
            <div className="flex items-center gap-3">
              <Link
                href="/donate"
                className="text-sm font-medium text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Heart size={14} />
                <span className="hidden sm:inline">Donate</span>
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-4 py-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl mb-6">
          <Sparkles size={14} className="fill-white animate-pulse" />
          <span>100% Free Forever</span>
          <Sparkles size={14} className="fill-white animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          Free Degrees for{' '}
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent animate-gradient">
            Everyone
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Earn hilarious degrees by completing fun checklists. No payment required - just bring your sense of humor.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-[#FECDD3]">
            <Gift size={16} className="text-green-600" />
            <span className="text-sm font-medium text-gray-700">Completely Free</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-[#FECDD3]">
            <Zap size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Instant Certificate</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-[#FECDD3]">
            <Shield size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">No Sign-up Required</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            What You Get for Free
          </h2>
          <p className="text-gray-600 text-lg">Everything. Yes, really.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[#FECDD3] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How We're Free */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-10 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-6xl animate-bounce">📢</div>
            <div className="absolute top-20 right-20 text-4xl animate-bounce delay-100">💰</div>
            <div className="absolute bottom-10 left-20 text-5xl animate-bounce delay-200">🎯</div>
          </div>

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              How Is This Free?
            </h2>
            <p className="text-white/90 text-lg mb-6">
              We show ads on the site (like Google AdSense). The ads cover our costs, so you don't have to!
              It's that simple. No catch, no data selling, just fun degrees funded by ads.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check size={18} />
                <span className="font-semibold">Free Forever</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check size={18} />
                <span className="font-semibold">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check size={18} />
                <span className="font-semibold">No Credit Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="bg-white rounded-2xl border border-[#FECDD3] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-5 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 pr-4">{faq.question}</h3>
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br from-[#E11D48] to-[#FB7185] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-45' : ''
                  }`}
                >
                  <span className="text-white text-xl leading-none">+</span>
                </div>
              </div>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-0">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="relative bg-gradient-to-br from-[#E11D48] via-[#FB7185] to-[#2563EB] rounded-[2.5rem] p-12 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-6xl animate-bounce">🎓</div>
            <div className="absolute top-20 right-20 text-4xl animate-bounce delay-100">⭐</div>
            <div className="absolute bottom-10 left-20 text-5xl animate-bounce delay-200">🏆</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Ready to Earn Your Degree?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join 10,000+ graduates who already have their credentials.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-[#E11D48] px-8 py-4 rounded-full text-lg font-black shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Sparkles size={20} className="fill-[#E11D48]" />
              <span>Browse Degrees</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Links */}
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
            <Link href="/leaderboard" className="hover:text-[#E11D48] transition-colors cursor-pointer">
              Leaderboard
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/legal/privacy" className="hover:text-[#E11D48] transition-colors cursor-pointer">
              Privacy Policy
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
          <p className="text-center text-xs text-gray-500 mt-4">
            © 2026 Internet University. For entertainment purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
