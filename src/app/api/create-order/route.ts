import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', bookingData, userId } = body;

    // Check if Razorpay credentials are configured
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    console.log('Create-order API: Checking Razorpay config...');
    console.log('NEXT_PUBLIC_RAZORPAY_KEY_ID:', keyId ? `${keyId.substring(0, 15)}...` : 'NOT SET');
    console.log('RAZORPAY_KEY_SECRET:', keySecret ? '***HIDDEN***' : 'NOT SET');

    if (!keyId || !keySecret || keyId.includes('your_razorpay')) {
      console.log('Razorpay not configured. Running in demo mode.');
      console.log('keyId falsy:', !keyId, '| keySecret falsy:', !keySecret);
      return NextResponse.json({
        id: null,
        amount: amount * 100,
        currency,
        status: 'demo_mode',
        message: 'Razorpay not configured. Running in demo mode.',
      });
    }

    console.log('Razorpay configured. Creating order...');
    let Razorpay;
    try {
      Razorpay = require('razorpay');
    } catch (e: any) {
      console.error('Failed to load razorpay module:', e.message);
      return NextResponse.json({ error: 'Razorpay module not available', message: e.message }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: `booking_${Date.now()}`,
      notes: {
        userId,
        therapyType: bookingData?.therapyType,
        date: bookingData?.date,
        time: bookingData?.time,
      },
    });

    console.log('Razorpay order created successfully:', order.id);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Error creating order:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to create order', message: error?.message || String(error) },
      { status: 500 }
    );
  }
}
