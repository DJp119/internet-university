import { supabase } from './supabase';

export { supabase };

/**
 * Generate a unique referral code from a name
 */
export function generateReferralCode(name: string): string {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6);
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${cleanName}${randomSuffix}`;
}

/**
 * Get commission rate based on total monthly donations (tiered structure)
 */
export function getCommissionRate(totalMonthlyDonations: number): number {
  if (totalMonthlyDonations >= 50000) return 25.0; // Platinum
  if (totalMonthlyDonations >= 20000) return 20.0; // Gold
  if (totalMonthlyDonations >= 5000) return 15.0;  // Silver
  return 10.0; // Bronze
}

/**
 * Get affiliate by referral code
 */
export async function getAffiliateByCode(referralCode: string) {
  const { data, error } = await supabase
    .from('affiliates')
    .select('*')
    .eq('referral_code', referralCode)
    .eq('is_approved', true)
    .single();

  if (error) return null;
  return data;
}

/**
 * Track a referral click
 */
export async function trackReferralClick(params: {
  referralCode: string;
  visitorId?: string;
  landingPage?: string;
  source?: string;
}) {
  const affiliate = await getAffiliateByCode(params.referralCode);
  if (!affiliate) return null;

  const { data, error } = await supabase
    .from('referral_tracking')
    .insert({
      affiliate_id: affiliate.id,
      referral_code: params.referralCode,
      visitor_id: params.visitorId,
      landing_page: params.landingPage,
      source: params.source,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get affiliate stats
 */
export async function getAffiliateStats(affiliateId: string) {
  const { data: affiliate, error: affiliateError } = await supabase
    .from('affiliates')
    .select('*')
    .eq('id', affiliateId)
    .single();

  if (affiliateError) throw affiliateError;

  const { count: clickCount } = await supabase
    .from('referral_tracking')
    .select('*', { count: 'exact', head: true })
    .eq('affiliate_id', affiliateId);

  const { count: donationCount, data: donations } = await supabase
    .from('donations')
    .select('amount, commission_amount', { count: 'exact' })
    .eq('affiliate_id', affiliateId)
    .eq('status', 'completed');

  const totalAmount = donations?.reduce((sum, d) => sum + Number(d.amount || 0), 0) || 0;
  const totalEarned = donations?.reduce((sum, d) => sum + Number(d.commission_amount || 0), 0) || 0;

  return {
    ...affiliate,
    totalClicks: clickCount || 0,
    totalDonations: donationCount || 0,
    totalAmount,
    totalEarned,
  };
}

/**
 * Get all donations for an affiliate
 */
export async function getAffiliateDonations(affiliateId: string) {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('affiliate_id', affiliateId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get all payout requests for an affiliate
 */
export async function getAffiliatePayouts(affiliateId: string) {
  const { data, error } = await supabase
    .from('payout_requests')
    .select('*')
    .eq('affiliate_id', affiliateId)
    .order('requested_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Create a payout request
 */
export async function createPayoutRequest(params: {
  affiliateId: string;
  amount: number;
  upiId: string;
}) {
  const { data, error } = await supabase
    .from('payout_requests')
    .insert({
      affiliate_id: params.affiliateId,
      amount: params.amount,
      upi_id: params.upiId,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Check if a visitor has already been tracked for this affiliate (basic fraud prevention)
 */
export async function hasVisitorAlreadyTracked(params: {
  referralCode: string;
  visitorId: string;
  hours: number;
}) {
  const twentyFourHoursAgo = new Date(
    Date.now() - params.hours * 60 * 60 * 1000
  ).toISOString();

  const { count } = await supabase
    .from('referral_tracking')
    .select('*', { count: 'exact', head: true })
    .eq('referral_code', params.referralCode)
    .eq('visitor_id', params.visitorId)
    .gte('clicked_at', twentyFourHoursAgo);

  return (count || 0) > 0;
}

/**
 * Generate a unique visitor ID for tracking
 */
export function generateVisitorId(): string {
  if (typeof window === 'undefined') return '';

  let visitorId = localStorage.getItem('referral_visitor_id');
  if (!visitorId) {
    visitorId = `v_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('referral_visitor_id', visitorId);
  }
  return visitorId;
}

/**
 * Store referral code in cookie/localStorage for 30 days
 */
export function storeReferralCode(referralCode: string): void {
  if (typeof window === 'undefined') return;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);

  localStorage.setItem('referral_code', referralCode);
  localStorage.setItem('referral_expiry', expiryDate.toISOString());

  // Also set in cookie for server-side access
  document.cookie = `referral_code=${referralCode}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Get stored referral code if not expired
 */
export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;

  const expiry = localStorage.getItem('referral_expiry');
  if (expiry && new Date(expiry) < new Date()) {
    localStorage.removeItem('referral_code');
    localStorage.removeItem('referral_expiry');
    return null;
  }

  return localStorage.getItem('referral_code');
}
