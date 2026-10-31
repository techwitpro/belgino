"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface DrinkItem {
  id: string;
  name: string;
  price: string;
  image?: string;
  description?: string;
}

export default function DrinksSection() {
  const [activeDrink, setActiveDrink] = useState<DrinkItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const drinksGridRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bannerContainerRef = useRef<HTMLDivElement>(null);
  const bannerImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Reveal
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

      // 2. Growing Central Vertical Divider Line
      if (dividerRef.current && drinksGridRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: drinksGridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 3. Staggered Drinks Items Entrance
      if (drinksGridRef.current) {
        const items = drinksGridRef.current.querySelectorAll(".drink-item");
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: drinksGridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 4. Showstopper Cinematic Curtain Expand on Panoramic Dining Banner
      if (bannerContainerRef.current) {
        gsap.fromTo(
          bannerContainerRef.current,
          { clipPath: "inset(4% 3% 4% 3% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: bannerContainerRef.current,
              start: "top 95%",
              end: "center 55%",
              scrub: 0.6,
            },
          }
        );
      }

      // 5. Parallax Depth on Banner Image
      if (bannerImageRef.current && bannerContainerRef.current) {
        gsap.fromTo(
          bannerImageRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: bannerContainerRef.current,
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

  const leftColumnDrinks: DrinkItem[] = [
    {
      id: "dr-1",
      name: "Sunset Citrus Cooler",
      price: "$8.50",
      description: "Blood orange, yuzu, sparkling tonic, and fresh rosemary sprig",
    },
    {
      id: "dr-2",
      name: "Golden Mango Splash",
      price: "$8.50",
      description: "Ripe Alphonso mango purée, fresh lime juice, crushed ice & mint",
    },
    {
      id: "dr-3",
      name: "Fresh Garden Lemonade",
      price: "$9.50",
      image: "/images/special-dish-1.png",
      description: "Cold-pressed Meyer lemon, cucumber ribbons, botanical lavender syrup",
    },
    {
      id: "dr-4",
      name: "Minty Lime Refresher",
      price: "$7.50",
      image: "/images/special-dish-2.png",
      description: "Muddled Persian limes, wild spearmint, cane syrup and soda",
    },
  ];

  const rightColumnDrinks: DrinkItem[] = [
    {
      id: "dr-5",
      name: "Iced Latte & Sparkling Water",
      price: "$24.00",
      image: "/images/special-dish-3.png",
      description: "Single-origin espresso, velvet oat milk, served with sparkling mineral water",
    },
    {
      id: "dr-6",
      name: "Fresh Green Mojito",
      price: "$14.00",
      image: "/images/special-dish-4.png",
      description: "Crisp garden mint, Caribbean rum, freshly pressed lime juice & club soda",
    },
    {
      id: "dr-7",
      name: "Chocolate Berry Shake",
      price: "$28.00",
      image: "/images/special-dish-5.png",
      description: "Valrhona dark chocolate, wild blackberry compote, organic milk cream",
    },
    {
      id: "dr-8",
      name: "Tropical Sunset Punch",
      price: "$22.00",
      image: "/images/special-dish-6.png",
      description: "Passion fruit nectar, pineapple infusion, grenadine, and aromatic bitters",
    },
  ];

  return (
    <section id="drinks" ref={sectionRef} className="py-20 sm:py-28 bg-[#F6FAE1]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1240px]">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <span className="text-[#17191C] text-sm font-medium tracking-[0.15em] uppercase block mb-2">
              // OUR DRINKS //
            </span>
            <h2 className="text-[38px] sm:text-[50px] md:text-[60px] leading-[1.05] font-semibold tracking-[-0.02em] text-[#17191C] uppercase">
              A LITTLE SOMETHING
              <br />
              TO TOAST WITH
            </h2>
          </div>

          {/* Button "EXPLORE OUR MENU" */}
          <div className="shrink-0">
            <button
              onClick={() => {
                const menu = document.getElementById("menu");
                menu?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-hover-trigger group inline-flex items-center gap-2.5 bg-[#17191C] hover:bg-[#25282D] text-white px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer transform hover:scale-[1.02]"
            >
              <div className="btn-slide-container h-[18px] overflow-hidden text-[12px] uppercase font-semibold tracking-wider">
                <div className="btn-slide-text transition-transform duration-300 group-hover:-translate-y-[18px]">
                  <span className="h-[18px] flex items-center">EXPLORE OUR MENU</span>
                  <span className="h-[18px] flex items-center text-[#E8FC81]">EXPLORE OUR MENU</span>
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
                      className="w-[13px] h-[11px] brightness-200"
                    />
                  </div>
                  <div className="w-[19px] h-[16px] flex items-center justify-center">
                    <Image
                      src="/images/arrow-icon.svg"
                      alt=""
                      width={16}
                      height={14}
                      className="w-[13px] h-[11px] brightness-200"
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 2-Column Drinks Grid with Center Divider (Figma Exact) */}
        <div
          ref={drinksGridRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mb-16 sm:mb-24"
        >
          {/* Animated Vertical Divider for Medium+ screens */}
          <div
            ref={dividerRef}
            className="hidden md:block absolute top-4 bottom-4 left-1/2 w-[1px] bg-[#17191C]/25 -translate-x-1/2 origin-top will-change-transform"
          />

          {/* Left Column */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {leftColumnDrinks.map((drink) => (
              <div
                key={drink.id}
                onClick={() => setActiveDrink(drink)}
                className="drink-item group flex items-center justify-between gap-4 pb-4 border-b border-[#17191C]/15 hover:border-[#17191C]/45 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {drink.image ? (
                    <div className="w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] rounded-[6px] overflow-hidden shrink-0 relative bg-black/5 shadow-xs">
                      <Image
                        src={drink.image}
                        alt={drink.name}
                        fill
                        sizes="58px"
                        className="object-cover group-hover:scale-108 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#17191C]/40 group-hover:bg-[#17191C] group-hover:scale-125 transition-transform duration-200 shrink-0 ml-1" />
                  )}
                  <div>
                    <h4 className="text-[17px] sm:text-[19px] font-medium text-[#17191C] tracking-tight group-hover:text-black transition-colors">
                      {drink.name}
                    </h4>
                    {drink.description && (
                      <p className="text-[12px] text-[#8A8A87] line-clamp-1 mt-0.5">
                        {drink.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-[18px] sm:text-[20px] font-semibold text-[#17191C]">
                    {drink.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {rightColumnDrinks.map((drink) => (
              <div
                key={drink.id}
                onClick={() => setActiveDrink(drink)}
                className="drink-item group flex items-center justify-between gap-4 pb-4 border-b border-[#17191C]/15 hover:border-[#17191C]/45 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {drink.image ? (
                    <div className="w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] rounded-[6px] overflow-hidden shrink-0 relative bg-black/5 shadow-xs">
                      <Image
                        src={drink.image}
                        alt={drink.name}
                        fill
                        sizes="58px"
                        className="object-cover group-hover:scale-108 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#17191C]/40 group-hover:bg-[#17191C] group-hover:scale-125 transition-transform duration-200 shrink-0 ml-1" />
                  )}
                  <div>
                    <h4 className="text-[17px] sm:text-[19px] font-medium text-[#17191C] tracking-tight group-hover:text-black transition-colors">
                      {drink.name}
                    </h4>
                    {drink.description && (
                      <p className="text-[12px] text-[#8A8A87] line-clamp-1 mt-0.5">
                        {drink.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-[18px] sm:text-[20px] font-semibold text-[#17191C]">
                    {drink.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signature Full-Width Panoramic Dining Image Banner with Cinematic Parallax */}
      <div
        ref={bannerContainerRef}
        className="w-full relative h-[420px] sm:h-[560px] md:h-[680px] lg:h-[774px] overflow-hidden shadow-inner"
      >
        <div ref={bannerImageRef} className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)]">
          <Image
            src="/images/special-signature-dish.png"
            alt="Belgino signature banquet & dining experience"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Drink Detail Modal */}
      {activeDrink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#F6FAE1] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#17191C]/10 animate-in zoom-in-95 duration-200">
            {activeDrink.image && (
              <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 shadow-sm">
                <Image
                  src={activeDrink.image}
                  alt={activeDrink.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xl font-semibold uppercase text-[#17191C]">
                {activeDrink.name}
              </h4>
              <span className="text-xl font-bold text-[#291F1A]">
                {activeDrink.price}
              </span>
            </div>
            <p className="text-[#8A8A87] text-sm mb-6">
              {activeDrink.description}
            </p>
            <button
              onClick={() => setActiveDrink(null)}
              className="w-full bg-[#17191C] hover:bg-[#25282D] text-white py-2.5 rounded-full text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
