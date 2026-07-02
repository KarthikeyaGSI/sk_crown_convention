import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reviews from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Guest Reviews | SK Crown Convention Hall A/c",
  description: "Read verified Google Reviews from our guests. Discover why SK Crown Convention Hall A/c is Warangal's highest-rated luxury wedding venue.",
  keywords: ["SK Crown Reviews", "Google Reviews Warangal", "Customer Testimonials"],
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-[var(--navbar-height)]">
        {/* Reviews testimonial marquee and verification summary */}
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
