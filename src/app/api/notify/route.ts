import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_WHATSAPP_FROM;
    const to = process.env.ADMIN_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !from || !to) {
      return NextResponse.json({
        success: false,
        message: 'WhatsApp notification not configured. Set up Twilio credentials.',
      });
    }

    const typeLabels: Record<string, string> = {
      individual: 'Individual Therapy',
      couple: 'Couple Therapy',
      family: 'Family Therapy',
    };

    const message = `🆕 *NEW SESSION BOOKED*

📋 *Booking ID:* ${body.bookingId}
👤 *Name:* ${body.fullName}
📱 *Phone:* ${body.phone}
📧 *Email:* ${body.email}
🧠 *Session:* ${typeLabels[body.therapyType] || body.therapyType}
📅 *Date:* ${body.date}
🕐 *Time:* ${body.time}
💳 *Payment:* ✅ ${body.paymentId ? 'Successful' : 'Pending'}
🗣️ *Language:* ${body.preferredLanguage || 'English'}`;

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const response = await fetch(url, {
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

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'WhatsApp notification sent',
      sid: result.sid,
    });
  } catch (error: any) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
