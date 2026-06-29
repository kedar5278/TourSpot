"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiHome,
  FiTruck,
  FiMapPin,
  FiSend,
  FiBriefcase,
  FiStar,
  FiCheckCircle,
  FiCalendar,
  FiUsers,
  FiCreditCard,
  FiPhone,
  FiMail,
  FiUser,
  FiShield,
} from "react-icons/fi";

// ─── Service Config ──────────────────────────────────────────────────────────────

type ServiceConfig = {
  slug: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  color: string;
  highlights: string[];
};

const serviceMap: Record<string, ServiceConfig> = {
  "hotel-booking": {
    slug: "hotel-booking",
    title: "Hotel Booking",
    icon: <FiHome className="text-orange-500 text-2xl" />,
    description:
      "Book the best hotels at unbeatable prices. From luxury resorts to budget stays — find your perfect accommodation.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
    color: "from-orange-400 to-red-400",
    highlights: [
      "Best Price Guarantee",
      "Free Cancellation",
      "24/7 Support",
      "Verified Hotels",
    ],
  },
  "bus-booking": {
    slug: "bus-booking",
    title: "Bus Booking",
    icon: <FiTruck className="text-orange-500 text-2xl" />,
    description:
      "Book comfortable bus tickets for intercity and interstate travel. Choose from AC, sleeper, and luxury options.",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&q=80",
    color: "from-blue-400 to-indigo-400",
    highlights: [
      "Seat Selection",
      "Live Tracking",
      "Instant Confirmation",
      "AC & Sleeper Options",
    ],
  },
  "train-booking": {
    slug: "train-booking",
    title: "Train Booking",
    icon: <FiMapPin className="text-orange-500 text-2xl" />,
    description:
      "Hassle-free train ticket booking with real-time availability and instant confirmation across all routes.",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=80",
    color: "from-green-400 to-teal-400",
    highlights: [
      "Tatkal Booking",
      "PNR Status",
      "Seat Availability",
      "Instant Confirmation",
    ],
  },
  "flight-booking": {
    slug: "flight-booking",
    title: "Flight Booking",
    icon: <FiSend className="text-orange-500 text-2xl" />,
    description:
      "Compare and book affordable flight tickets to domestic and international destinations with the best deals.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=900&q=80",
    color: "from-sky-400 to-blue-400",
    highlights: [
      "Lowest Fares",
      "Web Check-in",
      "Flight Alerts",
      "Flexible Dates",
    ],
  },
  "car-rental": {
    slug: "car-rental",
    title: "Car Rental",
    icon: <FiBriefcase className="text-orange-500 text-2xl" />,
    description:
      "Rent a car for your trips with flexible plans, verified drivers, and a wide range of vehicles to choose from.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80",
    color: "from-purple-400 to-pink-400",
    highlights: [
      "Self Drive & Chauffeur",
      "Flexible Plans",
      "All Inclusive",
      "Premium Vehicles",
    ],
  },
  "tour-guide": {
    slug: "tour-guide",
    title: "Tour Guide",
    icon: <FiStar className="text-orange-500 text-2xl" />,
    description:
      "Explore destinations with expert local guides who bring history, culture, and hidden gems to life.",
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=900&q=80",
    color: "from-yellow-400 to-orange-400",
    highlights: [
      "Local Experts",
      "Customised Tours",
      "Multi-language",
      "Small Groups",
    ],
  },
};

// ─── Form field configs per service ──────────────────────────────────────────────

type FormField = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  half?: boolean;
  options?: string[];
};

const commonContact: FormField[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    icon: <FiUser className="text-gray-400" />,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    icon: <FiMail className="text-gray-400" />,
    half: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+91 98765 43210",
    icon: <FiPhone className="text-gray-400" />,
    half: true,
  },
];

