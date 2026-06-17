"use client";

import Link from "next/link";
import React from "react";
import Footer from "./footer";
import {
  FiHome,
  FiTruck,
  FiMapPin,
  FiSend,
  FiShield,
  FiBriefcase,
  FiStar,
  FiGlobe,
  FiCheckCircle,
  FiArrowRight,
  FiHeadphones,
  FiDollarSign,
} from "react-icons/fi";

// ─── Service Icons ──────────────────────────────────────────────────────────────

const HotelIcon = () => <FiHome className="text-orange-500 text-2xl" />;
const BusIcon = () => <FiTruck className="text-orange-500 text-2xl" />;
const TrainIcon = () => <FiMapPin className="text-orange-500 text-2xl" />;
const FlightIcon = () => <FiSend className="text-orange-500 text-2xl" />;
const CarIcon = () => <FiBriefcase className="text-orange-500 text-2xl" />;
const GuideIcon = () => <FiStar className="text-orange-500 text-2xl" />;
const InsuranceIcon = () => <FiShield className="text-orange-500 text-2xl" />;
const VisaIcon = () => <FiGlobe className="text-orange-500 text-2xl" />;

// ─── Data ────────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <HotelIcon />,
    title: "Hotel Booking",
    description:
      "Find and book the best hotels across top destinations at unbeatable prices. From luxury resorts to budget stays — we've got you covered.",
    features: ["Best Price Guarantee", "Free Cancellation", "24/7 Support"],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    color: "from-orange-400 to-red-400",
  },
  {
    icon: <BusIcon />,
    title: "Bus Booking",
    description:
      "Book comfortable bus tickets for intercity and interstate travel. Choose from AC, sleeper, and luxury buses on all major routes.",
    features: ["Seat Selection", "Live Tracking", "Instant Confirmation"],
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80",
    color: "from-blue-400 to-indigo-400",
  },
  {
    icon: <TrainIcon />,
    title: "Train Booking",
    description:
      "Hassle-free train ticket booking with real-time availability, instant confirmation, and smart fare options across all routes.",
    features: ["Tatkal Booking", "PNR Status", "Seat Availability"],
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
    color: "from-green-400 to-teal-400",
  },
  {
    icon: <FlightIcon />,
    title: "Flight Booking",
    description:
      "Compare and book affordable flight tickets to domestic and international destinations with the best deals and flexible options.",
    features: ["Lowest Fares", "Web Check-in", "Flight Alerts"],
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&q=80",
    color: "from-sky-400 to-blue-400",
  },
  {
    icon: <CarIcon />,
    title: "Car Rental",
    description:
      "Rent a car for your trips with flexible rental plans, verified drivers, and a wide range of vehicles to choose from.",
    features: ["Self Drive & Chauffeur", "Flexible Plans", "All Inclusive"],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    color: "from-purple-400 to-pink-400",
  },
  {
    icon: <GuideIcon />,
    title: "Tour Guide",
    description:
      "Explore destinations with expert local guides who bring history, culture, and hidden gems to life with personalized tours.",
    features: ["Local Experts", "Customised Tours", "Multi-language"],
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: <InsuranceIcon />,
    title: "Travel Insurance",
    description:
      "Travel worry-free with comprehensive insurance plans covering medical emergencies, trip cancellations, and baggage loss.",
    features: ["Medical Cover", "Trip Cancellation", "Baggage Protection"],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    color: "from-emerald-400 to-green-400",
  },
  {
    icon: <VisaIcon />,
    title: "Visa Assistance",
    description:
      "Get expert visa guidance and documentation support for hassle-free international travel. We handle the paperwork for you.",
    features: ["Document Support", "Fast Processing", "Expert Guidance"],
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80",
    color: "from-rose-400 to-pink-400",
  },
];

