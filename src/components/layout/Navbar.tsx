'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, User, LogOut, Calendar, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, userProfile, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#therapy', label: 'Therapy' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/book', label: 'Book Session' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-sage-300 flex items-center justify-center">
            <span className="text-white font-heading font-bold text-lg">J</span>
          </div>
          <span className="font-heading text-xl font-semibold text-charcoal hidden sm:block">
            Janhavi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-charcoal-light hover:text-sage-500 transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-beige-100 hover:bg-beige-200 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-sage-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {userProfile?.displayName?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium text-charcoal">
                  {userProfile?.displayName?.split(' ')[0] || 'Account'}
                </span>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-hover border border-beige-200 py-2 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-beige-100">
                      <p className="text-sm font-medium text-charcoal">{userProfile?.displayName}</p>
                      <p className="text-xs text-charcoal-lighter">{userProfile?.email}</p>
                    </div>
                    
                    <Link
                      href="/my-bookings"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-beige-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Calendar size={16} className="text-sage-400" />
                      <span className="text-sm">My Bookings</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-beige-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LayoutDashboard size={16} className="text-sage-400" />
                        <span className="text-sm">Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={() => { logout(); setIsProfileOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-beige-50 transition-colors w-full text-left"
                    >
                      <LogOut size={16} className="text-rose-dark" />
                      <span className="text-sm text-rose-dark">Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-charcoal-light hover:text-sage-500 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/book" className="btn-primary text-sm !px-6 !py-2.5">
                Book Session
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl hover:bg-beige-100 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-beige-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-charcoal-light hover:text-sage-500 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-beige-200">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      href="/my-bookings"
                      className="block py-2 text-charcoal-light hover:text-sage-500 transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block py-2 text-charcoal-light hover:text-sage-500 transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="text-rose-dark font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/auth/login"
                      className="block py-2 text-charcoal-light hover:text-sage-500 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/book"
                      className="btn-primary block text-center text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Book Session
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
