"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

interface NavbarProps {
  onOpenReservation?: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initial entrance animation
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
      );
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic hover effect on CTA button
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleButtonMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5 sm:pt-7 transition-all duration-300 pointer-events-none">
      <nav
        ref={navRef}
        className={`pointer-events-auto relative overflow-hidden w-full max-w-[968px] bg-[#C7CDA9] rounded-[85px] px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 shadow-md ${
          scrolled
            ? "shadow-2xl bg-[#C7CDA9]/95 backdrop-blur-md py-2 border border-[#0F2419]/15"
            : ""
        }`}
      >
        {/* Subtle Scroll Progress Bar along bottom rim of pill */}
        <div
          className="absolute bottom-0 left-0 h-[2.5px] bg-[#0F2419]/40 transition-all duration-100 ease-out pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Belgino Logo Vector (Figma 80x30) */}
        <Link
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="flex items-center shrink-0 group transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <Image
            src="/images/logo.svg"
            alt="Belgino"
            width={80}
            height={30}
            priority
            className="w-[75px] sm:w-[80px] h-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          <button
            onClick={() => scrollToSection("hero")}
            className="relative text-[14px] uppercase tracking-wider font-semibold text-[#17191C] hover:text-[#0F2419] transition-colors cursor-pointer group py-1"
          >
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0F2419] transition-all duration-250 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="relative text-[14px] uppercase tracking-wider font-semibold text-[#0F2419]/80 hover:text-[#0F2419] transition-colors cursor-pointer group py-1"
          >
            <span>About</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0F2419] transition-all duration-250 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="relative text-[14px] uppercase tracking-wider font-semibold text-[#0F2419]/80 hover:text-[#0F2419] transition-colors cursor-pointer group py-1"
          >
            <span>Menu</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0F2419] transition-all duration-250 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection("reservation")}
            className="relative text-[14px] uppercase tracking-wider font-semibold text-[#0F2419]/80 hover:text-[#0F2419] transition-colors cursor-pointer group py-1"
          >
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0F2419] transition-all duration-250 group-hover:w-full" />
          </button>
        </div>

        {/* Right CTA Button (Magnetic + Slide-Up Hover Effect) */}
        <div className="flex items-center gap-2">
          <button
            ref={btnRef}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            onClick={() => {
              if (onOpenReservation) {
                onOpenReservation();
              } else {
                scrollToSection("reservation");
              }
            }}
            className="group btn-hover-trigger bg-white p-[3px] rounded-full transition-shadow duration-300 hover:shadow-lg cursor-pointer transform active:scale-95"
          >
            <div className="bg-[#0F2419] group-hover:bg-[#153424] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2.5 transition-colors">
              {/* Animated Text Container */}
              <div className="btn-slide-container h-[18px] overflow-hidden text-[12px] uppercase font-semibold tracking-wider">
                <div className="btn-slide-text transition-transform duration-250 group-hover:-translate-y-[18px]">
                  <span className="h-[18px] flex items-center">Book a Reservation</span>
                  <span className="h-[18px] flex items-center text-[#E8FC81]">Book a Reservation</span>
                </div>
              </div>

              {/* Arrow Icon with Hover Slide */}
              <div className="w-[19px] h-[16px] overflow-hidden relative shrink-0">
                <div className="flex flex-col transition-transform duration-250 group-hover:-translate-y-[16px]">
                  <div className="w-[19px] h-[16px] flex items-center justify-center">
                    <Image
                      src="/images/arrow-icon.svg"
                      alt=""
                      width={19}
                      height={16}
                      className="w-[14px] h-[12px] brightness-200"
                    />
                  </div>
                  <div className="w-[19px] h-[16px] flex items-center justify-center">
                    <Image
                      src="/images/arrow-icon.svg"
                      alt=""
                      width={19}
                      height={16}
                      className="w-[14px] h-[12px] brightness-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-black/5 text-[#0F2419] focus:outline-none transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-full left-4 right-4 mt-2 bg-[#C7CDA9] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-[#0F2419]/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-left text-lg uppercase tracking-wider font-semibold text-[#17191C] py-2 border-b border-[#0F2419]/10"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-left text-lg uppercase tracking-wider font-semibold text-[#17191C] py-2 border-b border-[#0F2419]/10"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="text-left text-lg uppercase tracking-wider font-semibold text-[#17191C] py-2 border-b border-[#0F2419]/10"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection("reservation")}
            className="text-left text-lg uppercase tracking-wider font-semibold text-[#17191C] py-2"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
