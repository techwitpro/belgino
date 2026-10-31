"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MenuCategory = "breakfast" | "lunch" | "dinner";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  highlighted?: boolean;
}

const MENU_DATA: Record<
  MenuCategory,
  {
    title: string;
    hours: string;
    items: MenuItem[];
  }
> = {
  breakfast: {
    title: "Breakfast",
    hours: "7:00 AM - 11:00 AM",
    items: [
      {
        id: "b-1",
        name: "Sunrise Pancake Delight",
        description: "Warm pancakes layered with butter and honey",
        price: "$7.50",
        image: "/images/menu-dish-1-sunrise-pancake.png",
      },
      {
        id: "b-2",
        name: "Chocolate Berry Stack",
        description: "Fluffy pancakes finished with chocolate sauce",
        price: "$9.50",
        image: "/images/menu-dish-2-chocolate-berry.png",
      },
      {
        id: "b-3",
        name: "Vanilla Cloud Pancakes",
        description: "Delicate vanilla-flavored pancakes with cream",
        price: "$8.50",
        image: "/images/menu-dish-3-vanilla-cloud.png",
      },
      {
        id: "b-4",
        name: "Maple Butter Pancakes",
        description: "Traditional pancakes served with rich maple syrup",
        price: "$6.80",
        image: "/images/menu-dish-4-breakfast.png",
      },
      {
        id: "b-5",
        name: "Berry Garden Pancakes",
        description: "Soft pancakes topped with fresh berries and syrup",
        price: "$9.00",
        image: "/images/menu-dish-4-breakfast.png",
        highlighted: true,
      },
      {
        id: "b-6",
        name: "Honey Drizzle Stack",
        description: "Warm pancakes layered with butter and honey",
        price: "$7.50",
        image: "/images/menu-dish-1-sunrise-pancake.png",
      },
      {
        id: "b-7",
        name: "Golden Morning Pancakes",
        description: "Light & fluffy pancakes drizzled with pure syrup",
        price: "$5.00",
        image: "/images/menu-dish-5-breakfast.png",
      },
    ],
  },
  lunch: {
    title: "Lunch Favorites",
    hours: "11:30 AM - 4:00 PM",
    items: [
      {
        id: "l-1",
        name: "Grilled Chicken Skewers",
        description: "Marinated chicken skewers with herbs, peppers, and garlic yogurt",
        price: "$16.50",
        image: "/images/hero-dish-1-skewers.png",
      },
      {
        id: "l-2",
        name: "Prime Seared Steak & Greens",
        description: "Juicy cut steak served with roasted seasonal vegetables and jus",
        price: "$24.00",
        image: "/images/hero-dish-3-steak.png",
        highlighted: true,
      },
      {
        id: "l-3",
        name: "Spiced Chicken & Herb Rice",
        description: "Savory spiced chicken over fragrant orange basmati rice and cucumbers",
        price: "$15.50",
        image: "/images/hero-dish-7-chickenrice.png",
      },
      {
        id: "l-4",
        name: "Wok-Tossed Market Noodles",
        description: "Steaming wok egg noodles with fresh crisp greens and savory soy reduction",
        price: "$14.00",
        image: "/images/hero-dish-8-noodles.png",
      },
      {
        id: "l-5",
        name: "Artisan Chicken Breast & Fries",
        description: "Crispy herb crusted breast with hand-cut rustic fries and dipping sauce",
        price: "$17.00",
        image: "/images/hero-dish-9-grilledchicken.png",
      },
    ],
  },
  dinner: {
    title: "Dinner Specials",
    hours: "5:00 PM - 11:00 PM",
    items: [
      {
        id: "d-1",
        name: "Slow-Smoked Meat Ribs Platter",
        description: "Tender ribs slow-cooked to perfection with house glaze & salad",
        price: "$29.50",
        image: "/images/hero-dish-6-ribs.png",
        highlighted: true,
      },
      {
        id: "d-2",
        name: "Fresh Atlantic Grilled Fish",
        description: "Grilled seasoned fillet on garden greens with lemon butter sauce",
        price: "$26.00",
        image: "/images/hero-dish-5-fish.png",
      },
      {
        id: "d-3",
        name: "Signature Sushi Roll Selection",
        description: "Artisan rolls with fresh salmon, creamy avocado, tobiko, and ginger",
        price: "$22.50",
        image: "/images/hero-dish-4-sushirolls.png",
      },
      {
        id: "d-4",
        name: "Salmon & Avocado Nigiri Plate",
        description: "Handcrafted nigiri sushi with wasabi, pickled ginger, and soy glaze",
        price: "$21.00",
        image: "/images/hero-dish-2-sushi.png",
      },
      {
        id: "d-5",
        name: "Herb Butter Filet Mignon",
        description: "Charcoal seared prime beef filet with peppercorn reduction",
        price: "$34.00",
        image: "/images/hero-dish-3-steak.png",
      },
    ],
  },
};

