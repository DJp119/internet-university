'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getDegreeBySlug } from '@/lib/degrees';
import { ArrowLeft, CreditCard, Shield, Download, Share2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

// Razorpay payment link - replace with your actual payment link
const RAZORPAY_PAYMENT_LINK = 'https://rzp.io/r/test-payment-link';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const degree = getDegreeBySlug(params.slug as string);
  const userName = searchParams.get('name') || 'Anonymous';

  if (!degree) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Degree not found</p>
      </div>
    );
  }

  const handlePayment = () => {
    // In production, this would create a Razorpay order via API
    // For now, redirect to hosted payment link
    window.location.href = `${RAZORPAY_PAYMENT_LINK}?name=${encodeURIComponent(userName)}&degree=${encodeURIComponent(degree.title)}`;
  };

  // Simulate payment success redirect (for demo)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment_success') === 'true') {
      // Generate a random certificate ID
      const certId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      // Store in session for certificate page
      sessionStorage.setItem('certificateId', certId);
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('degreeTitle', degree.title);
      sessionStorage.setItem('degreeSubtitle', degree.subtitle);
      router.push(`/certificate/${certId}`);
    }
  }, [router, userName, degree, params.slug]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href={`/degree/${degree.slug}/name`} className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Main Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden slide-up">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>

            <div className="relative p-8 md:p-10">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-xl">
                <CreditCard className="text-white" size={28} />
              </div>

              {/* Header */}
              <h1 className="text-2xl font-black text-gray-900 mb-2">
                Get Your Official Certificate
              </h1>
              <p className="text-gray-600 mb-8">
                To issue your official <span className="font-bold text-indigo-600">{degree.title}</span> certificate.
              </p>

              {/* Price Badge */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 blur-xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center">
                  <p className="text-green-100 text-sm mb-1">Certificate Fee</p>
                  <p className="text-5xl font-black">₹10</p>
                  <p className="text-green-100 text-xs mt-2">one-time payment</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: '✓', text: 'Official certificate with your name', color: 'text-green-600' },
                  { icon: '✓', text: 'Downloadable PNG & PDF formats', color: 'text-purple-600' },
                  { icon: '✓', text: 'Share on social media', color: 'text-indigo-600' },
                  { icon: '✓', text: 'Lifetime validity', color: 'text-pink-600' },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`w-6 h-6 rounded-full ${feature.color} bg-white flex items-center justify-center font-bold text-sm border-2 ${feature.color.replace('text-', 'border-')}`}>
                      {feature.icon}
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <Shield size={20} />
                Pay ₹10 via Razorpay →
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                <Shield size={14} />
                <span>Secure payment powered by Razorpay</span>
              </div>

              {/* Demo Button */}
              <button
                onClick={() => {
                  const certId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
                  sessionStorage.setItem('certificateId', certId);
                  sessionStorage.setItem('userName', userName);
                  sessionStorage.setItem('degreeTitle', degree.title);
                  sessionStorage.setItem('degreeSubtitle', degree.subtitle);
                  router.push(`/certificate/${certId}`);
                }}
                className="w-full mt-4 bg-gray-100 text-gray-600 px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm border-2 border-gray-200"
              >
                🧪 Skip Payment (Demo Mode)
              </button>
            </div>
          </div>

          {/* Guarantee Card */}
          <div className="mt-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-start gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="font-bold mb-1">100% Satisfaction Guaranteed</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  Just kidding. No refunds. But you'll love your certificate!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
