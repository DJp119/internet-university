'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getDegreeBySlug } from '@/lib/degrees';
import { ArrowLeft, GraduationCap, Sparkles, Award, Star, Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { track } from '@vercel/analytics';
import AdBanner from '@/components/ads/AdBanner';

function getDegreeIcon(degreeTitle: string) {
  if (degreeTitle.includes('Abusing')) return '🤬';
  if (degreeTitle.includes('Overthinking')) return '🤔';
  if (degreeTitle.includes('Procrastination')) return '⏰';
  return '🐸';
}

export default function CertificateGenerationPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const degree = getDegreeBySlug(params.slug as string);
  const userName = searchParams.get('name') || 'Anonymous';
  const [isGenerating, setIsGenerating] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  const loadingMessages = [
    "Verifying your checklist completion...",
    "Calculating your GPA...",
    "Printing your diploma...",
    "Adding official seal...",
    "Notifying the dean...",
    "Preparing your certificate...",
  ];

  useEffect(() => {
    if (!degree) return;

    // Animate loading messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    // Generate certificate after a short delay
    const generateTimeout = setTimeout(() => {
      const certId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const gpa = (3.5 + Math.random() * 0.5).toFixed(2);

      // Save to Supabase
      supabase
        .from('certificates')
        .insert({
          user_name: userName,
          degree_title: degree.title,
          certificate_code: certId,
          gpa: parseFloat(gpa),
        })
        .then(() => {
          track('degree_completed', {
            degreeTitle: degree.title,
            userName,
            certificateCode: certId,
          });
        });

      // Store in session and redirect
      sessionStorage.setItem('certificateId', certId);
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('degreeTitle', degree.title);
      sessionStorage.setItem('degreeSubtitle', degree.subtitle);

      router.push(`/certificate/${certId}`);
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(generateTimeout);
    };
  }, [degree, userName, router, loadingMessages.length]);

  if (!degree) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Degree not found</p>
      </div>
    );
  }

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
          {/* Main Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>

            <div className="relative p-8">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-xl animate-bounce">
                <GraduationCap className="text-white" size={28} />
              </div>

              {/* Header */}
              <h1 className="text-2xl font-black text-gray-900 mb-2">
                🎉 Congratulations!
              </h1>
              <p className="text-gray-600 mb-6">
                Your official <span className="font-bold text-indigo-600">{degree.title}</span> certificate is being generated!
              </p>

              {/* Loading Animation */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 blur-xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Award className="text-white" size={24} />
                    <span className="text-lg font-bold">FREE Certificate</span>
                  </div>
                  <div className="text-5xl font-black mb-2">₹0</div>
                  <p className="text-green-100 text-sm">You saved ₹10!</p>

                  {/* Progress Bar */}
                  <div className="mt-4 bg-green-800/30 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-white rounded-full animate-progress" style={{ width: '70%' }} />
                  </div>
                </div>
              </div>

              {/* Loading Messages */}
              <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
                  <span className="text-sm font-medium text-indigo-700">
                    {loadingMessages[currentMessage]}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
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

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Star size={14} />
                <span>Official Internet University Certificate</span>
              </div>
            </div>
          </div>

          {/* Ad Placement */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-400 text-center mb-2">Advertisement</p>
            <AdBanner slot="1122334455" format="fluid" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p className="font-medium">© 2026 Internet University</p>
          <p className="mt-1">Not affiliated with any actual university. For entertainment purposes only.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