interface MenuSectionProps {
  onOpenReservation?: () => void;
}

export default function MenuSection({ onOpenReservation }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("breakfast");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRowRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Clean, single trigger for header and content
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

      if (contentRowRef.current) {
        gsap.fromTo(
          contentRowRef.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRowRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth kinetic category transition on user click
  const handleCategoryChange = (category: MenuCategory) => {
    if (category === activeCategory) return;
    setActiveCategory(category);

    requestAnimationFrame(() => {
      if (itemsContainerRef.current) {
        const rows = itemsContainerRef.current.children;
        gsap.fromTo(
          rows,
          { opacity: 0, x: 15, filter: "blur(3px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.35,
            stagger: 0.035,
            ease: "power3.out",
          }
        );
      }
    });
  };

  const currentCategoryData = MENU_DATA[activeCategory];

  return (
    <section id="menu" ref={sectionRef} className="py-20 sm:py-28 bg-[#F6FAE1]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1240px]">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <span className="text-[#291F1A] text-sm font-medium tracking-[0.15em] uppercase block mb-2">
              // OUR MENU //
            </span>
            <h2 className="text-[38px] sm:text-[50px] md:text-[60px] leading-[1.05] font-semibold tracking-[-0.02em] text-[#291F1A] uppercase">
              Something delicious for
              <br />
              every part of your day.
            </h2>
          </div>

          {/* Button "EXPLORE OUR ALL MENU" */}
          <div className="shrink-0">
            <button
              onClick={() => {
                const drinks = document.getElementById("drinks");
                drinks?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-hover-trigger group inline-flex items-center gap-2.5 bg-[#291F1A] hover:bg-[#3D2E27] text-white px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer transform hover:scale-[1.02]"
            >
              <div className="btn-slide-container h-[18px] overflow-hidden text-[12px] uppercase font-semibold tracking-wider">
                <div className="btn-slide-text transition-transform duration-300 group-hover:-translate-y-[18px]">
                  <span className="h-[18px] flex items-center">EXPLORE OUR ALL MENU</span>
                  <span className="h-[18px] flex items-center text-[#E8FC81]">EXPLORE OUR ALL MENU</span>
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

        {/* 2-Column Menu Layout (Figma Exact) */}
        <div
          ref={contentRowRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-11 items-start"
        >
          {/* Left Column: Category Selection Card with Background Image */}
          <div className="lg:col-span-6 xl:col-span-7 relative rounded-[16px] overflow-hidden min-h-[520px] lg:min-h-[677px] flex flex-col justify-center px-6 sm:px-12 py-16 shadow-xl">
            {/* Background Image */}
            <Image
              src="/images/menu-banner-bg.png"
              alt="Belgino Dining Atmosphere"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Dark/Warm Tint Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-brightness-90" />

            {/* Category Options Stack */}
            <div className="relative z-10 flex flex-col gap-4 sm:gap-5 w-full">
              {/* Breakfast Tab */}
              <button
                onClick={() => handleCategoryChange("breakfast")}
                className={`w-full text-left p-6 sm:p-7 rounded-[14px] transition-[background-color,color,box-shadow,transform] duration-250 cursor-pointer ${
                  activeCategory === "breakfast"
                    ? "bg-[#DEE3C5] text-[#291F1A] shadow-lg scale-[1.02]"
                    : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs hover:translate-x-1"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[28px] sm:text-[38px] xl:text-[45px] font-semibold uppercase leading-tight tracking-tight">
                    BREAKFAST ITEMS
                  </h3>
                  {activeCategory === "breakfast" && (
                    <span className="w-3 h-3 rounded-full bg-[#291F1A] shrink-0 ml-2 animate-pulse" />
                  )}
                </div>
              </button>

              {/* Lunch Tab */}
              <button
                onClick={() => handleCategoryChange("lunch")}
                className={`w-full text-left p-6 sm:p-7 rounded-[14px] transition-[background-color,color,box-shadow,transform] duration-250 cursor-pointer ${
                  activeCategory === "lunch"
                    ? "bg-[#DEE3C5] text-[#291F1A] shadow-lg scale-[1.02]"
                    : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs hover:translate-x-1"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[28px] sm:text-[38px] xl:text-[45px] font-semibold uppercase leading-tight tracking-tight">
                    LUNCH ITEMS
                  </h3>
                  {activeCategory === "lunch" && (
                    <span className="w-3 h-3 rounded-full bg-[#291F1A] shrink-0 ml-2 animate-pulse" />
                  )}
                </div>
              </button>

              {/* Dinner Tab */}
              <button
                onClick={() => handleCategoryChange("dinner")}
                className={`w-full text-left p-6 sm:p-7 rounded-[14px] transition-[background-color,color,box-shadow,transform] duration-250 cursor-pointer ${
                  activeCategory === "dinner"
                    ? "bg-[#DEE3C5] text-[#291F1A] shadow-lg scale-[1.02]"
                    : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs hover:translate-x-1"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[28px] sm:text-[38px] xl:text-[45px] font-semibold uppercase leading-tight tracking-tight">
                    DINNER ITEMS
                  </h3>
                  {activeCategory === "dinner" && (
                    <span className="w-3 h-3 rounded-full bg-[#291F1A] shrink-0 ml-2 animate-pulse" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Menu Items List */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-4">
            {/* Header: Subtitle & Hours Badge */}
            <div className="flex items-center justify-between pb-2 border-b border-[#291F1A]/10">
              <h4 className="text-[22px] sm:text-[24px] font-semibold text-[#17191C] uppercase tracking-wide">
                {currentCategoryData.title}
              </h4>
              <div className="flex items-center gap-1.5 text-[#8A8A87] text-[13px] font-medium uppercase tracking-wider">
                <Image
                  src="/images/menu-clock-icon.png"
                  alt="Time"
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain opacity-75"
                />
                <span>{currentCategoryData.hours}</span>
              </div>
            </div>

            {/* Item Rows Container */}
            <div ref={itemsContainerRef} className="flex flex-col gap-2.5">
              {currentCategoryData.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`menu-item-row group flex items-center justify-between p-2.5 sm:p-3 rounded-[10px] transition-[background-color,border-color,box-shadow] duration-200 cursor-pointer border ${
                    item.highlighted
                      ? "bg-[#DEE3C5] border-[#DEE3C5] shadow-xs hover:shadow-sm"
                      : "bg-transparent hover:bg-white/80 border-transparent hover:border-[#0F2419]/5 hover:shadow-xs"
                  }`}
                >
                  {/* Left: Thumbnail & Name/Desc */}
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
                    <div className="w-[58px] h-[58px] sm:w-[60px] sm:h-[60px] rounded-[6px] overflow-hidden shrink-0 relative bg-black/5 shadow-xs">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="60px"
                        className="object-cover group-hover:scale-108 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-[16px] sm:text-[18px] font-medium text-[#17191C] tracking-tight leading-tight truncate group-hover:text-black">
                        {item.name}
                      </h5>
                      <p className="text-[12px] sm:text-[13px] text-[#8A8A87] line-clamp-1 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price & Interactive Arrow */}
                  <div className="shrink-0 flex items-center gap-2 pl-2">
                    <span className="text-[17px] sm:text-[18px] font-semibold text-[#291F1A]">
                      {item.price}
                    </span>
                    <svg
                      className="w-4 h-4 text-[#291F1A]/35 group-hover:text-[#291F1A] group-hover:translate-x-1 transition-all duration-200 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Item Quick View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#F6FAE1] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#291F1A]/10 animate-in zoom-in-95 duration-200">
            <div className="relative h-56 w-full">
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="text-2xl font-semibold uppercase text-[#17191C]">
                  {selectedItem.name}
                </h4>
                <span className="text-2xl font-semibold text-[#291F1A]">
                  {selectedItem.price}
                </span>
              </div>
              <p className="text-[#8A8A87] text-base mb-6">
                {selectedItem.description}. Prepared fresh to order by our culinary team with prime ingredients.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    if (onOpenReservation) onOpenReservation();
                  }}
                  className="w-full bg-[#0F2419] hover:bg-[#1A382A] text-white py-3 rounded-full text-sm uppercase font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  Reserve Table to Taste
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
