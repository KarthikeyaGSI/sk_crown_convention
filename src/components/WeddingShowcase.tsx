"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingShowcaseImages, shimmerBlurDataUrl } from "@/lib/images";

export default function WeddingShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="showcase" className="py-24 md:py-36 bg-[#0B0B0B] border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Layout Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Theme Selector list */}
          <div className="lg:col-span-4 order-2 lg:order-1 space-y-3">
            {weddingShowcaseImages.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 font-sans cursor-pointer ${
                  idx === activeIdx
                    ? "bg-luxury-card border-gold/40 text-gold shadow-lg"
                    : "bg-transparent border-luxury-border text-white-soft/60 hover:text-white-soft hover:border-luxury-border/65"
                }`}
              >
                <span className="text-xs tracking-wider text-gold font-semibold uppercase block mb-1">
                  Theme 0{idx + 1}
                </span>
                <span className="text-lg font-serif font-bold block">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Large Showcase Image display */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="relative h-[300px] md:h-[550px] w-full rounded-[24px] overflow-hidden group shadow-2xl border border-luxury-border">
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
                    src={weddingShowcaseImages[activeIdx].src}
                    alt={weddingShowcaseImages[activeIdx].title}
                    fill
                    placeholder="blur"
                    blurDataURL={shimmerBlurDataUrl(800, 550)}
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Glass overlay with details */}
                  <div className="absolute inset-x-6 bottom-6 p-6 md:p-8 bg-[#121212]/80 backdrop-blur-md border border-white/5 rounded-2xl">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white-soft">
                      {weddingShowcaseImages[activeIdx].title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-text font-sans font-light mt-2 leading-relaxed">
                      {weddingShowcaseImages[activeIdx].description}
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
