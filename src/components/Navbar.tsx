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
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver to detect active section for elegant underline tracking
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    NAV_LINKS.forEach((link) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-500 border-b ${
          scrolled
            ? "bg-[#0B0B0B]/85 backdrop-blur-xl border-gold/15 py-3.5"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-lg md:text-xl font-bold tracking-[0.2em] text-gold hover:text-gold-soft transition-colors"
          >
            SK CROWN
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const linkId = link.href.replace("#", "");
              const isActive = activeSection === linkId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[11px] uppercase tracking-[0.25em] text-white-soft/80 hover:text-gold font-sans font-medium transition-colors py-2"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
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
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 md:top-20 left-0 w-full z-40 lg:hidden bg-[#0B0B0B] border-b border-luxury-border shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider font-sans text-white-soft/80 hover:text-gold transition-colors block border-b border-luxury-border/30 pb-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-4">
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
                <div className="text-center text-[10px] text-muted-text font-sans tracking-wide">
                  {VENUE_DETAILS.phone} • {VENUE_DETAILS.location}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
