"use client";

import React from "react";
import { Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { featuredReview, reviewsList } from "@/lib/reviews";
import Button from "./Button";

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 md:py-48 bg-[#0B0B0B] border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="max-w-3xl space-y-4 mb-20 md:mb-28">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-white-soft leading-tight">
            Guest Reflections
          </h2>
          <div className="w-16 h-[1px] bg-gold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Google Reviews Summary & Large Featured Review */}
          <div className="lg:col-span-6 space-y-10">
            {/* Google Badge Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-transparent border-b border-luxury-border pb-8 flex items-center justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-semibold">
                  Google Verification
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl font-serif font-bold text-white-soft">4.9</span>
                  <span className="text-sm text-muted-text font-sans">/ 5.0 Rating</span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xs text-muted-text font-sans mt-3">
                  Based on 1,450+ verified guest reviews
                </p>
              </div>
              <div className="hidden sm:block opacity-25">
                <MessageSquare className="w-16 h-16 text-gold" />
              </div>
            </motion.div>

            {/* Featured Review */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <span className="text-xs uppercase tracking-widest text-gold font-sans font-semibold">
                Featured Testimonial
              </span>
              <p className="text-xl md:text-2xl font-serif italic text-white-soft leading-relaxed">
                "{featuredReview.content}"
              </p>
              <div className="pt-4 flex justify-between items-center border-t border-luxury-border/40">
                <div>
                  <h4 className="text-sm font-serif font-bold text-white-soft">{featuredReview.author}</h4>
                  <p className="text-xs text-muted-text font-sans mt-0.5">{featuredReview.role}</p>
                </div>
                <span className="text-xs text-muted-text font-sans">{featuredReview.date}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3 Smaller Reviews & Redirect Link */}
          <div className="lg:col-span-6 space-y-8 lg:pl-8">
            {reviewsList.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="border-b border-luxury-border/30 pb-6 last:border-b-0 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-text font-sans">{review.date}</span>
                </div>
                <p className="text-sm text-white-soft/80 font-sans font-light leading-relaxed italic">
                  "{review.content}"
                </p>
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <h4 className="text-xs font-serif font-bold text-white-soft">{review.author}</h4>
                    <p className="text-[10px] text-muted-text font-sans">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="pt-6 flex justify-start">
              <Button
                variant="secondary"
                onClick={() => {
                  window.open("https://search.google.com/local/reviews?placeid=ChIJ8_z90V_5yTsRz8R7K6Rpx7E", "_blank");
                }}
              >
                Read All Reviews
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
