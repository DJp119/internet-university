'use client';

import Link from 'next/link';
import { ChevronRight, Star, Trophy, Award, Clock, Zap } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useEffect, useState } from 'react';

export default function PaymentPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    track('page_viewed', { page: 'payment' });
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <ChevronRight size={20} className="rotate-180" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <Trophy className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Premium Certificate
          </h1>
          <p className="text-xl text-gray-600">
            Get your official certificate for just $1
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  $1.00
                </div>
                <p className="text-gray-600">One-time payment for lifetime access</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'High-quality PNG & PDF downloads',
                  'Official certificate with your name',
                  'Shareable on social media',
                  'Lifetime validity',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-green-500 font-bold">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => track('payment_initiated', { plan: 'certificate' })}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
