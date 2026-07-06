"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence, MotionValue } from "framer-motion";
import { Heart, Users, Star, Car, Sparkles } from "lucide-react";
import Button from "./Button";
import Link from "next/link";
import { shimmerBlurDataUrl } from "@/lib/images";

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-5 h-5 text-gold" />,
  Users: <Users className="w-5 h-5 text-gold" />,
  Star: <Star className="w-5 h-5 text-gold" />,
  Car: <Car className="w-5 h-5 text-gold" />,
  Sparkles: <Sparkles className="w-5 h-5 text-gold" />,
};

interface CardData {
  enabled: boolean;
  order: number;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  imageAlt: string;
  icon?: string;
  primaryCTA?: { label: string; link: string };
  secondaryCTA?: { label: string; link: string };
  accentColor?: string;
  isCtaCard?: boolean;
}

interface StorytellingCardProps {
  cards: CardData[];
}

// Extracted component for the desktop card to follow React Hooks rules
function DesktopCard({ card, idx, totalCards, scrollYProgress, shouldReduceMotion }: { 
  card: CardData; 
  idx: number; 
  totalCards: number; 
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}) {
  const startIn = Math.max(0, (idx - 1) / totalCards);
  const fullyIn = idx / totalCards;
  const startOut = (idx + 1) / totalCards;
  const fullyOut = Math.min(1, (idx + 2) / totalCards);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(
    smoothProgress,
    [startIn, fullyIn, startOut],
    shouldReduceMotion ? ["0%", "0%", "0%"] : ["100%", "0%", "-5%"]
  );

  const scale = useTransform(
    smoothProgress,
    [fullyIn, startOut],
    shouldReduceMotion ? [1, 1] : [1, 0.94]
  );

  const opacity = useTransform(
    smoothProgress,
    [startIn, fullyIn, startOut, fullyOut],
    shouldReduceMotion 
      ? [idx === 0 ? 1 : 0, 1, 1, 0] 
      : [idx === 0 ? 1 : 0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ y, scale, opacity, zIndex: idx }}
      className={`absolute w-full max-w-[600px] h-[75vh] max-h-[800px] rounded-[32px] overflow-hidden ${
        card.isCtaCard ? "border border-gold shadow-[0_20px_60px_rgba(199,163,106,0.15)]" : "border border-luxury-border shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      }`}
    >
      <Image
        src={card.image}
        alt={card.imageAlt || card.title}
        fill
        sizes="50vw"
        priority={idx === 0}
        placeholder="blur"
        blurDataURL={shimmerBlurDataUrl(800, 1000)}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />
      
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <div className={`p-8 rounded-2xl backdrop-blur-xl border ${
          card.isCtaCard ? "bg-[#0B0B0B]/80 border-gold/40" : "bg-black/40 border-white/10"
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {card.icon && iconMap[card.icon]}
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-semibold">
              {card.category}
            </span>
          </div>
          <h3 className="text-3xl font-serif font-bold text-white-soft mb-4">
            {card.title}
          </h3>
          <p className="text-base text-muted-text font-sans leading-relaxed mb-6">
            {card.description}
          </p>
          
          {card.isCtaCard && card.primaryCTA && (
            <div className="flex items-center gap-4">
              <Link href={card.primaryCTA.link} passHref>
                <Button variant="primary" className="px-8">{card.primaryCTA.label}</Button>
              </Link>
              {card.secondaryCTA && (
                <Link href={card.secondaryCTA.link} passHref>
                  <Button variant="secondary" className="px-8">{card.secondaryCTA.label}</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function StorytellingCards({ cards }: StorytellingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate which card is active based on scroll progress
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Calculate index based on progress (0 to 1)
      const index = Math.min(
        cards.length - 1,
        Math.floor(latest * cards.length)
      );
      setActiveCardIndex(index);
    });
  }, [scrollYProgress, cards.length]);

  if (!cards || cards.length === 0) return null;

  return (
    <section className="bg-[#0B0B0B] relative">
      {/* Mobile & Tablet Layout (Standard Vertical List) */}
      <div className="lg:hidden px-6 py-24 space-y-16">
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-semibold">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white-soft leading-tight">
            The SK Crown Experience
          </h2>
          <div className="w-16 h-[1px] bg-gold" />
        </div>

        <div className="space-y-12">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative rounded-[24px] overflow-hidden border ${
                card.isCtaCard ? "border-gold shadow-[0_0_30px_rgba(199,163,106,0.15)]" : "border-luxury-border shadow-2xl"
              }`}
            >
              <div className="relative h-[300px] w-full">
                <Image
                  src={card.image}
                  alt={card.imageAlt || card.title}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={shimmerBlurDataUrl(800, 500)}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
              
              <div className="relative bg-[#121212] p-6 space-y-4">
                <div className="flex items-center gap-3">
                  {card.icon && iconMap[card.icon]}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-semibold">
                    {card.category}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white-soft">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-text font-sans leading-relaxed">
                  {card.description}
                </p>
                
                {card.isCtaCard && card.primaryCTA && (
                  <div className="pt-4 flex flex-col gap-3">
                    <Link href={card.primaryCTA.link} passHref className="w-full">
                      <Button variant="primary" className="w-full justify-center">{card.primaryCTA.label}</Button>
                    </Link>
                    {card.secondaryCTA && (
                      <Link href={card.secondaryCTA.link} passHref className="w-full">
                        <Button variant="secondary" className="w-full justify-center">{card.secondaryCTA.label}</Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop Layout (Sticky Scroll Stack) */}
      <div 
        ref={containerRef} 
        className="hidden lg:flex"
        style={{ height: `${cards.length * 100}vh` }} // Make container tall enough to scroll through all cards
      >
        <div className="sticky top-0 h-screen w-full flex overflow-hidden">
          
          {/* Left Side: 45% Content Area */}
          <div className="w-[45%] h-full flex items-center justify-center border-r border-luxury-border relative bg-[#0B0B0B] z-10">
            {/* Progress Indicator */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-6">
              {cards.map((_, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className={`text-xs font-sans tracking-widest transition-colors duration-500 ${
                    idx === activeCardIndex ? "text-gold font-medium" : "text-muted-text/30"
                  }`}>
                    0{idx + 1}
                  </span>
                  <div className={`h-[1px] transition-all duration-500 ${
                    idx === activeCardIndex ? "w-8 bg-gold" : "w-4 bg-luxury-border"
                  }`} />
                </div>
              ))}
            </div>

            <div className="max-w-md pl-24 pr-12 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-semibold">
                Why Choose Us
              </span>
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={activeCardIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl xl:text-5xl font-serif font-bold text-white-soft leading-tight"
                >
                  {cards[activeCardIndex].title}
                </motion.h2>
              </AnimatePresence>
              <div className="w-16 h-[1px] bg-gold" />
              <p className="text-sm text-muted-text font-sans leading-relaxed">
                Experience the pinnacle of luxury celebrations in Warangal. Our meticulously designed spaces ensure your events are executed to perfection.
              </p>
            </div>
          </div>

          {/* Right Side: 55% Card Stack */}
          <div className="w-[55%] h-full relative bg-[#121212] overflow-hidden flex items-center justify-center p-12">
            {cards.map((card, idx) => (
              <DesktopCard 
                key={idx} 
                card={card} 
                idx={idx} 
                totalCards={cards.length} 
                scrollYProgress={scrollYProgress} 
                shouldReduceMotion={shouldReduceMotion} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
