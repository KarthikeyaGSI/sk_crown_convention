"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, FileText, CheckCircle2, ChevronRight, ChevronLeft, Send, Phone, Mail, MapPin } from "lucide-react";
import Button from "@/components/Button";
import { VENUE_DETAILS } from "@/lib/constants";

const EVENT_TYPES = ["Wedding", "Reception", "Corporate", "Birthday", "Engagement"];

export default function ContactClient() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    guests: "",
    requirements: "",
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSelectEventType = (type: string) => {
    setFormData({ ...formData, eventType: type });
    setErrors({ ...errors, eventType: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.eventType) newErrors.eventType = "Please select an event type.";
    } else if (currentStep === 2) {
      if (!formData.date) newErrors.date = "Please select a preferred date.";
      if (!formData.guests) newErrors.guests = "Please specify the guest count.";
      else if (parseInt(formData.guests) <= 0) newErrors.guests = "Guest count must be greater than 0.";
    } else if (currentStep === 3) {
      if (!formData.name.trim()) newErrors.name = "Please enter your name.";
      if (!formData.phone.trim()) newErrors.phone = "Please enter your phone number.";
      else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Venue Visit Booking - ${formData.name}`,
          from_name: "SK Crown Convention Website",
          to_email: VENUE_DETAILS.email,
          ...formData,
        }),
      });

      if (response.ok) {
        // Formatted enquiry text message
        const waMessage = `Hello SK Crown Convention,

I would like to enquire about booking your venue.

━━━━━━━━━━━━━━━━━━
🎉 Event Type: ${formData.eventType}
📅 Preferred Date: ${formData.date}
👥 Guests: ${formData.guests}
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email || "None"}
📝 Additional Requirements: ${formData.requirements || "None"}
━━━━━━━━━━━━━━━━━━

Please let me know the availability.

Thank you.`;

        const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || VENUE_DETAILS.phoneRaw || "9170709661";
        window.location.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
      } else {
        alert("Submission failed. Redirecting to WhatsApp...");
        window.location.href = `https://wa.me/${VENUE_DETAILS.phoneRaw}`;
      }
    } catch (err) {
      console.error(err);
      window.location.href = `https://wa.me/${VENUE_DETAILS.phoneRaw}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Contact Coordinates */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-semibold">
              Venue Visit
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white-soft leading-tight">
              Book Your Visit
            </h1>
            <div className="w-16 h-[1px] bg-gold" />
            <p className="text-sm md:text-base text-muted-text font-sans font-light leading-relaxed">
              Schedule a private venue tour. Experience the spacious seating halls, lighting installations, and luxury catering designs on-site.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-luxury-border/50">
            <div className="flex gap-4 items-center">
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              <a href={`tel:${VENUE_DETAILS.phoneRaw}`} className="text-sm text-white-soft hover:text-gold transition-colors font-light font-sans">
                {VENUE_DETAILS.phone}
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              <a href={`mailto:${VENUE_DETAILS.email}`} className="text-sm text-white-soft hover:text-gold transition-colors font-light font-sans">
                {VENUE_DETAILS.email}
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="text-sm text-white-soft font-light font-sans">
                {VENUE_DETAILS.address}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: 3-Step Wizard Form Card */}
        <div className="lg:col-span-7 bg-luxury-card border border-luxury-border p-6 md:p-8 rounded-[24px] shadow-2xl">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-serif font-semibold text-white-soft">
              Step {step} of 3
            </h2>
            <div className="flex gap-1.5 w-24">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all duration-350 ${
                    s <= step ? "bg-gold" : "bg-luxury-border"
                  }`}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* STEP 1: EVENT TYPE */}
            {step === 1 && (
              <div className="space-y-3">
                <p className="text-xs md:text-sm text-muted-text font-sans">
                  Select Event Category:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSelectEventType(type)}
                      className={`w-full py-3 px-5 rounded-xl font-sans text-left text-xs md:text-sm font-medium transition-all duration-300 border flex justify-between items-center cursor-pointer ${
                        formData.eventType === type
                          ? "bg-gold/10 border-gold text-gold shadow-[0_0_15px_rgba(199,163,106,0.1)]"
                          : "bg-[#0B0B0B]/50 border-luxury-border text-white-soft hover:border-gold/30"
                      }`}
                    >
                      {type}
                      {formData.eventType === type && (
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                      )}
                    </button>
                  ))}
                </div>
                {errors.eventType && (
                  <p className="text-[10px] text-red-400 font-sans">{errors.eventType}</p>
                )}
              </div>
            )}

            {/* STEP 2: DATE & GUESTS */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                  {errors.date && (
                    <p className="text-[10px] text-red-400 font-sans">{errors.date}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-gold" /> Guest Capacity
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    placeholder="e.g. 800"
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                  {errors.guests && (
                    <p className="text-[10px] text-red-400 font-sans">{errors.guests}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-gold" /> Requirements (Optional)
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    placeholder="Describe specific decor, food menu, or timing needs..."
                    rows={3}
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT INFOS */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Enter your name"
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-400 font-sans">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter phone number"
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-400 font-sans">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium flex items-center gap-1.5">
                    Email <span className="text-[10px] text-muted-text lowercase">(optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter email address"
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div className="mt-4 bg-[#0B0B0B]/40 border border-luxury-border p-4 rounded-xl space-y-1 text-[11px] text-muted-text font-sans">
                  <p className="font-semibold text-white-soft mb-1">Reservation Summary</p>
                  <p><span className="text-gold">Event:</span> {formData.eventType}</p>
                  <p><span className="text-gold">Date:</span> {formData.date}</p>
                  <p><span className="text-gold">Guests:</span> {formData.guests}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-luxury-border">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1 text-xs font-medium text-muted-text hover:text-gold transition-colors uppercase tracking-wider font-sans cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto"
                  showArrow={false}
                >
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={isSubmitting}
                  showArrow={true}
                >
                  {isSubmitting ? "Sending..." : "Confirm & Send"}
                </Button>
              )}
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
