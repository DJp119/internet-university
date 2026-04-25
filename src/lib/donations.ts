import { supabase, getAffiliateByCode, getCommissionRate, getAffiliateStats } from './referrals';

/**
 * Create a donation record with optional referral attribution
 */
export async function createDonation(params: {
  donorName?: string;
  donorEmail?: string;
  amount: number;
  paymentMethod: string;
  paymentId?: string;
  referralCode?: string | null;
  status?: string;
}) {
  let affiliateId: string | null = null;
  let commissionRate = 0;
  let commissionAmount = 0;

  // If there's a referral code, attribute the donation
  if (params.referralCode) {
    const affiliate = await getAffiliateByCode(params.referralCode);
    if (affiliate) {
      affiliateId = affiliate.id;

      // Get affiliate's total monthly donations to determine tier
      const stats = await getAffiliateStats(affiliate.id);
      const totalMonthly = stats.totalAmount + params.amount;
      commissionRate = getCommissionRate(totalMonthly);
      commissionAmount = (params.amount * commissionRate) / 100;
    }
  }

  const { data, error } = await supabase
    .from('donations')
    .insert({
      donor_name: params.donorName,
      donor_email: params.donorEmail,
      amount: params.amount,
      payment_method: params.paymentMethod,
      payment_id: params.paymentId,
      referral_code: params.referralCode,
      affiliate_id: affiliateId,
      commission_rate: commissionRate,
      commission_amount: commissionAmount,
      status: params.status || 'pending',
    })
    .select()
    .single();

  if (error) throw error;

  // Update affiliate totals if attributed
  if (affiliateId) {
    await updateAffiliateTotals(affiliateId, params.amount, commissionAmount);
  }

  return data;
}

/**
 * Update affiliate totals after a donation
 */
async function updateAffiliateTotals(
  affiliateId: string,
  donationAmount: number,
  commissionAmount: number
) {
  const { error } = await supabase.rpc('update_affiliate_totals', {
    p_affiliate_id: affiliateId,
    p_donation_amount: donationAmount,
    p_commission_amount: commissionAmount,
  });

  if (error) {
    // Fallback: direct update if RPC function doesn't exist
    await supabase.rpc('update_affiliate_stats', {
      p_affiliate_id: affiliateId,
      p_donation_amount: donationAmount,
      p_commission_amount: commissionAmount,
    });
  }
}

/**
 * Attribute a donation to a referral (for existing donations)
 */
export async function attributeDonation(donationId: string, referralCode: string) {
  const affiliate = await getAffiliateByCode(referralCode);
  if (!affiliate) return null;

  // Get the donation to calculate commission
  const { data: donation } = await supabase
    .from('donations')
    .select('amount')
    .eq('id', donationId)
    .single();

  if (!donation) return null;

  const stats = await getAffiliateStats(affiliate.id);
  const totalMonthly = stats.totalAmount + donation.amount;
  const commissionRate = getCommissionRate(totalMonthly);
  const commissionAmount = (donation.amount * commissionRate) / 100;

  const { data, error } = await supabase
    .from('donations')
    .update({
      referral_code: referralCode,
      affiliate_id: affiliate.id,
      commission_rate: commissionRate,
      commission_amount: commissionAmount,
    })
    .eq('id', donationId)
    .select()
    .single();

  if (error) throw error;

  await updateAffiliateTotals(affiliate.id, donation.amount, commissionAmount);

  return data;
}

/**
 * Process a payout request (admin function)
 */
export async function processPayoutRequest(params: {
  payoutId: string;
  status: 'pending' | 'processing' | 'paid' | 'rejected';
  notes?: string;
}) {
  const updateData: any = {
    status: params.status,
    processed_at: new Date().toISOString(),
  };

  if (params.notes) {
    updateData.notes = params.notes;
  }

  const { data, error } = await supabase
    .from('payout_requests')
    .update(updateData)
    .eq('id', params.payoutId)
    .select()
    .single();

  if (error) throw error;

  // If paid, update affiliate's paid_payout and reduce pending_payout
  if (params.status === 'paid') {
    await supabase.rpc('complete_payout', {
      p_payout_id: params.payoutId,
    });
  }

  return data;
}

/**
 * Get donation by payment ID
 */
export async function getDonationByPaymentId(paymentId: string) {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('payment_id', paymentId)
    .single();

  if (error) return null;
  return data;
}

/**
 * Update donation status
 */
export async function updateDonationStatus(donationId: string, status: string) {
  const { data, error } = await supabase
    .from('donations')
    .update({ status })
    .eq('id', donationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all donations (for admin dashboard)
 */
export async function getAllDonations(limit = 100) {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

/**
 * Get pending payout requests (for admin dashboard)
 */
export async function getPendingPayoutRequests() {
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
    .eq('status', 'pending')
    .order('requested_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
