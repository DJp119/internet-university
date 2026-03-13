'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Share2, GraduationCap } from 'lucide-react';
import { getAllDegrees } from '@/lib/degrees';

// Mock profile data - in production, fetch from Supabase
const mockProfile = {
  name: 'Darshan Patel',
  degrees: [
    { title: 'Bachelor in Abusing', subtitle: 'Online Comment Section Warfare', icon: '🤬', earnedAt: 'March 10, 2026' },
    { title: 'Master in Memes', subtitle: 'Meme Literacy & Application', icon: '🐸', earnedAt: 'March 8, 2026' },
    { title: 'Bachelor in Overthinking', subtitle: 'Advanced Catastrophic Thinking', icon: '🤔', earnedAt: 'March 5, 2026' },
  ],
};

export default function ProfilePage() {
  const params = useParams();
  const profileName = decodeURIComponent(params.name as string);
  const degrees = getAllDegrees();

  const shareProfile = () => {
    const text = encodeURIComponent(`Check out ${profileName}'s Internet University profile!`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm">Back</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
            {profileName.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{profileName}</h1>
          <p className="text-gray-600">Internet University Graduate</p>
          <button
            onClick={shareProfile}
            className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <Share2 size={18} />
            Share Profile
          </button>
        </div>

        {/* Degrees Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap size={20} />
            Degrees Earned
          </h2>
          <div className="space-y-3">
            {mockProfile.degrees.map((degree, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                <span className="text-3xl">{degree.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{degree.title}</h3>
                  <p className="text-sm text-gray-500">{degree.subtitle}</p>
                </div>
                <div className="text-xs text-gray-400">{degree.earnedAt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl font-bold mb-2">{mockProfile.degrees.length}</div>
          <p className="text-indigo-100">Total Degrees</p>
          <p className="text-sm text-indigo-200 mt-4">
            Top 1% of internet graduates
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Browse more degrees →
          </Link>
        </div>
      </main>
    </div>
  );
}
