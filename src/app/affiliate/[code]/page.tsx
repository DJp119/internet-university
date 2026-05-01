'use client';

import Link from 'next/link';
import { Heart, Mail, Globe, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';
import { storeReferralCode, trackReferralClick, generateVisitorId } from '@/lib/referrals';
import { supabase } from '@/lib/supabase';

export default function AffiliateLandingPage() {
  const [affiliate, setAffiliate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const referralCode = typeof window !== 'undefined'
    ? window.location.pathname.split('/').pop()
    : '';

  useEffect(() => {
    async function loadAffiliate() {
      if (!referralCode) {
        window.location.href = '/affiliate/signup';
        return;
      }

      try {
        const { data, error } = await supabase
          .from('affiliates')
          .select('*')
          .eq('referral_code', referralCode)
          .eq('is_approved', true)
          .single();

        if (error || !data) {
          window.location.href = '/affiliate/signup';
          return;
        }

        setAffiliate(data);

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
        window.location.href = '/affiliate/signup';
      } finally {
        setLoading(false);
      }
    }

    loadAffiliate();
  }, [referralCode]);

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
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <header className="relative border-b border-[#FECDD3] bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <h1 className="text-lg font-black text-gray-900">Internet University</h1>
                <p className="text-xs text-gray-500">Est. 2026</p>
              </div>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#E11D48] transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
          Support Internet University via{' '}
          <span className="bg-gradient-to-r from-[#E11D48] via-[#FB7185] to-[#2563EB] bg-clip-text text-transparent">
            {affiliate.name}
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your donation helps keep Internet University 100% free for everyone.
        </p>
      </section>

      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl border border-[#FECDD3] overflow-hidden">
            <div className="p-6 border-b border-[#FECDD3]">
              <h3 className="text-xl font-black text-gray-900">Buy Us a Coffee</h3>
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

          <div className="bg-white rounded-3xl shadow-xl border border-[#FECDD3] overflow-hidden">
            <div className="p-6 border-b border-[#FECDD3]">
              <h3 className="text-xl font-black text-gray-900">Scan & Pay via UPI</h3>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-6 mb-6">
                <div className="aspect-square max-w-xs mx-auto bg-white rounded-2xl shadow-lg p-4 border-2 border-[#E11D48]">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=6355549958@slc&pn=DARSHAN%20PATEL&cu=INR"
                    alt="UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">Scan to pay</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between gap-3">
                  <code className="text-sm font-mono font-bold text-gray-900 bg-white px-3 py-2 rounded-lg border flex-1 text-center">
                    6355549958@slc
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('6355549958@slc');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      copied ? 'bg-green-500 text-white' : 'bg-[#E11D48] text-white'
                    }`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-[#FECDD3] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-gray-500">
          <p>© 2026 Internet University. For entertainment purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
