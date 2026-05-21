'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe, Shield, Video, ChevronDown } from 'lucide-react';

export default function About() {
  const [showSports, setShowSports] = useState(false);

  const badges = [
    { icon: Clock, label: '600+ Clinical Hours', color: 'bg-sage-100 text-sage-700' },
    { icon: Globe, label: '4 Languages', color: 'bg-beige-100 text-charcoal-light' },
    { icon: Shield, label: 'Evidence-Based Therapy', color: 'bg-rose-light text-rose-dark' },
    { icon: Video, label: 'Online Sessions', color: 'bg-sage-100 text-sage-700' },
  ];

  const highlights = [
    'Anxiety', 'Depression', 'Stress', 'Anger Issues',
    'Relationships', 'Academic Stress', 'Self-Esteem', 'Sports Performance',
  ];

  return (
    <section id="about" className="section-padding bg-white relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sage-400 text-sm font-medium uppercase tracking-wider">Get to Know Me</span>
          <h2 className="section-title mt-3">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-sage-100 to-beige-200 shadow-card">
                {/* Placeholder - Replace with actual photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-24 h-24 rounded-full bg-sage-200 mx-auto flex items-center justify-center">
                      <span className="font-heading text-3xl text-sage-500 font-bold">JG</span>
                    </div>
                    <p className="text-sage-500 text-sm">Professional Photo</p>
                  </div>
                </div>
              </div>
              {/* Decorative frame */}
              <div className="absolute -z-10 top-4 left-4 w-full h-full rounded-3xl border-2 border-sage-200" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-charcoal">
              Hello, I&apos;m Janhavi Girish
            </h3>
            
            <div className="space-y-4 text-charcoal-light leading-relaxed">
              <p>
                I am a Counselling Psychologist with a Master&apos;s degree in Counselling Psychology. 
                I believe that therapy is a collaborative journey — one where you feel heard, understood, 
                and empowered to create meaningful change in your life.
              </p>
              <p>
                My approach integrates evidence-based techniques with a warm, person-centered style. 
                Whether you&apos;re navigating anxiety, relationship difficulties, academic stress, or 
                looking for personal growth, I&apos;m here to walk alongside you.
              </p>
              <p>
                I work with individuals, couples, and families, creating a safe and confidential space 
                where you can explore your thoughts and emotions without judgment.
              </p>
            </div>

            {/* Sports Psychology – expandable */}
            <div className="rounded-2xl border border-sage-200 bg-sage-50 overflow-hidden">
              <button
                onClick={() => setShowSports(!showSports)}
                className="w-full flex items-center justify-between p-4 hover:bg-sage-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏊</span>
                  <span className="font-medium text-charcoal text-sm">Sports Psychology &amp; Athlete Wellbeing</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-sage-500 transition-transform duration-300 ${showSports ? 'rotate-180' : ''}`}
                />
              </button>
              {showSports && (
                <div className="px-4 pb-4 space-y-3 text-charcoal-light text-sm leading-relaxed border-t border-sage-200 pt-4">
                  <p>
                    Alongside my clinical work, I specialise in Sports Psychology — and this is an area that
                    is deeply personal to me. I have been a national level competitive swimmer for over 18 years.
                    That lived experience as an athlete gives me a unique understanding of the mental demands of
                    sport — the self-doubt before a big race, the toll of injuries, the pressure to perform, and
                    the identity questions that come with it all.
                  </p>
                  <p>
                    Working with athletes, I bring both professional training and genuine lived experience to the table.
                    Whether you&apos;re struggling with performance anxiety, motivation, focus, burnout, or the emotional
                    side of competition, I understand that world from the inside — not just from a textbook.
                  </p>
                </div>
              )}
            </div>

            {/* Highlighted Keywords */}
            <div className="pt-2">
              <p className="text-sm font-medium text-charcoal mb-3">Areas I can help with:</p>
              <div className="flex flex-wrap gap-2">
                {highlights.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl ${badge.color} transition-transform hover:scale-105`}
                >
                  <badge.icon size={18} />
                  <span className="text-xs font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
