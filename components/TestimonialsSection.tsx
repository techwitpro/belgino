"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  featured?: boolean;
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

      // 2. Carousel Container Entry
      if (carouselContainerRef.current) {
        gsap.fromTo(
          carouselContainerRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselContainerRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Card Tilt Micro-interactions on Testimonial Cards
  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = (x / rect.width - 0.5) * 12;
    const relY = (y / rect.height - 0.5) * -12;

    gsap.to(card, {
      rotateX: relY,
      rotateY: relX,
      y: -6,
      transformPerspective: 800,
      duration: 0.25,
      ease: "power1.out",
    });
  };

  const handleCardReset = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.55,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const testimonials: Testimonial[] = [
    {
      id: "t-1",
      quote:
        "“The restaurant is very clean, food is amazing and servers very attentive. You will not regret eating here.”",
      author: "Ralph Edwards",
      role: "Verified Guest",
      avatar: "/images/hero-avatar-1.png",
      featured: true,
    },
    {
      id: "t-2",
      quote:
        "“I had some of the best culinary specialties around… Tandoori Chicken, Rogan Josh and artisanal appetizers — everything was incredible.”",
      author: "Kathryn Murphy",
      role: "Food Enthusiast",
      avatar: "/images/testimonial-avatar.png",
    },
    {
      id: "t-3",
      quote:
        "“The ambience is unmatched and the hospitality makes you feel right at home. The sunset drinks and grilled steak are now our weekend ritual.”",
      author: "Esther Howard",
      role: "Local Diner",
      avatar: "/images/hero-avatar-2.png",
    },
    {
      id: "t-4",
      quote:
        "“Outstanding flavor balance and thoughtful presentation. You can feel the craft and genuine passion in every bite from the kitchen.”",
      author: "Olivia Chen",
      role: "Culinary Blogger",
      avatar: "/images/hero-avatar-3.png",
      featured: true,
    },
    {
      id: "t-5",
      quote:
        "“The chocolate berry stack and morning pancakes are the best breakfast in town. Courteous staff and quick service every single visit.”",
      author: "James Wilson",
      role: "Regular Customer",
      avatar: "/images/hero-avatar-4.png",
    },
    {
      id: "t-6",
      quote:
        "“Flawless private dinner experience. From the booking confirmation to the dessert courses, Belgino exceeded all our expectations.”",
      author: "Sarah Jenkins",
      role: "Private Event Host",
      avatar: "/images/hero-avatar-1.png",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 310;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#F6FAE1] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1240px]">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="text-center md:text-left">
            <span className="text-[#17191C] text-sm font-medium tracking-[0.15em] uppercase block mb-2">
              // OUR TESTIMONIALS //
            </span>
            <h2 className="text-[38px] sm:text-[50px] md:text-[60px] leading-[1.05] font-semibold tracking-[-0.02em] text-[#291F1A] uppercase">
              Good meals
              <br />
              stay with you.
            </h2>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="w-11 h-11 rounded-full bg-white border border-[#17191C]/15 hover:bg-[#17191C] hover:text-white text-[#17191C] flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Previous testimonials"
            >
              <svg className="w-5 h-5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-11 h-11 rounded-full bg-white border border-[#17191C]/15 hover:bg-[#17191C] hover:text-white text-[#17191C] flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Next testimonials"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials Horizontal Carousel */}
        <div ref={carouselContainerRef} className="w-full">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardReset}
                className={`shrink-0 w-[275px] sm:w-[283px] min-h-[390px] sm:min-h-[411px] rounded-[12px] p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl snap-start border transition-colors duration-200 will-change-transform cursor-default ${
                  item.featured
                    ? "bg-[#DEE3C5] border-[#DEE3C5]"
                    : "bg-white border-[#17191C]/10"
                }`}
              >
                {/* Quote Mark & Content */}
                <div>
                  <div className="text-[44px] font-serif leading-none text-[#291F1A]/30 mb-3 select-none">
                    “
                  </div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.55] text-[#17191C] font-normal">
                    {item.quote}
                  </p>
                </div>

                {/* Bottom Section: Stars & Author Info */}
                <div className="pt-6 border-t border-black/5 mt-4">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-0.5 mb-3">
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

                  {/* Author Avatar & Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative border border-[#17191C]/20 shrink-0 bg-black/5 shadow-xs">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        sizes="38px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="text-[15px] sm:text-[16px] font-semibold text-[#17191C] tracking-tight leading-tight">
                        {item.author}
                      </h5>
                      <span className="text-[11px] text-[#8A8A87] uppercase tracking-wider block">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
