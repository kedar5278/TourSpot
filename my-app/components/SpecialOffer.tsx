"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Package {
  id: string;
  slug: string;
  name: string;
  location: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
}

export default function SpecialOffers() {
  const [offers, setOffers] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpecialOffers();
  }, []);

  const fetchSpecialOffers = async () => {
    try {
      const res = await fetch("/api/packages?isSpecialOffer=true");
      const data = await res.json();
      setOffers((data.packages || []).slice(0, 4));
    } catch (error) {
      console.error("Failed to fetch special offers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-gray-50">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Special Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-gray-50">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Special Offers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {offers.map((offer) => (
          <Link
            key={offer.slug}
            href={`/packages/${offer.slug}`}
            className="card-hover rounded-2xl overflow-hidden shadow-md cursor-pointer group relative block"
          >
            {/* Image section */}
            <div className="relative h-48 sm:h-44 md:h-52 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.name}
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {offer.discount && (
                <div
                  className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded text-center leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {offer.discount}
                </div>
              )}
              <h3
                className="absolute bottom-3 left-3 text-white font-bold text-base drop-shadow-md"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {offer.name}
              </h3>
            </div>

            {/* White info panel */}
            <div className="p-3 bg-white">
              <p className="text-sm sm:text-base text-gray-500 flex items-center gap-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z" />
                </svg>
                {offer.location}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base sm:text-lg font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {offer.price}
                </span>
                {offer.originalPrice && (
                  <span className="text-sm sm:text-base text-orange-500 line-through" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {offer.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
