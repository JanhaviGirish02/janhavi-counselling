import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const { email, fullName, meetLink, date, time } = await req.json();

    if (!email || !meetLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sendEmail({
      to: email,
      subject: 'Your Session Meet Link – Therapy with Janhavi',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a2535;">
          <h2 style="color: #385b81;">Your Session is Ready</h2>
          <p>Hi ${fullName},</p>
          <p>Your counselling session on <strong>${date}</strong> at <strong>${time}</strong> is confirmed.</p>
          <p>Please join the session using the Google Meet link below:</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${meetLink}" style="background-color: #385b81; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Join Google Meet
            </a>
          </div>
          <p style="font-size: 12px; color: #888;">Link: <a href="${meetLink}">${meetLink}</a></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 12px; color: #888;">
            Therapy with Janhavi Girish &bull; therapywithjanhaviofficial@gmail.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('send-meet-link error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
