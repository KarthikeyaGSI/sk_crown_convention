import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass, Send } from "lucide-react";
import { getSiteSettings, getContactSettings } from "@/lib/sanity-data";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Plan Your Visit | SK Crown Convention Hall A/c",
  description: "Get directions, embedded maps, and travel specifications for SK Crown Convention Hall A/c on Mulug Road, Warangal. Plan your venue visit today.",
  keywords: ["SK Crown Directions", "SK Crown Location Map", "Convention Hall Address Warangal"],
};

export default async function VisitPage() {
  const siteSettings = await getSiteSettings();
  const contactSettings = await getContactSettings();

  const highlights = [
    { title: "Dedicated Valet Parking", desc: "Secured on-site spaces accommodating up to 500+ premium vehicles." },
    { title: "Highway Accessibility", desc: "Located directly on the highway corridors for easy bus/cab transit." },
    { title: "Prime Landmarks", desc: "Conveniently situated near Mulug Road Hanuman Junction petrol station." },
  ];

  const rawPhone = contactSettings.phone.replace(/[^0-9]/g, "");
  const primaryPhone = rawPhone.length > 10 ? rawPhone : `91${rawPhone}`;

  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar siteSettings={siteSettings} contactSettings={contactSettings} />
      
      <main className="flex-grow pt-[calc(var(--navbar-height)+3rem)] pb-24 max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
            Location & Travel
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-white-soft leading-tight">
            Plan Your Visit
          </h1>
          <div className="w-16 h-[1px] bg-gold" />
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Embedded Iframe Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full h-[350px] md:h-[500px] rounded-[24px] overflow-hidden border border-luxury-border shadow-2xl">
              <iframe
                title="SK Crown Convention Google Maps Location"
                src="https://maps.google.com/maps?q=SK+Crown+Convention+Mulug+Road+Warangal&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full grayscale opacity-80 invert filter hover:filter-none transition-all duration-700"
                allowFullScreen
                loading="lazy"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {contactSettings.googleMapsLink && (
                <a
                  href={contactSettings.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button variant="primary">
                    Get Directions <Compass className="w-4 h-4 ml-1.5" />
                  </Button>
                </a>
              )}
              <a
                href={getWhatsAppLink(contactSettings.whatsApp, contactSettings.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="secondary" showArrow={false}>
                  Message on WhatsApp <Send className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Address and Travel highlights */}
          <div className="lg:col-span-5 space-y-10">
            {/* Address box */}
            <div className="space-y-6 border-b border-luxury-border/50 pb-8">
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-serif font-bold text-gold mb-1">
                    Address Coordinates
                  </h3>
                  <p className="text-sm text-white-soft leading-relaxed font-light">
                    {contactSettings.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Phone className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-serif font-bold text-gold mb-1">
                    Direct Lines
                  </h3>
                  <a
                    href={`tel:${primaryPhone}`}
                    className="text-sm text-white-soft hover:text-gold transition-colors font-light"
                  >
                    {contactSettings.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Mail className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-serif font-bold text-gold mb-1">
                    Electronic Mail
                  </h3>
                  <a
                    href={`mailto:${contactSettings.email}`}
                    className="text-sm text-white-soft hover:text-gold transition-colors font-light"
                  >
                    {contactSettings.email}
                  </a>
                </div>
              </div>

              {contactSettings.openingHours && (
                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-serif font-bold text-gold mb-1">
                      Availability
                    </h3>
                    <p className="text-sm text-white-soft leading-relaxed font-light">
                      {contactSettings.openingHours}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Travel info highlights */}
            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-widest font-serif font-bold text-white-soft">
                Venue Travel Highlights
              </h3>
              <div className="space-y-4">
                {highlights.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <ShieldCheck className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-white-soft">{item.title}</h4>
                      <p className="text-xs text-muted-text mt-0.5 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer siteSettings={siteSettings} contactSettings={contactSettings} />
    </div>
  );
}
