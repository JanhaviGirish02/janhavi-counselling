'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-sage-300 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">J</span>
              </div>
              <span className="font-heading text-xl font-semibold">Janhavi</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Creating a warm, safe, and judgment-free space for emotional healing, 
              self-growth, and meaningful change.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-sage-300 flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:janhavigirish@gmail.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-sage-300 flex items-center justify-center transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/#about', label: 'About Me' },
                { href: '/#therapy', label: 'Therapy Services' },
                { href: '/#areas', label: 'Areas of Support' },
                { href: '/#pricing', label: 'Pricing' },
                { href: '/book', label: 'Book a Session' },
                { href: '/#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-sage-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                { href: '/book?type=individual', label: 'Individual Therapy' },
                { href: '/book?type=couple', label: 'Couple Therapy' },
                { href: '/book?type=family', label: 'Family Therapy' },
                { href: '/book?type=sports', label: 'Sports Counselling' },
                { href: '/#areas', label: 'Academic Stress' },
              ].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-gray-400 hover:text-sage-300 transition-colors text-sm">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-sage-300" />
                janhavigirish@gmail.com
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="text-sage-300 text-xs mt-0.5">â—</span>
                Sessions: Monâ€“Sat, 10 AM â€“ 8 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Links & Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <Link href="/privacy-policy" className="hover:text-sage-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-sage-300 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/cancellation-policy" className="hover:text-sage-300 transition-colors">
                Cancellation Policy
              </Link>
              <Link href="/disclaimer" className="hover:text-sage-300 transition-colors">
                Disclaimer
              </Link>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              Â© {currentYear} Janhavi Girish. Made with <Heart size={12} className="text-rose-accent" /> All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div className="bg-charcoal border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <p className="text-[11px] text-gray-600 text-center leading-relaxed">
            This website does not provide emergency mental health services. If you are in immediate danger or crisis, 
            please contact emergency services or a crisis helpline. AASRA: 9820466626 | Vandrevala Foundation: 1860-2662-345
          </p>
        </div>
      </div>
    </footer>
  );
}

