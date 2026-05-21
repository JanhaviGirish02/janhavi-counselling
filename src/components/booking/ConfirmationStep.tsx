'use client';

import React from 'react';
import Link from 'next/link';
import { BookingData } from '@/app/book/page';
import { format } from 'date-fns';
import { CheckCircle, Calendar, Clock, Video, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  bookingData: BookingData;
}

const typeLabels: Record<string, string> = {
  individual: 'Individual Therapy',
  couple: 'Couple Therapy',
  family: 'Family Therapy',
};

export default function ConfirmationStep({ bookingData }: Props) {
  return (
    <div className="space-y-8 text-center max-w-lg mx-auto">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center mx-auto"
      >
        <CheckCircle size={40} className="text-sage-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h2 className="font-heading text-3xl font-bold text-charcoal">
          Session Confirmed! 🎉
        </h2>
        <p className="text-charcoal-lighter">
          Your therapy session has been booked successfully. 
          You&apos;ll receive a confirmation email with the meeting link.
        </p>
      </motion.div>

      {/* Booking Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card text-left"
      >
        <h3 className="font-medium text-charcoal mb-4 text-center">Booking Details</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-beige-50 rounded-xl">
            <Calendar size={18} className="text-sage-500" />
            <div>
              <p className="text-xs text-charcoal-lighter">Date</p>
              <p className="text-sm font-medium text-charcoal">
                {bookingData.date ? format(new Date(bookingData.date), 'EEEE, MMMM d, yyyy') : '-'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-beige-50 rounded-xl">
            <Clock size={18} className="text-sage-500" />
            <div>
              <p className="text-xs text-charcoal-lighter">Time</p>
              <p className="text-sm font-medium text-charcoal">{bookingData.time} IST (60 min)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-beige-50 rounded-xl">
            <Video size={18} className="text-sage-500" />
            <div>
              <p className="text-xs text-charcoal-lighter">Session Type</p>
              <p className="text-sm font-medium text-charcoal">
                {typeLabels[bookingData.therapyType]} — Online (Video Call)
              </p>
            </div>
          </div>

          {bookingData.bookingId && (
            <div className="pt-3 border-t border-beige-100">
              <p className="text-xs text-charcoal-lighter">
                Booking ID: <span className="font-mono">{bookingData.bookingId}</span>
              </p>
              {bookingData.paymentId && (
                <p className="text-xs text-charcoal-lighter mt-1">
                  Payment ID: <span className="font-mono">{bookingData.paymentId}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card text-left"
      >
        <h3 className="font-medium text-charcoal mb-3">What happens next?</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-charcoal-light">
            <span className="w-5 h-5 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
            You&apos;ll receive a confirmation email with your session details
          </li>
          <li className="flex items-start gap-3 text-sm text-charcoal-light">
            <span className="w-5 h-5 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
            A Google Meet link will be shared 30 minutes before the session
          </li>
          <li className="flex items-start gap-3 text-sm text-charcoal-light">
            <span className="w-5 h-5 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
            Join the video call at your scheduled time from a quiet, private space
          </li>
        </ul>
      </motion.div>

      {/* Important Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="p-4 bg-beige-100 rounded-2xl border border-beige-200 text-left"
      >
        <p className="text-xs text-charcoal-light leading-relaxed">
          <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before the session. 
          Cancellations within 24 hours may be charged. See our{' '}
          <Link href="/cancellation-policy" className="text-sage-500 underline">cancellation policy</Link>{' '}
          for details.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
      >
        <Link href="/my-bookings" className="btn-primary">
          View My Bookings
        </Link>
        <Link href="/" className="btn-secondary">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
