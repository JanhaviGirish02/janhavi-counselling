import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-beige-50">
      <div className="max-w-3xl mx-auto">
        <div className="card prose prose-sm">
          <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">Privacy Policy</h1>
          <p className="text-charcoal-lighter text-sm mb-8">Last updated: May 2026</p>

          <div className="space-y-6 text-charcoal-light text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">1. Introduction</h2>
              <p>
                Janhavi Girish (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your personal information 
                when you use our counselling services and website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">2. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Personal Information:</strong> Name, email, phone number, age, and emergency contact</li>
                <li><strong>Health Information:</strong> Mental health concerns, therapy preferences, and session notes</li>
                <li><strong>Payment Information:</strong> Transaction details (we do not store card numbers)</li>
                <li><strong>Usage Data:</strong> Website analytics and session booking history</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and personalize therapy services</li>
                <li>To schedule and manage appointments</li>
                <li>To process payments securely</li>
                <li>To communicate about your sessions</li>
                <li>To send booking confirmations and reminders</li>
                <li>To improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">4. Confidentiality</h2>
              <p>
                As a counselling psychologist, I am bound by professional ethics to maintain strict confidentiality. 
                All information shared during therapy sessions is kept confidential, except in cases where:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>There is imminent risk of harm to yourself or others</li>
                <li>Required by law or court order</li>
                <li>You provide written consent to share information</li>
                <li>There is suspected abuse of a child or vulnerable person</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">5. Data Security</h2>
              <p>
                We implement industry-standard security measures including SSL encryption, 
                secure databases, and encrypted communications to protect your information.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">6. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Razorpay:</strong> For secure payment processing</li>
                <li><strong>Firebase:</strong> For data storage and authentication</li>
                <li><strong>Google Meet:</strong> For video sessions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Receive a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-charcoal">8. Contact</h2>
              <p>
                For privacy-related concerns, contact us at:{' '}
                <a href="mailto:janhavi@example.com" className="text-sage-500">janhavi@example.com</a>
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
