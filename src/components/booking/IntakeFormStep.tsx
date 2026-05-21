'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { BookingData } from '@/app/book/page';
import { useAuth } from '@/context/AuthContext';

interface Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function IntakeFormStep({ bookingData, updateBookingData, onNext, onPrev }: Props) {
  const { user, userProfile } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: bookingData.fullName || userProfile?.displayName || '',
      age: bookingData.age || '',
      email: bookingData.email || user?.email || '',
      phone: bookingData.phone || userProfile?.phone || '',
      preferredLanguage: bookingData.preferredLanguage || 'English',
      mainConcern: bookingData.mainConcern || '',
      emergencyContact: bookingData.emergencyContact || '',
      previousTherapy: bookingData.previousTherapy || '',
      pronouns: bookingData.pronouns || '',
      additionalNotes: bookingData.additionalNotes || '',
    },
  });

  const onSubmit = (data: any) => {
    updateBookingData(data);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold text-charcoal">
          Session Details
        </h2>
        <p className="text-charcoal-lighter mt-2 text-sm">
          Help me understand your needs better
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card max-w-xl mx-auto space-y-5">
        {/* Required Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register('fullName', { required: 'Name is required' })}
              className="input-field"
              placeholder="Your full name"
            />
            {errors.fullName && (
              <p className="text-red-400 text-xs mt-1">{errors.fullName.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Age <span className="text-red-400">*</span>
            </label>
            <input
              {...register('age', { required: 'Age is required', min: { value: 13, message: 'Must be 13+' } })}
              type="number"
              className="input-field"
              placeholder="Your age"
            />
            {errors.age && (
              <p className="text-red-400 text-xs mt-1">{errors.age.message as string}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
              type="email"
              className="input-field"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              {...register('phone', { required: 'Phone is required' })}
              type="tel"
              className="input-field"
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone.message as string}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Preferred Language <span className="text-red-400">*</span>
          </label>
          <select
            {...register('preferredLanguage', { required: true })}
            className="input-field"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Kannada">Kannada</option>
            <option value="Marathi">Marathi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Main Concern <span className="text-red-400">*</span>
          </label>
          <textarea
            {...register('mainConcern', { required: 'Please describe your main concern' })}
            className="input-field min-h-[100px] resize-none"
            placeholder="Briefly describe what you'd like to work on (this helps me prepare for our session)"
          />
          {errors.mainConcern && (
            <p className="text-red-400 text-xs mt-1">{errors.mainConcern.message as string}</p>
          )}
        </div>

        {/* Optional Fields */}
        <div className="pt-4 border-t border-beige-100">
          <p className="text-xs text-charcoal-lighter mb-4 font-medium uppercase tracking-wider">Optional Information</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Emergency Contact
              </label>
              <input
                {...register('emergencyContact')}
                type="tel"
                className="input-field"
                placeholder="Emergency contact number"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Preferred Pronouns
                </label>
                <select {...register('pronouns')} className="input-field">
                  <option value="">Select</option>
                  <option value="she/her">She/Her</option>
                  <option value="he/him">He/Him</option>
                  <option value="they/them">They/Them</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">
                  Previous Therapy?
                </label>
                <select {...register('previousTherapy')} className="input-field">
                  <option value="">Select</option>
                  <option value="yes">Yes, I have</option>
                  <option value="no">No, first time</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Additional Notes
              </label>
              <textarea
                {...register('additionalNotes')}
                className="input-field min-h-[80px] resize-none"
                placeholder="Anything else you'd like me to know?"
              />
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="p-4 bg-sage-50 rounded-xl border border-sage-100">
          <p className="text-xs text-sage-600 leading-relaxed">
            🔒 All information shared is strictly confidential and protected. 
            Your data will only be used for providing therapy services and will never be shared with third parties.
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
            type="submit"
            className="btn-primary flex items-center gap-2"
          >
            Continue to Payment
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
