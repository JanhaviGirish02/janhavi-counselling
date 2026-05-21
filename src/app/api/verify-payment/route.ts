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

    // Send email notification to admin + client
    try {
      await sendEmailNotification(bookingData, bookingId);
    } catch (e) {
      console.error('Email notification failed:', e);
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

async function sendEmailNotification(bookingData: any, bookingId: string) {
  const { sendEmail } = await import('@/lib/mailer');

  const typeLabels: Record<string, string> = {
    individual: 'Individual Therapy',
    couple: 'Couple Therapy',
    family: 'Family Therapy',
  };

  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;

  // Notify admin
  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: `✅ Payment Confirmed: ${bookingData.fullName} — ${typeLabels[bookingData.therapyType] || bookingData.therapyType}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
          <h2 style="color:#059669;border-bottom:2px solid #8FAF9D;padding-bottom:12px">✅ Payment Confirmed — New Booking</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px">Booking ID</td><td style="padding:8px 0;font-weight:600">${bookingId}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Client</td><td style="padding:8px 0;font-weight:600">${bookingData.fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0">${bookingData.email}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${bookingData.phone}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Session</td><td style="padding:8px 0">${typeLabels[bookingData.therapyType] || bookingData.therapyType}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Date</td><td style="padding:8px 0">${bookingData.date}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Time</td><td style="padding:8px 0">${bookingData.time}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Language</td><td style="padding:8px 0">${bookingData.preferredLanguage}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Main Concern</td><td style="padding:8px 0">${bookingData.mainConcern}</td></tr>
          </table>
        </div>`,
    });
  }

  // Confirm to client
  if (bookingData.email) {
    await sendEmail({
      to: bookingData.email,
      subject: `Booking Confirmed — ${typeLabels[bookingData.therapyType] || bookingData.therapyType} Session`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
          <h2 style="color:#2D2D2D">Your session is confirmed! 🌿</h2>
          <p style="color:#4b5563">Hi ${bookingData.fullName}, your payment was successful and your session is now booked.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px">Session</td><td style="padding:8px 0;font-weight:600">${typeLabels[bookingData.therapyType] || bookingData.therapyType}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Date</td><td style="padding:8px 0;font-weight:600">${bookingData.date}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Time</td><td style="padding:8px 0;font-weight:600">${bookingData.time}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Booking ID</td><td style="padding:8px 0">${bookingId}</td></tr>
          </table>
          <p style="color:#4b5563">You will receive the session link 15 minutes before your appointment. Please be in a quiet, private space.</p>
          <p style="margin-top:24px;color:#8FAF9D;font-weight:600">Warm regards,<br/>Janhavi Girish<br/>Counselling Psychologist</p>
        </div>`,
    });
  }
}
