'use client';

import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Shield, Smartphone } from 'lucide-react';
import { BookingData } from '@/app/book/page';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const prices: Record<string, number> = {
  individual: 1500,
  couple: 3000,
  family: 4000,
  sports: 1500,
};

const typeLabels: Record<string, string> = {
  individual: 'Individual Therapy',
  couple: 'Couple Therapy',
  family: 'Family Therapy',
  sports: 'Sports Counselling',
};

export default function PaymentStep({ bookingData, updateBookingData, onNext, onPrev }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const amount = prices[bookingData.therapyType] || 1500;

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Create order via API
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          bookingData,
          userId: user?.uid,
        }),
      });

      const order = await response.json();

      if (!order.id) {
        // If Razorpay is not configured, simulate payment for demo
        await simulatePayment();
        return;
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Janhavi - Counselling Psychology',
        description: `${typeLabels[bookingData.therapyType]} Session`,
        order_id: order.id,
        handler: async function (response: any) {
          // Verify payment
          const verified = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingData,
              userId: user?.uid,
            }),
          });

          const result = await verified.json();
          if (result.success) {
            await saveBookingToFirestore(response.razorpay_payment_id, result.bookingId);
            updateBookingData({
              paymentId: response.razorpay_payment_id,
              bookingId: result.bookingId,
            });
            onNext();
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: bookingData.fullName,
          email: bookingData.email,
          contact: bookingData.phone,
        },
        theme: {
          color: '#8FAF9D',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      // Simulate payment for demo
      await simulatePayment();
    } finally {
      setIsProcessing(false);
    }
  };

  const saveBookingToFirestore = async (paymentId: string, bookingId: string) => {
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      if (!db || !(db as any).type) {
        throw new Error('Firestore not configured');
      }
      await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        paymentId,
        bookingId,
        userId: user?.uid || '',
        userEmail: user?.email || bookingData.email,
        status: 'confirmed',
        meetLink: '',
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      // Fall back to localStorage if Firestore not configured
      const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
      stored.unshift({
        ...bookingData,
        id: bookingId,
        paymentId,
        bookingId,
        userId: user?.uid || '',
        status: 'confirmed',
        meetLink: '',
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('bookings', JSON.stringify(stored));
    }

    // Send email notifications
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          paymentId,
          bookingId,
          userId: user?.uid,
        }),
      });
    } catch (e) {
      console.log('Email notification attempted');
    }
  };

  const simulatePayment = async () => {
    // Simulated payment for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPaymentId = `pay_demo_${Date.now()}`;
    const mockBookingId = `booking_${Date.now()}`;
    
    await saveBookingToFirestore(mockPaymentId, mockBookingId);

    updateBookingData({
      paymentId: mockPaymentId,
      bookingId: mockBookingId,
    });
    
    toast.success('Payment successful!');
    setIsProcessing(false);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold text-charcoal">
          Payment
        </h2>
        <p className="text-charcoal-lighter mt-2 text-sm">
          Review your booking and complete payment
        </p>
      </div>

      <div className="max-w-lg mx-auto space-y-6">
        {/* Booking Summary */}
        <div className="card">
          <h3 className="font-medium text-charcoal mb-4">Booking Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-beige-100">
              <span className="text-charcoal-lighter">Session Type</span>
              <span className="font-medium text-charcoal">{typeLabels[bookingData.therapyType]}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-beige-100">
              <span className="text-charcoal-lighter">Date</span>
              <span className="font-medium text-charcoal">
                {bookingData.date ? format(new Date(bookingData.date), 'MMM d, yyyy') : '-'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-beige-100">
              <span className="text-charcoal-lighter">Time</span>
              <span className="font-medium text-charcoal">{bookingData.time || '-'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-beige-100">
              <span className="text-charcoal-lighter">Duration</span>
              <span className="font-medium text-charcoal">60 minutes</span>
            </div>
            <div className="flex justify-between py-2 border-b border-beige-100">
              <span className="text-charcoal-lighter">Mode</span>
              <span className="font-medium text-charcoal">Online (Video Call)</span>
            </div>
            <div className="flex justify-between py-3 text-base">
              <span className="font-semibold text-charcoal">Total Amount</span>
              <span className="font-bold text-sage-500 text-lg">₹{amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="card">
          <h3 className="font-medium text-charcoal mb-4">Payment Methods</h3>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-beige-50 rounded-lg border border-beige-200">
              <Smartphone size={16} className="text-sage-500" />
              <span className="text-xs font-medium">UPI</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-beige-50 rounded-lg border border-beige-200">
              <CreditCard size={16} className="text-sage-500" />
              <span className="text-xs font-medium">Cards</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-beige-50 rounded-lg border border-beige-200">
              <span className="text-xs font-medium">Netbanking</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-beige-50 rounded-lg border border-beige-200">
              <span className="text-xs font-medium">Wallets</span>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-start gap-3 p-4 bg-sage-50 rounded-xl border border-sage-100">
          <Shield size={18} className="text-sage-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-sage-600 leading-relaxed">
            Your payment is secured by Razorpay with 256-bit SSL encryption. 
            We never store your card details.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onPrev}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <>
                Pay ₹{amount.toLocaleString()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
