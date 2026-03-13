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
