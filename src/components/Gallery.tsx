"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { galleryImages, shimmerBlurDataUrl } from "@/lib/images";
import { VENUE_DETAILS } from "@/lib/constants";
import Button from "./Button";

const EDITORIAL_GRID_LAYOUTS = [
  // 1. Hero Image (Full width block)
  { colClass: "col-span-2 md:col-span-4 h-[220px] md:h-[600px]" },
  // 2. Landscape 1
  { colClass: "col-span-1 md:col-span-2 h-[160px] md:h-[350px]" },
  // 3. Landscape 2
  { colClass: "col-span-1 md:col-span-2 h-[160px] md:h-[350px]" },
  // 4. Portrait 1
  { colClass: "col-span-2 md:col-span-2 md:row-span-2 h-[300px] md:h-[720px]" },
  // 5. Portrait 2
  { colClass: "col-span-2 md:col-span-2 md:row-span-2 h-[300px] md:h-[720px]" },
  // 6. Small 1
  { colClass: "col-span-1 md:col-span-1 h-[140px] md:h-[240px]" },
  // 7. Small 2
  { colClass: "col-span-1 md:col-span-1 h-[140px] md:h-[240px]" },
  // 8. Small 3
  { colClass: "col-span-1 md:col-span-1 h-[140px] md:h-[240px]" },
  // 9. Small 4
  { colClass: "col-span-1 md:col-span-1 h-[140px] md:h-[240px]" },
  // 10. Wide Banner
  { colClass: "col-span-2 md:col-span-4 h-[200px] md:h-[400px]" },
  // 11. Editorial 1
  { colClass: "col-span-1 md:col-span-2 h-[160px] md:h-[450px]" },
  // 12. Editorial 2
  { colClass: "col-span-1 md:col-span-2 h-[160px] md:h-[450px]" },
];

export default function Gallery() {
  const [images, setImages] = useState<string[]>(galleryImages);

  useEffect(() => {
    async function fetchImages() {
      try {
        const { getGalleryImages } = await import("@/lib/sanity-data");
        const data = await getGalleryImages();
        setImages(data);
      } catch (err) {
        console.error("Error loading gallery images:", err);
      }
    }
    fetchImages();
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-36 bg-[#121212] border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Gallery Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
              Moments of Celebration
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[54px] font-serif font-bold text-white-soft leading-tight">
              Explore More Moments
            </h2>
            <div className="w-16 h-[1px] bg-gold" />
          </div>
          <div>
            <Link href="/gallery" passHref>
              <Button variant="secondary">
                View All Images
              </Button>
            </Link>
          </div>
        </div>

        {/* Editorial Layout Asymmetric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {images.map((src, index) => {
            const layout = EDITORIAL_GRID_LAYOUTS[index] || { colClass: "col-span-1 h-[160px]" };
            return (
              <motion.div
                key={src + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
                className={`group relative rounded-[16px] md:rounded-[24px] overflow-hidden border border-luxury-border bg-[#0B0B0B] ${layout.colClass}`}
              >
                <Image
                  src={src}
                  alt={`SK Crown Convention Celebration Moment ${index + 1}`}
                  fill
                  placeholder="blur"
                  blurDataURL={shimmerBlurDataUrl(600, 400)}
                  sizes="(max-width: 768px) 50vw, 25vw"
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
