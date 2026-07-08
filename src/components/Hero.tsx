"use client";

import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { HeroSlideData, HomepageData } from "@/lib/fallback-data";
import Button from "./Button";
import {
  CalendarRange,
  ShieldCheck,
  MapPin,
  Wind,
  Hourglass,
  Users,
  Car,
  Heart,
  Flame,
  Shield
} from "lucide-react";

interface HeroProps {
  heroSlides: HeroSlideData[];
  homepage: HomepageData;
  onOpenBooking: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5 text-gold" />,
  Car: <Car className="w-5 h-5 text-gold" />,
  Heart: <Heart className="w-5 h-5 text-gold" />,
  Flame: <Flame className="w-5 h-5 text-gold" />,
  Shield: <Shield className="w-5 h-5 text-gold" />,
  MapPin: <MapPin className="w-5 h-5 text-gold" />,
  Wind: <Wind className="w-5 h-5 text-gold" />,
  CalendarRange: <CalendarRange className="w-5 h-5 text-gold" />,
  Hourglass: <Hourglass className="w-5 h-5 text-gold" />,
};

export default function Hero({ heroSlides, homepage, onOpenBooking }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const setCurrentImageIndex = React.useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex();
    }, 6000); // 6 seconds crossfade interval
    return () => clearInterval(timer);
  }, [heroSlides.length, setCurrentImageIndex]);

  const getIconElement = (name?: string, index: number = 0) => {
    if (name && ICON_MAP[name]) return ICON_MAP[name];
    const defaultIcons = [
      <Users className="w-5 h-5 text-gold" key="default-users" />,
      <Hourglass className="w-5 h-5 text-gold" key="default-hg" />,
      <Car className="w-5 h-5 text-gold" key="default-car" />,
      <ShieldCheck className="w-5 h-5 text-gold" key="default-shield" />,
      <MapPin className="w-5 h-5 text-gold" key="default-pin" />,
    ];
    return defaultIcons[index % defaultIcons.length];
  };

  const slides = heroSlides.length > 0 ? heroSlides : [
    {
      title: homepage.heroHeading,
      subtitle: homepage.heroSubheading,
      description: "Warangal's premier air-conditioned convention center",
      imageUrl: "/images/sk crown decor main.webp",
      ctaLabel: homepage.heroCTA.label,
      ctaLink: homepage.heroCTA.link,
      secondaryCtaLabel: homepage.heroSecondaryCTA.label,
      secondaryCtaLink: homepage.heroSecondaryCTA.link,
    }
  ];

  const currentSlide = slides[currentSlideIndex] || slides[0];

  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-var(--navbar-height))] flex flex-col justify-between pt-[var(--navbar-height)]"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("heroVideoReady"));
            }
          }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video-sk-crown.mp4" type="video/mp4" />
        </video>

        {/* Enhanced Vignette and Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0B0B0B_95%)] pointer-events-none z-10 opacity-80" />
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ backgroundColor: `rgba(11, 11, 11, 0.5)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/40 z-10 pointer-events-none" />
      </div>

      {/* Hero Content - Centered Flex Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 md:pt-28 pb-16 flex-1 flex flex-col justify-center">
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
              {currentSlide.subtitle || homepage.heroSubheading}
            </span>
            <span className="h-[1px] w-8 bg-gold/50" />
          </motion.div>

          <h1 className="text-4xl md:text-7xl lg:text-[88px] font-serif font-bold text-white-soft leading-[1.05] tracking-tight mb-8">
            {currentSlide.title.split(" | ")[0]} <br />
            {currentSlide.title.split(" | ")[1] && (
              <span className="text-gold-soft">{currentSlide.title.split(" | ")[1]}</span>
            )}
          </h1>

          {currentSlide.description && (
            <p className="text-base md:text-xl text-muted-text font-sans font-light max-w-2xl mb-12 leading-relaxed">
              {currentSlide.description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-6">
            <Button variant="primary" onClick={onOpenBooking}>
              {currentSlide.ctaLabel || homepage.heroCTA.label}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                const el = document.getElementById("gallery");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              showArrow={false}
            >
              {currentSlide.secondaryCtaLabel || homepage.heroSecondaryCTA.label}
            </Button>
          </div>
        </motion.div>
      </div>



      {/* Highlight Strip */}
      <div className="relative z-20 bg-luxury-card border-y border-luxury-border py-10 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-luxury-border">
            {homepage.highlights.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center md:items-start text-center md:text-left md:px-6 pt-6 md:pt-0"
              >
                <div className="p-2.5 rounded-full bg-[#0B0B0B] border border-luxury-border mb-3.5 shadow-sm">
                  {getIconElement(feature.icon, index)}
                </div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-serif font-bold text-white-soft">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-text font-sans mt-1.5 leading-relaxed max-w-[180px]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
