"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages } from "@/lib/images";
import { VENUE_DETAILS } from "@/lib/constants";
import Button from "./Button";

const EDITORIAL_GRID_LAYOUTS = [
  // 1. Hero Image (Full width block)
  { colClass: "md:col-span-4 h-[350px] md:h-[600px]" },
  // 2. Landscape 1
  { colClass: "md:col-span-2 h-[260px] md:h-[350px]" },
  // 3. Landscape 2
  { colClass: "md:col-span-2 h-[260px] md:h-[350px]" },
  // 4. Portrait 1
  { colClass: "md:col-span-2 md:row-span-2 h-[450px] md:h-[720px]" },
  // 5. Portrait 2
  { colClass: "md:col-span-2 md:row-span-2 h-[450px] md:h-[720px]" },
  // 6. Small 1
  { colClass: "md:col-span-1 h-[180px] md:h-[240px]" },
  // 7. Small 2
  { colClass: "md:col-span-1 h-[180px] md:h-[240px]" },
  // 8. Small 3
  { colClass: "md:col-span-1 h-[180px] md:h-[240px]" },
  // 9. Small 4
  { colClass: "md:col-span-1 h-[180px] md:h-[240px]" },
  // 10. Wide Banner
  { colClass: "md:col-span-4 h-[260px] md:h-[400px]" },
  // 11. Editorial 1
  { colClass: "md:col-span-2 h-[260px] md:h-[450px]" },
  // 12. Editorial 2
  { colClass: "md:col-span-2 h-[260px] md:h-[450px]" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 md:py-48 bg-[#121212] border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Gallery Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-28">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
              Moments of Celebration
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-white-soft leading-tight">
              Explore More Moments
            </h2>
            <div className="w-16 h-[1px] bg-gold" />
          </div>
          <div>
            <Button
              variant="secondary"
              onClick={() => {
                window.open(VENUE_DETAILS.googleMapsLink, "_blank");
              }}
            >
              View Full Gallery
            </Button>
          </div>
        </div>

        {/* Editorial Layout Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {galleryImages.map((src, index) => {
            const layout = EDITORIAL_GRID_LAYOUTS[index] || { colClass: "md:col-span-1 h-[260px]" };
            return (
              <motion.div
                key={src + index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
                className={`group relative rounded-[24px] overflow-hidden border border-luxury-border bg-[#0B0B0B] ${layout.colClass}`}
              >
                <Image
                  src={src}
                  alt={`SK Crown Convention Celebration Moment ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
