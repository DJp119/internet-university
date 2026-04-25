'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Heart,
  Coffee,
  Sparkles,
  Gift,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { track } from '@vercel/analytics';
import { storeReferralCode, trackReferralClick, generateVisitorId } from '@/lib/referrals';
import { supabase } from '@/lib/supabase';
import AdBanner from '@/components/ads/AdBanner';

export default function AffiliateLandingPage() {
  const params = useParams();
  const router = useRouter();
  const referralCode = params.code as string;

  const [affiliate, setAffiliate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadAffiliate() {
      try {
        const { data, error } = await supabase
          .from('affiliates')
          .select('*')
          .eq('referral_code', referralCode)
          .eq('is_approved', true)
          .single();

        if (error || !data) {
          router.push('/affiliate/signup');
          return;
        }

        setAffiliate(data);

        // Store referral code and track click
        storeReferralCode(referralCode);
        const visitorId = generateVisitorId();
        trackReferralClick({
          referralCode,
          visitorId,
          landingPage: window.location.pathname,
        }).catch(console.error);

        track('affiliate_landing_viewed', { referralCode, affiliateId: data.id });
      } catch (error) {
        console.error('Failed to load affiliate:', error);
        router.push('/affiliate/signup');
      } finally {
        setLoading(false);
      }
    }

    loadAffiliate();
  }, [referralCode, router]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF1F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E11D48] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!affiliate) {
    return null;
  }

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
        <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg border border-[#FECDD3] mb-6">
          <CheckCircle size={16} className="text-green-600" />
          <span>Verified Partner</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          Support Internet University via{' '}
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent animate-gradient">
            {affiliate.name}
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your donation helps keep Internet University 100% free for everyone.
          This link supports our partner {affiliate.name} who helps spread the word!
        </p>
      </section>

      {/* Trust Badges */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Heart,
              title: '100% Free Service',
              desc: 'All degrees remain free forever',
              color: 'from-green-500 to-emerald-600',
            },
            {
              icon: Sparkles,
              title: 'Secure Donation',
              desc: 'Powered by Ko-fi & UPI',
              color: 'from-blue-500 to-cyan-600',
            },
            {
              icon: Award,
              title: 'Partner Supported',
              desc: `Supported by ${affiliate.name}`,
              color: 'from-purple-500 to-pink-600',
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

      {/* Donation Options */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ko-fi Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#FECDD3] overflow-hidden">
            <div className="p-6 border-b border-[#FECDD3]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF5E78] to-[#FF8847] rounded-xl flex items-center justify-center">
                  <Coffee className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Buy Us a Coffee</h3>
                  <p className="text-sm text-gray-600">Support via Ko-fi</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#f9f9f9]">
              <iframe
                id="kofiframe"
                src="https://ko-fi.com/djp119/?hidefeed=true&widget=true&embed=true&preview=true"
                style={{ border: 'none', width: '100%', padding: '4px', background: '#f9f9f9' }}
                height={712}
                title="djp119"
              />
            </div>
          </div>

          {/* UPI QR Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#FECDD3] overflow-hidden">
            <div className="p-6 border-b border-[#FECDD3]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#E11D48] rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Scan & Pay via UPI</h3>
                  <p className="text-sm text-gray-600">Quick payment with any UPI app</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* QR Code */}
              <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-6 mb-6">
                <div className="aspect-square max-w-xs mx-auto bg-white rounded-2xl shadow-lg p-4 border-2 border-[#E11D48]">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=6355549958@slc&pn=DARSHAN%20PATEL&cu=INR"
                    alt="UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-4 font-medium">
                  Scan to pay with any UPI app
                </p>
              </div>

              {/* UPI ID Copy */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">UPI ID</p>
                <div className="flex items-center justify-between gap-3">
                  <code className="text-sm font-mono font-bold text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200 flex-1 text-center">
                    6355549958@slc
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('6355549958@slc');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-[#E11D48] text-white hover:bg-[#FB7185]'
                    }`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Alternative Link */}
              <div className="mt-6 text-center">
                <a
                  href="https://onlychai.neocities.org/support.html?name=Nobody&upi=6355549958%40slc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E11D48] hover:text-[#FB7185] font-medium text-sm transition-colors"
                >
                  Open in new tab <ArrowLeft size={14} className="rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Placement */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
            <AdBanner slot="1122334455" format="auto" />
          </div>
        </div>
      </section>

      {/* Partner Info */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#E11D48] via-[#FB7185] to-[#2563EB] rounded-[2.5rem] p-10 text-white shadow-2xl text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="text-white" size={40} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            About This Partner
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-xl mx-auto">
            {affiliate.name} is helping Internet University reach more people.
            When you donate through their link, they earn a commission to support their efforts!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Gift size={18} />
              <span className="font-semibold">Earns 10-25% Commission</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <TrendingUp size={18} />
              <span className="font-semibold">Verified Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Become Affiliate CTA */}
      <section className="relative max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-[2.5rem] p-10 text-center shadow-2xl border-2 border-[#FECDD3]">
          <div className="w-20 h-20 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="text-white" size={40} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
            Want to Become a Partner Too?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Join our affiliate program and earn commissions while supporting Internet University!
          </p>
          <Link
            href="/affiliate/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E11D48] to-[#FB7185] text-white px-8 py-4 rounded-full text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Gift size={20} />
            Join Affiliate Program
          </Link>
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
            <Link href="/affiliate/signup" className="hover:text-[#E11D48] transition-colors cursor-pointer">
              Become an Affiliate
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
