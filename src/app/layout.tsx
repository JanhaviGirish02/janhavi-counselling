import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileStickyButton from '@/components/ui/MobileStickyButton';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Janhavi Girish | Counselling Psychologist - Online Therapy India',
  description: 'Creating a warm, safe, and judgment-free space for emotional healing, self-growth, and meaningful change. Book online therapy sessions for anxiety, depression, relationship issues, and more.',
  keywords: 'Counselling Psychologist Bangalore, Online Therapy India, Anxiety Counselling, Couple Therapy Online, Academic Stress Counselling, Depression Therapy, Family Therapy',
  openGraph: {
    title: 'Janhavi Girish | Counselling Psychologist',
    description: 'Creating a warm, safe, and judgment-free space for emotional healing, self-growth, and meaningful change.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://janhavicounselling.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8FAF9D" />
      </head>
      <body className="font-body antialiased bg-beige-50 text-charcoal">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <MobileStickyButton />
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#2D2D2D',
                borderRadius: '1rem',
                border: '1px solid #F6F1EB',
                padding: '16px',
              },
            }}
          />
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
