"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FooterProps {
  onOpenReservation?: () => void;
}

export default function Footer({ onOpenReservation }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const ctaBarRef = useRef<HTMLDivElement>(null);
  const linksGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (ctaBarRef.current) {
        gsap.fromTo(
          ctaBarRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaBarRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      if (linksGridRef.current) {
        gsap.fromTo(
          linksGridRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: linksGridRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tickerImages = [
    { src: "/images/hero-dish-9-grilledchicken.png", alt: "Crispy chicken breast" },
    { src: "/images/story-chef-1.png", alt: "Executive Chef" },
    { src: "/images/hero-dish-1-skewers.png", alt: "Grilled chicken skewers" },
    { src: "/images/hero-dish-6-ribs.png", alt: "Slow-smoked meat ribs" },
    { src: "/images/hero-dish-3-steak.png", alt: "Prime grilled steak" },
    { src: "/images/hero-dish-5-fish.png", alt: "Grilled fresh fish" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-[#17191C] text-white pt-0 pb-12 overflow-hidden"
    >
      {/* Top Food Gallery Ticker Strip (Figma Exact) */}
      <div className="w-full overflow-hidden py-6 border-b border-white/10 bg-black/30">
        <div className="flex gap-4 animate-marquee-slow">
          {[...tickerImages, ...tickerImages, ...tickerImages].map((img, idx) => (
            <div
              key={idx}
              className="shrink-0 w-[240px] sm:w-[280px] h-[200px] sm:h-[240px] relative rounded-[12px] overflow-hidden group shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="280px"
                className="object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1000px] pt-12 sm:pt-16">
        {/* Reservation CTA Bar */}
        <div
          ref={ctaBarRef}
          className="py-8 sm:py-10 border-y border-white/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <h3 className="text-[17px] sm:text-[20px] font-semibold text-white uppercase tracking-wider text-center md:text-left max-w-[380px] leading-snug">
            Reserve your spot and enjoy an unforgettable dining experience
          </h3>

          {/* Book A Reservation Button with Lime Pill & Slide Hover */}
          <div className="shrink-0">
            <button
              onClick={() => {
                if (onOpenReservation) {
                  onOpenReservation();
                } else {
                  scrollTo("reservation");
                }
              }}
              className="btn-hover-trigger group inline-flex items-center gap-2.5 bg-[#E8FC81] hover:bg-[#d8ec6e] text-[#17191C] px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:scale-[1.02]"
            >
              <div className="btn-slide-container h-[18px] overflow-hidden text-[12px] uppercase font-semibold tracking-wider">
                <div className="btn-slide-text transition-transform duration-300 group-hover:-translate-y-[18px]">
                  <span className="h-[18px] flex items-center">BOOK A RESERVATION</span>
                  <span className="h-[18px] flex items-center text-[#0F2419]">BOOK A RESERVATION</span>
                </div>
              </div>

              <div className="w-[19px] h-[16px] overflow-hidden relative shrink-0">
                <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-[16px]">
                  <div className="w-[19px] h-[16px] flex items-center justify-center">
                    <Image
                      src="/images/arrow-icon.svg"
                      alt=""
                      width={16}
                      height={14}
                      className="w-[13px] h-[11px]"
                    />
                  </div>
                  <div className="w-[19px] h-[16px] flex items-center justify-center">
                    <Image
                      src="/images/arrow-icon.svg"
                      alt=""
                      width={16}
                      height={14}
                      className="w-[13px] h-[11px]"
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Main Footer Links & Large Belgino Vector Logo */}
        <div
          ref={linksGridRef}
          className="pt-12 sm:pt-16 pb-12 flex flex-col md:flex-row items-start justify-between gap-10 sm:gap-14"
        >
          {/* Large Logo Vector (Figma #6829:1388) */}
          <div className="shrink-0">
            <Image
              src="/images/logo-footer.svg"
              alt="Belgino Fine Dining"
              width={289}
              height={108}
              className="w-[220px] sm:w-[260px] md:w-[289px] h-auto object-contain brightness-200"
            />
            <p className="text-[#8A8A87] text-xs mt-3 max-w-[280px] leading-relaxed">
              Warm hospitality, artisanal flavors, and memorable gatherings in every dish.
            </p>
          </div>

          {/* 3 Nav Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 w-full md:w-auto">
            {/* Column 1: Company */}
            <div>
              <h4 className="text-[14px] font-medium text-[#8A8A87] uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5 text-[14px] text-white/90">
                <li>
                  <button onClick={() => scrollTo("hero")} className="hover:text-[#E8FC81] transition-colors cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("menu")} className="hover:text-[#E8FC81] transition-colors cursor-pointer">
                    Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("about")} className="hover:text-[#E8FC81] transition-colors cursor-pointer">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("reservation")} className="hover:text-[#E8FC81] transition-colors cursor-pointer">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-[14px] font-medium text-[#8A8A87] uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2.5 text-[14px] text-white/90">
                <li>
                  <button onClick={() => scrollTo("hero")} className="hover:text-[#E8FC81] transition-colors cursor-pointer">
                    Dishes
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("drinks")} className="hover:text-[#E8FC81] transition-colors cursor-pointer">
                    Drinks
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("menu")} className="hover:text-[#E8FC81] transition-colors cursor-pointer">
                    Our Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("testimonials")} className="hover:text-[#E8FC81] transition-colors cursor-pointer">
                    Testimonials
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Utility Pages */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[14px] font-medium text-[#8A8A87] uppercase tracking-wider mb-4">
                Utility Pages
              </h4>
              <ul className="flex flex-col gap-2.5 text-[14px] text-white/90">
                <li>
                  <a href="#hero" className="hover:text-[#E8FC81] transition-colors">
                    Style Guide
                  </a>
                </li>
                <li>
                  <a href="#hero" className="hover:text-[#E8FC81] transition-colors">
                    License
                  </a>
                </li>
                <li>
                  <a href="#hero" className="hover:text-[#E8FC81] transition-colors">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#hero" className="hover:text-[#E8FC81] transition-colors">
                    404
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex items-center gap-5">
            <div>
              Designed by <span className="text-white hover:text-[#E8FC81] transition-colors">Lexify Agency</span>. Powered by <span className="text-white hover:text-[#E8FC81] transition-colors">Webflow</span>
            </div>
            <button
              onClick={() => scrollTo("hero")}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#E8FC81] transition-colors cursor-pointer group text-[11px] font-semibold tracking-wider ml-4"
            >
              <span>TOP</span>
              <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold tracking-wider">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8FC81] transition-colors"
            >
              FACEBOOK
            </a>
            <span className="opacity-30">•</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8FC81] transition-colors"
            >
              INSTAGRAM
            </a>
            <span className="opacity-30">•</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8FC81] transition-colors"
            >
              LINKEDIN
            </a>
            <span className="opacity-30">•</span>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8FC81] transition-colors"
            >
              TIKTOK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
