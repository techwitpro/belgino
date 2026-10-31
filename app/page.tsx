"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import DrinksSection from "@/components/DrinksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReservation = () => {
    setIsModalOpen(true);
  };

  const handleCloseReservation = () => {
    setIsModalOpen(false);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-[#F6FAE1] text-[#291F1A] selection:bg-[#E8FC81] selection:text-[#17191C]">
        {/* Pill Navigation Bar */}
        <Navbar onOpenReservation={handleOpenReservation} />

        {/* Main Landing Page Content */}
        <main className="grow">
          {/* 1. Hero Section (Masked title reveal, floating badges, marquee) */}
          <Hero onOpenReservation={handleOpenReservation} />

          {/* 2. Menu Section (Breakfast, Lunch, Dinner with interactive category tabs) */}
          <MenuSection onOpenReservation={handleOpenReservation} />

          {/* 3. About Us / Story & Hours Section (Dark Theme with Live Open Status) */}
          <AboutSection />

          {/* 4. Drinks Section (Handcrafted Cocktails, Beverages & Cinematic Panoramic Banner) */}
          <DrinksSection />

          {/* 5. Testimonials Section (Customer reviews & gold stars carousel) */}
          <TestimonialsSection />

          {/* 6. Reservation Form Section (Functional booking with confirmation) */}
          <ReservationSection />
        </main>

        {/* 7. Footer (Food ticker strip, reservation banner, logo, links, social) */}
        <Footer onOpenReservation={handleOpenReservation} />

        {/* Global Quick Reservation Modal */}
        <ReservationModal
          isOpen={isModalOpen}
          onClose={handleCloseReservation}
        />
      </div>
    </SmoothScroll>
  );
}
