"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./Button";
import { venueImages } from "@/lib/images";

interface VenueStoryProps {
  onOpenBooking: () => void;
}

export default function VenueStory({ onOpenBooking }: VenueStoryProps) {
  return (
    <section id="about" className="py-24 md:py-36 bg-[#0B0B0B] border-b border-luxury-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
              A Venue Designed For Celebrations
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white-soft leading-tight">
              Crafted for Moments That Matter
            </h2>
            <div className="w-12 h-[1px] bg-gold" />
            <p className="text-sm md:text-base text-muted-text font-sans font-light leading-relaxed">
              SK Crown Convention is designed as a sanctuary of celebration. Taking cues from Aman Resorts and global luxury editorial design, we marry clean architectural lines with grand spatial scale. 
            </p>
            <p className="text-sm md:text-base text-muted-text font-sans font-light leading-relaxed">
              From high-arched glass entrances to customizable ambient lighting, our spaces serve as a blank canvas for your dream wedding, corporate gala, or family milestone. Every corner is meticulously detailed to elevate the guest experience.
            </p>
            <div className="pt-4 flex gap-4">
              <Button variant="secondary" onClick={() => {
                const el = document.getElementById("experience");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}>
                Learn More
              </Button>
              <Button variant="primary" showArrow={false} onClick={onOpenBooking}>
                Book Now
              </Button>
            </div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative h-[450px] md:h-[600px] w-full rounded-[24px] overflow-hidden group shadow-2xl"
          >
            <Image
              src={venueImages[0]}
              alt="SK Crown Convention Luxury Interior"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Elegant glass overlay on bottom corner */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#121212]/80 backdrop-blur-md border border-white/5 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold font-sans font-semibold">The Grand Foyer</p>
                <p className="text-lg font-serif text-white-soft mt-1">Refined Minimalist Entrance</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-muted-text font-sans">Height</p>
                <p className="text-lg font-serif text-gold mt-0.5">30 Feet</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
