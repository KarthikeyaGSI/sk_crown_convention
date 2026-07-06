"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VenueStory from "@/components/VenueStory";
import ExperienceEditorial from "@/components/ExperienceEditorial";
import StorytellingCards from "@/components/StorytellingCards";
import WeddingShowcase from "@/components/WeddingShowcase";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import VisitInfo from "@/components/VisitInfo";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import {
  SiteSettingsData,
  HomepageData,
  ContactSettingsData,
  Review,
  HeroSlideData,
  BookingSettingsData,
  FormSettingsData
} from "@/lib/fallback-data";
import { ShowcaseEventData, GalleryImageData } from "@/lib/sanity-data";

interface HomeClientProps {
  siteSettings: SiteSettingsData;
  homepage: HomepageData;
  heroSlides: HeroSlideData[];
  reviews: Review[];
  galleryImages: GalleryImageData[];
  showcaseEvents: ShowcaseEventData[];
  contactSettings: ContactSettingsData;
  bookingSettings: BookingSettingsData;
  formSettings: FormSettingsData;
}

export default function HomeClient({
  siteSettings,
  homepage,
  heroSlides,
  reviews,
  galleryImages,
  showcaseEvents,
  contactSettings,
  bookingSettings,
  formSettings,
}: HomeClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans selection:bg-gold/20 selection:text-gold">
      {/* Navigation Header */}
      <Navbar
        siteSettings={siteSettings}
        contactSettings={contactSettings}
        onOpenBooking={openBooking}
      />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Arrival: Hero slideshow */}
        <Hero
          heroSlides={heroSlides}
          homepage={homepage}
          onOpenBooking={openBooking}
        />

        {/* Story: Editorial Split Intro */}
        <VenueStory
          homepage={homepage}
          onOpenBooking={openBooking}
        />

        {/* Experience Teaser */}
        <ExperienceEditorial homepage={homepage} />

        {/* Cinematic Storytelling Cards */}
        {homepage?.storytellingCards && homepage.storytellingCards.length > 0 && (
          <StorytellingCards cards={homepage.storytellingCards} />
        )}

        {/* Showcase */}
        <WeddingShowcase initialEvents={showcaseEvents} />

        {/* Gallery Preview */}
        <Gallery
          initialImages={galleryImages}
          homepage={homepage}
        />

        {/* Reviews */}
        <Reviews
          initialReviews={reviews}
        />

        {/* Visit Info */}
        <VisitInfo contactSettings={contactSettings} />

        {/* CTA: Final reservation prompt */}
        <CTA
          homepage={homepage}
          onOpenBooking={openBooking}
        />
      </main>

      {/* Footer */}
      <Footer
        siteSettings={siteSettings}
        contactSettings={contactSettings}
      />

      {/* Booking Dialog */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={closeBooking} 
        contactSettings={contactSettings} 
        bookingSettings={bookingSettings}
        formSettings={formSettings}
      />
    </div>
  );
}
