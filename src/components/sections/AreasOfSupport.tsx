'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Brain, Briefcase, Target, GraduationCap, Heart, Users, Trophy } from 'lucide-react';

export default function AreasOfSupport() {
  const [openCategory, setOpenCategory] = useState<string | null>('mental-health');

  const individualCategories = [
    {
      id: 'mental-health',
      icon: Brain,
      title: 'Mental Health',
      items: [
        'Depression',
        'Anxiety & Panic Attacks',
        'Shame & Guilt',
        'Trauma & Grief',
        'Sleep Difficulties',
        'Adjustment Issues',
        'Anger Management',
        'Gender & Sexuality',
      ],
    },
    {
      id: 'work-pressure',
      icon: Briefcase,
      title: 'Work Pressure',
      items: [
        'Work Pressure',
        'Difficult Manager',
        'Productivity',
        'Relationship with Colleagues',
        'Management Skills',
        'Difficult Conversations',
        'Workplace Communication',
        'Giving & Receiving Feedback',
        'Career Progression',
        'Work-Life Balance',
      ],
    },
    {
      id: 'personal-growth',
      icon: Target,
      title: 'Personal Growth',
      items: [
        'Communication Skills',
        'Presentation Skills',
        'Decision Making',
        'Goal Setting',
        'Habit Formation',
        'Time Management',
        'Self-Compassion',
        'Setting Boundaries',
        'Self-Care & Lifestyle',
        'Self-Esteem',
      ],
    },
    {
      id: 'academic',
      icon: GraduationCap,
      title: 'Academic Stress (Age 13+)',
      items: [
        'Exam Anxiety & Performance Pressure',
        'Procrastination & Motivation Issues',
        'Fear of Failure / Perfectionism',
        'Burnout & Academic Fatigue',
        'Concentration & Attention Difficulties',
        'Sleep Disruption due to Academic Stress',
        'Parental Pressure & Expectations',
        'Competitive Environment Stress',
        'Career Confusion & Decision-Making Anxiety',
        'Post-Result Emotional Crisis',
        'Study Skills & Time Management Support',
        'Transition Stress (School to College, College to Work)',
      ],
    },
  ];

  const coupleTopics = [
    'Trust Issues',
    'Interpersonal Abuse',
    'Difficult In-Laws',
    'Marital Conflicts',
    'Pre-Marital Counselling',
    'Dating',
    'Breakups & Divorce',
    'Intimacy & Emotional Disconnection',
    'Codependency in Relationships',
    'Inter-Caste / Inter-Religion Relationship Conflicts',
    'Long-Distance Relationship Stress',
    'Sexual & Physical Intimacy Concerns',
    'Remarriage Adjustment',
  ];

  const familyTopics = [
    'Parent-Child Counselling',
    'Sibling Counselling',
    'Divorce & Co-Parenting Counselling',
    'Grief & Loss within the Family',
    'Family Counselling for Mental Health Conditions',
    'Trauma-Informed Family Counselling',
    'Addiction & Substance Use (Family Impact)',
    'Multicultural / Cross-Cultural Family Counselling',
    'Special Needs Family Counselling',
    'Blended / Step-Family Counselling',
    'Elder Care & Aging Family Counselling',
    'Intergenerational Trauma & Conflict',
    'Caregiver Burnout Support',
  ];

  const sportsTopics = [
    'Pre-Competition Anxiety Management',
    'Focus & Concentration Training',
    'Confidence & Self-Belief Building',
    'Goal Setting & Motivation',
    'Visualisation & Mental Imagery',
    'Attention Control Training',
    'Self-Talk Restructuring',
    'Relaxation Techniques',
    'Mindfulness for Athletes',
    'Routine Building (Pre-Game Rituals)',
    'Flow State Cultivation',
    'Depression & Anxiety in Athletes',
    'Burnout & Overtraining Syndrome',
    'Disordered Eating in Sport',
    'Sleep & Recovery Concerns',
    'Stigma Around Mental Health Support',
  ];

  return (
    <section id="areas" className="section-padding bg-white relative">
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
              <span className="text-sage-500 text-sm">ðŸ‘¤</span>
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

        {/* Couple, Family & Sports Therapy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

          {/* Sports Counselling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-br from-sage-100/50 to-beige-100 border-sage-200"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-200 flex items-center justify-center">
                  <Trophy size={20} className="text-sage-700" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal">Sports Counselling</h3>
              </div>
              <p className="text-charcoal-light text-sm leading-relaxed">
                Mental performance support for athletes at every level, combining professional training with 18 years of lived experience as a national competitive swimmer.
              </p>
              <div className="flex flex-wrap gap-2">
                {sportsTopics.map((topic) => (
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
