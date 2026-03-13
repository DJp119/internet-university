import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userName, degreeId, degreeTitle } = await request.json();

    // Generate certificate code
    const certificateCode = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const gpa = (3.5 + Math.random() * 0.5).toFixed(2);
    const issueDate = new Date().toISOString();

    // Insert certificate into Supabase
    const { data, error } = await supabase
      .from('certificates')
      .insert([
        {
          user_name: userName,
          degree_id: degreeId,
          degree_title: degreeTitle,
          certificate_code: certificateCode,
          gpa: parseFloat(gpa),
          issue_date: issueDate,
        },
      ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      certificateId: (data as any)?.[0]?.id || certificateCode,
    });
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create certificate' },
      { status: 500 }
    );
  }
}
