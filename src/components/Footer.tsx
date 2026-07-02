"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerBackground } from "@/lib/images";
import { NAV_LINKS, VENUE_DETAILS } from "@/lib/constants";
import { Mail, Phone, MapPin, ArrowUp, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0B0B0B] border-t border-luxury-border overflow-hidden pt-20 pb-10">
      
      {/* Subtle night background with heavy overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src={footerBackground}
          alt="SK Crown Convention evening silhouette"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-luxury-border">
          
          {/* Brand/Logo Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-widest text-gold">SK CROWN</h3>
            <p className="text-xs text-muted-text font-sans font-light leading-relaxed max-w-xs">
              Where celebrations meet luxury hospitality. Warangal's premier convention venue for weddings, receptions, and corporate galas.
            </p>
            
            {/* Social Icons (Instagram, WhatsApp, Phone only) */}
            <div className="flex gap-4 pt-2">
              <motion.a
                href={VENUE_DETAILS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(199,163,106,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>

              <motion.a
                href={`https://wa.me/${VENUE_DETAILS.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(199,163,106,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-colors"
                aria-label="WhatsApp"
              >
                <Send className="w-4 h-4" />
              </motion.a>

              <motion.a
                href={`tel:${VENUE_DETAILS.phoneRaw}`}
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(199,163,106,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white-soft font-semibold font-sans">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-text hover:text-gold font-sans font-light transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-white-soft font-semibold font-sans">
              Contact & Inquiries
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-xs text-muted-text font-sans font-light leading-relaxed">
                  {VENUE_DETAILS.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`tel:${VENUE_DETAILS.phoneRaw}`}
                  className="text-xs text-muted-text hover:text-gold font-sans font-light transition-colors"
                >
                  {VENUE_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`mailto:${VENUE_DETAILS.email}`}
                  className="text-xs text-muted-text hover:text-gold font-sans font-light transition-colors"
                >
                  {VENUE_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[10px] text-muted-text font-sans font-light tracking-wider">
            © {currentYear} {VENUE_DETAILS.name}. All Rights Reserved.
          </p>
          
          {/* Back to Top & Digital Credits */}
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-text hover:text-gold transition-colors font-sans cursor-pointer focus:outline-none"
            >
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-muted-text/75 font-sans font-light tracking-wider">
              Digital Experience by{" "}
              <a
                href="https://linktr.ee/karthikeyathallapally"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline transition-colors font-medium"
              >
                MarketingKo Labs
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
