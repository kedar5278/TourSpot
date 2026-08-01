"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { allPackages } from "@/data/packages";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiStar,
  FiCalendar,
} from "react-icons/fi";

interface Package {
  slug: string;
  name: string;
  location: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  duration: string;
  rating: number;
  reviews: number;
  category: string;
  highlights: string[];
  featured?: boolean;
}

export default function PackageCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const packages = allPackages as Package[];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-orange-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p
              className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore India
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              All Travel{" "}
              <span className="text-orange-500">Packages</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {packages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="flex-shrink-0 w-[300px] sm:w-[320px] snap-start"
            >
              <div className="card-hover group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="img-zoom w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {pkg.discount && (
                      <span
                        className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {pkg.discount}
                      </span>
                    )}
                    {pkg.featured && (
                      <span
                        className="bg-white/90 text-orange-600 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        <FiStar className="text-orange-500 text-xs fill-orange-500" />
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <span
                    className="absolute top-3 right-3 bg-black/50 text-white text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {pkg.category}
                  </span>

                  {/* Title on image */}
                  <div className="absolute bottom-3 left-3">
                    <h3
                      className="text-white text-xl font-bold drop-shadow-md"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {pkg.name}
                    </h3>
                    <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                      <FiMapPin className="text-xs" />
                      {pkg.location}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Rating & Duration */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-orange-400 text-xs fill-orange-400" />
                      <span
                        className="text-xs font-semibold text-gray-700"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {pkg.rating}
                      </span>
                      <span
                        className="text-xs text-gray-400"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ({pkg.reviews})
                      </span>
                    </div>
                    <span
                      className="text-xs text-gray-500 flex items-center gap-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <FiCalendar className="text-orange-400" />
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {pkg.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full border border-orange-100"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p
                        className="text-[10px] text-gray-400"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Starting from
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-lg font-bold text-gray-800"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {pkg.price}
                        </span>
                        {pkg.originalPrice && (
                          <span
                            className="text-xs text-orange-500 line-through"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {pkg.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 font-semibold text-xs border border-orange-400 text-orange-500 px-4 py-2 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      View
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link href="/packages">
            <button
              className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full text-sm tracking-wide shadow-lg hover:shadow-xl transition-all"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              View All Packages →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
