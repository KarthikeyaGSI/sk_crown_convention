"use client";

import React, { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { googleReviews } from "@/lib/reviews";
import Button from "./Button";

export default function Reviews() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the reviews array to ensure seamless infinite loop scrolling
  const duplicatedReviews = [...googleReviews, ...googleReviews, ...googleReviews];

  return (
    <section id="reviews" className="py-24 md:py-36 bg-[#0B0B0B] border-b border-luxury-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        
        {/* Title & Google Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
              Client Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white-soft leading-tight">
              Guest Reflections
            </h2>
            <div className="w-16 h-[1px] bg-gold" />
          </div>
          
          {/* Verification Badge */}
          <div className="flex items-center gap-4 bg-luxury-card border border-luxury-border px-6 py-3.5 rounded-2xl">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-serif font-bold text-white-soft">4.3</span>
                <span className="text-[10px] text-muted-text font-sans">/ 5.0 Rating</span>
              </div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>
            </div>
            <div className="h-8 w-[1px] bg-luxury-border" />
            <div className="text-xs text-muted-text font-sans leading-relaxed">
              177 verified <br />Google Reviews
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div 
        className="relative w-full flex items-center overflow-hidden py-4 select-none mask-gradient"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <motion.div
          animate={{
            x: isPaused ? 0 : [0, "-33.33%"],
          }}
          transition={{
            x: {
              ease: "linear",
              duration: 55,
              repeat: Infinity,
            },
          }}
          className="flex gap-6 w-max"
        >
          {duplicatedReviews.map((review, idx) => (
            <div
              key={review.id + "-" + idx}
              className="w-[280px] md:w-[360px] flex-shrink-0 bg-luxury-card border border-luxury-border p-6 rounded-[24px] space-y-4 hover:border-gold/30 transition-all duration-300 shadow-md"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h4 className="text-xs md:text-sm font-serif font-bold text-white-soft">
                  {review.author}
                </h4>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs md:text-sm text-white-soft/85 font-sans font-light leading-relaxed italic line-clamp-4">
                "{review.content}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tailwind utility classes for gradient mask */}
      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}
