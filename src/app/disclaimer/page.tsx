import React from 'react';
import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-beige-50">
      <div className="max-w-3xl mx-auto">
        <div className="card prose prose-sm">
          <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">Disclaimer</h1>
          <p className="text-charcoal-lighter text-sm mb-8">Last updated: May 2026</p>

          <div className="space-y-6 text-charcoal-light text-sm leading-relaxed">
            <div className="p-5 bg-red-50 rounded-xl border border-red-100">
              <h2 className="font-heading text-lg font-semibold text-red-800 mb-2">⚠️ Important Notice</h2>
              <p className="text-red-700">
                This website does not provide emergency mental health services. If you are in 
                immediate danger or experiencing a mental health crisis, please contact emergency 
                services or a crisis helpline immediately.
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-red-700 font-medium">India Crisis Helplines:</p>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• AASRA: 9820466726</li>
                  <li>• Vandrevala Foundation: 1860-2662-345 (24/7)</li>
                  <li>• iCall: 9152987821</li>
                  <li>• Emergency: 112</li>
                </ul>
              </div>
            </div>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Professional Disclaimer</h2>
              <p>
                The information provided on this website is for general informational purposes only 
                and does not constitute professional psychological advice. Each individual&apos;s mental 
                health needs are unique, and personalized support can only be provided within a 
                therapeutic relationship.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Scope of Services</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Services provided are counselling psychology services, NOT psychiatric or medical treatment</li>
                <li>I do not prescribe medication</li>
                <li>Therapy outcomes vary and cannot be guaranteed</li>
                <li>My services are not a substitute for emergency care</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Website Content</h2>
              <p>
                While we strive to keep information accurate and up-to-date, we make no 
                representations or warranties about the completeness or accuracy of the 
                information on this website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Online Therapy Limitations</h2>
              <p>
                Online therapy has limitations including potential technology issues, 
                confidentiality concerns related to digital communication, and may not be 
                suitable for all mental health conditions. If I assess that online therapy 
                is not appropriate for your situation, I will provide referrals.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">Qualifications</h2>
              <p>
                Janhavi Girish holds a Master&apos;s degree in Counselling Psychology and practices 
                in accordance with the ethical guidelines established by the Rehabilitation 
                Council of India (RCI).
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
