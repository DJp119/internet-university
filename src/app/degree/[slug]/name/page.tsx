'use client';

import { useParams, useRouter } from 'next/navigation';
import { getDegreeBySlug } from '@/lib/degrees';
import { useState } from 'react';
import { ArrowLeft, PenTool, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function NamePage() {
  const params = useParams();
  const router = useRouter();
  const degree = getDegreeBySlug(params.slug as string);
  const [name, setName] = useState('');

  if (!degree) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Degree not found</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    // Generate certificate directly - no payment required
    const certId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    sessionStorage.setItem('certificateId', certId);
    sessionStorage.setItem('userName', name.trim());
    sessionStorage.setItem('degreeTitle', degree.title);
    sessionStorage.setItem('degreeSubtitle', degree.subtitle);
    router.push(`/certificate/${certId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link href={`/degree/${degree.slug}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden slide-up">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full translate-x-12 translate-y-12 opacity-50"></div>

            <div className="relative p-8">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
                <PenTool className="text-white" size={28} />
              </div>

              {/* Header */}
              <h1 className="text-2xl font-black text-gray-900 mb-3">
                Enter Your Name
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                This will appear on your official <span className="font-bold text-indigo-600">{degree.title}</span> certificate. Make it count!
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name for the certificate"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-lg transition-all placeholder:text-gray-400"
                    autoFocus
                    maxLength={50}
                  />
                  {name.length > 0 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                      <Sparkles size={20} />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={name.trim().length < 2}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98] cta-button"
                >
                  Continue →
                </button>
              </form>

              {/* Hint */}
              <p className="text-center text-xs text-gray-400 mt-6">
                💡 Pro tip: Use your full name for maximum impact
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-start gap-4">
              <div className="text-3xl">📜</div>
              <div>
                <h3 className="font-bold mb-1">Your Internet Legacy</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  This name will be forever etched in the halls of Internet University. Choose wisely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
