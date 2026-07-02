"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  showArrow?: boolean;
}

export default function Button({
  variant = "primary",
  children,
  showArrow = true,
  className = "",
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isGhost = variant === "ghost";

  // Arrow animation states
  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 4 },
  };

  // Underline animation states for ghost variant
  const underlineVariants = {
    initial: { scaleX: 0 },
    hover: { scaleX: 1 },
  };

  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden inline-flex items-center justify-center gap-2 
        rounded-full font-sans font-medium text-xs md:text-sm uppercase tracking-widest 
        transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50
        ${
          isPrimary
            ? "bg-gold text-[#0B0B0B] px-8 py-3.5 shadow-[0_0_20px_rgba(199,163,106,0.15)] hover:shadow-[0_0_30px_rgba(199,163,106,0.35)]"
            : isSecondary
            ? "bg-transparent border border-gold/50 text-gold hover:text-[#0B0B0B] hover:bg-gold px-8 py-3.5"
            : "bg-transparent text-white-soft py-2 px-1"
        }
        ${className}
      `}
      {...props}
    >
      {/* Ripple/Glow Highlight on Hover for Primary/Secondary */}
      {(isPrimary || isSecondary) && (
        <motion.span
          className="absolute inset-0 bg-white/10"
          initial={{ y: "100%" }}
          variants={{
            hover: { y: "0%" },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* Main Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && !isGhost && (
          <motion.span variants={arrowVariants} transition={{ type: "spring", stiffness: 300 }}>
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        )}
      </span>

      {/* Underline for Ghost Variant */}
      {isGhost && (
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[1px] bg-gold origin-left"
          variants={underlineVariants}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}
