'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import {
  Calendar, Users, Clock,
  CheckCircle, XCircle, BarChart3,
  MessageCircle, Settings,
  Video, Save, Plus, Trash2,
  Link as LinkIcon, FileText, StickyNote,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: string;
  pronouns: string;
  therapyType: string;
  date: string;
  time: string;
  status: string;
  paymentId: string;
  mainConcern: string;
  preferredLanguage: string;
  emergencyContact: string;
  previousTherapy: string;
  additionalNotes: string;
  createdAt: string;
  meetLink?: string;
}

interface ClientNote {
  id: string;
  email: string;
  note: string;
  createdAt: string;
}

interface AvailabilitySettings {
  availableDays: number[];
  timeSlots: string[];
  blockedDates: string[];
}

interface GeneralSettings {
  adminEmail: string;
  instagramUrl: string;
  sessionTimings: string;
  noticeBanner: string;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DEFAULT_TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM',
];

const typeLabels: Record<string, string> = {
  individual: 'Individual',
  couple: 'Couple',
  family: 'Family',
  sports: 'Sports',
};

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [clientNotes, setClientNotes] = useState<ClientNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedClientEmail, setSelectedClientEmail] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const [meetLinkInputs, setMeetLinkInputs] = useState<Record<string, string>>({});
  const [savingMeetLink, setSavingMeetLink] = useState<string | null>(null);

  const [availability, setAvailability] = useState<AvailabilitySettings>({
    availableDays: [1, 2, 3, 4, 5, 6],
    timeSlots: DEFAULT_TIME_SLOTS,
    blockedDates: [],
  });
  const [newSlot, setNewSlot] = useState('');
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [savingAvailability, setSavingAvailability] = useState(false);

  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    adminEmail: '',
    instagramUrl: '',
    sessionTimings: 'Monday \u2013 Saturday, 10:00 AM \u2013 8:00 PM IST',
    noticeBanner: '',
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [integrationStatus, setIntegrationStatus] = useState<{
    firebase: boolean; razorpay: boolean; email: boolean; adminEmail: string | null;
  } | null>(null);

  const loadData = useCallback(async () => {
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, query, getDocs, doc, getDoc } = await import('firebase/firestore');

      // Fetch bookings
      const snap = await getDocs(query(collection(db, 'bookings')));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Booking[];
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBookings(data);

      const meets: Record<string, string> = {};
      data.forEach((b) => { meets[b.id] = b.meetLink || ''; });
      setMeetLinkInputs(meets);

      // Fetch client notes
      try {
        const notesSnap = await getDocs(query(collection(db, 'clientNotes')));
        const notes = notesSnap.docs.map((d) => ({ id: d.id, ...d.data() })) as ClientNote[];
        notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setClientNotes(notes);
      } catch { /* collection may not exist yet */ }

      // Fetch availability settings
      try {
        const availDoc = await getDoc(doc(db, 'settings', 'availability'));
        if (availDoc.exists()) setAvailability(availDoc.data() as AvailabilitySettings);
      } catch { /* settings may not exist yet */ }

      // Fetch general settings
      try {
        const genDoc = await getDoc(doc(db, 'settings', 'general'));
        if (genDoc.exists()) setGeneralSettings(genDoc.data() as GeneralSettings);
      } catch { /* settings may not exist yet */ }

      // Fetch integration status
      try {
        const res = await fetch('/api/status');
        if (res.ok) setIntegrationStatus(await res.json());
      } catch { /* not critical */ }
    } catch (err: any) {
      console.error('Admin init error:', err);
      if (err?.code === 'permission-denied') {
        toast.error('Firestore permission denied. Update security rules in Firebase Console to allow authenticated reads.', { duration: 8000 });
      } else {
        toast.error('Failed to load dashboard data. Check console for details.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && isAdmin) { loadData(); }
    else if (!loading && !isAdmin) { setIsLoading(false); }
  }, [loading, isAdmin, loadData]);

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { db: firestore } = await import('@/lib/firebase');
      const { doc: fsDoc, updateDoc: fsUpdate } = await import('firebase/firestore');
      await fsUpdate(fsDoc(firestore, 'bookings', bookingId), { status });
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
      toast.success(`Booking marked as ${status}`);
    } catch {
      toast.error('Failed to update booking');
    }
  };

  const saveMeetLink = async (bookingId: string) => {
    const link = meetLinkInputs[bookingId] || '';
    setSavingMeetLink(bookingId);
    try {
      const { db: firestore } = await import('@/lib/firebase');
      const { doc: fsDoc, updateDoc: fsUpdate } = await import('firebase/firestore');
      await fsUpdate(fsDoc(firestore, 'bookings', bookingId), { meetLink: link });
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, meetLink: link } : b)));
      const booking = bookings.find((b) => b.id === bookingId);
      if (booking?.email && link) {
        await fetch('/api/send-meet-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: booking.email, fullName: booking.fullName, meetLink: link, date: booking.date, time: booking.time }),
        });
      }
      toast.success('Meet link saved & emailed to client');
    } catch (e) {
      console.error('Meet link save error:', e);
      toast.error('Failed to save meet link');
    } finally {
      setSavingMeetLink(null);
    }
  };

  const saveAvailability = async () => {
    setSavingAvailability(true);
    try {
      const { db: firestore } = await import('@/lib/firebase');
      const { doc: fsDoc, setDoc: fsSet } = await import('firebase/firestore');
      await fsSet(fsDoc(firestore, 'settings', 'availability'), availability);
      toast.success('Availability saved');
    } catch (e) {
      console.error('Availability save error:', e);
      toast.error('Failed to save availability');
    } finally {
      setSavingAvailability(false);
    }
  };

  const saveGeneralSettings = async () => {
    setSavingSettings(true);
    try {
      const { db: firestore } = await import('@/lib/firebase');
      const { doc: fsDoc, setDoc: fsSet } = await import('firebase/firestore');
      await fsSet(fsDoc(firestore, 'settings', 'general'), generalSettings);
      toast.success('Settings saved');
    } catch (e) {
      console.error('Settings save error:', e);
      toast.error('Failed to save settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const saveClientNote = async () => {
    if (!selectedClientEmail || !newNoteText.trim()) return;
    setSavingNote(true);
    try {
      const { db: firestore } = await import('@/lib/firebase');
      const { collection: fsCol, addDoc: fsAdd } = await import('firebase/firestore');
      const noteData = {
        email: selectedClientEmail,
        note: newNoteText.trim(),
        createdAt: new Date().toISOString(),
      };
      const ref = await fsAdd(fsCol(firestore, 'clientNotes'), noteData);
      setClientNotes((prev) => [{ id: ref.id, ...noteData }, ...prev]);
      setNewNoteText('');
      toast.success('Note saved');
    } catch (e) {
      console.error('Note save error:', e);
      toast.error('Failed to save note');
    } finally {
      setSavingNote(false);
    }
  };

  const deleteClientNote = async (noteId: string) => {
    try {
      const { db: firestore } = await import('@/lib/firebase');
      const { doc: fsDoc, deleteDoc: fsDel } = await import('firebase/firestore');
      await fsDel(fsDoc(firestore, 'clientNotes', noteId));
      setClientNotes((prev) => prev.filter((n) => n.id !== noteId));
      toast.success('Note deleted');
    } catch {
      toast.error('Failed to delete note');
    }
  };

  const toggleDay = (day: number) => {
    setAvailability((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day].sort(),
    }));
  };

  const addTimeSlot = () => {
    const slot = newSlot.trim();
    if (!slot || availability.timeSlots.includes(slot)) return;
    setAvailability((prev) => ({ ...prev, timeSlots: [...prev.timeSlots, slot] }));
    setNewSlot('');
  };

  const removeTimeSlot = (slot: string) => {
    setAvailability((prev) => ({ ...prev, timeSlots: prev.timeSlots.filter((s) => s !== slot) }));
  };

  const addBlockedDate = () => {
    const d = newBlockedDate.trim();
    if (!d || availability.blockedDates.includes(d)) return;
    setAvailability((prev) => ({ ...prev, blockedDates: [...prev.blockedDates, d].sort() }));
    setNewBlockedDate('');
  };

  const removeBlockedDate = (d: string) => {
    setAvailability((prev) => ({ ...prev, blockedDates: prev.blockedDates.filter((bd) => bd !== d) }));
  };

  if (loading || isLoading) {
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
          <p className="text-charcoal-lighter text-sm">This page is only accessible to administrators.</p>
          <Link href="/" className="btn-primary inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  const uniqueClients = Array.from(new Map(bookings.map((b) => [b.email, b])).values());

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-charcoal">Admin Dashboard</h1>
            <p className="text-charcoal-lighter mt-1">Manage your practice</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-charcoal-lighter bg-white border border-beige-200 px-3 py-1.5 rounded-lg">
              {stats.confirmed} upcoming
            </span>
          </div>
        </motion.div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-sage-300 text-white shadow-md' : 'bg-white text-charcoal-light hover:bg-beige-100 border border-beige-200'}`}>
              <tab.icon size={16} />{tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Bookings', value: stats.total, icon: Calendar, color: 'text-sage-500 bg-sage-100' },
                { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
                { label: 'Completed', value: stats.completed, icon: Clock, color: 'text-blue-600 bg-blue-100' },
                { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-500 bg-red-100' },
              ].map((stat) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
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
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-semibold">Recent Bookings</h2>
                <button onClick={() => setActiveTab('bookings')} className="text-sm text-sage-500 font-medium hover:underline">View All</button>
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
                        <th className="pb-3 font-medium">Date &amp; Time</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-beige-100">
                      {bookings.slice(0, 10).map((booking) => (
                        <tr key={booking.id} className="hover:bg-beige-50">
                          <td className="py-3">
                            <p className="font-medium text-charcoal">{booking.fullName}</p>
                            <p className="text-xs text-charcoal-lighter">{booking.email}</p>
                          </td>
                          <td className="py-3">{typeLabels[booking.therapyType] || booking.therapyType}</td>
                          <td className="py-3">{booking.date} &middot; {booking.time}</td>
                          <td className="py-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : booking.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{booking.status}</span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              {booking.status === 'confirmed' && (
                                <>
                                  <button onClick={() => updateBookingStatus(booking.id, 'completed')} className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition-colors" title="Mark Complete"><CheckCircle size={14} /></button>
                                  <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors" title="Cancel"><XCircle size={14} /></button>
                                </>
                              )}
                              <button onClick={() => setSelectedBooking(booking)} className="p-1.5 rounded-lg hover:bg-beige-100 text-charcoal-lighter transition-colors" title="View Details"><MessageCircle size={14} /></button>
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
            <h2 className="font-heading text-lg font-semibold mb-6">All Bookings ({bookings.length})</h2>
            {bookings.length === 0 ? (
              <p className="text-charcoal-lighter text-center py-8">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-4 border border-beige-200 rounded-xl">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-charcoal">{booking.fullName}</p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : booking.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{booking.status}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs text-charcoal-lighter">
                            <span>{typeLabels[booking.therapyType] || booking.therapyType}</span>
                            <span>&bull;</span>
                            <span>{booking.date} &middot; {booking.time}</span>
                            <span>&bull;</span>
                            <span>{booking.email}</span>
                            {booking.phone && <><span>&bull;</span><span>{booking.phone}</span></>}
                          </div>
                          {booking.mainConcern && <p className="text-xs text-charcoal-lighter line-clamp-1">Concern: {booking.mainConcern}</p>}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {booking.status === 'confirmed' && (
                            <>
                              <button onClick={() => updateBookingStatus(booking.id, 'completed')} className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Complete</button>
                              <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="text-xs px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">Cancel</button>
                            </>
                          )}
                          <button onClick={() => setSelectedBooking(booking)} className="text-xs px-3 py-1.5 bg-beige-100 text-charcoal rounded-lg hover:bg-beige-200 transition-colors">Details</button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-beige-100">
                        <Video size={14} className="text-sage-400 flex-shrink-0" />
                        <input
                          type="url"
                          placeholder="Paste Google Meet link here..."
                          value={meetLinkInputs[booking.id] || ''}
                          onChange={(e) => setMeetLinkInputs((prev) => ({ ...prev, [booking.id]: e.target.value }))}
                          className="flex-1 text-xs border border-beige-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-sage-300 bg-white"
                        />
                        {booking.meetLink && (
                          <a href={booking.meetLink} target="_blank" rel="noopener noreferrer" className="text-sage-500 hover:text-sage-600" title="Open link"><LinkIcon size={14} /></a>
                        )}
                        <button
                          onClick={() => saveMeetLink(booking.id)}
                          disabled={savingMeetLink === booking.id}
                          className="text-xs px-3 py-1.5 bg-sage-300 text-white rounded-lg hover:bg-sage-400 transition-colors disabled:opacity-50"
                        >
                          {savingMeetLink === booking.id ? 'Saving...' : 'Save & Email'}
                        </button>
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
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-heading text-lg font-semibold mb-6">Client Directory ({uniqueClients.length})</h2>
              {uniqueClients.length === 0 ? (
                <p className="text-charcoal-lighter text-center py-8">No clients yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-charcoal-lighter border-b border-beige-100">
                        <th className="pb-3 font-medium">Name</th>
                        <th className="pb-3 font-medium">Email</th>
                        <th className="pb-3 font-medium">Phone</th>
                        <th className="pb-3 font-medium">Sessions</th>
                        <th className="pb-3 font-medium">Notes</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-beige-100">
                      {uniqueClients.map((b) => {
                        const sessionCount = bookings.filter((bk) => bk.email === b.email).length;
                        const noteCount = clientNotes.filter((n) => n.email === b.email).length;
                        return (
                          <tr key={b.email} className="hover:bg-beige-50">
                            <td className="py-3 font-medium text-charcoal">{b.fullName}</td>
                            <td className="py-3 text-charcoal-lighter">{b.email}</td>
                            <td className="py-3 text-charcoal-lighter">{b.phone}</td>
                            <td className="py-3">{sessionCount}</td>
                            <td className="py-3">
                              {noteCount > 0 && <span className="text-xs bg-sage-100 text-sage-600 px-2 py-0.5 rounded-full">{noteCount}</span>}
                            </td>
                            <td className="py-3">
                              <button
                                onClick={() => setSelectedClientEmail(b.email)}
                                className="text-xs px-3 py-1.5 bg-sage-100 text-sage-700 rounded-lg hover:bg-sage-200 transition-colors flex items-center gap-1"
                              >
                                <StickyNote size={12} /> Notes
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-heading text-lg font-semibold mb-4">Available Days</h2>
              <p className="text-sm text-charcoal-lighter mb-4">Select which days clients can book sessions.</p>
              <div className="flex flex-wrap gap-2">
                {DAY_NAMES.map((name, idx) => (
                  <button key={idx} onClick={() => toggleDay(idx)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${availability.availableDays.includes(idx) ? 'bg-sage-300 text-white' : 'bg-beige-100 text-charcoal-light border border-beige-200'}`}>
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="font-heading text-lg font-semibold mb-4">Available Time Slots</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {availability.timeSlots.map((slot) => (
                  <div key={slot} className="flex items-center gap-1.5 bg-sage-50 border border-sage-200 rounded-lg px-3 py-1.5">
                    <span className="text-sm text-charcoal">{slot}</span>
                    <button onClick={() => removeTimeSlot(slot)} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="e.g. 9:00 AM" value={newSlot} onChange={(e) => setNewSlot(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTimeSlot()}
                  className="flex-1 border border-beige-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sage-300" />
                <button onClick={addTimeSlot} className="flex items-center gap-1 px-4 py-2 bg-sage-300 text-white rounded-xl text-sm hover:bg-sage-400 transition-colors">
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>

            <div className="card">
              <h2 className="font-heading text-lg font-semibold mb-4">Blocked / Holiday Dates</h2>
              <p className="text-sm text-charcoal-lighter mb-4">Dates when no sessions are available.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {availability.blockedDates.map((d) => (
                  <div key={d} className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
                    <span className="text-sm text-charcoal">{d}</span>
                    <button onClick={() => removeBlockedDate(d)} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                  </div>
                ))}
                {availability.blockedDates.length === 0 && <p className="text-sm text-charcoal-lighter">No blocked dates.</p>}
              </div>
              <div className="flex gap-2">
                <input type="date" value={newBlockedDate} onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="flex-1 border border-beige-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sage-300" />
                <button onClick={addBlockedDate} className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm hover:bg-red-200 transition-colors">
                  <Plus size={14} /> Block Date
                </button>
              </div>
            </div>

            <button onClick={saveAvailability} disabled={savingAvailability}
              className="flex items-center gap-2 px-6 py-3 bg-sage-300 text-white rounded-xl font-medium hover:bg-sage-400 transition-colors disabled:opacity-50">
              <Save size={16} />{savingAvailability ? 'Saving...' : 'Save Availability'}
            </button>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-heading text-lg font-semibold mb-6">Practice Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Admin / Contact Email', key: 'adminEmail', type: 'email', placeholder: 'janhavigirish@gmail.com' },
                  { label: 'Instagram Profile URL', key: 'instagramUrl', type: 'url', placeholder: 'https://instagram.com/yourhandle' },
                  { label: 'Session Timings (shown on website)', key: 'sessionTimings', type: 'text', placeholder: 'Monday \u2013 Saturday, 10:00 AM \u2013 8:00 PM IST' },
                  { label: 'Notice Banner (leave blank to hide)', key: 'noticeBanner', type: 'text', placeholder: 'e.g. Out of office until Jan 10' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={generalSettings[key as keyof GeneralSettings]}
                      onChange={(e) => setGeneralSettings((p) => ({ ...p, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full border border-beige-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage-300"
                    />
                  </div>
                ))}
                <button onClick={saveGeneralSettings} disabled={savingSettings}
                  className="flex items-center gap-2 px-6 py-3 bg-sage-300 text-white rounded-xl font-medium hover:bg-sage-400 transition-colors disabled:opacity-50">
                  <Save size={16} />{savingSettings ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>

            <div className="card">
              <h2 className="font-heading text-lg font-semibold mb-4">Integration Status</h2>
              <div className="space-y-3">
                {[
                  {
                    name: 'Razorpay Payment',
                    ok: integrationStatus?.razorpay ?? false,
                    note: integrationStatus?.razorpay ? 'Connected' : 'Add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env.local',
                  },
                  {
                    name: 'Firebase / Firestore',
                    ok: integrationStatus?.firebase ?? false,
                    note: integrationStatus?.firebase ? 'Connected' : 'Add Firebase keys to .env.local',
                  },
                  {
                    name: 'Email (Gmail SMTP)',
                    ok: integrationStatus?.email ?? false,
                    note: integrationStatus?.email
                      ? `Sending from ${integrationStatus.adminEmail || 'configured'}`
                      : 'Set GMAIL_USER and a valid 16-char GMAIL_APP_PASSWORD in .env.local',
                  },
                  {
                    name: 'Google Meet',
                    ok: true,
                    note: 'Paste meet links per-booking in the Bookings tab',
                  },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-beige-100 last:border-0">
                    <div>
                      <span className="text-sm text-charcoal">{item.name}</span>
                      <p className="text-xs text-charcoal-lighter mt-0.5">{item.note}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ml-3 ${item.ok ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.ok ? 'Connected' : 'Not set'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card max-w-lg w-full max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold">Booking Details</h3>
                <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-beige-100 rounded-lg transition-colors"><XCircle size={18} /></button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Name', value: selectedBooking.fullName },
                    { label: 'Age', value: selectedBooking.age || 'N/A' },
                    { label: 'Pronouns', value: selectedBooking.pronouns || 'N/A' },
                    { label: 'Phone', value: selectedBooking.phone },
                    { label: 'Email', value: selectedBooking.email },
                    { label: 'Type', value: typeLabels[selectedBooking.therapyType] || selectedBooking.therapyType },
                    { label: 'Date', value: selectedBooking.date },
                    { label: 'Time', value: selectedBooking.time },
                    { label: 'Language', value: selectedBooking.preferredLanguage || 'N/A' },
                    { label: 'Status', value: selectedBooking.status },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3 bg-beige-50 rounded-lg">
                      <p className="text-xs text-charcoal-lighter">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
                {selectedBooking.mainConcern && (
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Main Concern</p>
                    <p className="font-medium mt-1">{selectedBooking.mainConcern}</p>
                  </div>
                )}
                {selectedBooking.emergencyContact && (
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Emergency Contact</p>
                    <p className="font-medium mt-1">{selectedBooking.emergencyContact}</p>
                  </div>
                )}
                {selectedBooking.previousTherapy && (
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Previous Therapy Experience</p>
                    <p className="font-medium mt-1">{selectedBooking.previousTherapy}</p>
                  </div>
                )}
                {selectedBooking.additionalNotes && (
                  <div className="p-3 bg-beige-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Additional Notes from Client</p>
                    <p className="font-medium mt-1">{selectedBooking.additionalNotes}</p>
                  </div>
                )}
                {selectedBooking.meetLink && (
                  <div className="p-3 bg-sage-50 rounded-lg">
                    <p className="text-xs text-charcoal-lighter">Meet Link</p>
                    <a href={selectedBooking.meetLink} target="_blank" rel="noopener noreferrer" className="text-sage-500 font-medium text-xs break-all hover:underline">{selectedBooking.meetLink}</a>
                  </div>
                )}
                <div className="p-3 bg-beige-50 rounded-lg">
                  <p className="text-xs text-charcoal-lighter">Payment ID</p>
                  <p className="font-medium font-mono text-xs">{selectedBooking.paymentId || 'N/A'}</p>
                </div>
                <div className="p-3 bg-beige-50 rounded-lg">
                  <p className="text-xs text-charcoal-lighter">Booked On</p>
                  <p className="font-medium text-xs">{selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString() : 'N/A'}</p>
                </div>

                {/* Quick Actions */}
                {selectedBooking.status === 'confirmed' && (
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => { updateBookingStatus(selectedBooking.id, 'completed'); setSelectedBooking(null); }} className="flex-1 text-sm px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Mark Complete</button>
                    <button onClick={() => { updateBookingStatus(selectedBooking.id, 'cancelled'); setSelectedBooking(null); }} className="flex-1 text-sm px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">Cancel Session</button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Client Notes Modal */}
        {selectedClientEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card max-w-lg w-full max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
                    <FileText size={18} /> Client Notes
                  </h3>
                  <p className="text-xs text-charcoal-lighter mt-1">{selectedClientEmail}</p>
                </div>
                <button onClick={() => setSelectedClientEmail(null)} className="p-2 hover:bg-beige-100 rounded-lg transition-colors"><XCircle size={18} /></button>
              </div>

              {/* Add New Note */}
              <div className="mb-4 space-y-2">
                <textarea
                  rows={3}
                  placeholder="Add a private note about this client..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full border border-beige-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-sage-300 resize-none"
                />
                <button
                  onClick={saveClientNote}
                  disabled={savingNote || !newNoteText.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-sage-300 text-white rounded-lg text-sm hover:bg-sage-400 transition-colors disabled:opacity-50"
                >
                  <Plus size={14} /> {savingNote ? 'Saving...' : 'Add Note'}
                </button>
              </div>

              {/* Existing Notes */}
              <div className="space-y-3">
                {clientNotes.filter((n) => n.email === selectedClientEmail).length === 0 ? (
                  <p className="text-charcoal-lighter text-sm text-center py-4">No notes for this client yet.</p>
                ) : (
                  clientNotes.filter((n) => n.email === selectedClientEmail).map((note) => (
                    <div key={note.id} className="p-3 bg-beige-50 rounded-lg group">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-charcoal whitespace-pre-wrap">{note.note}</p>
                        <button
                          onClick={() => deleteClientNote(note.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all flex-shrink-0"
                          title="Delete note"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <p className="text-[11px] text-charcoal-lighter mt-2">{new Date(note.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Client Session History */}
              <div className="mt-6 pt-4 border-t border-beige-200">
                <h4 className="text-sm font-medium text-charcoal mb-3">Session History</h4>
                <div className="space-y-2">
                  {bookings.filter((b) => b.email === selectedClientEmail).map((b) => (
                    <div key={b.id} className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-beige-100">
                      <span className="text-charcoal">{b.date} &middot; {b.time}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-charcoal-lighter">{typeLabels[b.therapyType] || b.therapyType}</span>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
