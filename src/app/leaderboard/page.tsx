'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { track } from '@vercel/analytics';

interface LeaderboardEntry {
  rank: number;
  userName: string;
  degreeTitle: string;
  degreeIcon: string;
  earnedAt: string;
}

function getDegreeIcon(degreeTitle: string) {
  if (degreeTitle.includes('Abusing')) return '🤬';
  if (degreeTitle.includes('Overthinking')) return '🤔';
  if (degreeTitle.includes('Procrastination')) return '⏰';
  return '🐸';
}

function formatTimeAgo(date: string): string {
  const now = new Date();
  const earned = new Date(date);
  const diffMs = now.getTime() - earned.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    track('page_viewed', { page: 'leaderboard' });
  }, []);

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data, error } = await supabase
        .from('certificates')
        .select('user_name, degree_title, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      const formattedEntries: LeaderboardEntry[] = (data || []).map((entry, index) => ({
        rank: index + 1,
        userName: entry.user_name,
        degreeTitle: entry.degree_title,
        degreeIcon: getDegreeIcon(entry.degree_title),
        earnedAt: formatTimeAgo(entry.created_at),
      }));

      setEntries(formattedEntries);
      setLoading(false);
    }

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Award className="text-amber-600" size={24} />;
    return <span className="text-gray-400 font-bold">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-xl z-10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm">Back</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🏆</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Top Internet Graduates
          </h1>
          <p className="text-gray-600">
            Today's most certified chaos agents
          </p>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2">
          {entries.map((entry, index) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                index < 3 ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100' : 'bg-white border border-gray-100'
              }`}
            >
              <div className="w-12 text-center">
                {getRankIcon(entry.rank)}
              </div>
              <div className="text-2xl">{entry.degreeIcon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{entry.userName}</h3>
                <p className="text-sm text-gray-500">{entry.degreeTitle}</p>
              </div>
              <div className="text-sm text-gray-400">{entry.earnedAt}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-center">
          <p className="text-gray-600 mb-4">Want to see your name here?</p>
          <Link
            href="/"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors"
          >
            Get Your Degree →
          </Link>
        </div>
      </main>
    </div>
  );
}
