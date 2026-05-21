'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, CreditCard, Clock, 
  CheckCircle, XCircle, RefreshCw, BarChart3,
  MessageCircle, Settings, Bell
} from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  therapyType: string;
  date: string;
  time: string;
  status: string;
  paymentId: string;
  mainConcern: string;
  preferredLanguage: string;
  createdAt: string;
}

const typeLabels: Record<string, string> = {
  individual: 'Individual',
  couple: 'Couple',
  family: 'Family',
};

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[];
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!loading && isAdmin) {
      fetchBookings();
    } else if (!loading) {
      setIsLoading(false);
    }
  }, [loading, isAdmin]);

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
      toast.success(`Booking ${status}`);
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-beige-50">
        <div className="w-8 h-8 border-2 border-sage-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center bg-beige-50">
        <div className="card max-w-md text-center space-y-4">
          <XCircle size={40} className="text-red-400 mx-auto" />
          <h2 className="font-heading text-xl font-semibold">Access Denied</h2>
          <p className="text-charcoal-lighter text-sm">
            This page is only accessible to administrators.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-heading text-3xl font-bold text-charcoal">Admin Dashboard</h1>
            <p className="text-charcoal-lighter mt-1">Manage your practice</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-white border border-beige-200 hover:bg-beige-50 transition-colors">
              <Bell size={18} className="text-charcoal-lighter" />
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-sage-300 text-white shadow-md'
                  : 'bg-white text-charcoal-light hover:bg-beige-100 border border-beige-200'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Bookings', value: stats.total, icon: Calendar, color: 'text-sage-500 bg-sage-100' },
                { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
                { label: 'Completed', value: stats.completed, icon: Clock, color: 'text-blue-600 bg-blue-100' },
                { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-500 bg-red-100' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-charcoal-lighter">{stat.label}</p>
                      <p className="text-3xl font-heading font-bold text-charcoal mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon size={22} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-semibold">Recent Bookings</h2>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-sm text-sage-500 font-medium hover:underline"
                >
                  View All
                </button>
              </div>
              
              {bookings.length === 0 ? (
                <p className="text-charcoal-lighter text-center py-8">No bookings yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-charcoal-lighter border-b border-beige-100">
                        <th className="pb-3 font-medium">Client</th>
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Time</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-beige-100">
                      {bookings.slice(0, 10).map((booking) => (
                        <tr key={booking.id} className="hover:bg-beige-50">
                          <td className="py-3">
                            <div>
                              <p className="font-medium text-charcoal">{booking.fullName}</p>
                              <p className="text-xs text-charcoal-lighter">{booking.phone}</p>
                            </div>
                          </td>
                          <td className="py-3">{typeLabels[booking.therapyType] || booking.therapyType}</td>
                          <td className="py-3">{booking.date}</td>
                          <td className="py-3">{booking.time}</td>
                          <td className="py-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                              booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              {booking.status === 'confirmed' && (
                                <>
                                  <button
                                    onClick={() => updateBookingStatus(booking.id, 'completed')}
                                    className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition-colors"
                                    title="Mark Complete"
                                  >
                                    <CheckCircle size={14} />
                                  </button>
                                  <button
                                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                    className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                                    title="Cancel"
                                  >
                                    <XCircle size={14} />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => setSelectedBooking(booking)}
                                className="p-1.5 rounded-lg hover:bg-beige-100 text-charcoal-lighter transition-colors"
                                title="View Details"
                              >
                                <MessageCircle size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="card">
            <h2 className="font-heading text-lg font-semibold mb-6">All Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-charcoal-lighter text-center py-8">No bookings yet. They will appear here once clients book sessions.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-4 border border-beige-200 rounded-xl hover:bg-beige-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-charcoal">{booking.fullName}</p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-charcoal-lighter">
                          <span>{typeLabels[booking.therapyType]}</span>
                          <span>•</span>
                          <span>{booking.date}</span>
                          <span>•</span>
                          <span>{booking.time}</span>
                          <span>•</span>
                          <span>{booking.phone}</span>
                        </div>
                        {booking.mainConcern && (
                          <p className="text-xs text-charcoal-lighter mt-1 line-clamp-1">
                            Concern: {booking.mainConcern}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {booking.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                              className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              className="text-xs px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="card">
            <h2 className="font-heading text-lg font-semibold mb-6">Client Directory</h2>
            <p className="text-charcoal-lighter text-center py-8">
              Client information will populate here as bookings are made.
            </p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-heading text-lg font-semibold mb-4">Practice Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Working Hours</label>
                  <p className="text-sm text-charcoal-lighter">Monday – Saturday, 10:00 AM – 8:00 PM IST</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Session Duration</label>
                  <p className="text-sm text-charcoal-lighter">60 minutes</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Notifications</label>
                  <p className="text-sm text-charcoal-lighter">WhatsApp + Email notifications on each booking</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h2 className="font-heading text-lg font-semibold mb-4">Integration Status</h2>
              <div className="space-y-3">
                {[
                  { name: 'Razorpay Payment', status: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'Connected' : 'Not configured' },
                  { name: 'WhatsApp Notifications', status: 'Configure in .env' },
                  { name: 'Google Calendar', status: 'Configure in .env' },
                  { name: 'Firebase', status: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Connected' : 'Not configured' },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between py-2 border-b border-beige-100 last:border-0">
                    <span className="text-sm text-charcoal">{integration.name}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      integration.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold">Booking Details</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-beige-100 rounded-lg transition-colors"
                >
                  <XCircle size={18} />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Name</p>
                    <p className="font-medium">{selectedBooking.fullName}</p>
                  </div>
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Phone</p>
                    <p className="font-medium">{selectedBooking.phone}</p>
                  </div>
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Email</p>
                    <p className="font-medium">{selectedBooking.email}</p>
                  </div>
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Type</p>
                    <p className="font-medium">{typeLabels[selectedBooking.therapyType]}</p>
                  </div>
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Date</p>
                    <p className="font-medium">{selectedBooking.date}</p>
                  </div>
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Time</p>
                    <p className="font-medium">{selectedBooking.time}</p>
                  </div>
                </div>
                {selectedBooking.mainConcern && (
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Main Concern</p>
                    <p className="font-medium mt-1">{selectedBooking.mainConcern}</p>
                  </div>
                )}
                <div className="p-3 bg-beige-50 rounded-lg">
                  <p className="text-xs text-charcoal-lighter">Payment ID</p>
                  <p className="font-medium font-mono text-xs">{selectedBooking.paymentId || 'N/A'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
