'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, MapPin, Clock, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In production, send to API route
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white relative">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sage-400 text-sm font-medium uppercase tracking-wider">Reach Out</span>
          <h2 className="section-title mt-3">Get in Touch</h2>
          <p className="section-subtitle mx-auto">
            Have a question or want to know more? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-sage-600" />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal">Email</h4>
                  <p className="text-charcoal-lighter text-sm mt-1">janhavi@example.com</p>
                  <p className="text-xs text-charcoal-lighter mt-0.5">Response within 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-sage-600" />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal">WhatsApp</h4>
                  <p className="text-charcoal-lighter text-sm mt-1">+91 XXXXX XXXXX</p>
                  <p className="text-xs text-charcoal-lighter mt-0.5">For booking inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-sage-600" />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal">Location</h4>
                  <p className="text-charcoal-lighter text-sm mt-1">Bangalore, India</p>
                  <p className="text-xs text-charcoal-lighter mt-0.5">Online sessions — accessible anywhere</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-sage-600" />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal">Session Timings</h4>
                  <p className="text-charcoal-lighter text-sm mt-1">Monday – Saturday</p>
                  <p className="text-xs text-charcoal-lighter mt-0.5">10:00 AM – 8:00 PM IST</p>
                </div>
              </div>
            </div>

            {/* Confidentiality Note */}
            <div className="p-4 bg-sage-50 rounded-2xl border border-sage-100">
              <p className="text-xs text-sage-600 leading-relaxed">
                🔒 <strong>Confidentiality Promise:</strong> All communications are strictly confidential. 
                Your privacy and emotional safety are my priority.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card space-y-5">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field min-h-[120px] resize-none"
                  placeholder="How can I help you?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-charcoal-lighter text-center">
                I typically respond within 24-48 hours during working days.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
