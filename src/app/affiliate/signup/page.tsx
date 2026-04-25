'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Gift, Users, TrendingUp, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { track } from '@vercel/analytics';
import { generateReferralCode } from '@/lib/referrals';
import { supabase } from '@/lib/supabase';

export default function AffiliateSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    upiId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Generate unique referral code
      const referralCode = generateReferralCode(formData.name);

      // Check if code already exists, if so regenerate
      let existing = await supabase
        .from('affiliates')
        .select('id')
        .eq('referral_code', referralCode)
        .single();

      let finalCode = referralCode;
      if (existing.data) {
        finalCode = `${referralCode}${Math.floor(Math.random() * 1000)}`;
      }

      // Create affiliate record
      const { data, error: insertError } = await supabase
        .from('affiliates')
        .insert({
          name: formData.name,
          email: formData.email,
          upi_id: formData.upiId,
          referral_code: finalCode,
          is_approved: true, // Auto-approve for now
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Store affiliate info in localStorage for dashboard access
      localStorage.setItem('affiliate_id', data.id);
      localStorage.setItem('affiliate_name', data.name);
      localStorage.setItem('affiliate_code', data.referral_code);

      setSuccess(true);
      track('affiliate_signup', { affiliateId: data.id, referralCode: finalCode });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/affiliate/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create affiliate account');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      <section className="relative max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl mb-6">
          <Gift size={14} className="fill-white" />
          <span>Earn While You Share</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          Become an{' '}
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent animate-gradient">
            Affiliate Partner
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Share your unique referral link and earn 10-25% commission on every donation!
        </p>
      </section>

      {/* Benefits Section */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              title: 'Up to 25% Commission',
              desc: 'Earn more as you refer more donations. Higher tiers = higher percentages!',
              color: 'from-green-500 to-emerald-600',
            },
            {
              icon: Users,
              title: 'Real-Time Tracking',
              desc: 'Watch your referrals, clicks, and earnings update in real-time.',
              color: 'from-blue-500 to-cyan-600',
            },
            {
              icon: Award,
              title: 'Instant Payouts',
              desc: 'Request payouts directly to your UPI ID anytime.',
              color: 'from-purple-500 to-indigo-600',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[#FECDD3] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
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

      {/* Signup Form */}
      <section className="relative max-w-lg mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl shadow-xl border border-[#FECDD3] p-8">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <CheckCircle className="text-white" size={40} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">
                Welcome Aboard!
              </h2>
              <p className="text-gray-600 mb-4">
                Your affiliate account has been created successfully.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to your dashboard...
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  Create Your Affiliate Account
                </h2>
                <p className="text-gray-600 text-sm">
                  Fill in the details below to get started
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* UPI ID */}
                <div>
                  <label htmlFor="upiId" className="block text-sm font-bold text-gray-900 mb-2">
                    UPI ID (for payouts)
                  </label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    required
                    value={formData.upiId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/20 outline-none transition-all"
                    placeholder="yourname@upi"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your earnings will be sent to this UPI ID
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-200">
                    <AlertCircle size={18} />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account & Start Earning'}
                </button>
              </form>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-6">
                By creating an account, you agree to our{' '}
                <Link href="/legal" className="text-[#E11D48] hover:underline">
                  Terms of Service
                </Link>
              </p>
            </>
          )}
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Commission Tiers
          </h2>
          <p className="text-gray-600 text-lg">Earn more as you refer more</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { tier: 'Bronze', amount: '₹0 - ₹5,000', rate: '10%', color: 'from-amber-600 to-amber-800' },
            { tier: 'Silver', amount: '₹5,001 - ₹20,000', rate: '15%', color: 'from-gray-400 to-gray-600' },
            { tier: 'Gold', amount: '₹20,001 - ₹50,000', rate: '20%', color: 'from-yellow-500 to-yellow-700' },
            { tier: 'Platinum', amount: '₹50,000+', rate: '25%', color: 'from-purple-400 to-purple-600' },
          ].map((tier, idx) => (
            <div
              key={tier.tier}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[#FECDD3] text-center hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">{tier.tier}</h3>
              <p className="text-sm text-gray-600 mb-3">{tier.amount}</p>
              <p className="text-3xl font-black bg-gradient-to-r from-[#E11D48] to-[#FB7185] bg-clip-text text-transparent">
                {tier.rate}
              </p>
            </div>
          ))}
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
            <Link href="/affiliate/dashboard" className="hover:text-[#E11D48] transition-colors cursor-pointer">
              Affiliate Dashboard
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/legal" className="hover:text-[#E11D48] transition-colors cursor-pointer font-medium">
              Terms & Policies
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
