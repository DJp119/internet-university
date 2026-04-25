'use client';

import { useCallback } from 'react';
import { getStoredReferralCode } from './referrals';
import { createDonation } from './donations';

/**
 * Hook for handling donations with referral attribution
 * Returns a function that can be called when a donation is completed
 */
export function useReferralDonation() {
  const handleDonationComplete = useCallback(async (params: {
    donorName?: string;
    donorEmail?: string;
    amount: number;
    paymentMethod: string;
    paymentId?: string;
    status?: string;
  }) => {
    try {
      // Get stored referral code from cookie/localStorage
      const referralCode = getStoredReferralCode();

      // Create donation with referral attribution
      const donation = await createDonation({
        ...params,
        referralCode: referralCode || undefined,
        status: params.status || 'completed',
      });

      return { success: true, donation };
    } catch (error: any) {
      console.error('Failed to process donation:', error);
      return { success: false, error: error.message };
    }
  }, []);

  return { handleDonationComplete };
}
