"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const [isOpenNow, setIsOpenNow] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);
  const hoursCardRef = useRef<HTMLDivElement>(null);
  const dottedLinesRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    // Check if open based on current local time
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day === 0) {
      setIsOpenNow(hour >= 13 && hour < 23);
    } else {
      setIsOpenNow(hour >= 16 && hour < 23);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Row 1: Story & Chef Image
      if (row1Ref.current) {
        gsap.fromTo(
          row1Ref.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row1Ref.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 3. Row 2: 3-Column Feature Cards
      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row2Ref.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 4. Row 3: Quality Badge & Opening Hours Table with Expanding Dotted Lines
      if (row3Ref.current) {
        gsap.fromTo(
          row3Ref.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row3Ref.current,
              start: "top 85%",
              once: true,
              onEnter: () => {
                const lines = dottedLinesRef.current.filter(Boolean);
                if (lines.length > 0) {
                  gsap.fromTo(
                    lines,
                    { scaleX: 0, transformOrigin: "left" },
                    {
                      scaleX: 1,
                      duration: 0.65,
                      stagger: 0.05,
                      ease: "power2.out",
                    }
                  );
                }
              },
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Card Tilt Micro-interactions
  const handleCardTilt = (
    e: React.MouseEvent<HTMLDivElement>,
    card: HTMLDivElement | null
  ) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -relY * 10,
      rotateY: relX * 10,
      transformPerspective: 900,
      duration: 0.25,
      ease: "power1.out",
    });
  };

  const handleCardReset = (card: HTMLDivElement | null) => {
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.55,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const hoursSchedule = [
    { day: "SUNDAY", hours: "1:00 PM - 11:00 PM" },
    { day: "MONDAY", hours: "4:00 PM - 11:00 PM" },
    { day: "TUESDAY", hours: "4:00 PM - 11:00 PM" },
    { day: "WEDNESDAY", hours: "4:00 PM - 11:00 PM" },
    { day: "THURSDAY", hours: "4:00 PM - 11:00 PM" },
    { day: "FRIDAY", hours: "4:00 PM - 11:00 PM" },
    { day: "SATURDAY", hours: "4:00 PM - 11:00 PM" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#17191C] text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1020px]">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center max-w-[620px] mx-auto mb-14 sm:mb-16"
        >
          <span className="text-[#E8FC81] text-sm font-medium tracking-[0.18em] uppercase block mb-3">
            // ABOUT US //
          </span>
          <h2 className="text-[36px] sm:text-[48px] md:text-[60px] leading-[1.05] font-semibold tracking-[-0.02em] uppercase text-[#E8FC81]">
            GREAT TASTE BRINGS PEOPLE TOGETHER
          </h2>
        </div>

        {/* Story Grid Container */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {/* Row 1: Our Story Card & Chef Image */}
          <div
            ref={row1Ref}
            className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-stretch"
          >
            {/* Story Card with 3D Tilt */}
            <div
              ref={storyCardRef}
              onMouseMove={(e) => handleCardTilt(e, storyCardRef.current)}
              onMouseLeave={() => handleCardReset(storyCardRef.current)}
              className="md:col-span-6 bg-[#202310] border border-[#8A8A87]/30 rounded-[12px] p-7 sm:p-9 flex flex-col justify-center transition-colors duration-300 hover:border-[#E8FC81]/50 shadow-md will-change-transform cursor-default"
            >
              <h3 className="text-[20px] sm:text-[23px] font-semibold text-[#FEF9F5] uppercase tracking-wide mb-3">
                OUR STORY & PASSION
              </h3>
              <p className="text-[13px] sm:text-[14px] leading-[1.6] text-[#FEF9F5]/90 font-normal">
                Built on a love for exceptional food and genuine hospitality,
                our restaurant brings fresh ingredients, bold flavors, and
                unforgettable dining experiences to every table. Our mission is
                to serve delicious meals, deliver outstanding service, and
                create a welcoming space where every guest feels at home.
              </p>
            </div>

            {/* Chef Image Card */}
            <div className="md:col-span-6 border border-[#8A8A87]/30 rounded-[12px] overflow-hidden relative min-h-[260px] sm:min-h-[300px] shadow-sm group">
              <Image
                src="/images/story-chef-1.png"
                alt="Executive Chef preparing fresh dishes"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Row 2: 3-Column Feature Row */}
          <div
            ref={row2Ref}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4"
          >
            {/* Sushi Feature Image */}
            <div className="border border-[#8A8A87]/30 rounded-[12px] overflow-hidden relative h-[155px] sm:h-[165px] shadow-xs group">
              <Image
                src="/images/story-sushi-rolls.png"
                alt="Assorted Sushi Rolls"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>

            {/* Customer Rating Card (Figma White Pill Card) */}
            <div className="bg-white border border-[#8A8A87]/40 rounded-[12px] h-[155px] sm:h-[165px] flex items-center justify-center px-4 py-3 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                {/* Overlapping Avatars */}
                <div className="flex items-center -space-x-2.5">
                  {[
                    "/images/hero-avatar-1.png",
                    "/images/hero-avatar-2.png",
                    "/images/hero-avatar-3.png",
                    "/images/hero-avatar-4.png",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="w-[34px] h-[34px] rounded-full border-[1.5px] border-[#17191C] overflow-hidden relative"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="34px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Score & Stars */}
                <div className="flex flex-col items-start pl-1">
                  <span className="text-[15px] font-medium text-[#17191C] leading-none mb-1">
                    4.9/5 Rating
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Image
                        key={star}
                        src="/images/star.svg"
                        alt="★"
                        width={14}
                        height={14}
                        className="w-[13px] h-[13px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Steak Feature Image */}
            <div className="border border-[#8A8A87]/30 rounded-[12px] overflow-hidden relative h-[155px] sm:h-[165px] shadow-xs group">
              <Image
                src="/images/story-steak-fries.png"
                alt="Prime Steak & Crispy Fries"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Row 3: Quality Badge & Opening Hours Table */}
          <div
            ref={row3Ref}
            className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-stretch"
          >
            {/* Feature Badge Image */}
            <div className="md:col-span-6 border border-[#8A8A87]/30 rounded-[12px] overflow-hidden relative min-h-[260px] sm:min-h-[300px] shadow-sm group">
              <Image
                src="/images/story-feature-badge.png"
                alt="Culinary Excellence Belgino"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Opening Hours Card with 3D Tilt */}
            <div
              ref={hoursCardRef}
              onMouseMove={(e) => handleCardTilt(e, hoursCardRef.current)}
              onMouseLeave={() => handleCardReset(hoursCardRef.current)}
              className="md:col-span-6 bg-[#202310] border border-[#8A8A87]/30 rounded-[12px] p-6 sm:p-8 flex flex-col justify-center transition-colors duration-300 hover:border-[#E8FC81]/50 shadow-md will-change-transform cursor-default"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[20px] sm:text-[23px] font-semibold text-[#FEF9F5] uppercase tracking-wide">
                  Opening Hours
                </h3>
                <span
                  className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    isOpenNow
                      ? "bg-[#E8FC81] text-[#17191C]"
                      : "bg-[#8A8A87]/30 text-white/80"
                  }`}
                >
                  {isOpenNow && (
                    <span className="relative flex h-2 w-2 mr-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#17191C] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#17191C]"></span>
                    </span>
                  )}
                  {isOpenNow ? "Open Now" : "Closed Now"}
                </span>
              </div>

              {/* Dotted Schedule List with Dynamic Reveal */}
              <div className="flex flex-col gap-2">
                {hoursSchedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-[13px] sm:text-[14px] text-[#FEF9F5]"
                  >
                    <span className="shrink-0 font-medium tracking-wide">
                      {item.day}
                    </span>
                    <span
                      ref={(el) => {
                        if (el) dottedLinesRef.current[idx] = el;
                      }}
                      className="mx-2 grow border-b border-dotted border-[#8A8A87]/50 will-change-transform"
                    />
                    <span className="shrink-0 text-[#FEF9F5]/90 font-mono tracking-tight">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
