import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nqunyhseqwokivuqwgmz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xdW55aHNlcXdva2l2dXF3Z216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDA1NDgsImV4cCI6MjA4OTA3NjU0OH0.PAMw9YC8X4FlS-nHB4kgz9xKSelYV5QaHGHBiVTunhA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
