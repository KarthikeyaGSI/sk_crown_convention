"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary";
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

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden group inline-flex items-center justify-center gap-2 
        px-8 py-3.5 rounded-full font-sans font-medium text-sm uppercase tracking-widest 
        transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50
        ${
          isPrimary
            ? "bg-gold text-[#0B0B0B] hover:bg-gold-soft shadow-[0_0_20px_rgba(199,163,106,0.2)] hover:shadow-[0_0_30px_rgba(199,163,106,0.4)]"
            : "bg-transparent border border-gold/40 text-gold hover:text-[#0B0B0B] hover:bg-gold"
        }
        ${className}
      `}
      {...props}
    >
      {/* Ripple/Glow Highlight on Hover */}
      <span className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        )}
      </span>
    </motion.button>
  );
}
