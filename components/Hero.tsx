"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroProps {
  onOpenReservation?: () => void;
}

export default function Hero({ onOpenReservation }: HeroProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const headlineWordsRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const badgeLeftParallaxRef = useRef<HTMLDivElement>(null);
  const badgeRightParallaxRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const phoneBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Unified Crisp Kinetic Entrance Timeline (starts promptly, zero sluggish delay)
      const tl = gsap.timeline();

      const validWords = headlineWordsRef.current.filter(Boolean);
      if (validWords.length > 0) {
        tl.fromTo(
          validWords,
          { yPercent: 100, rotateX: 35, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.05,
            ease: "power3.out",
          }
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 0.75, duration: 0.45, ease: "power2.out" },
          "-=0.3"
        );
      }

      if (ctaRowRef.current) {
        tl.fromTo(
          ctaRowRef.current,
          { y: 18, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.25"
        );
      }

      if (badgeLeftParallaxRef.current && badgeRightParallaxRef.current) {
        tl.fromTo(
          [badgeLeftParallaxRef.current, badgeRightParallaxRef.current],
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.6)" },
          "-=0.3"
        );
      }

      if (marqueeContainerRef.current) {
        tl.fromTo(
          marqueeContainerRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );
      }

      // 2. Parallax Drifting on Badges
      if (badgeLeftParallaxRef.current) {
        gsap.to(badgeLeftParallaxRef.current, {
          y: -70,
          rotate: -4,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.0,
          },
        });
      }

      if (badgeRightParallaxRef.current) {
        gsap.to(badgeRightParallaxRef.current, {
          y: -90,
          rotate: 5,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // 3. Scroll Velocity Skew Effect on Food Gallery Cards!
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity() / 450;
          const clampedSkew = gsap.utils.clamp(-6, 6, -velocity);
          gsap.to(".hero-food-card", {
            skewX: clampedSkew,
            duration: 0.2,
            overwrite: "auto",
            ease: "power2.out",
          });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Interactive mouse tilt parallax across hero section
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    if (badgeLeftParallaxRef.current) {
      gsap.to(badgeLeftParallaxRef.current, {
        x: relX * 22,
        duration: 0.5,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
    if (badgeRightParallaxRef.current) {
      gsap.to(badgeRightParallaxRef.current, {
        x: relX * -22,
        duration: 0.5,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
  };

  // Magnetic hover effect on Phone CTA
  const handlePhoneMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!phoneBtnRef.current) return;
    const rect = phoneBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(phoneBtnRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handlePhoneMouseLeave = () => {
    if (!phoneBtnRef.current) return;
    gsap.to(phoneBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const handlePhoneClick = () => {
    navigator.clipboard?.writeText("+8801234567890");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const dishes = [
    {
      id: "dish-1",
      name: "Grilled Chicken Skewers",
      image: "/images/hero-dish-1-skewers.png",
      tag: "Chef's Special",
    },
    {
      id: "dish-2",
      name: "Salmon & Avocado Nigiri",
      image: "/images/hero-dish-2-sushi.png",
      tag: "Fresh Cut",
    },
    {
      id: "dish-3",
      name: "Prime Grilled Steak",
      image: "/images/hero-dish-3-steak.png",
      tag: "Best Seller",
    },
    {
      id: "dish-4",
      name: "Signature Sushi Platter",
      image: "/images/hero-dish-4-sushirolls.png",
      tag: "Popular",
    },
    {
      id: "dish-5",
      name: "Herb Butter Grilled Fish",
      image: "/images/hero-dish-5-fish.png",
      tag: "Catch of the Day",
    },
    {
      id: "dish-6",
      name: "Slow-Smoked BBQ Ribs",
      image: "/images/hero-dish-6-ribs.png",
      tag: "Signature",
    },
    {
      id: "dish-7",
      name: "Spiced Chicken & Herb Rice",
      image: "/images/hero-dish-7-chickenrice.png",
      tag: "Traditional",
    },
    {
      id: "dish-8",
      name: "Wok-Tossed Street Noodles",
      image: "/images/hero-dish-8-noodles.png",
      tag: "Hot & Fresh",
    },
    {
      id: "dish-9",
      name: "Crispy Breast & Rustic Fries",
      image: "/images/hero-dish-9-grilledchicken.png",
      tag: "Favorites",
    },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      className="relative pt-32 sm:pt-40 pb-16 overflow-hidden bg-[#F6FAE1] min-h-[793px] flex flex-col justify-between"
    >
      {/* Decorative Floating Badges (Separated Parallax & Float) */}
      <div
        ref={badgeLeftParallaxRef}
        className="hidden xl:block absolute left-[3%] 2xl:left-[7%] top-[24%] z-10 pointer-events-none"
      >
        <div className="animate-float">
          <Image
            src="/images/hero-badge-left.png"
            alt="Artisan Craft"
            width={155}
            height={151}
            priority
            className="w-[135px] 2xl:w-[155px] h-auto drop-shadow-xl"
          />
        </div>
      </div>

      <div
        ref={badgeRightParallaxRef}
        className="hidden xl:block absolute right-[3%] 2xl:right-[7%] top-[34%] z-10 pointer-events-none"
      >
        <div className="animate-float-reverse">
          <Image
            src="/images/hero-badge-right.png"
            alt="Fresh Flavor"
            width={155}
            height={101}
            priority
            className="w-[135px] 2xl:w-[155px] h-auto drop-shadow-xl"
          />
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="container mx-auto px-4 max-w-[1200px] flex flex-col items-center text-center relative z-20">
        {/* Kinetic Word-by-Word 3D Reveal Headline */}
        <h1 className="text-[50px] sm:text-[68px] md:text-[86px] leading-[0.98] font-semibold tracking-[-0.04em] uppercase text-[#291F1A] max-w-[850px] mb-5 select-none perspective-container">
          <span className="block overflow-hidden py-1">
            {["A", "Table", "Worth"].map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) headlineWordsRef.current[i] = el;
                }}
                className="inline-block mr-3 sm:mr-4 will-change-transform"
              >
                {word}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden py-1">
            {["Gathering", "Around"].map((word, i) => (
              <span
                key={i + 3}
                ref={(el) => {
                  if (el) headlineWordsRef.current[i + 3] = el;
                }}
                className="inline-block mr-3 sm:mr-4 will-change-transform text-[#0F2419]"
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[17px] sm:text-[20px] leading-[1.35] text-[#291F1A]/70 max-w-[665px] font-normal mb-8"
        >
          Freshly prepared favorites, thoughtful drinks, and warm
          hospitality—served in a space that feels like your own. Join us for a
          quick lunch, a relaxed dinner, or a reason to celebrate.
        </p>

        {/* Action Row with Magnetic Button */}
        <div
          ref={ctaRowRef}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-12"
        >
          {/* Phone Pill with Magnetic Hover */}
          <div className="bg-white p-[3px] rounded-full shadow-sm hover:shadow-md transition-shadow">
            <button
              ref={phoneBtnRef}
              onMouseMove={handlePhoneMouseMove}
              onMouseLeave={handlePhoneMouseLeave}
              onClick={handlePhoneClick}
              className="bg-[#0F2419] hover:bg-[#183927] transition-colors px-4 sm:px-5 py-2 rounded-full flex items-center gap-2.5 group cursor-pointer active:scale-95"
              title="Click to copy phone number"
            >
              <span className="text-[#FBE8D8] text-[13px] font-semibold tracking-wide">
                {copiedPhone ? "COPIED TO CLIPBOARD!" : "+880-1234-567890"}
              </span>
              <div className="w-[30px] h-[30px] rounded-full bg-[#1A382A] flex items-center justify-center shrink-0 group-hover:scale-115 transition-transform duration-200">
                <Image
                  src="/images/phone-icon.svg"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="w-[14px] h-[14px]"
                />
              </div>
            </button>
          </div>

          {/* Social Proof Review Avatars & 4.9 Stars */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xs px-4 py-1.5 rounded-full border border-[#0F2419]/10 shadow-xs hover:bg-white hover:shadow-sm transition-all duration-200">
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
                  className="w-[34px] h-[34px] rounded-full border-[1.5px] border-[#0F2419] overflow-hidden relative shadow-sm hover:scale-115 hover:z-10 transition-transform duration-200"
                >
                  <Image
                    src={src}
                    alt={`Customer ${i + 1}`}
                    fill
                    sizes="34px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Score & Stars */}
            <div className="flex flex-col items-start pl-1">
              <span className="text-[14px] sm:text-[15px] font-medium text-[#17191C] leading-none mb-1">
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
      </div>

      {/* Infinite Horizontal Food Gallery Showcase with Velocity Skew */}
      <div
        ref={marqueeContainerRef}
        className="w-full relative mt-4 overflow-hidden pt-4 pb-2"
      >
        {/* Soft edge blur masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#F6FAE1] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#F6FAE1] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex gap-4 animate-marquee-left">
          {[...dishes, ...dishes].map((dish, idx) => (
            <div
              key={`${dish.id}-${idx}`}
              className="hero-food-card shrink-0 w-[260px] sm:w-[290px] h-[280px] sm:h-[300px] will-change-transform"
            >
              <div className="w-full h-full relative rounded-2xl overflow-hidden group shadow-md hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 bg-[#17191C]/5 cursor-pointer">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 768px) 260px, 290px"
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="absolute top-3 left-3 bg-[#E8FC81] text-[#17191C] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs group-hover:bg-white transition-colors">
                  {dish.tag}
                </div>

                <div className="absolute bottom-4 left-4 right-4 transform group-hover:translate-y-[-2px] transition-transform">
                  <p className="text-white font-semibold text-lg sm:text-xl uppercase tracking-tight drop-shadow-md">
                    {dish.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
