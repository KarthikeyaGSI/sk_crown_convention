"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingShowcaseImages, shimmerBlurDataUrl } from "@/lib/images";
import { ShowcaseEventData } from "@/lib/sanity-data";

interface WeddingShowcaseProps {
  initialEvents?: ShowcaseEventData[];
}

export default function WeddingShowcase({ initialEvents }: WeddingShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [events, setEvents] = useState<Array<{ src: string; title: string; description: string }>>([]);

  useEffect(() => {
    if (initialEvents && initialEvents.length > 0) {
      setEvents(
        initialEvents.map((e) => ({
          src: e.imageUrl,
          title: e.title,
          description: `${e.description}${e.theme ? ` | Theme: ${e.theme}` : ""}${
            e.capacity ? ` | Guest Capacity: ${e.capacity}` : ""
          }`,
        }))
      );
      return;
    }

    async function fetchEvents() {
      try {
        const { getShowcaseEvents } = await import("@/lib/sanity-data");
        const data = await getShowcaseEvents();
        setEvents(
          data.map((e) => ({
            src: e.imageUrl,
            title: e.title,
            description: `${e.description}${e.theme ? ` | Theme: ${e.theme}` : ""}${
              e.capacity ? ` | Guest Capacity: ${e.capacity}` : ""
            }`,
          }))
        );
      } catch (err) {
        console.error("Error loading showcase events:", err);
        setEvents(weddingShowcaseImages);
      }
    }
    fetchEvents();
  }, [initialEvents]);

  // Safety bounds check
  const activeEvent = events[activeIdx] || events[0] || weddingShowcaseImages[0];

  if (events.length === 0) return null;

  return (
    <section id="showcase" className="py-20 md:py-36 bg-[#0B0B0B] border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Layout Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 md:mb-24">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
              Exquisite Themes & Layouts
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white-soft">
              Wedding Stage & Décor Showcase
            </h2>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-sm text-muted-text font-sans font-light leading-relaxed max-w-sm ml-auto">
              We translate your dreams into visual realities, offering award-winning floral designs and majestic architectural backdrops.
            </p>
          </div>
        </div>

        {/* Dynamic Showcase Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Theme Selector list */}
          <div className="lg:col-span-4 order-2 lg:order-1 space-y-3 flex flex-col justify-center">
            {events.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left p-4 md:p-6 rounded-2xl border transition-all duration-300 font-sans cursor-pointer focus:outline-none ${
                  idx === activeIdx
                    ? "bg-luxury-card border-gold/45 text-gold shadow-lg"
                    : "bg-transparent border-luxury-border text-white-soft/60 hover:text-white-soft hover:border-luxury-border/65"
                }`}
              >
                <span className="text-[10px] tracking-wider text-gold font-semibold uppercase block mb-1">
                  Theme 0{idx + 1}
                </span>
                <span className="text-sm md:text-lg font-serif font-bold block">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Large Showcase Image display */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="relative h-[360px] sm:h-[450px] md:h-[550px] w-full rounded-[24px] overflow-hidden group shadow-2xl border border-luxury-border">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeEvent.src}
                    alt={activeEvent.title}
                    fill
                    placeholder="blur"
                    blurDataURL={shimmerBlurDataUrl(800, 550)}
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Glass overlay with details */}
                  <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6 p-4 md:p-8 bg-[#121212]/90 backdrop-blur-md border border-white/5 rounded-2xl">
                    <h3 className="text-sm md:text-2xl font-serif font-bold text-white-soft">
                      {activeEvent.title}
                    </h3>
                    <p className="text-[10px] md:text-sm text-muted-text font-sans font-light mt-1.5 md:mt-2 leading-relaxed line-clamp-3">
                      {activeEvent.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
