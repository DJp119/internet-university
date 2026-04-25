'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign, CheckCircle, XCircle, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { track } from '@vercel/analytics';
import { supabase } from '@/lib/supabase';

interface PayoutRequest {
  id: string;
  affiliate_id: string;
  amount: number;
  upi_id: string;
  status: string;
  requested_at: string;
  processed_at: string | null;
  notes: string | null;
  affiliates: {
    name: string;
    email: string;
  };
}

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<PayoutRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadPayouts();
  }, []);

  const loadPayouts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('payout_requests')
        .select(`
          *,
          affiliates (
            name,
            email,
            upi_id
          )
        `)
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setPayouts(data || []);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to load payouts' });
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayout = async (payoutId: string, status: 'paid' | 'rejected') => {
    setProcessingId(payoutId);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('payout_requests')
        .update({
          status,
          processed_at: new Date().toISOString(),
          notes: status === 'paid' ? 'Paid via UPI' : 'Rejected',
        })
        .eq('id', payoutId);

      if (error) throw error;

      // If approved, update affiliate totals
      if (status === 'paid') {
        const payout = payouts.find((p) => p.id === payoutId);
        if (payout) {
          // Call the database function to complete payout
          const { error: updateError } = await supabase.rpc('complete_payout', {
            p_payout_id: payoutId,
          });

          if (updateError) {
            console.error('Failed to update affiliate totals:', updateError);
          }
        }
      }

      setMessage({
        type: 'success',
        text: `Payout ${status} successfully`,
      });

      track('admin_payout_processed', { payoutId, status });
      loadPayouts();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to process payout' });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const pendingPayouts = payouts.filter((p) => p.status === 'pending');
  const processedPayouts = payouts.filter((p) => p.status !== 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-[#E11D48] transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E11D48] to-[#FB7185] rounded-xl flex items-center justify-center">
                  <span className="text-xl">🎓</span>
                </div>
                <div>
                  <h1 className="text-lg font-black text-gray-900">Admin Dashboard</h1>
                  <p className="text-xs text-gray-500">Payout Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-200">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="text-yellow-600" size={24} />
              <span className="text-sm font-medium text-gray-600">Pending Payouts</span>
            </div>
            <p className="text-3xl font-black text-gray-900">{pendingPayouts.length}</p>
            <p className="text-sm text-gray-500 mt-1">
              Total: ₹{pendingPayouts.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="text-green-600" size={24} />
              <span className="text-sm font-medium text-gray-600">Paid This Month</span>
            </div>
            <p className="text-3xl font-black text-gray-900">
              {payouts.filter((p) => p.status === 'paid').length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200">
            <div className="flex items-center gap-3 mb-3">
              <XCircle className="text-red-600" size={24} />
              <span className="text-sm font-medium text-gray-600">Rejected</span>
            </div>
            <p className="text-3xl font-black text-gray-900">
              {payouts.filter((p) => p.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 flex items-center gap-2 px-4 py-3 rounded-xl border ${
              message.type === 'success'
                ? 'text-green-600 bg-green-50 border-green-200'
                : 'text-red-600 bg-red-50 border-red-200'
            }`}
          >
            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        {/* Pending Payouts */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-8 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-amber-50">
            <div className="flex items-center gap-3">
              <Clock className="text-yellow-600" size={24} />
              <h2 className="text-xl font-black text-gray-900">Pending Payout Requests</h2>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : pendingPayouts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <DollarSign className="mx-auto mb-3 opacity-50" size={40} />
              <p>No pending payout requests</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Affiliate</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">UPI ID</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPayouts.map((payout) => (
                    <tr key={payout.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(payout.requested_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-bold text-gray-900">{payout.affiliates.name}</p>
                          <p className="text-sm text-gray-500">{payout.affiliates.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-mono text-gray-600">
                        {payout.upi_id}
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-lg font-black text-gray-900">₹{payout.amount}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleProcessPayout(payout.id, 'paid')}
                            disabled={processingId === payout.id}
                            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle size={14} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleProcessPayout(payout.id, 'rejected')}
                            disabled={processingId === payout.id}
                            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Processed Payouts */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
            <div className="flex items-center gap-3">
              <DollarSign className="text-gray-600" size={24} />
              <h2 className="text-xl font-black text-gray-900">Payout History</h2>
            </div>
          </div>

          {processedPayouts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No processed payouts yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Affiliate</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">UPI ID</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Processed</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {processedPayouts.map((payout) => (
                    <tr key={payout.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(payout.requested_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-bold text-gray-900">{payout.affiliates.name}</p>
                          <p className="text-sm text-gray-500">{payout.affiliates.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-mono text-gray-600">
                        {payout.upi_id}
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-lg font-black text-gray-900">₹{payout.amount}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                            payout.status
                          )}`}
                        >
                          {payout.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {payout.processed_at
                          ? new Date(payout.processed_at).toLocaleDateString('en-IN')
                          : '-'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {payout.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 Internet University. Admin Dashboard.
          </p>
        </div>
      </footer>
    </div>
  );
}
