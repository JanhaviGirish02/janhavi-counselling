'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Janhavi creates the most comfortable space to open up. I've been dealing with anxiety for years, and for the first time, I feel truly heard and understood.",
    name: "A.S.",
    detail: "Individual Therapy Client",
  },
  {
    id: 2,
    text: "Our relationship was at a breaking point. The couple sessions helped us communicate better and understand each other's perspectives. Grateful beyond words.",
    name: "R. & M.",
    detail: "Couple Therapy Clients",
  },
  {
    id: 3,
    text: "I was struggling with academic pressure and burnout. Janhavi helped me develop coping strategies and set realistic goals. My Performance has improved significantly.",
    name: "P.K.",
    detail: "Academic Stress Counselling",
  },
  {
    id: 4,
    text: "The family therapy sessions brought us closer together. We learned to respect boundaries while maintaining the love that holds our family together.",
    name: "The D. Family",
    detail: "Family Therapy Clients",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-beige-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sage-400 text-sm font-medium uppercase tracking-wider">Client Stories</span>
          <h2 className="section-title mt-3">Words of Healing</h2>
          <p className="text-charcoal-lighter mt-3 text-sm">
            Names are anonymized to protect client privacy
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="card max-w-2xl mx-auto text-center relative"
            >
              <Quote size={32} className="text-sage-200 mx-auto mb-4" />
              <p className="text-charcoal text-lg leading-relaxed italic font-light">
                &quot;{testimonials[current].text}&quot;
              </p>
              <div className="mt-6 pt-4 border-t border-beige-100">
                <p className="font-medium text-charcoal">{testimonials[current].name}</p>
                <p className="text-sm text-charcoal-lighter">{testimonials[current].detail}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2.5 rounded-full bg-white border border-beige-200 hover:bg-sage-50 hover:border-sage-200 transition-colors"
            >
              <ChevronLeft size={18} className="text-charcoal" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === current ? 'bg-sage-300 w-6' : 'bg-beige-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-full bg-white border border-beige-200 hover:bg-sage-50 hover:border-sage-200 transition-colors"
            >
              <ChevronRight size={18} className="text-charcoal" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
