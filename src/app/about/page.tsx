import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VenueStory from "@/components/VenueStory";

export const metadata: Metadata = {
  title: "About Us | SK Crown Convention Hall A/c",
  description: "Learn about the architecture, inspiration, and heritage of SK Crown Convention Hall A/c, Warangal's premium wedding and event sanctuary.",
  keywords: ["SK Crown Architecture", "About SK Crown", "Premium Wedding Hall Warangal"],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-[var(--navbar-height)]">
        {/* Full Venue Story detailing the architecture */}
        <VenueStory />
      </main>
      <Footer />
    </div>
  );
}
