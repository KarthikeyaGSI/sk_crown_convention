import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | SK Crown Convention Hall A/c",
  description: "Explore the stunning gallery of SK Crown Convention Hall A/c. Take a virtual tour of our premium wedding stages, receptions, banquets, and grand decorations.",
  keywords: ["Convention Gallery", "Wedding Photos Warangal", "SK Crown Decors"],
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-[var(--navbar-height)]">
        {/* Full Gallery with fullscreen Lightbox */}
        <GalleryClient />
      </main>
      <Footer />
    </div>
  );
}
