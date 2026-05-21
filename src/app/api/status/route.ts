import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    firebase: !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your_api_key_here'
    ),
    razorpay: !!(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID &&
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID !== 'your_razorpay_key_id_here'
    ),
    email: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD),
    adminEmail: process.env.ADMIN_EMAIL || null,
  });
}