const serviceFields: Record<string, FormField[]> = {
  "hotel-booking": [
    {
      name: "destination",
      label: "Destination / City",
      type: "text",
      placeholder: "e.g. Goa, Jaipur, Kerala",
      icon: <FiMapPin className="text-gray-400" />,
    },
    {
      name: "checkIn",
      label: "Check-in Date",
      type: "date",
      placeholder: "",
      icon: <FiCalendar className="text-gray-400" />,
      half: true,
    },
    {
      name: "checkOut",
      label: "Check-out Date",
      type: "date",
      placeholder: "",
      icon: <FiCalendar className="text-gray-400" />,
      half: true,
    },
    {
      name: "guests",
      label: "Number of Guests",
      type: "select",
      placeholder: "",
      icon: <FiUsers className="text-gray-400" />,
      half: true,
      options: ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5+ Guests"],
    },
    {
      name: "rooms",
      label: "Number of Rooms",
      type: "select",
      placeholder: "",
      icon: <FiHome className="text-gray-400" />,
      half: true,
      options: ["1 Room", "2 Rooms", "3 Rooms", "4+ Rooms"],
    },
    {
      name: "hotelType",
      label: "Hotel Type",
      type: "select",
      placeholder: "",
      icon: <FiStar className="text-gray-400" />,
      options: ["Budget", "3-Star", "4-Star", "5-Star / Luxury", "Resort"],
    },
  ],
  "bus-booking": [
    {
      name: "from",
      label: "From (Departure City)",
      type: "text",
      placeholder: "e.g. Ahmedabad",
      icon: <FiMapPin className="text-gray-400" />,
      half: true,
    },
    {
      name: "to",
      label: "To (Destination City)",
      type: "text",
      placeholder: "e.g. Mumbai",
      icon: <FiArrowRight className="text-gray-400" />,
      half: true,
    },
    {
      name: "travelDate",
      label: "Date of Journey",
      type: "date",
      placeholder: "",
      icon: <FiCalendar className="text-gray-400" />,
      half: true,
    },
    {
      name: "passengers",
      label: "Number of Passengers",
      type: "select",
      placeholder: "",
      icon: <FiUsers className="text-gray-400" />,
      half: true,
      options: ["1", "2", "3", "4", "5+"],
    },
    {
      name: "busType",
      label: "Bus Type",
      type: "select",
      placeholder: "",
      icon: <FiTruck className="text-gray-400" />,
      options: ["AC Seater", "AC Sleeper", "Non-AC Seater", "Non-AC Sleeper", "Luxury Volvo"],
    },
  ],
  "train-booking": [
    {
      name: "from",
      label: "From Station",
      type: "text",
      placeholder: "e.g. New Delhi (NDLS)",
      icon: <FiMapPin className="text-gray-400" />,
      half: true,
    },
    {
      name: "to",
      label: "To Station",
      type: "text",
      placeholder: "e.g. Mumbai (CSTM)",
      icon: <FiArrowRight className="text-gray-400" />,
      half: true,
    },
    {
      name: "travelDate",
      label: "Date of Journey",
      type: "date",
      placeholder: "",
      icon: <FiCalendar className="text-gray-400" />,
      half: true,
    },
    {
      name: "passengers",
      label: "Number of Passengers",
      type: "select",
      placeholder: "",
      icon: <FiUsers className="text-gray-400" />,
      half: true,
      options: ["1", "2", "3", "4", "5+"],
    },
    {
      name: "class",
      label: "Travel Class",
      type: "select",
      placeholder: "",
      icon: <FiStar className="text-gray-400" />,
      options: ["Sleeper (SL)", "AC 3 Tier (3A)", "AC 2 Tier (2A)", "AC 1st Class (1A)", "General"],
    },
  ],
  "flight-booking": [
    {
      name: "from",
      label: "From (Origin)",
      type: "text",
      placeholder: "e.g. Delhi (DEL)",
      icon: <FiMapPin className="text-gray-400" />,
      half: true,
    },
    {
      name: "to",
      label: "To (Destination)",
      type: "text",
      placeholder: "e.g. Goa (GOI)",
      icon: <FiSend className="text-gray-400" />,
      half: true,
    },
    {
      name: "departDate",
      label: "Departure Date",
      type: "date",
      placeholder: "",
      icon: <FiCalendar className="text-gray-400" />,
      half: true,
    },
    {
      name: "returnDate",
      label: "Return Date (optional)",
      type: "date",
      placeholder: "",
      icon: <FiCalendar className="text-gray-400" />,
      half: true,
    },
    {
      name: "passengers",
      label: "Passengers",
      type: "select",
      placeholder: "",
      icon: <FiUsers className="text-gray-400" />,
      half: true,
      options: ["1 Adult", "2 Adults", "3 Adults", "4 Adults", "5+ Adults"],
    },
    {
      name: "tripClass",
      label: "Travel Class",
      type: "select",
      placeholder: "",
      icon: <FiStar className="text-gray-400" />,
      half: true,
      options: ["Economy", "Premium Economy", "Business", "First Class"],
    },
    {
      name: "tripType",
      label: "Trip Type",
      type: "select",
      placeholder: "",
      icon: <FiArrowRight className="text-gray-400" />,
      options: ["One Way", "Round Trip", "Multi-City"],
    },
  ],
  "car-rental": [
    {
      name: "pickupLocation",
      label: "Pickup Location",
      type: "text",
      placeholder: "e.g. Ahmedabad Airport",
      icon: <FiMapPin className="text-gray-400" />,
    },
    {
      name: "pickupDate",
      label: "Pickup Date",
      type: "date",
      placeholder: "",
      icon: <FiCalendar className="text-gray-400" />,
      half: true,
    },
    {
      name: "dropDate",
      label: "Drop-off Date",
      type: "date",
      placeholder: "",
      icon: <FiCalendar className="text-gray-400" />,
      half: true,
    },
    {
      name: "carType",
      label: "Car Type",
      type: "select",
      placeholder: "",
      icon: <FiBriefcase className="text-gray-400" />,
      half: true,
      options: ["Hatchback", "Sedan", "SUV", "Luxury", "Tempo / Traveller"],
    },
    {
      name: "driveType",
      label: "Drive Type",
      type: "select",
      placeholder: "",
      icon: <FiUser className="text-gray-400" />,
      half: true,
      options: ["Self Drive", "With Chauffeur"],
    },
  ],
  "tour-guide": [
    {
      name: "destination",
      label: "Destination",
      type: "text",
      placeholder: "e.g. Jaipur, Kerala, Varanasi",
      icon: <FiMapPin className="text-gray-400" />,
    },
    {
      name: "tourDate",
      label: "Tour Date",
      type: "date",
      placeholder: "",
      icon: <FiCalendar className="text-gray-400" />,
      half: true,
    },
    {
      name: "groupSize",
      label: "Group Size",
      type: "select",
      placeholder: "",
      icon: <FiUsers className="text-gray-400" />,
      half: true,
      options: ["1-2 People", "3-5 People", "6-10 People", "10+ People"],
    },
    {
      name: "tourType",
      label: "Tour Type",
      type: "select",
      placeholder: "",
      icon: <FiStar className="text-gray-400" />,
      options: ["City Tour", "Heritage Walk", "Nature Trek", "Food Tour", "Custom Tour"],
    },
    {
      name: "language",
      label: "Preferred Language",
      type: "select",
      placeholder: "",
      icon: <FiUser className="text-gray-400" />,
      options: ["English", "Hindi", "Gujarati", "Regional Language", "Other"],
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────────

export default function ServiceBooking({ slug }: { slug: string }) {
  const service = serviceMap[slug];
  const [submitted, setSubmitted] = useState(false);
  const fields = serviceFields[slug] || [];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <FiCheckCircle className="text-orange-500 text-5xl mb-4" />
        <h1
          className="text-3xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Service Not Found
        </h1>
        <p
          className="text-gray-500 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The service you're looking for doesn't exist.
        </p>
        <Link href="/services">
          <button
            className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full text-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Browse Services
          </button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="font-sans text-gray-800 bg-white">
        <section className="min-h-[100vh] flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <FiCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h1
            className="text-3xl font-bold text-gray-800 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Booking Request Submitted!
          </h1>
          <p
            className="text-gray-500 max-w-md mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Thank you for choosing our <strong className="text-orange-500">{service.title}</strong> service.
            Our team will review your request and get back to you within 24 hours.
          </p>
          <p
            className="text-gray-400 text-sm mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A confirmation email has been sent to your email address.
          </p>
          <div className="flex gap-4">
            <Link href="/services">
              <button
                className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Back to Services
              </button>
            </Link>
            <Link href="/packages">
              <button
                className="btn-pro border border-orange-400 text-orange-500 font-semibold px-8 py-3 rounded-full text-sm hover:bg-orange-50 transition-colors"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Explore Packages
              </button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* ── Hero Banner ── */}
      <section className="relative h-44 sm:h-52 md:h-72">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-30`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

        <Link
          href="/services"
          className="absolute top-3 sm:top-4 left-3 sm:left-4 md:left-8 flex items-center gap-1 text-white text-sm font-semibold hover:text-orange-400 transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <FiArrowLeft className="text-sm" />
          Back to Services
        </Link>

        <div className="absolute bottom-4 sm:bottom-6 left-3 sm:left-4 md:left-8 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
            {service.icon}
          </div>
          <div>
            <p
              className="text-orange-300 text-xs font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Book Now
            </p>
            <h1
              className="text-white text-2xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <nav className="bg-orange-50 py-3 px-6 border-b border-orange-100">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-orange-500 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-orange-500 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>Services</Link>
          <span>/</span>
          <span className="text-orange-500 font-semibold">{service.title} Booking</span>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-3 gap-6 sm:gap-10">
        {/* Left — Form */}
        <div className="lg:col-span-2">
          <h2
            className="text-2xl font-bold text-gray-800 mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Booking Details
          </h2>
          <p
            className="text-gray-500 text-sm mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Fill in the details below and our team will confirm your booking within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service-specific fields */}
            <div>
              <h3
                className="text-lg font-bold text-orange-500 mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <FiCalendar className="text-orange-400" />
                Trip Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => {
                  const isFull = !field.half;
                  return (
                    <div key={field.name} className={isFull ? "md:col-span-2" : ""}>
                      <label
                        className="text-xs font-semibold text-gray-700 block mb-1.5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {field.label}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                          {field.icon}
                        </span>
                        {field.type === "select" ? (
                          <select
                            name={field.name}
                            required
                            className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none bg-white appearance-none"
                          >
                            <option value="">{field.placeholder || `Select ${field.label}`}</option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            required={field.type !== "date" || field.name === "departDate" || field.name === "checkIn" || field.name === "travelDate" || field.name === "tourDate" || field.name === "pickupDate"}
                            placeholder={field.placeholder}
                            className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact details */}
            <div>
              <h3
                className="text-lg font-bold text-orange-500 mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <FiUser className="text-orange-400" />
                Your Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonContact.map((field) => {
                  const isFull = !field.half;
                  return (
                    <div key={field.name} className={isFull ? "md:col-span-2" : ""}>
                      <label
                        className="text-xs font-semibold text-gray-700 block mb-1.5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {field.label}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                          {field.icon}
                        </span>
                        <input
                          type={field.type}
                          name={field.name}
                          required
                          placeholder={field.placeholder}
                          className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label
                className="text-xs font-semibold text-gray-700 block mb-1.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Special Requests (optional)
              </label>
              <textarea
                name="specialRequests"
                rows={3}
                placeholder="Any special requirements or preferences..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="book-now-btn inline-flex items-center gap-2 font-semibold text-sm border border-orange-500 text-orange-500 px-10 py-3 rounded-full"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="book-now-text">Submit Booking Request</span>
              <FiArrowRight className="book-now-arrow text-base" />
            </button>
          </form>
        </div>

        {/* Right — Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Service summary card */}
            <div className="rounded-2xl border border-orange-100 overflow-hidden shadow-sm">
              <div className="h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3
                  className="text-lg font-bold text-gray-800 mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-gray-500 text-xs leading-relaxed mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-2 text-sm text-gray-600"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <FiCheckCircle className="text-orange-400 text-sm flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 space-y-3">
              {[
                {
                  icon: <FiShield className="text-orange-500" />,
                  title: "Secure Booking",
                  text: "Your data is encrypted & protected",
                },
                {
                  icon: <FiCreditCard className="text-orange-500" />,
                  title: "No Hidden Charges",
                  text: "Transparent pricing, always",
                },
                {
                  icon: <FiPhone className="text-orange-500" />,
                  title: "24/7 Support",
                  text: "Call us anytime for assistance",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 border border-orange-100">
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold text-gray-800"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-xs text-gray-500"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
