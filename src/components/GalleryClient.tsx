"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { shimmerBlurDataUrl } from "@/lib/images";
import { GalleryImageData, getGalleryImages } from "@/lib/sanity-data";

const CATEGORIES = [
  "All",
  "Wedding Decor",
  "Stage",
  "Dining",
  "Catering",
  "Seating",
  "Parking",
  "Venue"
];

const EDITORIAL_CLASSES = [
  "aspect-[4/3] md:aspect-[16/9]", // Hero landscape
  "aspect-square", // Square
  "aspect-[3/4]", // Portrait
  "aspect-video", // Landscape small
  "aspect-[4/5]", // Portrait small
  "aspect-[16/10]", // Large landscape
  "aspect-[3/2]", // Slight landscape
];

interface GalleryClientProps {
  initialImages?: GalleryImageData[];
}

export default function GalleryClient({ initialImages }: GalleryClientProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState<GalleryImageData[]>(initialImages || []);

  useEffect(() => {
    if (initialImages && initialImages.length > 0) return;

    async function fetchImages() {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch (err) {
        console.error("Error loading gallery images:", err);
      }
    }
    fetchImages();
  }, [initialImages]);

  // Filtering
  const filteredImages = images.filter((img) => 
    activeCategory === "All" || img.category === activeCategory
  );

  // Lightbox Handlers
  const handlePrev = React.useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (index !== null) {
      setIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev! - 1));
    }
  }, [index, filteredImages.length]);

  const handleNext = React.useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (index !== null) {
      setIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev! + 1));
    }
  }, [index, filteredImages.length]);

  const handleClose = React.useCallback(() => setIndex(null), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, handleClose, handlePrev, handleNext]);

  // Swipe detection for Lightbox
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
    if (info.offset.x > 50) handlePrev();
    if (info.offset.x < -50) handleNext();
  };

  return (
    <div className="py-24 md:py-36 bg-[#121212] w-full relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Storytelling Header */}
        <div className="max-w-3xl space-y-6 mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
            OUR SPACES
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-white-soft leading-tight">
            Every Celebration Has Its Perfect Setting
          </h2>
          <p className="text-white-soft/70 font-sans text-lg max-w-2xl leading-relaxed">
            Explore our elegant wedding stages, luxurious banquet halls, premium dining areas, spacious parking, professional catering services, and beautifully designed event spaces.
          </p>
          <div className="w-16 h-[1px] bg-gold mt-8" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-full text-[13px] font-sans font-medium transition-all duration-300 uppercase tracking-wider ${
                activeCategory === cat
                  ? "text-black bg-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "text-white-soft/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Editorial Grid */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => {
              const layoutClass = EDITORIAL_CLASSES[idx % EDITORIAL_CLASSES.length];
              return (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  onClick={() => setIndex(idx)}
                  className={`group relative rounded-[16px] overflow-hidden border border-white/5 bg-[#0B0B0B] cursor-pointer break-inside-avoid w-full ${layoutClass}`}
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.alt}
                    fill
                    placeholder="blur"
                    blurDataURL={shimmerBlurDataUrl(600, 400)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    loading={idx < 4 ? "eager" : "lazy"}
                    priority={idx < 4}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                  
                  {/* Hover Overlay Info */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-1">
                      {img.category}
                    </span>
                    <h4 className="text-white font-serif text-lg md:text-xl font-medium drop-shadow-md">
                      {img.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredImages.length === 0 && (
          <div className="py-20 text-center text-white/50 font-sans">
            No images found in this category.
          </div>
        )}

        {/* Featured Catering Section (Moved Below Grid) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[24px] overflow-hidden mt-16 md:mt-24 group cursor-pointer border border-white/5 shadow-2xl"
        >
          <Image
            src="/images/sk crown catering team.webp"
            alt="Professional Catering Team at SK Crown Convention"
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            placeholder="blur"
            blurDataURL={shimmerBlurDataUrl(1200, 600)}
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 backdrop-blur-md rounded-full border border-gold/30">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span className="text-gold text-xs font-semibold uppercase tracking-wider font-sans">Featured Service</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">Professional Catering Team</h3>
              <p className="text-white/80 font-sans text-base md:text-lg">
                Our experienced catering professionals ensure seamless service, exceptional hospitality, and memorable dining experiences for every celebration.
              </p>
            </div>
            
            <button className="h-[48px] px-8 rounded-full bg-gold/90 hover:bg-gold text-black font-semibold text-[13px] uppercase tracking-[0.1em] transition-colors shadow-lg self-start md:self-end shrink-0">
              View Catering Services
            </button>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col justify-between p-4 md:p-6 bg-[#0B0B0B]/95 backdrop-blur-xl select-none"
          >
            {/* Top Close Bar */}
            <div className="flex justify-between items-center z-10 w-full max-w-[1600px] mx-auto">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-gold font-sans font-semibold">
                  {filteredImages[index]?.category}
                </span>
                <span className="text-sm text-white-soft/70 font-sans">
                  {index + 1} / {filteredImages.length}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white-soft cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Slider Area */}
            <div className="flex-grow flex items-center justify-between relative w-full h-[70vh] md:h-[80vh] max-w-[1600px] mx-auto">
              <button
                onClick={handlePrev}
                className="absolute left-0 p-4 bg-black/50 border border-white/10 rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all text-white z-10 cursor-pointer hidden md:flex backdrop-blur-md"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Swipeable Container */}
              <motion.div
                key={index}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={filteredImages[index]?.imageUrl}
                  alt={filteredImages[index]?.alt || "Gallery Image"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              <button
                onClick={handleNext}
                className="absolute right-0 p-4 bg-black/50 border border-white/10 rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all text-white z-10 cursor-pointer hidden md:flex backdrop-blur-md"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="text-center z-10 space-y-2 py-4">
              <h3 className="text-xl md:text-2xl font-serif text-white-soft drop-shadow-md">
                {filteredImages[index]?.title || "SK Crown Convention Hall"}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
