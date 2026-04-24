'use client';

import { useParams, useRouter } from 'next/navigation';
import { getDegreeBySlug } from '@/lib/degrees';
import { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import Checklist from '@/components/Checklist';
import Confetti from '@/components/Confetti';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Sparkles, Trophy, Award, Star } from 'lucide-react';
import { track } from '@vercel/analytics';

export default function DegreePage() {
  const params = useParams();
  const router = useRouter();
  const degree = getDegreeBySlug(params.slug as string);
  const [completedCount, setCompletedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (!degree) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Degree not found</p>
      </div>
    );
  }

  const handleProgressChange = (count: number) => {
    setCompletedCount(count);
    if (count === degree.checklist.length) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  };

  const handleClaimDegree = () => {
    track('degree_started', {
      degreeTitle: degree.title,
      degreeSlug: degree.slug,
    });
    router.push(`/degree/${degree.slug}/name`);
  };

  const loadingMessages = [
    "Analyzing your behavior...",
    "Checking meme literacy...",
    "Evaluating sarcasm level...",
    "Calculating internet cred...",
    "Verifying chaos energy...",
    "Measuring procrastination index...",
    "Assessing overthinking capacity...",
    "Almost there...",
    "Finalizing your degree...",
    "Preparing certificate...",
  ];

  const progressPercent = Math.round((completedCount / degree.checklist.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <Confetti trigger={isComplete} />

      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-xl z-10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Degree Header Card */}
        <div className="relative mb-6 slide-up">
          <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
            <div className="relative p-8 text-center">
              {/* Icon */}
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-30"></div>
                <div
                  className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl degree-icon"
                  style={{
                    background: `linear-gradient(135deg, ${degree.color} 0%, ${degree.color}cc 100%)`,
                  }}
                >
                  <span className="text-5xl">{degree.icon}</span>
                </div>
                <div className="absolute -top-1 -right-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full px-2.5 py-1 text-white text-xs font-bold shadow-lg">
                  NEW
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                {degree.title}
              </h1>
              <p className="text-gray-600 font-medium">
                {degree.subtitle}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-6 mt-5">
                <div className="flex items-center gap-2">
                  <Star className="text-indigo-600" size={18} />
                  <span className="font-semibold text-gray-700">{degree.checklist.length} Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="text-purple-600" size={18} />
                  <span className="font-semibold text-gray-700">Elite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-pink-600" size={18} />
                  <span className="font-semibold text-gray-700">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-6 slide-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <ProgressBar current={completedCount} total={degree.checklist.length} />
          </div>
        </div>

        {/* Completion Message - ONLY shows when 100% complete */}
        {isComplete && (
          <div className="relative mb-6 slide-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-2 border-green-300 p-8 text-center shadow-xl overflow-hidden">
              {/* Sparkles */}
              <Sparkles className="absolute top-4 left-4 text-green-500 opacity-60" size={20} />
              <Sparkles className="absolute top-4 right-4 text-green-500 opacity-60" size={20} />
              <Sparkles className="absolute bottom-4 left-4 text-green-500 opacity-60" size={20} />
              <Sparkles className="absolute bottom-4 right-4 text-green-500 opacity-60" size={20} />

              <GraduationCap className="mx-auto text-green-600 mb-4 float" size={56} />
              <h2 className="text-2xl font-black text-gray-900 mb-3">
                🎉 Congratulations!
              </h2>
              <p className="text-gray-700 mb-6 font-medium">
                You are officially eligible for your <span className="text-indigo-600 font-bold">{degree.title}</span>
              </p>
              <button
                onClick={handleClaimDegree}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 pulse-glow"
              >
                Claim Your Degree →
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Takes 2 minutes • ₹10 only
              </p>
            </div>
          </div>
        )}

        {/* Loading Messages */}
        {!isComplete && completedCount > 0 && (
          <div className="text-center mb-6 slide-up">
            <div className="inline-flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-full px-5 py-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
              <span className="text-sm font-medium text-indigo-700">
                {loadingMessages[Math.min(completedCount - 1, loadingMessages.length - 1)]}
              </span>
            </div>
          </div>
        )}

        {/* Checklist */}
        <div className="slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Degree Requirements
            </h2>
          </div>
          <Checklist
            items={degree.checklist}
            onProgressChange={handleProgressChange}
          />
        </div>

        {/* Info Card */}
        <div className="mt-8 slide-up" style={{ animationDelay: '400ms' }}>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="font-bold mb-2">Did you know?</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  Over 10,000 students have earned their {degree.title} from Internet University.
                  Join the elite group of internet scholars today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p className="font-medium">© 2026 Internet University</p>
          <p className="mt-1">Not affiliated with any actual university. For entertainment purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
