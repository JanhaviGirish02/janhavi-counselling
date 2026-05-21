import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In production, save to Firebase Firestore
    // For now, return success
    const bookingId = body.bookingId || `booking_${Date.now()}`;

    // Trigger WhatsApp notification
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, bookingId }),
      });
    } catch (e) {
      console.log('Notification dispatch attempted');
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Booking saved successfully',
    });
  } catch (error: any) {
    console.error('Error saving booking:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'userId is required' },
      { status: 400 }
    );
  }

  // In production, fetch from Firebase Firestore
  return NextResponse.json({ bookings: [] });
}
