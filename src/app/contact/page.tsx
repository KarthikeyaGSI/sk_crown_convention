import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Book Venue Visit | SK Crown Convention Hall A/c",
  description: "Initiate your venue booking request at SK Crown Convention Hall A/c. Submit our 3-step visit planner wizard and secure details directly on WhatsApp.",
  keywords: ["Book Wedding Hall", "Contact SK Crown", "Convention Reservation Warangal"],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-[var(--navbar-height)]">
        {/* On-page Booking Wizard */}
        <ContactClient />
      </main>
      <Footer />
    </div>
  );
}
