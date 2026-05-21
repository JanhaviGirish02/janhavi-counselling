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

    // Send notification to admin
    try {
      const { sendEmail } = await import('@/lib/mailer');
      const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: `New Contact Form Message from ${name}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
              <h2 style="color:#2D2D2D;border-bottom:2px solid #8FAF9D;padding-bottom:12px">New Contact Form Message</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p style="background:#F6F1EB;padding:16px;border-radius:8px">${message.replace(/\n/g, '<br/>')}</p>
              <p style="color:#6b7280;font-size:14px;margin-top:16px">Reply directly to ${email}</p>
            </div>`,
        });

        // Auto-reply to sender
        await sendEmail({
          to: email,
          subject: 'Thanks for reaching out — Janhavi Girish',
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
              <h2 style="color:#2D2D2D">Thank you for reaching out 🌿</h2>
              <p style="color:#4b5563">Hi ${name}, I've received your message and will get back to you within 24–48 hours.</p>
              <p style="color:#4b5563">If you'd like to book a session directly, you can do so at any time through the website.</p>
              <p style="margin-top:24px;color:#8FAF9D;font-weight:600">Warm regards,<br/>Janhavi Girish<br/>Counselling Psychologist</p>
            </div>`,
        });
      }
    } catch (e) {
      console.error('Contact email failed:', e);
    }

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
