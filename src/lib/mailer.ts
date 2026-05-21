import nodemailer from 'nodemailer';

// Creates a Gmail SMTP transporter using App Password
export function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

// Sends email — silently fails if Gmail not configured
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('Email skipped — GMAIL_USER / GMAIL_APP_PASSWORD not configured');
    return false;
  }

  await transporter.sendMail({
    from: `"Janhavi Counselling" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
    text,
  });

  return true;
}
