'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfDay, isSameDay, isAfter, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isBefore } from 'date-fns';
import { BookingData } from '@/app/book/page';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DEFAULT_TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM',
];
const DEFAULT_AVAILABLE_DAYS = [1, 2, 3, 4, 5, 6]; // Mon–Sat

// Simulated booked slots
const bookedSlots: Record<string, string[]> = {};

export default function DateTimeStep({ bookingData, updateBookingData, onNext, onPrev }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>(DEFAULT_TIME_SLOTS);
  const [availableDays, setAvailableDays] = useState<number[]>(DEFAULT_AVAILABLE_DAYS);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'availability')).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.timeSlots?.length) setTimeSlots(data.timeSlots);
        if (data.availableDays?.length) setAvailableDays(data.availableDays);
        if (data.blockedDates) setBlockedDates(data.blockedDates);
      }
    }).catch(() => {});
  }, []);
  const today = startOfDay(new Date());
  const maxDate = addMonths(today, 2);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const availableSlots = useMemo(() => {
    if (!bookingData.date) return timeSlots;
    const booked = bookedSlots[bookingData.date] || [];
    return timeSlots.filter((slot) => !booked.includes(slot));
  }, [bookingData.date, timeSlots]);

  const isDateAvailable = (date: Date) => {
    if (isBefore(date, today)) return false;
    if (isAfter(date, maxDate)) return false;
    if (!availableDays.includes(getDay(date))) return false;
    const dateStr = format(date, 'yyyy-MM-dd');
    if (blockedDates.includes(dateStr)) return false;
    return true;
  };

  const prevMonth = () => {
    const prev = addMonths(currentMonth, -1);
    if (!isBefore(endOfMonth(prev), today)) {
      setCurrentMonth(prev);
    }
  };

  const nextMonth = () => {
    const next = addMonths(currentMonth, 1);
    if (isBefore(startOfMonth(next), maxDate)) {
      setCurrentMonth(next);
    }
  };

  const selectDate = (date: Date) => {
    if (isDateAvailable(date)) {
      updateBookingData({ date: format(date, 'yyyy-MM-dd'), time: '' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold text-charcoal">
          Choose Date & Time
        </h2>
        <p className="text-charcoal-lighter mt-2 text-sm">
          Select your preferred session date and time slot
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="card">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <h3 className="font-medium text-charcoal">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-charcoal-lighter py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for starting day */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {/* Days */}
            {daysInMonth.map((date) => {
              const isAvailable = isDateAvailable(date);
              const isSelected = bookingData.date === format(date, 'yyyy-MM-dd');
              const isToday = isSameDay(date, today);

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => selectDate(date)}
                  disabled={!isAvailable}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-all ${
                    isSelected
                      ? 'bg-sage-300 text-white font-semibold shadow-md'
                      : isToday
                      ? 'bg-sage-50 text-sage-600 font-medium border border-sage-200'
                      : isAvailable
                      ? 'hover:bg-sage-50 text-charcoal'
                      : 'text-charcoal-lighter/40 cursor-not-allowed'
                  }`}
                >
                  {format(date, 'd')}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-beige-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sage-300" />
              <span className="text-xs text-charcoal-lighter">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <span className="text-xs text-charcoal-lighter">Unavailable</span>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="card">
          <h3 className="font-medium text-charcoal mb-4">
            {bookingData.date
              ? `Available times for ${format(new Date(bookingData.date), 'MMM d, yyyy')}`
              : 'Select a date first'}
          </h3>

          {bookingData.date ? (
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => updateBookingData({ time: slot })}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    bookingData.time === slot
                      ? 'bg-sage-300 text-white border-sage-300 shadow-md'
                      : 'border-beige-200 text-charcoal hover:border-sage-200 hover:bg-sage-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
              {availableSlots.length === 0 && (
                <p className="text-sm text-charcoal-lighter col-span-2 text-center py-4">
                  No available slots for this date
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-charcoal-lighter text-sm">
              Please select a date to view available time slots
            </div>
          )}

          {/* Timezone Note */}
          <p className="text-xs text-charcoal-lighter mt-4 pt-4 border-t border-beige-100">
            🕐 All times are in IST (Indian Standard Time)
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button onClick={onPrev} className="btn-secondary flex items-center gap-2">
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!bookingData.date || !bookingData.time}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
