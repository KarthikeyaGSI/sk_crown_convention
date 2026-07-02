"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { experienceImages, venueImages, shimmerBlurDataUrl } from "@/lib/images";

const EDITORIAL_SECTIONS = [
  {
    label: "The Arrival",
    title: "A Grand Welcoming Arrival",
    desc: "A breathtaking high-ceiling entrance welcoming your guests in absolute grandeur. Crafted to leave a lasting first impression of luxury, setting a majestic tone for your celebration.",
    image: experienceImages.entrance,
    imageAlt: "SK Crown Convention Grand Entrance Lobby",
    align: "left",
  },
  {
    label: "The Dining",
    title: "Bespoke Gourmet Experiences",
    desc: "State-of-the-art dining and catering layouts designed to serve bespoke culinary creations. Impeccable white-glove hospitality ensures a seamless and memorable dining experience.",
    image: experienceImages.dining,
    imageAlt: "Luxury dining layout at SK Crown Convention",
    align: "right",
  },
  {
    label: "The Banquet",
    title: "Spacious & Flexible Seating",
    desc: "Generous hall configurations offering luxury comfort for up to 3,000 guests. Carefully engineered acoustics and clear sightlines ensure every attendee remains fully connected to the ceremony.",
    image: venueImages[1],
    imageAlt: "Spacious seating interior at SK Crown Convention",
    align: "left",
  },
];

export default function ExperienceEditorial() {
  return (
    <section id="experience" className="bg-[#121212] border-b border-luxury-border py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-36 md:space-y-48">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-semibold">
            Every Detail, Perfectly Planned
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-white-soft leading-tight">
            Curated Experiences
          </h2>
          <div className="w-16 h-[1px] bg-gold" />
        </div>

        {/* Alternating Sections */}
        <div className="space-y-32 md:space-y-44">
          {EDITORIAL_SECTIONS.map((section, index) => {
            const isLeft = section.align === "left";
            return (
              <div
                key={section.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Image Wrapper */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`lg:col-span-8 relative h-[300px] md:h-[500px] rounded-[24px] overflow-hidden group border border-luxury-border shadow-2xl ${
                    isLeft ? "lg:order-1" : "lg:order-2 lg:col-start-5"
                  }`}
                >
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    placeholder="blur"
                    blurDataURL={shimmerBlurDataUrl(800, 500)}
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                </motion.div>

                {/* Content Wrapper */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`lg:col-span-4 space-y-4 ${
                    isLeft ? "lg:order-2" : "lg:order-1 lg:col-start-1"
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
                    {section.label}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-[36px] font-serif font-bold text-white-soft leading-tight">
                    {section.title}
                  </h3>
                  <div className="w-10 h-[1px] bg-gold/55" />
                  <p className="text-base md:text-lg text-muted-text font-sans font-light leading-relaxed">
                    {section.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