const whyUs = [
  {
    icon: <FiCheckCircle className="text-orange-500 text-2xl" />,
    title: "Trusted by 10,000+ Travellers",
    text: "Join a growing community of happy travellers who trust TourSpot for their journeys.",
  },
  {
    icon: <FiHeadphones className="text-orange-500 text-2xl" />,
    title: "24/7 Customer Support",
    text: "Our dedicated support team is available around the clock to assist you anytime, anywhere.",
  },
  {
    icon: <FiDollarSign className="text-orange-500 text-2xl" />,
    title: "Best Price Guarantee",
    text: "We offer the most competitive prices with no hidden charges — transparency guaranteed.",
  },
  {
    icon: <FiShield className="text-orange-500 text-2xl" />,
    title: "Safe & Secure Booking",
    text: "Your data and payments are fully encrypted and protected with industry-standard security.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* ── Hero Banner ── */}
      <section className="relative h-64 md:h-96">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=80"
          alt="Travel services hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
          <p
            className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What We Offer
          </p>
          <h1
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Services
          </h1>
        </div>
        <Link
          href="/"
          className="absolute top-4 right-8 md:right-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <button className="border border-white text-white px-4 py-1.5 rounded text-sm font-semibold hover:text-orange-500 hover:border-orange-500 transition-colors">
            Back to Home
          </button>
        </Link>
      </section>

      {/* ── Intro Strip ── */}
      <section className="bg-orange-50 py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p
            className="text-gray-500 text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            All-in-One Travel Platform
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything You Need for a{" "}
            <span className="text-orange-500">Perfect Trip</span>
          </h2>
          <p
            className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            From booking hotels and flights to arranging local guides and travel
            insurance — TourSpot takes care of every detail so you can focus on
            enjoying the journey.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="card-hover group rounded-2xl overflow-hidden border border-orange-100 bg-white shadow-sm flex flex-col md:flex-row"
              >
                {/* Image */}
                <div className="relative w-full md:w-56 h-52 md:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="img-zoom w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}
                  />
                  <div className="absolute top-3 left-3 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-xl font-bold text-gray-800 mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-gray-500 text-sm leading-relaxed mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {service.description}
                    </p>
                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.map((feat) => (
                        <span
                          key={feat}
                          className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 text-xs px-3 py-1 rounded-full border border-orange-100"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          <FiCheckCircle className="text-orange-400 text-xs" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn-pro inline-flex items-center gap-2 text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors self-start"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Book Now
                    <FiArrowRight className="text-base" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-orange-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-center text-gray-500 text-sm font-semibold tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Simple &amp; Easy
          </p>
          <h2
            className="text-center text-3xl font-bold text-gray-800 mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How It <span className="text-orange-500">Works</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Choose Service",
                text: "Browse our wide range of travel services and pick what you need.",
              },
              {
                step: "02",
                title: "Compare Options",
                text: "View prices, features, and reviews to find the best option.",
              },
              {
                step: "03",
                title: "Book Instantly",
                text: "Secure your booking with easy payment and instant confirmation.",
              },
              {
                step: "04",
                title: "Enjoy Your Trip",
                text: "Sit back, relax, and enjoy a seamless travel experience.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-md">
                  <span
                    className="text-white text-xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.step}
                  </span>
                </div>
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

      {/* ── Why Choose TourSpot ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-center text-orange-500 text-sm font-semibold tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why TourSpot
          </p>
          <h2
            className="text-center text-3xl font-bold text-gray-800 mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Choose <span className="text-orange-500">TourSpot</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="feature-card flex flex-col items-center text-center gap-3 bg-white"
              >
                <div className="feature-icon w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
                  {item.icon}
                </div>
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
      <section className="relative py-20 px-6">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=80"
          alt="CTA background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2
            className="text-white text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Plan Your Next Adventure?
          </h2>
          <p
            className="text-white/80 text-sm mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Let TourSpot handle everything — from bookings to experiences.
            Start your journey with confidence today.
          </p>
          <Link href="/contact">
            <button
              className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3 rounded-full text-sm tracking-wide shadow-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get in Touch
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
