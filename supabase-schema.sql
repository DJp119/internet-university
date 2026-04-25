-- Supabase Schema for Internet University
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Degrees table
CREATE TABLE IF NOT EXISTS degrees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  checklist_items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  user_name TEXT NOT NULL,
  degree_id UUID REFERENCES degrees(id),
  degree_title TEXT NOT NULL,
  certificate_code TEXT UNIQUE NOT NULL,
  gpa DECIMAL(3,2) NOT NULL,
  issue_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_id UUID REFERENCES certificates(id),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_certificates_issue_date ON certificates(issue_date DESC);
CREATE INDEX IF NOT EXISTS idx_certificates_user_name ON certificates(user_name);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE degrees ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public degrees are viewable by everyone"
  ON degrees FOR SELECT
  USING (true);

CREATE POLICY "Public certificates are viewable by everyone"
  ON certificates FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own data"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can create certificates"
  ON certificates FOR INSERT
  WITH CHECK (true);

-- ============================================
-- REFERRAL TRACKING SYSTEM TABLES
-- ============================================

-- Affiliates/Referral Partners table
CREATE TABLE IF NOT EXISTS affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  upi_id TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  total_referrals INTEGER DEFAULT 0,
  total_donations DECIMAL(10,2) DEFAULT 0,
  pending_payout DECIMAL(10,2) DEFAULT 0,
  paid_payout DECIMAL(10,2) DEFAULT 0,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Referral Click Tracking table
CREATE TABLE IF NOT EXISTS referral_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id),
  referral_code TEXT NOT NULL,
  visitor_id TEXT,
  landing_page TEXT,
  source TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Donations table with referral attribution
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name TEXT,
  donor_email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT,
  payment_id TEXT,
  referral_code TEXT,
  affiliate_id UUID REFERENCES affiliates(id),
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  commission_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Payout Requests table
CREATE TABLE IF NOT EXISTS payout_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id),
  amount DECIMAL(10,2) NOT NULL,
  upi_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  processed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Enable RLS for referral tables
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payout_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for affiliates
CREATE POLICY "Affiliates can view their own data"
  ON affiliates FOR SELECT
  USING (auth.uid() = id OR true);

CREATE POLICY "Affiliates can insert their own data"
  ON affiliates FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Affiliates can update their own data"
  ON affiliates FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for referral_tracking
CREATE POLICY "Public referral tracking is viewable"
  ON referral_tracking FOR SELECT
  USING (true);

CREATE POLICY "System can insert referral tracking"
  ON referral_tracking FOR INSERT
  WITH CHECK (true);

-- RLS Policies for donations
CREATE POLICY "Public donations are viewable"
  ON donations FOR SELECT
  USING (true);

CREATE POLICY "System can insert donations"
  ON donations FOR INSERT
  WITH CHECK (true);

-- RLS Policies for payout_requests
CREATE POLICY "Affiliates can view their own payout requests"
  ON payout_requests FOR SELECT
  USING (true);

