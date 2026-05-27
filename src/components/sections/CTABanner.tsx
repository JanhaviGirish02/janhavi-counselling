'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-300 to-sage-500 p-8 md:p-12 text-center text-white"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
              <Calendar size={28} className="text-white" />
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto">
              Taking the first step is often the hardest. I&apos;m here to make it as comfortable 
              and accessible as possible for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-sage-600 font-semibold rounded-2xl hover:bg-beige-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book a Session
                <ArrowRight size={18} />
              </Link>
              <a
                href="mailto:therapywithjanhaviofficial@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                Contact over Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
