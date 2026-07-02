"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VenueStory from "@/components/VenueStory";
import ExperienceEditorial from "@/components/ExperienceEditorial";
import WeddingShowcase from "@/components/WeddingShowcase";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import VisitInfo from "@/components/VisitInfo";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans selection:bg-gold/20 selection:text-gold">
      {/* Navigation Header */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Arrival: Hero slideshow and vignette overlays */}
        <Hero onOpenBooking={openBooking} />

        {/* Story: Editorial Split Intro */}
        <VenueStory onOpenBooking={openBooking} />

        {/* Experience: Alternating full-width large editorial layout modules */}
        <ExperienceEditorial />

        {/* Wedding & Decor: Grand stage themes and design selections */}
        <WeddingShowcase />

        {/* Gallery: Asymmetric curated editorial image layout puzzle */}
        <Gallery />

        {/* Reviews: Google verification rating and client testimonials */}
        <Reviews />

        {/* Visit: Minimalist coordinate cards and Google Maps Directions */}
        <VisitInfo />

        {/* CTA: Final reservation prompt */}
        <CTA onOpenBooking={openBooking} />
      </main>

      {/* Footer information */}
      <Footer />

      {/* Global Booking Dialog */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
