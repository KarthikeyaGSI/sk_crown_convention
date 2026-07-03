import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceEditorial from "@/components/ExperienceEditorial";
import WeddingShowcase from "@/components/WeddingShowcase";
import { getSiteSettings, getHomepage, getContactSettings, getShowcaseEvents } from "@/lib/sanity-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Venue Experience | SK Crown Convention Hall A/c",
  description: "Explore our state-of-the-art wedding stages, majestic arrivals, gourmet dining halls, and massive parking spaces.",
  keywords: ["Convention Hall Facilities", "Wedding Stage Decors", "Gourmet Catering Warangal"],
};

export default async function ExperiencePage() {
  const siteSettings = await getSiteSettings();
  const contactSettings = await getContactSettings();
  const homepage = await getHomepage();
  const showcaseEvents = await getShowcaseEvents();

  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar siteSettings={siteSettings} contactSettings={contactSettings} />
      <main className="flex-grow pt-[var(--navbar-height)]">
        {/* Curated stages */}
        <WeddingShowcase initialEvents={showcaseEvents} />

        {/* Alternating detail sections */}
        <ExperienceEditorial homepage={homepage} />
      </main>
      <Footer siteSettings={siteSettings} contactSettings={contactSettings} />
    </div>
  );
}
