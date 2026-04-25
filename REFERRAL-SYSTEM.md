# Referral/Affiliate Tracking System

## Overview

Internet University now includes a complete referral tracking system that allows partners to earn commissions (10-25%) on donations they refer.

## Features

- **Unique Referral Links**: Each affiliate gets a unique code (e.g., `JOHN123`)
- **30-Day Cookie Tracking**: Referrals are tracked for 30 days via cookies
- **Tiered Commission Structure**:
  - Bronze (₹0-₹5,000): 10%
  - Silver (₹5,001-₹20,000): 15%
  - Gold (₹20,001-₹50,000): 20%
  - Platinum (₹50,000+): 25%
- **Real-Time Dashboard**: Affiliates can track clicks, donations, and earnings
- **UPI Payouts**: Instant payout requests to UPI IDs
- **Fraud Prevention**: Basic visitor tracking to prevent duplicate referrals

## Database Schema

### Tables

1. **affiliates** - Stores partner information
   - `id`, `name`, `email`, `upi_id`, `referral_code`
   - `total_referrals`, `total_donations`, `pending_payout`, `paid_payout`
   - `is_approved`, `created_at`

2. **referral_tracking** - Tracks referral clicks
   - `id`, `affiliate_id`, `referral_code`, `visitor_id`
   - `landing_page`, `source`, `clicked_at`

3. **donations** - Tracks donations with referral attribution
   - `id`, `donor_name`, `donor_email`, `amount`
   - `payment_method`, `payment_id`, `referral_code`
   - `affiliate_id`, `commission_rate`, `commission_amount`
   - `status`, `created_at`

4. **payout_requests** - Manages payout workflow
   - `id`, `affiliate_id`, `amount`, `upi_id`
   - `status`, `requested_at`, `processed_at`, `notes`

### Database Functions

- `update_affiliate_totals()` - Updates affiliate stats on donation
- `complete_payout()` - Processes payout and updates totals
- `get_affiliate_monthly_donations()` - Gets monthly total for tier calculation

## Pages

### 1. Affiliate Signup (`/affiliate/signup`)
- Registration form (name, email, UPI ID)
- Auto-generates unique referral code
- Auto-approves new affiliates

### 2. Affiliate Dashboard (`/affiliate/dashboard`)
- Stats: clicks, donations, pending/paid payouts
- Referral link generator with copy/share
- Payout request form (min ₹500)
- Donation history with commission details
- Payout history

### 3. Affiliate Landing Page (`/affiliate/[code]`)
- Public page for each affiliate
- Custom messaging showing affiliate name
- Ko-fi iframe and UPI QR donation options
- Auto-tracks referral clicks

### 4. Admin Payout Dashboard (`/admin/payouts`)
- View all pending payout requests
- Approve/reject payouts
- Payout history with status tracking

## How It Works

### Referral Flow

1. **User clicks referral link**: `internetuni.netlify.app/donate?ref=JOHN123`
2. **Code stored in cookie/localStorage**: 30-day expiry
3. **Click tracked**: Stored in `referral_tracking` table
4. **User donates**: Ko-fi or UPI
5. **Donation attributed**: System checks for referral code
6. **Commission calculated**: Based on affiliate's monthly tier
7. **Affiliate earns**: Commission added to `pending_payout`

### Payout Flow

1. **Affiliate requests payout**: Via dashboard (min ₹500)
2. **Admin notified**: Appears in `/admin/payouts`
3. **Admin approves**: Processes UPI payment manually
4. **System updates**: `pending_payout` → `paid_payout`

## Files Created

```
src/
├── lib/
│   ├── referrals.ts          # Referral tracking utilities
│   └── donations.ts          # Donation processing
├── app/
│   ├── donate/page.tsx       # Updated with referral handling
│   ├── affiliate/
│   │   ├── signup/page.tsx   # Affiliate registration
│   │   ├── dashboard/page.tsx # Affiliate dashboard
│   │   └── [code]/page.tsx   # Public affiliate page
│   └── admin/payouts/page.tsx # Admin payout management
supabase-schema.sql            # Updated with referral tables
```

## Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Setup Instructions

### 1. Run Database Migration

Open Supabase SQL Editor and run:

```sql
-- Copy entire supabase-schema.sql content
-- Or just the REFERRAL TRACKING SYSTEM TABLES section
```

### 2. Verify Tables

Check in Supabase Dashboard:
- `affiliates` table exists
- `referral_tracking` table exists
- `donations` table exists
- `payout_requests` table exists

### 3. Test Referral Flow

1. Go to `/affiliate/signup` and create a test affiliate
2. Copy the referral link from dashboard
3. Open in incognito window
4. Make a test donation
5. Check dashboard for commission

### 4. Test Payout Flow

1. In affiliate dashboard, request a payout
2. Go to `/admin/payouts`
3. Approve the payout
4. Verify affiliate's `pending_payout` decreased

## API Functions

### Client-Side (referrals.ts)

```typescript
// Generate referral code
generateReferralCode(name: string): string

// Get commission rate
getCommissionRate(totalMonthlyDonations: number): number

// Get affiliate by code
getAffiliateByCode(referralCode: string): Promise<Affiliate | null>

// Track click
trackReferralClick(params: { referralCode, visitorId, landingPage, source })

// Get stats
getAffiliateStats(affiliateId: string): Promise<Stats>

// Create payout
createPayoutRequest(params: { affiliateId, amount, upiId })
```

### Server-Side (donations.ts)

```typescript
// Create donation with attribution
createDonation(params: {
  donorName, donorEmail, amount, paymentMethod,
  paymentId, referralCode, status
})

// Attribute existing donation
attributeDonation(donationId: string, referralCode: string)

// Process payout (admin)
processPayoutRequest(params: { payoutId, status, notes })
```

## Security

### Row Level Security (RLS)

- Affiliates can only view/edit their own data
- Public can view donations (transparency)
- Payout requests visible to affiliate and admin

### Fraud Prevention

- Visitor ID tracking (localStorage)
- 24-hour duplicate click detection
- Minimum payout threshold (₹500)
- Admin approval for payouts

## Commission Calculation

```typescript
// Example: Affiliate with ₹18,000 monthly donations
// New donation: ₹5,000
// New total: ₹23,000 → Gold tier (20%)
// Commission: ₹5,000 × 20% = ₹1,000
```

## Testing Checklist

- [ ] Affiliate signup works
- [ ] Referral code is unique
- [ ] Referral link tracks clicks
- [ ] Donation attributes to affiliate
- [ ] Commission calculated correctly
- [ ] Dashboard shows real-time stats
- [ ] Payout request works (min ₹500)
- [ ] Admin can approve/reject payouts
- [ ] Affiliate landing page loads
- [ ] Cookie persists for 30 days

## Future Enhancements

- [ ] Ko-fi webhook integration for auto-attribution
- [ ] Email notifications for payouts
- [ ] Export reports (CSV/PDF)
- [ ] Affiliate tiers dashboard
- [ ] Referral leaderboards
- [ ] Marketing assets (banners, images)
- [ ] Multi-level referrals (affiliate refers affiliate)

## Support

For issues or questions:
- Check Supabase logs for database errors
- Review browser console for client errors
- Test in incognito mode to avoid cookie conflicts
