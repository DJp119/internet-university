'use client';

import Link from 'next/link';
import { Check, X, Sparkles, Zap, Crown, Gift, Shield, Clock, TrendingUp, Star } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useEffect, useState } from 'react';

const pricingPlans = [
  {
    name: 'Single Degree',
    price: '₹10',
    originalPrice: '₹49',
    description: 'Perfect for trying out the fun',
    icon: Star,
    color: 'from-gray-400 to-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    features: [
      { text: '1 Degree of your choice', included: true },
      { text: 'Instant certificate', included: true },
      { text: 'Shareable credential', included: true },
      { text: 'Leaderboard entry', included: true },
      { text: 'Profile page', included: true },
      { text: 'Access to all checklists', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Degree Pack',
    price: '₹49',
    originalPrice: '₹149',
    description: 'Most popular - Get 5 degrees',
    icon: Zap,
    color: 'from-[#E11D48] to-[#FB7185]',
    bgColor: 'bg-pink-50',
    borderColor: 'border-[#E11D48]',
    features: [
      { text: '5 Degrees of your choice', included: true },
      { text: 'Instant certificates', included: true },
      { text: 'Shareable credentials', included: true },
      { text: 'Leaderboard entry', included: true },
      { text: 'Profile page', included: true },
      { text: 'Access to all checklists', included: true },
      { text: 'Priority support', included: false },
      { text: 'Save 65%', included: true, highlight: true },
    ],
    cta: 'Get Degree Pack',
    popular: true,
  },
  {
    name: 'All Access',
    price: '₹99',
    originalPrice: '₹499',
    description: 'Unlimited degrees for flexing',
    icon: Crown,
    color: 'from-[#2563EB] to-[#E11D48]',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-[#2563EB]',
    features: [
      { text: 'Unlimited degrees', included: true },
      { text: 'Instant certificates', included: true },
      { text: 'Shareable credentials', included: true },
      { text: 'Leaderboard priority', included: true },
      { text: 'Custom profile page', included: true },
      { text: 'Access to all checklists', included: true },
      { text: 'Priority support', included: true },
      { text: 'Early access to new degrees', included: true },
      { text: 'Save 80%', included: true, highlight: true },
    ],
    cta: 'Go Unlimited',
    popular: false,
  },
];

const faqs = [
  {
    question: 'What do I get after purchasing?',
    answer: 'You instantly receive access to your degree checklist. Once you complete all tasks, you can download your official certificate immediately. Your certificate is shareable and you get a unique profile page to showcase all your earned degrees.',
  },
  {
    question: 'Is this a real university?',
    answer: 'No! Internet University is purely for entertainment purposes. Our degrees are meme-worthy credentials designed to make you laugh and give you something fun to share with friends. Not affiliated with any actual educational institution.',
  },
  {
    question: 'Can I buy multiple degrees?',
    answer: 'Absolutely! The Degree Pack gives you 5 degrees at a discounted price, while All Access gives you unlimited degrees. Many users love collecting multiple degrees and sharing them on social media.',
  },
  {
    question: 'How long does it take to complete a degree?',
    answer: 'Most users complete a degree in about 2 minutes. The checklists are designed to be quick, fun, and hilariously relatable. Perfect for a quick laugh during your break!',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major UPI IDs, credit/debit cards, and popular Indian payment methods. All transactions are secure and processed through Razorpay.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Since our products are digital and delivered instantly, we generally don\'t offer refunds. However, if you experience any technical issues, contact us and we\'ll make it right!',
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
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-[#E11D48] transition-colors cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-4 py-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl mb-6">
          <Sparkles size={14} className="fill-white animate-pulse" />
          <span>Limited Time Offer - Up to 80% OFF</span>
          <Sparkles size={14} className="fill-white animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          Choose Your Degree{' '}
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent animate-gradient">
            Package
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Invest in your internet credibility. Prices so low, your wallet will thank you.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-[#FECDD3]">
            <Shield size={16} className="text-green-600" />
            <span className="text-sm font-medium text-gray-700">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-[#FECDD3]">
            <Zap size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Instant Delivery</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-[#FECDD3]">
            <Gift size={16} className="text-pink-600" />
            <span className="text-sm font-medium text-gray-700">Lifetime Access</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              onClick={() => {
                track('pricing_plan_clicked', { planName: plan.name });
              }}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 ${plan.borderColor} transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular ? 'scale-105 z-10' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Star size={14} className="fill-white" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                <plan.icon className="text-white" size={32} />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-5">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-xl text-gray-400 line-through">{plan.originalPrice}</span>
                </div>
                <p className="text-sm text-green-600 font-semibold mt-1">
                  Save {Math.round((1 - parseInt(plan.price.replace('₹', '')) / parseInt(plan.originalPrice.replace('₹', ''))) * 100)}%
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 ${
                      !feature.included ? 'opacity-40' : ''
                    }`}
                  >
                    {feature.included ? (
                      <Check
                        size={20}
                        className={`flex-shrink-0 mt-0.5 ${
                          feature.highlight
                            ? 'text-[#E11D48]'
                            : 'text-green-600'
                        }`}
                      />
                    ) : (
                      <X size={20} className="flex-shrink-0 mt-0.5 text-gray-400" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.highlight
                          ? 'font-bold text-[#E11D48]'
                          : 'text-gray-700'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Compare All Features
          </h2>
          <p className="text-gray-600 text-lg">See what&apos;s included in each plan</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-[#FECDD3] overflow-hidden">
          <div className="grid grid-cols-4 border-b border-[#FECDD3]">
            <div className="p-5 font-bold text-gray-900">Features</div>
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`p-5 text-center font-black ${plan.popular ? 'text-[#E11D48]' : 'text-gray-900'}`}>
                {plan.name}
              </div>
            ))}
          </div>

          {[
            'Degrees included',
            'Instant certificates',
            'Shareable credentials',
            'Leaderboard entry',
            'Profile page',
            'All checklists access',
            'Priority support',
            'Early access to new degrees',
          ].map((feature, idx) => (
            <div
              key={feature}
              className={`grid grid-cols-4 border-b border-[#FECDD3] last:border-0 ${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="p-4 font-medium text-gray-700">{feature}</div>
              {[0, 1, 2].map((planIdx) => {
                const plan = pricingPlans[planIdx];
                const featureMap: Record<string, number> = {
                  'Degrees included': planIdx === 0 ? 1 : planIdx === 1 ? 5 : 999,
                  'Instant certificates': 1,
                  'Shareable credentials': 1,
                  'Leaderboard entry': 1,
                  'Profile page': 1,
                  'All checklists access': planIdx >= 1 ? 1 : 0,
                  'Priority support': planIdx === 2 ? 1 : 0,
                  'Early access to new degrees': planIdx === 2 ? 1 : 0,
                };
                const value = featureMap[feature];
                return (
                  <div key={planIdx} className="p-4 text-center">
                    {value === 999 ? (
                      <span className="font-black text-[#E11D48]">Unlimited</span>
                    ) : value === 1 ? (
                      <Check size={20} className="mx-auto text-green-600" />
                    ) : value === 5 ? (
                      <span className="font-bold text-gray-900">5</span>
                    ) : (
                      <X size={20} className="mx-auto text-gray-300" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Why Pay for Internet Degrees?
          </h2>
          <p className="text-gray-600 text-lg">Because everyone deserves a credential</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Clock,
              title: '2 Minute Completion',
              desc: 'Quick checklists you can finish during your chai break',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: TrendingUp,
              title: 'Social Clout',
              desc: 'Flex your degrees on Instagram, LinkedIn, everywhere',
              color: 'from-pink-500 to-rose-500',
            },
            {
              icon: Gift,
              title: 'Lifetime Access',
              desc: 'One payment, keep your certificates forever',
              color: 'from-purple-500 to-indigo-500',
            },
            {
              icon: Shield,
              title: '100% Safe',
              desc: 'Secure payments, no spam, just fun',
              color: 'from-green-500 to-emerald-500',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[#FECDD3] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <item.icon className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">Got questions? We&apos;ve got answers.</p>
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
              Ready to Become Internet Famous?
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
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="relative border-t border-[#FECDD3] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <Link href="/pricing" className="hover:text-[#E11D48] transition-colors cursor-pointer font-medium">
              Pricing
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/legal" className="hover:text-[#E11D48] transition-colors cursor-pointer">
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

// Simple Arrow Right icon since we didn't import it
function ArrowRight({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
