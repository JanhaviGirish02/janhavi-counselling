'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, User, Heart, Users, Trophy } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      icon: User,
      title: 'Individual Therapy',
      price: '₹1,500',
      suffix: 'onwards',
      features: [
        '60 minutes per session',
        'Online mode (Video call)',
        '18+ individuals',
        'Confidential & safe space',
        'Personalized treatment plan',
        'Between-session support resources',
      ],
      color: 'border-sage-200 hover:border-sage-300',
      iconBg: 'bg-sage-100 text-sage-600',
      buttonClass: 'btn-primary',
      popular: true,
      href: '/book?type=individual',
    },
    {
      icon: Heart,
      title: 'Couple Therapy',
      price: '₹3,000',
      suffix: 'onwards',
      features: [
        '60 minutes per session',
        'Online mode (Video call)',
        'Both partner consent required',
        'Safe, neutral space',
        'Communication-focused',
        'Relationship assessment included',
      ],
      color: 'border-rose-light hover:border-rose-accent',
      iconBg: 'bg-rose-light text-rose-dark',
      buttonClass: 'btn-rose',
      popular: false,
      href: '/book?type=couple',
    },
    {
      icon: Users,
      title: 'Family Therapy',
      price: '₹4,000',
      suffix: 'onwards',
      features: [
        '60 minutes per session',
        'Online mode (Video call)',
        'Consent from all members',
        'Systemic approach',
        'Family dynamics assessment',
        'Collaborative goal-setting',
      ],
      color: 'border-beige-300 hover:border-beige-400',
      iconBg: 'bg-beige-200 text-charcoal-light',
      buttonClass: 'btn-secondary',
      popular: false,
      href: '/book?type=family',
    },
    {
      icon: Trophy,
      title: 'Sports Counselling',
      price: '₹1,500',
      suffix: 'onwards',
      features: [
        '60 minutes per session',
        'Online mode (Video call)',
        'Athletes of all levels',
        'Performance & wellbeing focus',
        'Athlete-informed approach',
        'Mental skills training',
      ],
      color: 'border-sage-200 hover:border-sage-400',
      iconBg: 'bg-sage-200 text-sage-700',
      buttonClass: 'btn-primary',
      popular: false,
      href: '/book?type=sports',
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-beige-50 relative">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sage-400 text-sm font-medium uppercase tracking-wider">Investment in You</span>
          <h2 className="section-title mt-3">Session Pricing</h2>
          <p className="section-subtitle mx-auto">
            Your mental health is an investment, not an expense. Transparent pricing with no hidden fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-sage-300 text-white text-xs font-medium px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`card h-full border-2 ${plan.color} transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'ring-2 ring-sage-200 ring-offset-4' : ''}`}>
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${plan.iconBg} flex items-center justify-center`}>
                      <plan.icon size={22} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-charcoal">
                      {plan.title}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="pb-4 border-b border-beige-200">
                    <span className="font-heading text-3xl font-bold text-charcoal">{plan.price}</span>
                    <span className="text-charcoal-lighter text-sm ml-2">{plan.suffix}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check size={16} className="text-sage-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-charcoal-light">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={plan.href}
                    className={`${plan.buttonClass} block text-center w-full`}
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-charcoal-lighter mt-10 max-w-xl mx-auto"
        >
          All sessions are conducted online via secure video call. 
          Payment is required at the time of booking. See our{' '}
          <Link href="/cancellation-policy" className="text-sage-500 underline">
            cancellation policy
          </Link>{' '}
          for details.
        </motion.p>
      </div>
    </section>
  );
}

