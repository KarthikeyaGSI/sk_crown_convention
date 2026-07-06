"use client";

import React from "react";
import { HomepageData } from "@/lib/fallback-data";
import Button from "./Button";

interface CTAProps {
  homepage?: HomepageData;
  onOpenBooking: () => void;
}

export default function CTA({ homepage, onOpenBooking }: CTAProps) {
  const cta = homepage?.ctaBanner || {
    title: "Ready To Plan Your Celebration?",
    subtitle: "Allow us to assist you in designing a lifetime celebration. Schedule an exclusive private tour of the venue and banquet facilities today.",
    ctaLabel: "Book Venue Visit",
    ctaLink: "/contact",
  };

  return (
    <section className="py-24 md:py-36 bg-[#121212] border-b border-luxury-border relative overflow-hidden text-center">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-8">
        <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">
          Begin Your Journey
        </span>
        
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white-soft leading-tight">
          {cta.title.includes("?") ? (
            <>
              {cta.title.slice(0, cta.title.indexOf("?"))} <br />
              <span className="text-gold-soft">?</span>
            </>
          ) : (
            cta.title
          )}
        </h2>
        
        <div className="w-12 h-[1px] bg-gold mx-auto" />
        
        {cta.subtitle && (
          <p className="text-sm md:text-base text-muted-text font-sans font-light max-w-xl mx-auto leading-relaxed">
            {cta.subtitle}
          </p>
        )}

        <div className="pt-4">
          <Button variant="primary" onClick={onOpenBooking} className="px-10 py-4 text-base">
            {cta.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
