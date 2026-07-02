"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { heroImages, shimmerBlurDataUrl } from "@/lib/images";
import { VENUE_DETAILS } from "@/lib/constants";
import Button from "./Button";
import { CalendarRange, ShieldCheck, MapPin, Wind, Hourglass } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

const FEATURE_ICONS = [
  <CalendarRange className="w-5 h-5 text-gold" key="cap" />,
  <Hourglass className="w-5 h-5 text-gold" key="247" />,
  <ShieldCheck className="w-5 h-5 text-gold" key="park" />,
  <Wind className="w-5 h-5 text-gold" key="ac" />,
  <MapPin className="w-5 h-5 text-gold" key="loc" />,
];

export default function Hero({ onOpenBooking }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // 6 seconds crossfade interval
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-var(--navbar-height))] flex flex-col justify-between pt-[var(--navbar-height)]"
    >
      {/* Immersive Slideshow Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: 15, ease: "linear" }}
              className="relative w-full h-full"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt="SK Crown Convention Venue Background"
                fill
                priority
                fetchPriority="high"
                placeholder="blur"
                blurDataURL={shimmerBlurDataUrl(1920, 1080)}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Vignette and Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0B0B0B_95%)] pointer-events-none z-10 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/95 via-[#0B0B0B]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/40 z-10" />
      </div>

      {/* Hero Content - Centered Flex Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 pb-16 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="max-w-4xl -translate-y-8 md:-translate-y-16"
        >
          {/* Animated Logo / Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-gold/50" />
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-gold font-sans font-semibold">
              {VENUE_DETAILS.name}
            </span>
            <span className="h-[1px] w-8 bg-gold/50" />
          </motion.div>

          <h1 className="text-4xl md:text-7xl lg:text-[88px] font-serif font-bold text-white-soft leading-[1.05] tracking-tight mb-8">
            Where Every Celebration <br />
            <span className="text-gold-soft">Becomes A Lifetime Memory</span>
          </h1>

          <p className="text-base md:text-xl text-muted-text font-sans font-light max-w-2xl mb-12 leading-relaxed">
            {VENUE_DETAILS.tagline}. Celebrate in luxury on Mulug Road, Warangal, with premium banquets, fully AC halls, and massive parking space.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button variant="primary" onClick={onOpenBooking}>
              Book Venue Visit
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                const el = document.getElementById("gallery");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              showArrow={false}
            >
              Explore Gallery
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Centered Slider Indicators */}
      <div className="absolute bottom-[20vh] left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              idx === currentImageIndex ? "w-8 bg-gold" : "w-2 bg-white/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Highlight Strip */}
      <div className="relative z-20 bg-luxury-card border-y border-luxury-border py-10 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-luxury-border">
            {VENUE_DETAILS.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center md:items-start text-center md:text-left md:px-6 pt-6 md:pt-0"
              >
                <div className="p-2.5 rounded-full bg-[#0B0B0B] border border-luxury-border mb-3.5 shadow-sm">
                  {FEATURE_ICONS[index]}
                </div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-white-soft">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-text font-sans mt-1.5 leading-relaxed max-w-[180px]">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
