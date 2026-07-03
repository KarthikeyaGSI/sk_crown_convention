import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactClient from "@/components/ContactClient";
import { getSiteSettings, getContactSettings } from "@/lib/sanity-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Book Venue Visit | SK Crown Convention Hall A/c",
  description: "Initiate your venue booking request at SK Crown Convention Hall A/c. Submit our 3-step visit planner wizard and secure details directly on WhatsApp.",
  keywords: ["Book Wedding Hall", "Contact SK Crown", "Convention Reservation Warangal"],
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  const contactSettings = await getContactSettings();

  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar siteSettings={siteSettings} contactSettings={contactSettings} />
      <main className="flex-grow pt-[var(--navbar-height)]">
        {/* On-page Booking Wizard */}
        <ContactClient contactSettings={contactSettings} />
      </main>
      <Footer siteSettings={siteSettings} contactSettings={contactSettings} />
    </div>
  );
}
