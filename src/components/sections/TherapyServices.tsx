'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Heart, Users, ArrowRight } from 'lucide-react';

export default function TherapyServices() {
  const services = [
    {
      icon: User,
      title: 'Individual Therapy',
      description: 'One-on-one sessions tailored to your unique needs. Navigate anxiety, depression, stress, trauma, and personal growth in a safe space.',
      features: ['60 min sessions', 'Online mode', 'Personalized approach'],
      color: 'from-sage-100 to-sage-50',
      iconBg: 'bg-sage-200 text-sage-600',
      href: '/book?type=individual',
    },
    {
      icon: Heart,
      title: 'Couple Therapy',
      description: 'Strengthen your relationship through better communication, trust-building, and conflict resolution in a supportive environment.',
      features: ['60 min sessions', 'Both partners', 'Evidence-based'],
      color: 'from-rose-light to-beige-100',
      iconBg: 'bg-rose-light text-rose-dark',
      href: '/book?type=couple',
    },
    {
      icon: Users,
      title: 'Family Therapy',
      description: 'Heal family dynamics, improve communication, and build stronger connections within your family system.',
      features: ['60 min sessions', 'All members', 'Systemic approach'],
      color: 'from-beige-200 to-beige-100',
      iconBg: 'bg-beige-300 text-charcoal-light',
      href: '/book?type=family',
    },
  ];

  return (
    <section id="therapy" className="section-padding bg-beige-50 relative">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sage-400 text-sm font-medium uppercase tracking-wider">How I Can Help</span>
          <h2 className="section-title mt-3">Therapy Services</h2>
          <p className="section-subtitle mx-auto">
            Every journey is unique. Choose the therapy format that feels right for you.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className={`card h-full bg-gradient-to-br ${service.color} border-0 group-hover:shadow-hover transition-all duration-300 group-hover:-translate-y-1`}>
                <div className="space-y-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center`}>
                    <service.icon size={24} />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="font-heading text-xl font-semibold text-charcoal">
                      {service.title}
                    </h3>
                    <p className="text-charcoal-light text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-charcoal-lighter">
                        <div className="w-1.5 h-1.5 rounded-full bg-sage-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-sage-500 font-medium text-sm group-hover:gap-3 transition-all"
                  >
                    Book Now
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
