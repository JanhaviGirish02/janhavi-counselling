'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-beige-50 via-white to-beige-100"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Organic shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-sage-100 rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-light rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-beige-200 rounded-full blur-3xl opacity-50" />
        
        {/* Subtle leaf decorations */}
        <svg className="absolute top-32 right-1/4 w-16 h-16 text-sage-200 opacity-60 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
        <svg className="absolute bottom-32 left-1/4 w-12 h-12 text-sage-200 opacity-40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>

        {/* Grain texture */}
        <div className="absolute inset-0 bg-grain opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sage-50 border border-sage-200 rounded-full"
            >
              <Sparkles size={14} className="text-sage-400" />
              <span className="text-xs font-medium text-sage-600">Online Sessions Available</span>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight">
                Janhavi
              </h1>
              <h2 className="font-heading text-2xl md:text-3xl text-sage-500 font-medium">
                Counselling Psychologist
              </h2>
              <p className="text-charcoal-lighter text-sm font-medium tracking-wide uppercase">
                MSc Counselling Psychology
              </p>
            </div>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-charcoal-light leading-relaxed max-w-lg">
              Creating a warm, safe, and judgment-free space for emotional healing, 
              self-growth, and meaningful change.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="btn-primary flex items-center justify-center gap-2 text-base">
                Book a Session
                <ArrowRight size={18} />
              </Link>
              <Link href="/#therapy" className="btn-secondary flex items-center justify-center gap-2 text-base">
                Explore Therapy
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { value: '600+', label: 'Clinical Hours' },
                { value: '5+', label: 'Languages' },
                { value: '100%', label: 'Confidential' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-heading font-bold text-sage-500">{stat.value}</p>
                  <p className="text-xs text-charcoal-lighter font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Image Frame */}
              <div className="w-72 h-96 md:w-80 md:h-[28rem] lg:w-96 lg:h-[32rem] rounded-3xl overflow-hidden bg-gradient-to-br from-sage-100 to-beige-200 shadow-card relative">
                {/* Placeholder - Replace with actual professional photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 rounded-full bg-sage-200 mx-auto flex items-center justify-center">
                      <span className="font-heading text-4xl text-sage-500 font-bold">JG</span>
                    </div>
                    <p className="text-sage-500 text-sm font-medium">Professional Photo</p>
                    <p className="text-sage-400 text-xs">Replace with your portrait</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements around image */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-accent/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-sage-200/40 rounded-full blur-xl" />
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-card p-4 border border-beige-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                    <span className="text-sage-500 text-lg">🌱</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal">Evidence-Based</p>
                    <p className="text-[10px] text-charcoal-lighter">Therapy Approach</p>
                  </div>
                </div>
              </motion.div>

              {/* Online Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -right-8 bg-white rounded-2xl shadow-card p-3 border border-beige-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-charcoal">Online Sessions</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-sage-300 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-sage-300 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
