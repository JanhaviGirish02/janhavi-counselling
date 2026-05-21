import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const typeLabels: Record<string, string> = {
      individual: 'Individual Therapy',
      couple: 'Couple Therapy',
      family: 'Family Therapy',
    };

    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
    const clientEmail = body.email;

    // Email to admin
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `New Booking: ${body.fullName} — ${typeLabels[body.therapyType] || body.therapyType}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
            <h2 style="color:#2D2D2D;border-bottom:2px solid #8FAF9D;padding-bottom:12px">🆕 New Session Booking</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;width:140px">Booking ID</td><td style="padding:8px 0;font-weight:600">${body.bookingId}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Client Name</td><td style="padding:8px 0;font-weight:600">${body.fullName}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0">${body.email}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${body.phone}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Session Type</td><td style="padding:8px 0">${typeLabels[body.therapyType] || body.therapyType}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Date</td><td style="padding:8px 0">${body.date}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Time</td><td style="padding:8px 0">${body.time}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Language</td><td style="padding:8px 0">${body.preferredLanguage || 'English'}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Payment</td><td style="padding:8px 0;color:#059669;font-weight:600">${body.paymentId ? '✅ Successful' : '⏳ Pending'}</td></tr>
            </table>
            <p style="margin-top:24px;padding:12px;background:#F6F1EB;border-radius:8px;font-size:14px;color:#6b7280">This is an automated notification from Janhavi Counselling.</p>
          </div>`,
      });
    }

    // Confirmation email to client
    if (clientEmail) {
      await sendEmail({
        to: clientEmail,
        subject: `Booking Confirmed — ${typeLabels[body.therapyType] || body.therapyType} with Janhavi Girish`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
            <h2 style="color:#2D2D2D">Your session is booked! 🌿</h2>
            <p style="color:#4b5563">Hi ${body.fullName}, your session has been confirmed. Here are your details:</p>
            <table style="width:100%;border-collapse:collapse;margin:16px 0">
              <tr><td style="padding:8px 0;color:#6b7280;width:140px">Session Type</td><td style="padding:8px 0;font-weight:600">${typeLabels[body.therapyType] || body.therapyType}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Date</td><td style="padding:8px 0;font-weight:600">${body.date}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Time</td><td style="padding:8px 0;font-weight:600">${body.time}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Booking ID</td><td style="padding:8px 0">${body.bookingId}</td></tr>
            </table>
            <p style="color:#4b5563">You will receive the Google Meet/Zoom link 15 minutes before your session. Please be in a quiet, private space.</p>
            <p style="color:#4b5563">If you need to reschedule or cancel, please do so at least 24 hours in advance.</p>
            <p style="margin-top:24px;color:#8FAF9D;font-weight:600">Warm regards,<br/>Janhavi Girish<br/>Counselling Psychologist</p>
          </div>`,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Email notifications sent',
    });
  } catch (error: any) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
