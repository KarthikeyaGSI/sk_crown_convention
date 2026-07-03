"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, shimmerBlurDataUrl } from "@/lib/images";
import { GalleryImageData } from "@/lib/sanity-data";

const EDITORIAL_GRID_LAYOUTS = [
  { colClass: "col-span-2 md:col-span-4 h-[220px] md:h-[600px]" },
  { colClass: "col-span-1 md:col-span-2 h-[160px] md:h-[350px]" },
  { colClass: "col-span-1 md:col-span-2 h-[160px] md:h-[350px]" },
  { colClass: "col-span-2 md:col-span-2 md:row-span-2 h-[300px] md:h-[720px]" },
  { colClass: "col-span-2 md:col-span-2 md:row-span-2 h-[300px] md:h-[720px]" },
  { colClass: "col-span-1 md:col-span-1 h-[140px] md:h-[240px]" },
  { colClass: "col-span-1 md:col-span-1 h-[140px] md:h-[240px]" },
  { colClass: "col-span-1 md:col-span-1 h-[140px] md:h-[240px]" },
  { colClass: "col-span-1 md:col-span-1 h-[140px] md:h-[240px]" },
  { colClass: "col-span-2 md:col-span-4 h-[200px] md:h-[400px]" },
  { colClass: "col-span-1 md:col-span-2 h-[160px] md:h-[450px]" },
  { colClass: "col-span-1 md:col-span-2 h-[160px] md:h-[450px]" },
];

interface GalleryClientProps {
  initialImages?: GalleryImageData[];
}

export default function GalleryClient({ initialImages }: GalleryClientProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setImages(initialImages.map((img) => img.imageUrl));
      return;
    }

    async function fetchImages() {
      try {
        const { getGalleryImages } = await import("@/lib/sanity-data");
        const data = await getGalleryImages();
        setImages(data.map((img) => img.imageUrl));
      } catch (err) {
        console.error("Error loading gallery images:", err);
        setImages(galleryImages);
      }
    }
    fetchImages();
  }, [initialImages]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (index !== null) {
      setIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (index !== null) {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
    }
  };

  const handleClose = () => setIndex(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, images]);

  if (images.length === 0) return null;

  return (
    <div className="py-24 md:py-36 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
            Gallery Showcase
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-white-soft leading-tight">
            Moments Captured in Royalty
          </h1>
          <div className="w-16 h-[1px] bg-gold" />
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {images.map((src, idx) => {
            const layout = EDITORIAL_GRID_LAYOUTS[idx] || { colClass: "col-span-1 h-[160px]" };
            return (
              <motion.div
                key={src + idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (idx % 4) * 0.1 }}
                onClick={() => setIndex(idx)}
                className={`group relative rounded-[16px] md:rounded-[24px] overflow-hidden border border-luxury-border bg-[#0B0B0B] cursor-pointer ${layout.colClass}`}
              >
                <Image
                  src={src}
                  alt={`SK Crown Convention Gallery Moment ${idx + 1}`}
                  fill
                  placeholder="blur"
                  blurDataURL={shimmerBlurDataUrl(600, 400)}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex flex-col justify-between p-6 bg-[#0B0B0B]/95 backdrop-blur-md select-none"
          >
            {/* Top Close Bar */}
            <div className="flex justify-between items-center z-10">
              <span className="text-xs uppercase tracking-widest text-gold font-sans">
                Image {index + 1} of {images.length}
              </span>
              <button
                onClick={handleClose}
                className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white-soft cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Slider Area */}
            <div className="flex-grow flex items-center justify-between relative max-w-5xl mx-auto w-full h-[65vh]">
              {/* Previous Trigger */}
              <button
                onClick={handlePrev}
                className="absolute left-0 p-3.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white-soft z-10 cursor-pointer hidden sm:block"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Central Lightbox Image */}
              <div className="relative w-full h-full mx-auto flex items-center justify-center">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[index]}
                    alt={`SK Crown Lightbox Image ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>

              {/* Next Trigger */}
              <button
                onClick={handleNext}
                className="absolute right-0 p-3.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white-soft z-10 cursor-pointer hidden sm:block"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="text-center z-10 space-y-1 py-4">
              <p className="text-lg font-serif text-white-soft">
                SK Crown Convention Hall
              </p>
              <p className="text-xs text-muted-text font-sans">
                Premium Event and Celebration Design
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
