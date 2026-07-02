import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceEditorial from "@/components/ExperienceEditorial";
import WeddingShowcase from "@/components/WeddingShowcase";

export const metadata: Metadata = {
  title: "Venue Experience | SK Crown Convention Hall A/c",
  description: "Explore our state-of-the-art wedding stages, majestic arrivals, gourmet dining halls, and massive parking spaces.",
  keywords: ["Convention Hall Facilities", "Wedding Stage Decors", "Gourmet Catering Warangal"],
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-[var(--navbar-height)]">
        {/* Curated stages */}
        <WeddingShowcase />

        {/* Alternating detail sections */}
        <ExperienceEditorial />
      </main>
      <Footer />
    </div>
  );
}
