"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { SiteSettingsData, ContactSettingsData } from "@/lib/fallback-data";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  siteSettings: SiteSettingsData;
  contactSettings: ContactSettingsData;
  onOpenBooking?: () => void;
}

export default function Navbar({ siteSettings, contactSettings, onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = siteSettings.navLinks || [];
  
  const phoneTel = contactSettings.phone.replace(/[^0-9+]/g, '');

  const renderPrimaryCTA = (isMobile = false) => {
    const content = (
      <button 
        onClick={onOpenBooking ? () => {
          if (isMobile) setMobileMenuOpen(false);
          onOpenBooking();
        } : undefined}
        className={`relative group rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF1AB] to-[#AA7C11] text-black font-semibold text-[13px] uppercase tracking-[0.1em] shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:-translate-y-[2px] flex items-center justify-center gap-3 shrink-0 flex-none ${isMobile ? "w-full h-[54px]" : "w-[210px] h-[54px]"}`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[800ms] ease-in-out" />
        </div>
        <span className="relative z-10 whitespace-nowrap">Book Venue Visit</span>
        <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    );

    if (onOpenBooking) return content;

    return (
      <Link href="/contact" passHref className={isMobile ? "w-full shrink-0 flex-none" : "shrink-0 flex-none"} onClick={isMobile ? () => setMobileMenuOpen(false) : undefined}>
        {content}
      </Link>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-[#0B0B0B]/85 backdrop-blur-2xl border-b border-gold/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-[76px]" 
            : "bg-transparent border-b border-transparent h-[90px]"
        }`}
      >
        {/* Main Container - Strict Grid Layout for Desktop */}
        <div className="max-w-[1600px] h-full mx-auto px-8 w-full flex items-center justify-between lg:grid lg:grid-cols-[340px_minmax(0,1fr)_420px] gap-[32px]">
          
          {/* 1. Logo Column */}
          <Link
            href="/"
            aria-label="SK Crown Convention Home"
            className="flex items-center shrink-0 focus:outline-none group"
          >
            <div className={`relative shrink-0 transition-transform duration-200 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] flex h-[48px] md:h-[60px] lg:h-[72px]`}>
              <Image
                src="/images/full-logo.png"
                alt="SK Crown Convention Logo"
                width={800}
                height={250}
                priority
                quality={100}
                className="object-contain h-full w-auto"
                sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 400px"
              />
            </div>
          </Link>

          {/* 2. Navigation Column */}
          <nav className="hidden lg:flex items-center justify-center min-w-0 overflow-visible gap-[24px] xl:gap-[32px] 2xl:gap-[40px] h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.url;
              return (
                <Link
                  key={link.label}
                  href={link.url}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  className={`relative text-[12px] uppercase tracking-[0.2em] font-sans font-medium transition-colors py-2 flex items-center h-full group whitespace-nowrap ${isActive ? 'text-gold' : 'text-white-soft/80 hover:text-gold'}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-[20px] left-0 w-full h-[2px] bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <div className="absolute bottom-[20px] left-0 w-0 h-[2px] bg-gold/50 transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. CTA & Phone Column */}
          <div className="hidden lg:flex items-center justify-end gap-[18px] whitespace-nowrap shrink-0">

            {renderPrimaryCTA(false)}

            <a 
              href={`tel:${phoneTel}`} 
              className="hidden xl:flex items-center justify-center gap-2 text-white hover:text-gold transition-colors font-sans group whitespace-nowrap shrink-0 flex-none"
            >
              <Phone className="w-5 h-5 text-gold group-hover:text-gold transition-colors" />
              <span className="font-semibold tracking-wide text-[16px]">{contactSettings.phone}</span>
            </a>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center text-white-soft hover:text-gold transition-colors p-2 cursor-pointer focus:outline-none min-h-[44px] min-w-[44px] shrink-0"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-30 lg:hidden bg-[#0B0B0B] overflow-y-auto flex flex-col pt-[84px]"
          >
            <div className="flex flex-col flex-1 px-6 py-8">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.url}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-[0.2em] font-sans text-white-soft hover:text-gold transition-colors block border-b border-white/5 pb-4"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <Link
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] font-sans text-white-soft hover:text-gold transition-colors block border-b border-white/5 pb-4"
                >
                  View Gallery
                </Link>
                <Link
                  href={`https://wa.me/${(contactSettings.whatsApp || contactSettings.phone).replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] font-sans text-white-soft hover:text-gold transition-colors block border-b border-white/5 pb-4"
                >
                  WhatsApp
                </Link>
                <a
                  href={`tel:${phoneTel}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] font-sans text-white-soft hover:text-gold transition-colors block border-b border-white/5 pb-4"
                >
                  Call Now
                </a>
              </nav>
              
              <div className="mt-auto pt-12 pb-8 flex flex-col gap-8">
                {/* Contact Info in Mobile Menu */}
                <div className="flex flex-col items-center text-center gap-4 text-sm font-sans text-white-soft/70">
                  <a href={`tel:${phoneTel}`} className="flex items-center gap-2 hover:text-gold transition-colors font-semibold text-lg text-white group">
                    <Phone className="w-5 h-5 text-gold group-hover:text-gold" />
                    {contactSettings.phone}
                  </a>
                </div>

                {renderPrimaryCTA(true)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
