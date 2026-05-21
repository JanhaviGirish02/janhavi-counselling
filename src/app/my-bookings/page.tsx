'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Tag, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Booking {
  id: string;
  therapyType: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  paymentId: string;
  createdAt: string;
}

const typeLabels: Record<string, string> = {
  individual: 'Individual Therapy',
  couple: 'Couple Therapy',
  family: 'Family Therapy',
  sports: 'Sports Counselling',
};

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-sage-100 text-sage-600',
  cancelled: 'bg-red-100 text-red-600',
  rescheduled: 'bg-yellow-100 text-yellow-700',
};

export default function MyBookingsPage() {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      if (!user) { setIsLoading(false); return; }

      try {
        // Avoid composite index requirement by only using where() — sort client-side
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const bookingsData = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Booking[];

        // Sort client-side: newest first
        bookingsData.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBookings(bookingsData);
      } catch (error) {
        console.error('Bookings fetch error:', error);
        // Fallback to localStorage
        const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
        const userBookings = stored.filter((b: Booking & { userId?: string }) =>
          b.userId === user.uid || !b.userId
        );
        userBookings.sort((a: Booking, b: Booking) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBookings(userBookings);
      } finally {
        setIsLoading(false);
      }
    }

    if (!loading) {
      fetchBookings();
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-beige-50">
        <div className="w-8 h-8 border-2 border-sage-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-beige-50">
        <div className="card max-w-md text-center space-y-4">
          <AlertCircle size={40} className="text-sage-400 mx-auto" />
          <h2 className="font-heading text-xl font-semibold">Sign In Required</h2>
          <p className="text-charcoal-lighter text-sm">Please sign in to view your bookings.</p>
          <Link href="/auth/login?redirect=/my-bookings" className="btn-primary inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-beige-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-heading text-3xl font-bold text-charcoal">My Bookings</h1>
            <p className="text-charcoal-lighter mt-1">View and manage your therapy sessions</p>
          </div>
          <Link href="/book" className="btn-primary text-sm">
            Book New Session
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-sage-300 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12 space-y-4"
          >
            <Calendar size={48} className="text-beige-300 mx-auto" />
            <h3 className="font-heading text-xl font-semibold text-charcoal">No Bookings Yet</h3>
            <p className="text-charcoal-lighter text-sm max-w-sm mx-auto">
              You haven&apos;t booked any sessions yet. Take the first step towards your well-being.
            </p>
            <Link href="/book" className="btn-primary inline-block">
              Book Your First Session
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-charcoal">
                        {typeLabels[booking.therapyType] || booking.therapyType}
                      </h3>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-lighter">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {booking.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Video size={14} />
                        Online
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {booking.status === 'confirmed' && (
                      <button className="text-xs px-4 py-2 border border-beige-300 rounded-lg hover:bg-beige-50 transition-colors">
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
