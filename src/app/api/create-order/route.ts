import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', bookingData, userId } = body;

    // Check if Razorpay credentials are configured
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === 'your_razorpay_key_id') {
      // Return demo order for development
      return NextResponse.json({
        id: null,
        amount: amount * 100,
        currency,
        status: 'demo_mode',
        message: 'Razorpay not configured. Running in demo mode.',
      });
    }

    // Create Razorpay order
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `booking_${Date.now()}`,
      notes: {
        userId,
        therapyType: bookingData.therapyType,
        date: bookingData.date,
        time: bookingData.time,
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', message: error.message },
      { status: 500 }
    );
  }
}
