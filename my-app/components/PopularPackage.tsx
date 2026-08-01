"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Package {
  slug: string;
  name: string;
  location: string;
  image: string;
  price: string;
  originalPrice?: string;
  featured?: boolean;
}

export default function PopularPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/admin/packages?featured=true")
      .then((res) => res.json())
      .then((data) => {
        const pkgs = (data.packages || []).slice(0, 6);
        setPackages(pkgs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused || packages.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % packages.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, packages.length]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isPaused && packages.length > 0) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % packages.length);
        }, 5000);
      }
    },
    [isPaused, packages.length]
  );

  const goPrev = () => {
    const newIndex = currentIndex === 0 ? packages.length - 1 : currentIndex - 1;
    goTo(newIndex);
  };

  const goNext = () => {
    const newIndex = (currentIndex + 1) % packages.length;
    goTo(newIndex);
  };

  if (loading) {
    return (
      <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Popular Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-md bg-gray-100 animate-pulse">
              <div className="h-48 sm:h-44 md:h-52 bg-gray-200" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (packages.length === 0) return null;

  return (
    <section
      className="py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
          Popular Packages
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={goPrev} className="w-9 h-9 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all">‹</button>
          <button onClick={goNext} className="w-9 h-9 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all">›</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {packages.map((pkg, i) => {
          const position = (i - currentIndex + packages.length) % packages.length;
          if (position >= 4) return null;
          return (
            <Link key={pkg.slug} href={`/packages/${pkg.slug}`} className="card-hover rounded-2xl overflow-hidden shadow-md cursor-pointer group block" style={{ opacity: 1 - position * 0.1, transition: "opacity 0.8s ease" }}>
              <div className="relative h-48 sm:h-44 md:h-52 overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="img-zoom w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <h3 className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>{pkg.name}</h3>
              </div>
              <div className="p-3 bg-white">
                <p className="text-sm text-gray-500 flex items-center gap-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z" /></svg>
                  {pkg.location}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base sm:text-lg font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>{pkg.price}</span>
                  {pkg.originalPrice && <span className="text-sm text-orange-500 line-through" style={{ fontFamily: "'Playfair Display', serif" }}>{pkg.originalPrice}</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {packages.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-orange-500 w-6" : "bg-gray-300 w-2 hover:bg-orange-300"}`} />
        ))}
      </div>
    </section>
  );
}
