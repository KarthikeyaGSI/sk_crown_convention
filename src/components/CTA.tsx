"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

interface CTAProps {
  onOpenBooking: () => void;
}

export default function CTA({ onOpenBooking }: CTAProps) {
  return (
    <section className="py-24 md:py-36 bg-[#121212] border-b border-luxury-border relative overflow-hidden text-center">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-8">
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">
          Begin Your Journey
        </span>
        
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white-soft leading-tight">
          Ready To Plan Your <br />
          <span className="text-gold-soft">Celebration?</span>
        </h2>
        
        <div className="w-12 h-[1px] bg-gold mx-auto" />
        
        <p className="text-sm md:text-base text-muted-text font-sans font-light max-w-xl mx-auto leading-relaxed">
          Allow us to assist you in designing a lifetime celebration. Schedule an exclusive private tour of the venue and banquet facilities today.
        </p>

        <div className="pt-4">
          <Button variant="primary" onClick={onOpenBooking} className="px-10 py-4 text-base">
            Book Venue Visit
          </Button>
        </div>
      </div>
    </section>
  );
}
