'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import TherapyTypeStep from '@/components/booking/TherapyTypeStep';
import DateTimeStep from '@/components/booking/DateTimeStep';
import IntakeFormStep from '@/components/booking/IntakeFormStep';
import PaymentStep from '@/components/booking/PaymentStep';
import ConfirmationStep from '@/components/booking/ConfirmationStep';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export interface BookingData {
  therapyType: string;
  date: string;
  time: string;
  fullName: string;
  age: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  mainConcern: string;
  emergencyContact: string;
  previousTherapy: string;
  pronouns: string;
  additionalNotes: string;
  paymentId: string;
  bookingId: string;
}

const steps = [
  { id: 1, label: 'Type' },
  { id: 2, label: 'Date & Time' },
  { id: 3, label: 'Details' },
  { id: 4, label: 'Payment' },
  { id: 5, label: 'Confirmed' },
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    therapyType: searchParams.get('type') || '',
    date: '',
    time: '',
    fullName: '',
    age: '',
    email: '',
    phone: '',
    preferredLanguage: '',
    mainConcern: '',
    emergencyContact: '',
    previousTherapy: '',
    pronouns: '',
    additionalNotes: '',
    paymentId: '',
    bookingId: '',
  });

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-beige-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-md w-full text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="font-heading text-2xl font-semibold">Sign In to Book</h2>
          <p className="text-charcoal-lighter">
            Please sign in or create an account to book your therapy session. 
            This helps us manage your appointments securely.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/auth/login?redirect=/book" className="btn-primary block text-center">
              Sign In
            </Link>
            <Link href="/auth/register?redirect=/book" className="btn-secondary block text-center">
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-beige-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
            Book a Session
          </h1>
          <p className="text-charcoal-lighter mt-2">
            Your healing journey starts here
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      currentStep > step.id
                        ? 'bg-sage-300 text-white'
                        : currentStep === step.id
                        ? 'bg-sage-300 text-white ring-4 ring-sage-100'
                        : 'bg-beige-200 text-charcoal-lighter'
                    }`}
                  >
                    {currentStep > step.id ? <Check size={16} /> : step.id}
                  </div>
                  <span className="text-[10px] mt-1.5 text-charcoal-lighter font-medium hidden sm:block">
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      currentStep > step.id ? 'bg-sage-300' : 'bg-beige-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <TherapyTypeStep
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <DateTimeStep
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <IntakeFormStep
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <PaymentStep
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 5 && (
              <ConfirmationStep bookingData={bookingData} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
