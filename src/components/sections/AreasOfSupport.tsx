'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Brain, Briefcase, Target, GraduationCap, Heart, Users } from 'lucide-react';

export default function AreasOfSupport() {
  const [openCategory, setOpenCategory] = useState<string | null>('mental-health');

  const individualCategories = [
    {
      id: 'mental-health',
      icon: Brain,
      title: 'Mental Health',
      items: [
        'Depression & Low Mood',
        'Anxiety & Panic Attacks',
        'Shame & Guilt',
        'Trauma & Grief',
        'OCD & Intrusive Thoughts',
        'Emotional Dysregulation',
        'Self-Harm & Suicidal Ideation',
        'Phobias & Fears',
        'Body Image Issues',
        'Sleep Disorders',
      ],
    },
    {
      id: 'work-pressure',
      icon: Briefcase,
      title: 'Work Pressure',
      items: [
        'Difficult Manager Dynamics',
        'Productivity & Burnout',
        'Workplace Communication',
        'Career Transitions',
        'Work-Life Balance',
        'Performance Anxiety',
        'Toxic Work Environment',
        'Impostor Syndrome',
      ],
    },
    {
      id: 'personal-growth',
      icon: Target,
      title: 'Personal Growth',
      items: [
        'Goal Setting & Clarity',
        'Building Healthy Boundaries',
        'Self-Esteem & Confidence',
        'Identity & Purpose',
        'Emotional Intelligence',
        'Communication Skills',
        'Decision Making',
        'Life Transitions',
      ],
    },
    {
      id: 'academic',
      icon: GraduationCap,
      title: 'Academic Stress (Age 13+)',
      items: [
        'Exam Anxiety & Performance Pressure',
        'Procrastination & Motivation Issues',
        'Fear of Failure & Perfectionism',
        'Burnout & Academic Fatigue',
        'Study Skills & Focus',
        'Peer Pressure',
        'Career Confusion',
        'Parent-Student Conflict',
      ],
    },
  ];

  const coupleTopics = [
    'Trust Issues', 'Premarital Counselling', 'Breakups & Heartbreak',
    'Long Distance Stress', 'Communication Breakdown', 'Infidelity Recovery',
    'Intimacy Issues', 'Conflict Resolution', 'Compatibility Concerns',
    'Emotional Disconnect', 'Cultural Differences', 'Commitment Anxiety',
  ];

  const familyTopics = [
    'Parent-Child Conflict', 'Sibling Rivalry', 'Blended Family Dynamics',
    'Grief & Loss', 'Generational Trauma', 'Boundary Setting',
    'Communication Gaps', 'Divorce & Separation Impact', 'Caregiver Burnout',
    'Parenting Challenges', 'Family Role Conflicts',
  ];

  return (
    <section className="section-padding bg-white relative">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sage-400 text-sm font-medium uppercase tracking-wider">What I Help With</span>
          <h2 className="section-title mt-3">Areas of Support</h2>
          <p className="section-subtitle mx-auto">
            Whatever you&apos;re going through, you don&apos;t have to face it alone.
          </p>
        </motion.div>

        {/* Individual Therapy Accordions */}
        <div className="mb-16">
          <h3 className="font-heading text-2xl font-semibold text-charcoal mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center">
              <span className="text-sage-500 text-sm">👤</span>
            </div>
            Individual Therapy
          </h3>
          
          <div className="space-y-3">
            {individualCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-beige-200 rounded-2xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-beige-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sage-50 flex items-center justify-center">
                      <category.icon size={20} className="text-sage-500" />
                    </div>
                    <span className="font-medium text-charcoal text-left">{category.title}</span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-charcoal-lighter transition-transform duration-300 ${
                      openCategory === category.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openCategory === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-beige-100">
                          {category.items.map((item) => (
                            <span key={item} className="chip mt-2">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Couple & Family Therapy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Couple Therapy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-br from-rose-light/30 to-beige-100 border-rose-light/50"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-light flex items-center justify-center">
                  <Heart size={20} className="text-rose-dark" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal">Couple Therapy</h3>
              </div>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Nurture your relationship in a supportive environment. 
                Both partners work together towards understanding and connection.
              </p>
              <div className="flex flex-wrap gap-2">
                {coupleTopics.map((topic) => (
                  <span key={topic} className="chip text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Family Therapy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-br from-sage-50/50 to-beige-100 border-sage-100"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center">
                  <Users size={20} className="text-sage-600" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal">Family Therapy</h3>
              </div>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Heal family dynamics and build stronger connections. 
                Work through challenges together in a safe, neutral space.
              </p>
              <div className="flex flex-wrap gap-2">
                {familyTopics.map((topic) => (
                  <span key={topic} className="chip text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
