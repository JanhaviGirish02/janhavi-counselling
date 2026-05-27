'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe, Shield, Video } from 'lucide-react';

export default function About() {
  const badges = [
    { icon: Clock, label: '600+ Clinical Hours', color: 'bg-sage-100 text-sage-700' },
    { icon: Globe, label: '4 Languages', color: 'bg-sage-100 text-sage-700' },
    { icon: Shield, label: 'Evidence-Based Therapy', color: 'bg-sage-100 text-sage-700' },
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
              <div className="w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden shadow-card">
                {/* Online therapy illustration */}
                <img
                  src="/online-therapy.jpg"
                  alt="Online therapy consultation illustration"
                  className="w-full h-full object-cover"
                />
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
              <p>
                Alongside my clinical work, I specialise in Sports Psychology — and this is an area that
                is deeply personal to me. I have been a national level competitive swimmer for over 18 years.
                That lived experience gives me a unique understanding of the mental demands of sport: the
                self-doubt before a big race, the toll of injuries, the pressure to perform, and the identity
                questions that come with it all. Working with athletes, I bring both professional training and
                genuine lived experience to the table.
              </p>
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
