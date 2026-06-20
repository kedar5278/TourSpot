"use client";

import Link from "next/link";
import React, { useState } from "react";
import { allPackages, type Package } from "@/data/packages";
import {
  FiMapPin,
  FiCalendar,
  FiStar,
  FiUsers,
  FiHeart,
  FiArrowRight,
  FiCheckCircle,
  FiFilter,
} from "react-icons/fi";

const categories = [
  "All",
  "Mountain",
  "Beach",
  "Heritage",
  "Adventure",
  "Pilgrimage",
];

// ─── Component ────────────────────────────────────────────────────────────────────

export default function PackagesPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? allPackages
      : allPackages.filter((p) => p.category === active);

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* ── Hero Banner ── */}
      <section className="relative h-48 sm:h-64 md:h-96">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80"
          alt="Travel packages hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 md:bottom-12 md:left-12">
          <p
            className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Explore Our Packages
          </p>
          <h1
            className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Travel Packages
          </h1>
        </div>
        <Link
          href="/"
          className="absolute top-3 sm:top-4 right-4 sm:right-8 md:right-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <button className="border border-white text-white px-4 py-1.5 rounded text-sm font-semibold hover:text-orange-500 hover:border-orange-500 transition-colors">
            Back to Home
          </button>
        </Link>
      </section>

      {/* ── Intro Strip ── */}
      <section className="bg-orange-50 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p
            className="text-gray-500 text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Handpicked Destinations
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find Your Perfect{" "}
            <span className="text-orange-500">Getaway</span>
          </h2>
          <p
            className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Browse our curated collection of travel packages designed for every
            kind of traveller — from serene beaches to majestic mountains and
            sacred pilgrimages.
          </p>
        </div>
      </section>

      {/* ── Category Filter Tabs ── */}
      <section className="py-5 sm:py-8 px-4 sm:px-6 border-b border-gray-100 sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
          <FiFilter className="text-gray-400 text-sm flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                active === cat
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {cat}
            </button>
          ))}
          <span
            className="ml-auto text-gray-400 text-xs flex-shrink-0"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {filtered.length} package{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ── Packages Grid ── */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filtered.map((pkg) => (
            <div
              key={pkg.name}
              className="card-hover group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="img-zoom w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Discount Badge */}
                {pkg.discount && (
                  <span
                    className="absolute top-3 left-3 bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {pkg.discount}
                  </span>
                )}

                {/* Featured Badge */}
                {pkg.featured && (
                  <span
                    className="absolute top-3 right-3 bg-white/90 text-orange-600 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <FiStar className="text-orange-500 text-xs fill-orange-500" />
                    Popular
                  </span>
                )}

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
              <div className="p-5 flex flex-col flex-1">
                {/* Meta row */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span
                    className="flex items-center gap-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <FiCalendar className="text-orange-400" />
                    {pkg.duration}
                  </span>
                  <span
                    className="flex items-center gap-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <FiUsers className="text-orange-400" />
                    {pkg.groupSize} guests
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-xs ${
                          i < Math.round(pkg.rating)
                            ? "text-orange-400 fill-orange-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
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
                    ({pkg.reviews} reviews)
                  </span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pkg.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 text-[11px] px-2 py-0.5 rounded-full border border-orange-100"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <FiCheckCircle className="text-orange-400 text-[10px]" />
                      {h}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p
                      className="text-xs text-gray-400"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Starting from
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xl font-bold text-gray-800"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span
                          className="text-sm text-orange-500 line-through"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {pkg.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="book-now-btn inline-flex items-center gap-1.5 font-semibold text-xs border border-orange-400 text-orange-500 px-4 py-2 rounded-full"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <span className="book-now-text">View Details</span>
                    <FiArrowRight className="book-now-arrow text-sm" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="bg-orange-50 py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-center text-orange-500 text-sm font-semibold tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Every Package Includes
          </p>
          <h2
            className="text-center text-3xl font-bold text-gray-800 mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What You <span className="text-orange-500">Get</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: "🏨",
                title: "Hotel Stay",
                text: "Comfortable, hand-picked accommodations for a relaxing stay.",
              },
              {
                icon: "🚗",
                title: "Transfers",
                text: "Hassle-free airport and local transfers included in every package.",
              },
              {
                icon: "🎯",
                title: "Sightseeing",
                text: "Guided tours to all the major attractions and hidden gems.",
              },
              {
                icon: "📞",
                title: "24/7 Support",
                text: "Round-the-clock assistance from our dedicated travel team.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="feature-card flex flex-col items-center text-center gap-3 bg-white"
              >
                <div className="feature-icon text-3xl">{item.icon}</div>
                <h3
                  className="font-bold text-gray-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=80"
          alt="CTA background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-white text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Can't Decide? Let Us Help!
          </h2>
          <p
            className="text-white/80 text-sm mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Share your travel preferences and our experts will craft the
            perfect itinerary tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button
                className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3 rounded-full text-sm tracking-wide shadow-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Talk to an Expert
              </button>
            </Link>
            <Link href="/services">
              <button
                className="btn-pro border border-white text-white font-semibold px-10 py-3 rounded-full text-sm tracking-wide hover:bg-white/10"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Explore Services
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
