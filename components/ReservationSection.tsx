"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ReservationSectionProps {
  onSuccess?: (reservationData: {
    name: string;
    email: string;
    phone: string;
    guests: string;
    date: string;
    time: string;
    message: string;
    reference: string;
  }) => void;
}

export default function ReservationSection({
  onSuccess,
}: ReservationSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2 Guests",
    date: "",
    time: "7:00 PM",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [error, setError] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Card entry reveal - clean and snappy
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Background parallax
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      const ref = `BEL-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(ref);
      setIsSubmitting(false);
      setSubmitted(true);

      if (onSuccess) {
        onSuccess({
          ...formData,
          reference: ref,
        });
      }
    }, 850);
  };

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#17191C] overflow-hidden flex items-center justify-center min-h-[720px]"
    >
      {/* Background Image with Dark Vignette Overlay & Parallax */}
      <div ref={bgImageRef} className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)]">
        <Image
          src="/images/reservation-banner-bg.png"
          alt="Belgino Dining Room Atmosphere"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-[#17191C]/80 backdrop-brightness-95 pointer-events-none" />

      {/* Main Reservation Card (Figma Clone: width ~475px, border-radius 12px) */}
      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <div
          ref={cardRef}
          className="w-full max-w-[485px] bg-[#17191C]/95 backdrop-blur-md border border-[#E8FC81]/35 rounded-[14px] p-6 sm:p-9 shadow-2xl transition-colors duration-300 hover:border-[#E8FC81]/60"
        >
          {/* Card Title */}
          <div className="text-center mb-6">
            <h2 className="text-[32px] sm:text-[42px] leading-[1.08] font-bold tracking-[-0.026em] text-white uppercase">
              Secure Your Table for
              <br />
              Memorable Meal
            </h2>
          </div>

          {submitted ? (
            <div className="bg-[#202310] border border-[#E8FC81] rounded-xl p-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-14 h-14 rounded-full bg-[#E8FC81] text-[#17191C] flex items-center justify-center mx-auto mb-4 font-bold text-2xl shadow-lg">
                ✓
              </div>
              <h3 className="text-2xl font-bold uppercase text-white mb-2">
                Reservation Confirmed!
              </h3>
              <p className="text-sm text-[#FEF9F5]/80 mb-4 leading-relaxed">
                Thank you, <span className="text-[#E8FC81] font-semibold">{formData.name}</span>!
                Your table for <span className="text-white font-medium">{formData.guests}</span> has been booked for{" "}
                <span className="text-[#E8FC81] font-medium">{formData.date || "your selected date"}</span> at{" "}
                <span className="text-white font-medium">{formData.time}</span>.
              </p>
              <div className="bg-[#17191C] px-4 py-2.5 rounded-lg border border-[#E8FC81]/40 mb-5 inline-block">
                <span className="text-xs uppercase text-[#8A8A87] block">Booking Reference</span>
                <span className="text-lg font-mono font-bold text-[#E8FC81]">{bookingRef}</span>
              </div>
              <p className="text-xs text-[#8A8A87] mb-6">
                A confirmation summary has been sent to {formData.email}.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    guests: "2 Guests",
                    date: "",
                    time: "7:00 PM",
                    message: "",
                  });
                }}
                className="w-full bg-[#E8FC81] hover:bg-[#d6ec6e] text-[#17191C] font-semibold text-xs uppercase tracking-wider py-3 rounded-full transition-colors cursor-pointer shadow-md"
              >
                Book Another Table
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-xs px-3.5 py-2 rounded-lg">
                  {error}
                </div>
              )}

              {/* Quick Guest Count Selection Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {["1 Guest", "2 Guests", "4 Guests", "6 Guests", "8+ Party"].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, guests: chip }))}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer shrink-0 border ${
                      formData.guests === chip
                        ? "bg-[#E8FC81] text-[#17191C] border-[#E8FC81] scale-105 shadow-xs"
                        : "bg-[#202310] text-[#FEF9F5]/70 border-[#8A8A87]/30 hover:border-[#E8FC81]/50 hover:text-white"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full h-[40px] px-3.5 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] focus:ring-1 focus:ring-[#E8FC81]/40 rounded-[6px] text-white placeholder-[#8A8A87] text-[13px] outline-none transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full h-[40px] px-3.5 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] focus:ring-1 focus:ring-[#E8FC81]/40 rounded-[6px] text-white placeholder-[#8A8A87] text-[13px] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number & Guests Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full h-[40px] px-3.5 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] focus:ring-1 focus:ring-[#E8FC81]/40 rounded-[6px] text-white placeholder-[#8A8A87] text-[13px] outline-none transition-all"
                  />
                </div>
                <div>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full h-[40px] px-3.5 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] focus:ring-1 focus:ring-[#E8FC81]/40 rounded-[6px] text-white text-[13px] outline-none transition-all cursor-pointer"
                  >
                    <option value="1 Guest" className="bg-[#17191C]">1 Guest</option>
                    <option value="2 Guests" className="bg-[#17191C]">2 Guests</option>
                    <option value="3 Guests" className="bg-[#17191C]">3 Guests</option>
                    <option value="4 Guests" className="bg-[#17191C]">4 Guests</option>
                    <option value="5-6 Guests" className="bg-[#17191C]">5-6 Guests</option>
                    <option value="7+ Large Party" className="bg-[#17191C]">7+ Large Party</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Select Date & Select Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full h-[40px] px-3.5 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] focus:ring-1 focus:ring-[#E8FC81]/40 rounded-[6px] text-white text-[13px] outline-none transition-all cursor-pointer"
                  />
                </div>
                <div>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full h-[40px] px-3.5 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] focus:ring-1 focus:ring-[#E8FC81]/40 rounded-[6px] text-white text-[13px] outline-none transition-all cursor-pointer"
                  >
                    <option value="12:00 PM" className="bg-[#17191C]">12:00 PM</option>
                    <option value="1:00 PM" className="bg-[#17191C]">1:00 PM</option>
                    <option value="2:00 PM" className="bg-[#17191C]">2:00 PM</option>
                    <option value="5:00 PM" className="bg-[#17191C]">5:00 PM</option>
                    <option value="6:00 PM" className="bg-[#17191C]">6:00 PM</option>
                    <option value="7:00 PM" className="bg-[#17191C]">7:00 PM</option>
                    <option value="8:00 PM" className="bg-[#17191C]">8:00 PM</option>
                    <option value="9:00 PM" className="bg-[#17191C]">9:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Write Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write Message (special requests, seating preferences, allergies)"
                  rows={3}
                  className="w-full p-3.5 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] focus:ring-1 focus:ring-[#E8FC81]/40 rounded-[6px] text-white placeholder-[#8A8A87] text-[13px] outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button (Figma Lime Pill) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[42px] bg-[#E8FC81] hover:bg-[#d8ec6e] text-[#17191C] font-semibold text-[13px] uppercase tracking-wider rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer transform active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#17191C] border-t-transparent rounded-full animate-spin" />
                      <span>Securing Table...</span>
                    </div>
                  ) : (
                    "BOOK A RESERVATION"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
