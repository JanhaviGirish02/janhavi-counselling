'use client';

import React from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-50 px-4">
      <div className="card max-w-md text-center space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-charcoal">Something went wrong</h2>
        <p className="text-charcoal-lighter text-sm">An unexpected error occurred. Please try again.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary">Try Again</button>
          <Link href="/" className="btn-secondary">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
