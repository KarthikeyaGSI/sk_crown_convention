"use client";

import React from "react";
import { MapPin, Phone, Clock, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { ContactSettingsData } from "@/lib/fallback-data";
import Button from "./Button";

interface VisitInfoProps {
  contactSettings?: ContactSettingsData;
}

export default function VisitInfo({ contactSettings }: VisitInfoProps) {
  const contact = contactSettings || {
    address: "Sk crown Mulug Road, Near Hp Petrol Station, Hanuman Junction, Warangal, India 506006",
    phone: "+91 7070709661",
    email: "skcrown700@gmail.com",
    openingHours: "Open 24/7 for Bookings & Events",
    googleMapsLink: "https://maps.app.goo.gl/EVGcvP6fjXupsRUd6",
  };

  return (
    <section id="visit" className="py-32 md:py-48 bg-[#0B0B0B] border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
              Location & Schedule
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-white-soft leading-tight">
              Plan Your Visit
            </h2>
            <div className="w-16 h-[1px] bg-gold" />
            <p className="text-base md:text-lg text-muted-text font-sans font-light leading-relaxed">
              We welcome private venue tours. Located in a prime corridor of Warangal, SK Crown Convention is easily accessible from any part of the city. Schedule a walkthrough with our site managers to plan your seating and layout.
            </p>
            {contact.googleMapsLink && (
              <div className="pt-4">
                <Button
                  variant="primary"
                  onClick={() => window.open(contact.googleMapsLink, "_blank")}
                >
                  Get Directions <Compass className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            )}
          </div>

          {/* Right Info List (Minimalist Editorial Layout) */}
          <div className="lg:col-span-6 space-y-12 lg:pl-12 divide-y divide-luxury-border/40">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-6 items-start pt-0"
            >
              <div className="p-3 bg-luxury-card border border-luxury-border rounded-full text-gold">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider font-serif font-bold text-gold">
                  Address
                </h3>
                <p className="text-sm text-white-soft font-sans font-light leading-relaxed">
                  {contact.address}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-6 items-start pt-8"
            >
              <div className="p-3 bg-luxury-card border border-luxury-border rounded-full text-gold">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider font-serif font-bold text-gold">
                  Contacts
                </h3>
                <p className="text-sm text-white-soft font-sans font-light leading-relaxed">
                  {contact.phone} <br />
                  {contact.email}
                </p>
              </div>
            </motion.div>

            {contact.openingHours && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex gap-6 items-start pt-8"
              >
                <div className="p-3 bg-luxury-card border border-luxury-border rounded-full text-gold">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider font-serif font-bold text-gold">
                    Operating Hours
                  </h3>
                  <p className="text-sm text-white-soft font-sans font-light leading-relaxed">
                    {contact.openingHours}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
