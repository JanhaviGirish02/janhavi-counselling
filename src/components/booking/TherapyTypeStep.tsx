'use client';

import React from 'react';
import { User, Heart, Users } from 'lucide-react';
import { BookingData } from '@/app/book/page';

interface Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

export default function TherapyTypeStep({ bookingData, updateBookingData, onNext }: Props) {
  const therapyTypes = [
    {
      id: 'individual',
      icon: User,
      title: 'Individual Therapy',
      description: 'One-on-one sessions tailored to your unique needs',
      price: '₹1,500 onwards',
      duration: '60 minutes',
      color: 'border-sage-200 hover:border-sage-300 hover:bg-sage-50',
      selectedColor: 'border-sage-400 bg-sage-50 ring-2 ring-sage-200',
      iconBg: 'bg-sage-100 text-sage-600',
    },
    {
      id: 'couple',
      icon: Heart,
      title: 'Couple Therapy',
      description: 'Strengthen your relationship through guided sessions',
      price: '₹3,000 onwards',
      duration: '60 minutes',
      color: 'border-rose-light hover:border-rose-accent hover:bg-rose-light/20',
      selectedColor: 'border-rose-accent bg-rose-light/20 ring-2 ring-rose-light',
      iconBg: 'bg-rose-light text-rose-dark',
    },
    {
      id: 'family',
      icon: Users,
      title: 'Family Therapy',
      description: 'Heal family dynamics and build stronger connections',
      price: '₹4,000 onwards',
      duration: '60 minutes',
      color: 'border-beige-300 hover:border-beige-400 hover:bg-beige-100',
      selectedColor: 'border-beige-400 bg-beige-100 ring-2 ring-beige-300',
      iconBg: 'bg-beige-200 text-charcoal-light',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold text-charcoal">
          Select Therapy Type
        </h2>
        <p className="text-charcoal-lighter mt-2 text-sm">
          Choose the type of therapy that fits your needs
        </p>
      </div>

      <div className="space-y-4 max-w-lg mx-auto">
        {therapyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => updateBookingData({ therapyType: type.id })}
            className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
              bookingData.therapyType === type.id ? type.selectedColor : type.color
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${type.iconBg} flex items-center justify-center`}>
                <type.icon size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-charcoal">{type.title}</h3>
                <p className="text-xs text-charcoal-lighter mt-0.5">{type.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-charcoal">{type.price}</p>
                <p className="text-xs text-charcoal-lighter">{type.duration}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onNext}
          disabled={!bookingData.therapyType}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
