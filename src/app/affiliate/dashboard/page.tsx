'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Copy,
  Check,
  Gift,
  Share2,
} from 'lucide-react';
import { track } from '@vercel/analytics';
import {
  getAffiliateStats,
  getAffiliateDonations,
} from '@/lib/referrals';

export default function AffiliateDashboardPage() {
  const router = useRouter();
  const [affiliateId, setAffiliateId] = useState<string | null>(null);
  const [affiliateName, setAffiliateName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get affiliate info from localStorage
    const id = localStorage.getItem('affiliate_id');
    const name = localStorage.getItem('affiliate_name');
    const code = localStorage.getItem('affiliate_code');

    if (!id) {
      router.push('/affiliate/signup');
      return;
    }

    setAffiliateId(id);
    setAffiliateName(name || 'Affiliate');
    setReferralCode(code || '');
    loadDashboardData(id);
  }, [router]);

  const loadDashboardData = async (id: string) => {
    try {
      const [statsData, donationsData] = await Promise.all([
        getAffiliateStats(id),
        getAffiliateDonations(id),
      ]);

      setStats(statsData);
      setDonations(donationsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    const referralLink = `${window.location.origin}/donate?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    track('affiliate_link_copied', { referralCode });
  };

  const handleShare = async () => {
    const referralLink = `${window.location.origin}/donate?ref=${referralCode}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Support Internet University',
          text: 'Help keep Internet University free! Use my referral link to donate.',
          url: referralLink,
        });
        track('affiliate_link_shared', { referralCode });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF1F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E11D48] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
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
      <section className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              Welcome back, {affiliateName}!
            </h1>
            <p className="text-gray-600">Track your referrals and earnings</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-[#FECDD3]">
            <Gift size={16} className="text-[#E11D48]" />
            <span className="text-sm font-bold text-gray-900">Code: {referralCode}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#FECDD3]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Users className="text-white" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-600">Total Clicks</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{stats?.totalClicks || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#FECDD3]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <DollarSign className="text-white" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-600">Total Donations</span>
            </div>
            <p className="text-3xl font-black text-gray-900">₹{stats?.totalAmount || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#FECDD3]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-white" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-600">Pending Payout</span>
            </div>
            <p className="text-3xl font-black text-gray-900">₹{stats?.pending_payout || 0}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#FECDD3]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Gift className="text-white" size={20} />
              </div>
              <span className="text-sm font-medium text-gray-600">Paid Out</span>
            </div>
            <p className="text-3xl font-black text-gray-900">₹{stats?.paid_payout || 0}</p>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="bg-gradient-to-br from-[#E11D48] via-[#FB7185] to-[#2563EB] rounded-3xl p-8 text-white shadow-2xl mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Share2 className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black mb-2">Your Referral Link</h2>
              <p className="text-white/80 text-sm">Share this link to start earning commissions</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
            <code className="text-sm font-mono break-all">
              {`${typeof window !== 'undefined' ? window.location.origin : 'https://internetuni.netlify.app'}/donate?ref=${referralCode}`}
            </code>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 bg-white text-[#E11D48] px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-colors"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors"
            >
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        {/* Earnings Info */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <DollarSign className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black mb-2">Your Earnings</h2>
              <p className="text-white/80 text-sm">Commissions are calculated and tracked automatically</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-white/80 mb-1">Pending Payout</p>
              <p className="text-2xl font-black">₹{stats?.pending_payout || 0}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-white/80 mb-1">Total Paid Out</p>
              <p className="text-2xl font-black">₹{stats?.paid_payout || 0}</p>
            </div>
          </div>
          <p className="text-sm text-white/80 mt-4">
            💡 Payout methods will be configured soon. Your earnings are safely tracked!
          </p>
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#FECDD3] mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-2">Recent Donations</h2>
              <p className="text-gray-600 text-sm">Donations attributed to your referrals</p>
            </div>
          </div>

          {donations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Gift className="mx-auto mb-3 opacity-50" size={40} />
              <p>No donations yet. Keep sharing your link!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Donor</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Commission</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(donation.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {donation.donor_name || 'Anonymous'}
                      </td>
                      <td className="py-3 px-4 text-sm font-bold text-gray-900">
                        ₹{donation.amount}
                      </td>
                      <td className="py-3 px-4 text-sm font-bold text-green-600">
                        ₹{donation.commission_amount} ({donation.commission_rate}%)
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                            donation.status
                          )}`}
                        >
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
