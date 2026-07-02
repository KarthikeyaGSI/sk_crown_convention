"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, FileText, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import Button from "./Button";
import { VENUE_DETAILS } from "@/lib/constants";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EVENT_TYPES = ["Wedding", "Reception", "Corporate", "Birthday", "Engagement"];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    guests: "",
    requirements: "",
    name: "",
    phone: "",
    email: "",
    botcheck: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSelectEventType = (type: string) => {
    setFormData({ ...formData, eventType: type });
    setErrors({ ...errors, eventType: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Helper to escape user inputs against XSS
  const sanitizeHTML = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.eventType) newErrors.eventType = "Please select an event type.";
    } else if (currentStep === 2) {
      if (!formData.date) newErrors.date = "Please select a preferred date.";
      
      const guestCount = parseInt(formData.guests);
      if (!formData.guests) {
        newErrors.guests = "Please specify the guest count.";
      } else if (isNaN(guestCount) || guestCount <= 0) {
        newErrors.guests = "Guest count must be a positive integer.";
      }

      if (formData.requirements.length > 500) {
        newErrors.requirements = "Special requirements cannot exceed 500 characters.";
      }
    } else if (currentStep === 3) {
      const trimmedName = formData.name.trim();
      if (!trimmedName) {
        newErrors.name = "Please enter your name.";
      } else if (trimmedName.length < 2 || trimmedName.length > 80) {
        newErrors.name = "Name must be between 2 and 80 characters.";
      }

      const trimmedPhone = formData.phone.trim();
      if (!trimmedPhone) {
        newErrors.phone = "Please enter your phone number.";
      } else if (!/^\d{10,15}$/.test(trimmedPhone)) {
        newErrors.phone = "Please enter numbers only (10 to 15 digits).";
      }

      const trimmedEmail = formData.email.trim();
      if (trimmedEmail && !/\S+@\S+\.\S+/.test(trimmedEmail)) {
        newErrors.email = "Please enter a valid email address.";
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

  const handleCloseModal = () => {
    onClose();
    setStep(1);
    setSubmitError(null);
    setFormData({
      eventType: "",
      date: "",
      guests: "",
      requirements: "",
      name: "",
      phone: "",
      email: "",
      botcheck: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError(null);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "6ae2a93a-0823-4a22-9b85-76f325995ef6";

    const sanitizedPayload = {
      access_key: accessKey,
      subject: "New Venue Enquiry",
      from_name: sanitizeHTML(formData.name.trim()),
      name: sanitizeHTML(formData.name.trim()),
      email: sanitizeHTML(formData.email.trim()),
      phone: sanitizeHTML(formData.phone.trim()),
      event_type: formData.eventType,
      preferred_date: formData.date,
      guest_count: formData.guests,
      additional_requirements: sanitizeHTML(formData.requirements.trim()),
      botcheck: formData.botcheck,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sanitizedPayload),
      });

      const result = await response.json();

      if (result.success) {
        const formattedDate = new Date(formData.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const waMessage = `Hello SK Crown Convention,

I would like to enquire about booking your venue.

━━━━━━━━━━━━━━━━━━━━

🎉 Event Type:
${formData.eventType}

📅 Preferred Date:
${formattedDate}

👥 Guests:
${formData.guests}

👤 Name:
${formData.name.trim()}

📞 Phone:
${formData.phone.trim()}

📧 Email:
${formData.email.trim() || "None"}

📝 Additional Requirements:
${formData.requirements.trim() || "None"}

━━━━━━━━━━━━━━━━━━━━

Please let me know the availability.

Thank you.`;

        const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9170709661";
        window.location.href = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(waMessage)}`;
        handleCloseModal();
      } else {
        setSubmitError(result.message || "We couldn't submit your enquiry.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Network connectivity failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="absolute inset-0 bg-[#0B0B0B]/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-luxury-card border border-luxury-border p-6 md:p-8 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-muted-text hover:text-gold transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold">
                Venue Visit Booking
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white-soft mt-1">
                {submitError ? "Enquiry Error" : "Plan Your Celebration"}
              </h2>
              {/* Progress Steps Indicators */}
              {!submitError && (
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        s <= step ? "bg-gold" : "bg-luxury-border"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Form & Error Panels */}
            {submitError ? (
              <div className="space-y-6 text-center py-6">
                <p className="text-xs md:text-sm text-muted-text font-sans leading-relaxed">
                  We couldn't submit your enquiry. <br />
                  Please try again or contact us directly on WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    type="button"
                    onClick={() => {
                      setSubmitError(null);
                      setStep(3);
                    }}
                    variant="primary"
                    showArrow={false}
                  >
                    Try Again
                  </Button>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9170709661"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button type="button" variant="secondary" showArrow={false}>
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* STEP 1: EVENT TYPE */}
                {step === 1 && (
                  <div className="space-y-3">
                    <p className="text-xs md:text-sm text-muted-text font-sans">
                      What type of occasion are you celebrating?
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
                        <Users className="w-3.5 h-3.5 text-gold" /> Estimated Guest Count
                      </label>
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        placeholder="e.g. 500"
                        onChange={handleChange}
                        className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                      />
                      {errors.guests && (
                        <p className="text-[10px] text-red-400 font-sans">{errors.guests}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-gold" /> Special Requirements (Optional)
                      </label>
                      <textarea
                        name="requirements"
                        value={formData.requirements}
                        placeholder="e.g. Stage decoration, specific catering preferences..."
                        rows={3}
                        onChange={handleChange}
                        className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                      />
                      {errors.requirements && (
                        <p className="text-[10px] text-red-400 font-sans">{errors.requirements}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT DETAILS */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="e.g. John Doe"
                        onChange={handleChange}
                        className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                      />
                      {errors.name && (
                        <p className="text-[10px] text-red-400 font-sans">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        placeholder="e.g. 9876543210"
                        onChange={handleChange}
                        className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-[10px] text-red-400 font-sans">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-muted-text font-medium flex items-center gap-1.5">
                        Email Address <span className="text-[10px] text-muted-text lowercase">(optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="e.g. johndoe@gmail.com"
                        onChange={handleChange}
                        className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-400 font-sans">{errors.email}</p>
                      )}
                    </div>

                    {/* Honeypot Spam Check */}
                    <input
                      type="text"
                      name="botcheck"
                      value={formData.botcheck}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="mt-4 bg-[#0B0B0B]/40 border border-luxury-border p-4 rounded-xl space-y-1 text-[11px] text-muted-text font-sans">
                      <p className="font-semibold text-white-soft mb-1">Reservation Summary</p>
                      <p><span className="text-gold">Event:</span> {formData.eventType}</p>
                      <p><span className="text-gold">Date:</span> {formData.date}</p>
                      <p><span className="text-gold">Guests:</span> {formData.guests}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
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
                      {isSubmitting ? "Sending..." : "Confirm & Book"}
                    </Button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
