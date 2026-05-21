import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // In production, you could:
    // 1. Save to Firebase
    // 2. Send email notification
    // 3. Send WhatsApp notification

    // For now, log and return success
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json({
      success: true,
      message: 'Message received. We\'ll get back to you soon!',
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
