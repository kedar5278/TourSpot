"use client";

import Link from "next/link";
import React, { useState } from "react";
import Footer from "./footer";
import { allPackages, type Package } from "@/data/packages";
import {
  FiMapPin,
  FiCalendar,
  FiStar,
  FiUsers,
  FiHeart,
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiSun,
  FiShare2,
  FiDownload,
} from "react-icons/fi";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// ─── Component ────────────────────────────────────────────────────────────────────

export default function PackageDetail({ slug }: { slug: string }) {
  const pkg = allPackages.find((p) => p.slug === slug);
  const [activeImg, setActiveImg] = useState(0);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <FiXCircle className="text-orange-500 text-5xl mb-4" />
        <h1
          className="text-3xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Package Not Found
        </h1>
        <p
          className="text-gray-500 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The package you're looking for doesn't exist.
        </p>
        <Link href="/packages">
          <button
            className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full text-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Browse All Packages
          </button>
        </Link>
        <Footer />
      </div>
    );
  }

  const related = allPackages
    .filter((p) => p.category === pkg.category && p.slug !== pkg.slug)
    .slice(0, 3);

  const { isSignedIn } = useAuth();
  const router = useRouter();

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* ── Hero Gallery ── */}
      <section className="relative h-56 sm:h-72 md:h-110">
        <img
          src={pkg.gallery[activeImg]}
          alt={pkg.name}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        {/* Gallery thumbnails */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {pkg.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`w-12 sm:w-16 h-8 sm:h-10 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg
                ? "border-orange-500 scale-110"
                : "border-white/40 opacity-70 hover:opacity-100"
                }`}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Top bar */}
        <div className="absolute top-4 left-4 md:left-8 flex items-center gap-3">
          <Link
            href="/packages"
            className="flex items-center gap-1 text-white text-sm font-semibold hover:text-orange-400 transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <FiArrowLeft className="text-sm" />
            All Packages
          </Link>
        </div>

        <div className="absolute top-4 right-4 md:right-8 flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-orange-500 transition-colors">
            <FiHeart className="text-sm" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-orange-500 transition-colors">
            <FiShare2 className="text-sm" />
          </button>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-14 md:bottom-16 left-4 md:left-8">
          <div className="flex items-center gap-2 mb-2">
            {pkg.discount && (
              <span
                className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {pkg.discount}
              </span>
            )}
            {pkg.featured && (
              <span
                className="bg-white/90 text-orange-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <FiStar className="text-orange-500 text-xs fill-orange-500" />
                Popular
              </span>
            )}
          </div>
          <h1
            className="text-white text-3xl md:text-5xl font-bold drop-shadow-md"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pkg.name}
          </h1>
          <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
            <FiMapPin className="text-xs" />
            {pkg.location}
          </p>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <nav className="bg-orange-50 py-3 px-6 border-b border-orange-100">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-500">
          <Link
            href="/"
            className="hover:text-orange-500 transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/packages"
            className="hover:text-orange-500 transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Packages
          </Link>
          <span>/</span>
          <span className="text-orange-500 font-semibold">{pkg.name}</span>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-3 gap-6 sm:gap-10">
        {/* Left column — Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: <FiCalendar className="text-orange-500" />,
                label: "Duration",
                value: pkg.duration,
              },
              {
                icon: <FiUsers className="text-orange-500" />,
                label: "Group Size",
                value: `${pkg.groupSize} guests`,
              },
              {
                icon: <FiStar className="text-orange-500 fill-orange-500" />,
                label: "Rating",
                value: `${pkg.rating} (${pkg.reviews} reviews)`,
              },
              {
                icon: <FiSun className="text-orange-500" />,
                label: "Best Time",
                value: pkg.bestTime,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-orange-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  {item.icon}
                  <span
                    className="text-xs text-gray-500"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.label}
                  </span>
                </div>
                <p
                  className="text-sm font-semibold text-gray-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* About */}
          <div>
            <h2
              className="text-2xl font-bold text-gray-800 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About This Package
            </h2>
            <p
              className="text-gray-600 leading-relaxed text-sm"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {pkg.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h2
              className="text-2xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Highlights
            </h2>
            <div className="flex flex-wrap gap-2">
              {pkg.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-sm px-4 py-2 rounded-full border border-orange-100"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <FiCheckCircle className="text-orange-400" />
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h2
              className="text-2xl font-bold text-gray-800 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Day-wise Itinerary
            </h2>
            <div className="space-y-4">
              {pkg.itinerary.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-white card-hover"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center">
                    <span
                      className="text-white text-xs font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.day}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-800 mb-1"
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
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-xl border border-green-100 bg-green-50/50 p-6">
              <h3
                className="font-bold text-gray-800 mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <FiCheckCircle className="text-green-500" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {pkg.inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">
              <h3
                className="font-bold text-gray-800 mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <FiXCircle className="text-red-400" />
                What's Not Included
              </h3>
              <ul className="space-y-2">
                {pkg.exclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <FiXCircle className="text-red-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h2
              className="text-2xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {pkg.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveImg(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="card-hover rounded-xl overflow-hidden h-28 sm:h-32 md:h-44"
                >
                  <img
                    src={img}
                    alt={`${pkg.name} ${i + 1}`}
                    className="img-zoom w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — Booking Card (sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-orange-100 bg-white shadow-lg overflow-hidden">
            {/* Card header */}
            <div className="bg-orange-50 p-6">
              <p
                className="text-xs text-gray-500 mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Starting from
              </p>
              <div className="flex items-end gap-3 mb-1">
                <span
                  className="text-3xl font-bold text-gray-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {pkg.price}
                </span>
                {pkg.originalPrice && (
                  <span
                    className="text-lg text-orange-500 line-through mb-0.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {pkg.originalPrice}
                  </span>
                )}
              </div>
              <p
                className="text-xs text-gray-500"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                per person • taxes included
              </p>
            </div>

            {/* Card body */}
            <div className="p-6 space-y-4">
              {/* Date selector */}
              <div>
                <label
                  className="text-xs font-semibold text-gray-700 block mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Select Travel Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                />
              </div>

              {/* Guests */}
              <div>
                <label
                  className="text-xs font-semibold text-gray-700 block mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Number of Guests
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Book Now */}
              {isSignedIn ? (
                <button
                  onClick={() => router.push("/booking")}
                  className="book-now-btn w-full inline-flex items-center justify-center gap-2 font-semibold text-sm border border-orange-500 text-orange-500 px-5 py-3 rounded-full"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span className="book-now-text">Book This Package</span>
                  <FiArrowRight className="book-now-arrow text-base" />
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button
                    className="book-now-btn w-full inline-flex items-center justify-center gap-2 font-semibold text-sm border border-orange-500 text-orange-500 px-5 py-3 rounded-full"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <span className="book-now-text">Book This Package</span>
                    <FiArrowRight className="book-now-arrow text-base" />
                  </button>
                </SignInButton>
              )}

              <Link href="/contact">
                <button
                  className="w-full border border-gray-200 text-gray-600 font-semibold text-sm px-5 py-3 rounded-full hover:border-orange-400 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Enquire Now
                </button>
              </Link>

              <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <FiClock className="text-orange-400" />
                <span style={{ fontFamily: "'Playfair Display', serif" }}>
                  Free cancellation up to 48 hours before
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Packages ── */}
      {related.length > 0 && (
        <section className="bg-orange-50 py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p
              className="text-center text-orange-500 text-sm font-semibold tracking-widest uppercase mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              You May Also Like
            </p>
            <h2
              className="text-center text-3xl font-bold text-gray-800 mb-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Similar <span className="text-orange-500">Packages</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {related.map((rp) => (
                <Link href={`/packages/${rp.slug}`} key={rp.slug}>
                  <div className="card-hover group rounded-2xl overflow-hidden bg-white border border-orange-100 shadow-sm">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={rp.image}
                        alt={rp.name}
                        className="img-zoom w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      {rp.discount && (
                        <span
                          className="absolute top-3 left-3 bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {rp.discount}
                        </span>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <h3
                          className="text-white text-lg font-bold drop-shadow-md"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {rp.name}
                        </h3>
                        <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                          <FiMapPin className="text-xs" />
                          {rp.location}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <span
                          className="text-xs text-gray-500"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {rp.duration}
                        </span>
                        <p
                          className="text-lg font-bold text-gray-800"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {rp.price}
                        </p>
                      </div>
                      <span className="book-now-btn inline-flex items-center gap-1.5 font-semibold text-xs border border-orange-400 text-orange-500 px-4 py-2 rounded-full">
                        <span className="book-now-text">View</span>
                        <FiArrowRight className="book-now-arrow text-sm" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=80"
          alt="CTA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-white text-3xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Need Help Planning Your {pkg.name} Trip?
          </h2>
          <p
            className="text-white/80 text-sm mb-6 max-w-xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our travel experts can customise this package to your preferences —
            dates, budget, activities, and more.
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
            <Link href="/packages">
              <button
                className="btn-pro border border-white text-white font-semibold px-10 py-3 rounded-full text-sm tracking-wide hover:bg-white/10"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Browse More Packages
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
