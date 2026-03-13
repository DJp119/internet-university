import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // Fetch leaderboard from Supabase
    const { data, error } = await supabase
      .from('certificates')
      .select('user_name, degree_title, issue_date')
      .order('issue_date', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    const leaderboard = data.map((entry, index) => ({
      rank: index + 1,
      userName: entry.user_name,
      degreeTitle: entry.degree_title,
      earnedAt: formatTimeAgo(new Date(entry.issue_date)),
    }));

    return NextResponse.json({ success: true, leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    // Return mock data if Supabase fails
    return NextResponse.json({
      success: true,
      leaderboard: getMockLeaderboard(),
    });
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

function getMockLeaderboard() {
  return [
    { rank: 1, userName: 'Rahul', degreeTitle: 'Bachelor in Abusing', earnedAt: '2 hours ago' },
    { rank: 2, userName: 'Alex', degreeTitle: 'Master in Memes', earnedAt: '3 hours ago' },
    { rank: 3, userName: 'Sarah', degreeTitle: 'Bachelor in Overthinking', earnedAt: '5 hours ago' },
  ];
}
