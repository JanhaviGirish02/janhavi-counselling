import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-beige-50">
      <div className="max-w-3xl mx-auto">
        <div className="card prose prose-sm">
          <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">Terms & Conditions</h1>
          <p className="text-charcoal-lighter text-sm mb-8">Last updated: May 2026</p>

          <div className="space-y-6 text-charcoal-light text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">1. Services</h2>
              <p>
                Janhavi Girish provides professional counselling psychology services including 
                individual therapy, couple therapy, and family therapy conducted online via video call.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">2. Eligibility</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You must be 18 years or older for individual therapy (13+ for academic counselling with parental consent)</li>
                <li>Couple therapy requires consent from both partners</li>
                <li>Family therapy requires consent from all participating members</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">3. Booking & Payment</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All sessions must be booked and paid for in advance</li>
                <li>Payment is processed securely through Razorpay</li>
                <li>Session fees are non-refundable except as outlined in our cancellation policy</li>
                <li>Prices are subject to change with prior notice</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">4. Session Conduct</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Please join sessions from a quiet, private space</li>
                <li>Sessions start and end at the scheduled time</li>
                <li>Recording of sessions is not permitted without mutual consent</li>
                <li>Please ensure stable internet connectivity for video sessions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">5. Limitations</h2>
              <p>
                Counselling psychology services are not a substitute for psychiatric treatment, 
                emergency mental health services, or medical care. If you are in crisis, 
                please contact emergency services immediately.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">6. Confidentiality</h2>
              <p>
                All sessions and communications are confidential, subject to the exceptions 
                outlined in our Privacy Policy. I adhere to the ethical guidelines set by 
                the Rehabilitation Council of India (RCI).
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">7. Liability</h2>
              <p>
                While I strive to provide the best possible support, therapy outcomes vary 
                and cannot be guaranteed. I am not liable for decisions made by clients 
                outside of therapy sessions.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">8. Changes to Terms</h2>
              <p>
                These terms may be updated periodically. Continued use of services 
                constitutes acceptance of any changes.
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
