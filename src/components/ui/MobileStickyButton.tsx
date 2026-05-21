'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function MobileStickyButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <Link
        href="/book"
        className="flex items-center gap-2 px-5 py-3.5 bg-sage-300 text-white font-medium rounded-full shadow-lg hover:bg-sage-500 transition-all active:scale-95"
      >
        <Calendar size={18} />
        <span className="text-sm">Book Session</span>
      </Link>
    </div>
  );
}
