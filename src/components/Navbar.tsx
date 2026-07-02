"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, VENUE_DETAILS } from "@/lib/constants";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          scrolled
            ? "bg-[#0B0B0B]/80 backdrop-blur-xl border-gold/20 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-xl md:text-2xl font-bold tracking-widest text-gold hover:text-gold-soft transition-colors"
          >
            SK CROWN
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest text-white-soft/80 hover:text-gold font-sans font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:block">
            <Button variant="primary" showArrow={false} onClick={onOpenBooking} className="px-6 py-2.5">
              Book Venue Visit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white-soft hover:text-gold transition-colors p-1"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 lg:hidden bg-[#0B0B0B] pt-28 px-6 md:px-12 flex flex-col justify-between pb-12 border-b border-luxury-border"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-serif text-white-soft hover:text-gold transition-colors block border-b border-luxury-border pb-3"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="space-y-6">
              <Button
                variant="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full"
              >
                Book Venue Visit
              </Button>
              <div className="text-center text-xs text-muted-text font-sans">
                {VENUE_DETAILS.phone} • {VENUE_DETAILS.location}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
