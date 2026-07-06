"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerBackground } from "@/lib/images";
import { SiteSettingsData, ContactSettingsData } from "@/lib/fallback-data";
import { Mail, Phone, MapPin, ArrowUp, Send } from "lucide-react";
import { motion } from "framer-motion";

interface FooterProps {
  siteSettings: SiteSettingsData;
  contactSettings: ContactSettingsData;
}

export default function Footer({ siteSettings, contactSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = siteSettings.navLinks || [];
  const logoUrl = siteSettings.logoUrl || "/images/logo.png";
  const copyrightText = siteSettings.copyrightText || "© 2026 SK Crown Convention. All Rights Reserved.";
  const devCreditText = siteSettings.developerCredit?.text || "Digital Experience by MarketingKo";
  const devCreditUrl = siteSettings.developerCredit?.url || "https://linktr.ee/karthikeyathallapally";

  // Clean raw phone for WhatsApp / Tel link
  const rawPhone = contactSettings.phone.replace(/[^0-9]/g, "");
  const primaryPhone = rawPhone.length > 10 ? rawPhone : `91${rawPhone}`;

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
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 overflow-hidden">
                <Image
                  src={logoUrl}
                  alt="SK Crown Crest logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-widest text-gold">SK CROWN</h3>
            </div>
            <p className="text-xs text-muted-text font-sans font-light leading-relaxed max-w-xs">
              Where celebrations meet luxury hospitality. Warangal&apos;s premier convention venue for weddings, receptions, and corporate galas.
            </p>
            
            {/* Social Icons (Instagram, WhatsApp, Phone only) */}
            <div className="flex gap-4 pt-2">
              {contactSettings.instagram && (
                <motion.a
                  href={contactSettings.instagram}
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
              )}

              {contactSettings.whatsApp ? (
                <motion.a
                  href={contactSettings.whatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(199,163,106,0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Send className="w-4 h-4" />
                </motion.a>
              ) : (
                <motion.a
                  href={`https://wa.me/${primaryPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(199,163,106,0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Send className="w-4 h-4" />
                </motion.a>
              )}

              {contactSettings.facebook && (
                <motion.a
                  href={contactSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(199,163,106,0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </motion.a>
              )}

              {contactSettings.youtube && (
                <motion.a
                  href={contactSettings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(199,163,106,0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </motion.a>
              )}

              {contactSettings.linkedin && (
                <motion.a
                  href={contactSettings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(199,163,106,0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </motion.a>
              )}

              <motion.a
                href={`tel:${primaryPhone}`}
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
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
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
                  {contactSettings.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`tel:${primaryPhone}`}
                  className="text-xs text-muted-text hover:text-gold font-sans font-light transition-colors"
                >
                  {contactSettings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`mailto:${contactSettings.email}`}
                  className="text-xs text-muted-text hover:text-gold font-sans font-light transition-colors"
                >
                  {contactSettings.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-[10px] text-muted-text font-sans font-light tracking-wider order-1">
            {copyrightText.replace("{currentYear}", String(currentYear))}
          </p>
          
          {/* Back to Top & Digital Credits */}
          <div className="flex flex-col md:flex-row items-center gap-[32px] order-2">
            
            <a
              href={devCreditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-[10px] text-[#D4AF37] font-semibold text-[16px] md:text-[18px] tracking-[0.02em] font-sans order-1"
              aria-label={devCreditText}
            >
              <span className="transition-colors duration-200 group-hover:text-[#FFF1AB]">
                {devCreditText}
              </span>
              <div className="relative h-[20px] md:h-[24px] lg:h-[32px] aspect-square flex-shrink-0 transition-all duration-200 group-hover:scale-[1.05] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] rounded-[4px] overflow-hidden">
                <Image 
                  src="/images/marketingko-logo.jpg" 
                  alt="MarketingKo Logo" 
                  fill 
                  className="object-contain" 
                />
              </div>
            </a>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-muted-text hover:text-gold transition-colors duration-200 font-sans cursor-pointer focus:outline-none order-2"
            >
              Back to Top 
              <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-[2px]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
