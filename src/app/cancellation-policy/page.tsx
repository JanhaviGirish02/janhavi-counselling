import React from 'react';
import Link from 'next/link';

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-beige-50">
      <div className="max-w-3xl mx-auto">
        <div className="card prose prose-sm">
          <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">Cancellation & Refund Policy</h1>
          <p className="text-charcoal-lighter text-sm mb-8">Last updated: May 2026</p>

          <div className="space-y-6 text-charcoal-light text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Cancellation Policy</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h3 className="font-semibold text-green-800 mb-1">More than 24 hours before session</h3>
                  <p className="text-green-700">Full refund or free rescheduling</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <h3 className="font-semibold text-yellow-800 mb-1">12–24 hours before session</h3>
                  <p className="text-yellow-700">50% refund or rescheduling with ₹500 fee</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <h3 className="font-semibold text-red-800 mb-1">Less than 12 hours / No-show</h3>
                  <p className="text-red-700">No refund applicable</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Rescheduling</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You may reschedule up to 2 times per booking</li>
                <li>Rescheduling must be done at least 24 hours before the session</li>
                <li>Rescheduled sessions must be booked within 30 days of the original date</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Therapist Cancellation</h2>
              <p>
                In the rare event that I need to cancel a session, you will receive:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Full refund within 5–7 business days, OR</li>
                <li>Priority rescheduling at your convenience</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Refund Processing</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Refunds are processed within 5–7 business days</li>
                <li>Refunds are made to the original payment method</li>
                <li>For UPI payments, refunds may take 2–3 additional days</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">How to Cancel</h2>
              <p>
                To cancel or reschedule your session:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Log in to your account and go to &quot;My Bookings&quot;</li>
                <li>Or contact us via WhatsApp or email</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Exceptions</h2>
              <p>
                We understand that emergencies happen. In case of genuine medical or personal 
                emergencies, please reach out and we will work with you on a case-by-case basis.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-beige-200">
            <Link href="/" className="text-sage-500 text-sm hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
