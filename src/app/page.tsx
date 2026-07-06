import React from "react";
import HomeClient from "@/components/HomeClient";
import {
  getSiteSettings,
  getHomepage,
  getHeroSlides,
  getReviews,
  getGalleryImages,
  getShowcaseEvents,
  getContactSettings,
  getBookingSettings,
  getFormSettings,
} from "@/lib/sanity-data";

// Revalidation of page configurations
export const revalidate = 60;

export default async function Home() {
  const siteSettings = await getSiteSettings();
  const homepage = await getHomepage();
  const heroSlides = await getHeroSlides();
  const reviews = await getReviews();
  const galleryImages = await getGalleryImages();
  const showcaseEvents = await getShowcaseEvents();
  const contactSettings = await getContactSettings();
  const bookingSettings = await getBookingSettings();
  const formSettings = await getFormSettings();

  return (
    <HomeClient
      siteSettings={siteSettings}
      homepage={homepage}
      heroSlides={heroSlides}
      reviews={reviews}
      galleryImages={galleryImages}
      showcaseEvents={showcaseEvents}
      contactSettings={contactSettings}
      bookingSettings={bookingSettings}
      formSettings={formSettings}
    />
  );
}