CREATE POLICY "Affiliates can create payout requests"
  ON payout_requests FOR INSERT
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_affiliates_referral_code ON affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_tracking_code ON referral_tracking(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_tracking_clicked ON referral_tracking(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_referral ON donations(referral_code);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payout_requests_status ON payout_requests(status);
CREATE INDEX IF NOT EXISTS idx_payout_requests_affiliate ON payout_requests(affiliate_id);

-- ============================================
-- DATABASE FUNCTIONS FOR REFERRAL SYSTEM
-- ============================================

-- Function to update affiliate totals when a donation is made
CREATE OR REPLACE FUNCTION update_affiliate_totals(
  p_affiliate_id UUID,
  p_donation_amount DECIMAL(10,2),
  p_commission_amount DECIMAL(10,2)
)
RETURNS VOID AS $$
BEGIN
  UPDATE affiliates
  SET
    total_donations = COALESCE(total_donations, 0) + p_donation_amount,
    pending_payout = COALESCE(pending_payout, 0) + p_commission_amount,
    total_referrals = COALESCE(total_referrals, 0) + 1
  WHERE id = p_affiliate_id;
END;
$$ LANGUAGE plpgsql;

-- Function to complete a payout (move from pending to paid)
CREATE OR REPLACE FUNCTION complete_payout(p_payout_id UUID)
RETURNS VOID AS $$
DECLARE
  v_affiliate_id UUID;
  v_amount DECIMAL(10,2);
BEGIN
  -- Get affiliate_id and amount from payout request
  SELECT affiliate_id, amount INTO v_affiliate_id, v_amount
  FROM payout_requests
  WHERE id = p_payout_id;

  -- Update affiliate totals
  UPDATE affiliates
  SET
    pending_payout = COALESCE(pending_payout, 0) - v_amount,
    paid_payout = COALESCE(paid_payout, 0) + v_amount
  WHERE id = v_affiliate_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get affiliate monthly stats (for commission tier calculation)
CREATE OR REPLACE FUNCTION get_affiliate_monthly_donations(p_affiliate_id UUID)
RETURNS DECIMAL(10,2) AS $$
DECLARE
  v_total DECIMAL(10,2);
BEGIN
  SELECT COALESCE(SUM(amount), 0) INTO v_total
  FROM donations
  WHERE affiliate_id = p_affiliate_id
    AND status = 'completed'
    AND created_at >= DATE_TRUNC('month', NOW());

  RETURN v_total;
END;
$$ LANGUAGE plpgsql;

-- Insert initial degrees
INSERT INTO degrees (slug, title, subtitle, icon, color, checklist_items) VALUES
  ('abusing', 'Bachelor in Abusing', 'Online Comment Section Warfare', '🤬', '#EF4444',
   '[{"id":"1","text":"Won a comment section fight"},{"id":"2","text":"Used source: trust me bro"},{"id":"3","text":"Typed a paragraph in anger"},{"id":"4","text":"Used caps lock in argument"},{"id":"5","text":"Said who asked?"},{"id":"6","text":"Replied with meme instead of explanation"},{"id":"7","text":"Deleted comment after posting"},{"id":"8","text":"Argued about something you didn''t research"},{"id":"9","text":"Used bro listen"},{"id":"10","text":"Won an internet debate"}]'::jsonb),
  ('overthinking', 'Bachelor in Overthinking', 'Advanced Catastrophic Thinking', '🤔', '#8B5CF6',
   '[{"id":"1","text":"Re-read message 5 times"},{"id":"2","text":"Imagined fake arguments"},{"id":"3","text":"Googled symptoms unnecessarily"},{"id":"4","text":"Checked last seen multiple times"},{"id":"5","text":"Thought about conversation from years ago"},{"id":"6","text":"Drafted reply but didn''t send"},{"id":"7","text":"Overanalyzed emoji meaning"},{"id":"8","text":"Imagined worst case scenario"}]'::jsonb),
  ('procrastination', 'Bachelor in Procrastination', 'I''ll Start Tomorrow', '⏰', '#F59E0B',
   '[{"id":"1","text":"Watched productivity videos instead of working"},{"id":"2","text":"Made a to-do list but didn''t start"},{"id":"3","text":"Started working at 2 AM"},{"id":"4","text":"Opened YouTube for 5 minutes"},{"id":"5","text":"Cleaned room instead of doing work"},{"id":"6","text":"Scrolled Instagram instead of starting task"},{"id":"7","text":"Delayed deadline until last moment"}]'::jsonb),
  ('memes', 'Master in Memes', 'Meme Literacy & Application', '🐸', '#10B981',
   '[{"id":"1","text":"Sent meme instead of replying"},{"id":"2","text":"Tagged friends in memes"},{"id":"3","text":"Saved memes for future use"},{"id":"4","text":"Used meme in serious argument"},{"id":"5","text":"Followed 10 meme pages"},{"id":"6","text":"Shared meme at 3AM"}]'::jsonb);
