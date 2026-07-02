"use client";

import React from "react";
import Image from "next/image";
import { footerBackground } from "@/lib/images";
import { NAV_LINKS, VENUE_DETAILS } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-all duration-300" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-all duration-300" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-luxury-card border border-luxury-border text-muted-text hover:text-gold hover:border-gold/30 transition-all duration-300" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
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
                  <a
                    href={link.href}
                    className="text-xs text-muted-text hover:text-gold font-sans font-light transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
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
                  href={`tel:${VENUE_DETAILS.phone.replace(/\s+/g, "")}`}
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
          <p className="text-[10px] text-muted-text font-sans font-light tracking-wider">
            Digital Experience by <a href="#" className="text-gold hover:text-gold-soft transition-colors font-medium">MarketingKo Labs</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
