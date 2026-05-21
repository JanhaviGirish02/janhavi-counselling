import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData, userId } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: 'Payment configuration missing' },
        { status: 500 }
      );
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Payment verified - create booking
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // In production, save to Firebase here
    // Also trigger WhatsApp notification

    // Send WhatsApp notification to admin
    try {
      await sendWhatsAppNotification(bookingData, bookingId);
    } catch (e) {
      console.error('WhatsApp notification failed:', e);
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Payment verified and booking confirmed',
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

async function sendWhatsAppNotification(bookingData: any, bookingId: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.ADMIN_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !from || !to) {
    console.log('WhatsApp notification skipped - not configured');
    return;
  }

  const typeLabels: Record<string, string> = {
    individual: 'Individual Therapy',
    couple: 'Couple Therapy',
    family: 'Family Therapy',
  };

  const message = `🆕 *NEW SESSION BOOKED*

📋 *Booking ID:* ${bookingId}
👤 *Name:* ${bookingData.fullName}
📱 *Phone:* ${bookingData.phone}
📧 *Email:* ${bookingData.email}
🧠 *Session:* ${typeLabels[bookingData.therapyType] || bookingData.therapyType}
📅 *Date:* ${bookingData.date}
🕐 *Time:* ${bookingData.time}
💳 *Payment:* ✅ Successful
🗣️ *Language:* ${bookingData.preferredLanguage}
📝 *Concern:* ${bookingData.mainConcern}`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: from,
      To: to,
      Body: message,
    }),
  });
}
