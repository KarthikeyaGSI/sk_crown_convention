import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/GalleryClient";
import { getSiteSettings, getContactSettings, getGalleryImages } from "@/lib/sanity-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery | SK Crown Convention Hall A/c",
  description: "Explore the stunning gallery of SK Crown Convention Hall A/c. Take a virtual tour of our premium wedding stages, receptions, banquets, and grand decorations.",
  keywords: ["Convention Gallery", "Wedding Photos Warangal", "SK Crown Decors"],
};

import { getLocalGalleryImages } from "@/lib/local-images";

export default async function GalleryPage() {
  const siteSettings = await getSiteSettings();
  const contactSettings = await getContactSettings();
  const sanityGalleryImages = await getGalleryImages();
  
  // Merge Sanity images with local auto-discovered images
  const localImages = getLocalGalleryImages();
  
  // Deduplicate by URL or title (simplistic approach: append local images not present in Sanity)
  const existingUrls = new Set(sanityGalleryImages.map(img => img.imageUrl));
  const uniqueLocalImages = localImages.filter(img => !existingUrls.has(img.imageUrl));
  
  const galleryImages = [...sanityGalleryImages, ...uniqueLocalImages];

  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar siteSettings={siteSettings} contactSettings={contactSettings} />
      <main className="flex-grow pt-[var(--navbar-height)]">
        {/* Full Gallery with fullscreen Lightbox */}
        <GalleryClient initialImages={galleryImages} />
      </main>
      <Footer siteSettings={siteSettings} contactSettings={contactSettings} />
    </div>
  );
}
