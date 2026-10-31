"use client";

import React, { useState } from "react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({
  isOpen,
  onClose,
}: ReservationModalProps) {
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = `BEL-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(ref);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-[490px] bg-[#17191C] border border-[#E8FC81]/40 rounded-[14px] p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <span className="text-[#E8FC81] text-xs font-semibold tracking-widest uppercase block mb-1">
            Belgino Table Booking
          </span>
          <h2 className="text-[28px] sm:text-[34px] leading-tight font-bold tracking-tight text-white uppercase">
            Book A Reservation
          </h2>
        </div>

        {submitted ? (
          <div className="bg-[#202310] border border-[#E8FC81] rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8FC81] text-[#17191C] flex items-center justify-center mx-auto mb-3 font-bold text-xl">
              ✓
            </div>
            <h3 className="text-xl font-bold uppercase text-white mb-1.5">
              Reservation Confirmed!
            </h3>
            <p className="text-xs text-[#FEF9F5]/80 mb-4 leading-relaxed">
              We look forward to welcoming you, <span className="text-[#E8FC81] font-semibold">{formData.name}</span>.
              A table for <span className="text-white font-medium">{formData.guests}</span> has been confirmed for{" "}
              <span className="text-[#E8FC81] font-medium">{formData.date || "your selected date"}</span> at{" "}
              <span className="text-white font-medium">{formData.time}</span>.
            </p>
            <div className="bg-[#17191C] px-4 py-2 rounded-lg border border-[#E8FC81]/40 mb-4 inline-block">
              <span className="text-[10px] uppercase text-[#8A8A87] block">Booking Ref</span>
              <span className="text-base font-mono font-bold text-[#E8FC81]">{bookingRef}</span>
            </div>
            <p className="text-[11px] text-[#8A8A87] mb-5">
              Confirmation details sent to {formData.email}.
            </p>
            <button
              onClick={handleReset}
              className="w-full bg-[#E8FC81] hover:bg-[#d6ec6e] text-[#17191C] font-semibold text-xs uppercase tracking-wider py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-[38px] px-3 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] rounded-[6px] text-white placeholder-[#8A8A87] text-[13px] outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-[38px] px-3 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] rounded-[6px] text-white placeholder-[#8A8A87] text-[13px] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-[38px] px-3 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] rounded-[6px] text-white placeholder-[#8A8A87] text-[13px] outline-none"
              />
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full h-[38px] px-3 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] rounded-[6px] text-white text-[13px] outline-none cursor-pointer"
              >
                <option value="1 Guest" className="bg-[#17191C]">1 Guest</option>
                <option value="2 Guests" className="bg-[#17191C]">2 Guests</option>
                <option value="3 Guests" className="bg-[#17191C]">3 Guests</option>
                <option value="4 Guests" className="bg-[#17191C]">4 Guests</option>
                <option value="5-6 Guests" className="bg-[#17191C]">5-6 Guests</option>
                <option value="7+ Party" className="bg-[#17191C]">7+ Large Party</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full h-[38px] px-3 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] rounded-[6px] text-white text-[13px] outline-none cursor-pointer"
              />
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full h-[38px] px-3 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] rounded-[6px] text-white text-[13px] outline-none cursor-pointer"
              >
                <option value="12:00 PM" className="bg-[#17191C]">12:00 PM</option>
                <option value="1:00 PM" className="bg-[#17191C]">1:00 PM</option>
                <option value="5:00 PM" className="bg-[#17191C]">5:00 PM</option>
                <option value="6:00 PM" className="bg-[#17191C]">6:00 PM</option>
                <option value="7:00 PM" className="bg-[#17191C]">7:00 PM</option>
                <option value="8:00 PM" className="bg-[#17191C]">8:00 PM</option>
                <option value="9:00 PM" className="bg-[#17191C]">9:00 PM</option>
              </select>
            </div>

            <textarea
              placeholder="Special Requests (e.g. window table, anniversary, dietary restrictions)"
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 bg-[#202310] border border-[#E8FC81]/50 focus:border-[#E8FC81] rounded-[6px] text-white placeholder-[#8A8A87] text-[13px] outline-none resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full h-[40px] bg-[#E8FC81] hover:bg-[#d8ec6e] text-[#17191C] font-semibold text-[13px] uppercase tracking-wider rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? "Securing Table..." : "Confirm Reservation"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

