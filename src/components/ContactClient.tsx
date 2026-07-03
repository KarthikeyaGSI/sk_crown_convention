"use client";

import React, { useState } from "react";
import { Calendar, Users, FileText, CheckCircle2, ChevronRight, ChevronLeft, Phone, Mail, MapPin } from "lucide-react";
import Button from "@/components/Button";
import { ContactSettingsData } from "@/lib/fallback-data";

const EVENT_TYPES = ["Wedding", "Reception", "Corporate", "Birthday", "Engagement", "Other"];

interface ContactClientProps {
  contactSettings?: ContactSettingsData;
}

export default function ContactClient({ contactSettings }: ContactClientProps) {
  const rawPhone = contactSettings?.whatsApp 
    ? contactSettings.whatsApp.replace(/[^0-9]/g, "")
    : (contactSettings?.phone ? contactSettings.phone.replace(/[^0-9]/g, "") : "");
  const cleanWhatsApp = rawPhone.length > 10 ? rawPhone : (rawPhone ? `91${rawPhone}` : "");
  const whatsappNum = cleanWhatsApp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917070709661";

  const contact = contactSettings || {
    phone: "+91 7070709661, +91 7900775577",
    email: "skcrown700@gmail.com",
    address: "Sk crown Mulug Road, Near Hp Petrol Station, Hanuman Junction, Warangal, India 506006",
  };


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
    if (type === "Other") {
      setFormData({ ...formData, eventType: "Other: " });
    } else {
      setFormData({ ...formData, eventType: type });
    }
    setErrors({ ...errors, eventType: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Helper to escape user inputs against basic XSS
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
      if (!formData.eventType) {
        newErrors.eventType = "Please select an event type.";
      } else if (formData.eventType.trim() === "Other" || formData.eventType.trim() === "Other:") {
        newErrors.eventType = "Please specify your other event type details.";
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError(null);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "6ae2a93a-0823-4a22-9b85-76f325995ef6";

    // Escape fields to prevent injection
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
        // Structured WhatsApp message
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

        // Using dynamic component-scoped whatsappNum
        window.location.href = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(waMessage)}`;
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
    <section className="py-20 md:py-32 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Details */}
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
              Schedule a private venue tour. Experience our spacious seating halls, lighting installations, and luxury catering designs on-site.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-luxury-border/50">
            <div className="flex gap-4 items-center">
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              <a href={`tel:${cleanWhatsApp || "917070709661"}`} className="text-sm text-white-soft hover:text-gold transition-colors font-light font-sans">
                {contact.phone}
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              <a href={`mailto:${contact.email}`} className="text-sm text-white-soft hover:text-gold transition-colors font-light font-sans">
                {contact.email}
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="text-sm text-white-soft font-light font-sans">
                {contact.address}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Wizard Form Card */}
        <div className="lg:col-span-7 bg-luxury-card border border-luxury-border p-6 md:p-8 rounded-[24px] shadow-2xl min-h-[380px] flex flex-col justify-between">
          
          {submitError ? (
            <div className="space-y-6 text-center py-8 my-auto">
              <h3 className="text-lg font-serif font-bold text-red-400">Submission Failed</h3>
              <p className="text-xs md:text-sm text-muted-text font-sans max-w-sm mx-auto leading-relaxed">
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
                  href={`https://wa.me/${whatsappNum}`}
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
            <>
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

              <form onSubmit={handleSubmit} className="space-y-5 flex-grow flex flex-col justify-between">
                
                {/* STEP 1: EVENT TYPE */}
                {step === 1 && (
                  <div className="space-y-3">
                    <p className="text-xs md:text-sm text-muted-text font-sans">
                      Select Event Category:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {EVENT_TYPES.map((type) => {
                        const isSelected = type === "Other"
                          ? formData.eventType.startsWith("Other")
                          : formData.eventType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleSelectEventType(type)}
                            className={`w-full py-3 px-5 rounded-xl font-sans text-left text-xs md:text-sm font-medium transition-all duration-300 border flex justify-between items-center cursor-pointer ${
                              isSelected
                                ? "bg-gold/10 border-gold text-gold shadow-[0_0_15px_rgba(199,163,106,0.1)]"
                                : "bg-[#0B0B0B]/50 border-luxury-border text-white-soft hover:border-gold/30"
                            }`}
                          >
                            {type}
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-gold" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    
                    {formData.eventType.startsWith("Other") && (
                      <div className="mt-3 space-y-1.5 animate-fadeIn">
                        <label className="text-[10px] uppercase tracking-widest text-gold font-medium">
                          Specify Other Event Type
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Anniversary, Housewarming..."
                          value={formData.eventType.replace("Other: ", "")}
                          onChange={(e) => {
                            setFormData({ ...formData, eventType: `Other: ${e.target.value}` });
                            setErrors({ ...errors, eventType: "" });
                          }}
                          className="w-full bg-[#0B0B0B]/50 border border-luxury-border rounded-xl px-4 py-2.5 text-white-soft font-sans text-xs md:text-sm focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>
                    )}

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
                        placeholder="Describe specific decor, food menu, or timing needs (max 500 chars)..."
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
                        placeholder="Enter your name (2-80 characters)"
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
                        placeholder="Enter phone number (numbers only)"
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
                      {errors.email && (
                        <p className="text-[10px] text-red-400 font-sans">{errors.email}</p>
                      )}
                    </div>

                    {/* Honeypot Spam Field */}
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

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-luxury-border mt-6">
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
            </>
          )}
        </div>

      </div>
    </section>
  );
}
