"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  FiArrowLeft, FiArrowRight, FiHome, FiTruck, FiMapPin,
  FiSend, FiBriefcase, FiStar, FiCheckCircle, FiCalendar,
  FiUsers, FiCreditCard, FiPhone, FiMail, FiUser, FiShield,
} from "react-icons/fi";

// ─── Service Map ─────────────────────────────────────────────────────────────
const serviceMap: Record<string, { title: string; image: string; icon: React.ReactNode }> = {
  "hotel-booking": { title: "Hotel Booking", image: "/images/hotel.jpg", icon: <FiHome /> },
  "bus-booking": { title: "Bus Booking", image: "/images/bus.jpg", icon: <FiTruck /> },
  "train-booking": { title: "Train Booking", image: "/images/train.jpg", icon: <FiTruck /> },
  "flight-booking": { title: "Flight Booking", image: "/images/flight.jpg", icon: <FiBriefcase /> },
  "car-rental": { title: "Car Rental", image: "/images/car.jpg", icon: <FiTruck /> },
  "tour-guide": { title: "Tour Guide", image: "/images/guide.jpg", icon: <FiMapPin /> },
};

// ─── Service Fields ─────────────────────────────────────────────────────────────
const serviceFields: Record<string, Array<{ name: string; label: string; type: string; placeholder?: string; icon: React.ReactNode; half?: boolean; options?: string[] }>> = {
  "hotel-booking": [
    { name: "destination", label: "Hotel Location", type: "text", placeholder: "Enter city", icon: <FiMapPin />, half: true },
    { name: "checkIn", label: "Check-in Date", type: "date", icon: <FiCalendar />, half: true },
    { name: "checkOut", label: "Check-out Date", type: "date", icon: <FiCalendar />, half: true },
    { name: "guests", label: "Number of Guests", type: "select", icon: <FiUsers />, half: true, options: ["1", "2", "3", "4", "5", "6+"] },
    { name: "roomType", label: "Room Type", type: "select", icon: <FiHome />, half: true, options: ["Single", "Double", "Deluxe", "Suite"] },
  ],
  "bus-booking": [
    { name: "from", label: "From", type: "text", placeholder: "Departure city", icon: <FiMapPin />, half: true },
    { name: "destination", label: "To", type: "text", placeholder: "Destination city", icon: <FiMapPin />, half: true },
    { name: "departDate", label: "Departure Date", type: "date", icon: <FiCalendar />, half: true },
    { name: "passengers", label: "Passengers", type: "select", icon: <FiUsers />, half: true, options: ["1", "2", "3", "4", "5", "6+"] },
    { name: "busType", label: "Bus Type", type: "select", icon: <FiBriefcase />, half: true, options: ["AC", "Non-AC", "Sleeper"] },
  ],
  "train-booking": [
    { name: "from", label: "From Station", type: "text", placeholder: "Departure station", icon: <FiMapPin />, half: true },
    { name: "destination", label: "To Station", type: "text", placeholder: "Destination station", icon: <FiMapPin />, half: true },
    { name: "departDate", label: "Departure Date", type: "date", icon: <FiCalendar />, half: true },
    { name: "passengers", label: "Passengers", type: "select", icon: <FiUsers />, half: true, options: ["1", "2", "3", "4", "5", "6+"] },
    { name: "classType", label: "Class", type: "select", icon: <FiBriefcase />, half: true, options: ["General", "Sleeper", "First AC", "Second AC", "Third AC"] },
  ],
  "flight-booking": [
    { name: "from", label: "From", type: "text", placeholder: "Departure city", icon: <FiMapPin />, half: true },
    { name: "destination", label: "To", type: "text", placeholder: "Destination city", icon: <FiMapPin />, half: true },
    { name: "departDate", label: "Departure Date", type: "date", icon: <FiCalendar />, half: true },
    { name: "passengers", label: "Passengers", type: "select", icon: <FiUsers />, half: true, options: ["1", "2", "3", "4", "5", "6+"] },
    { name: "seatClass", label: "Seat Class", type: "select", icon: <FiBriefcase />, half: true, options: ["Economy", "Premium Economy", "Business", "First Class"] },
  ],
  "car-rental": [
    { name: "pickupLocation", label: "Pickup Location", type: "text", placeholder: "Enter location", icon: <FiMapPin />, half: true },
    { name: "pickupDate", label: "Pickup Date", type: "date", icon: <FiCalendar />, half: true },
    { name: "returnDate", label: "Return Date", type: "date", icon: <FiCalendar />, half: true },
    { name: "carType", label: "Car Type", type: "select", icon: <FiTruck />, half: true, options: ["Economy", "Sedan", "SUV", "Luxury"] },
  ],
  "tour-guide": [
    { name: "destination", label: "Tour Destination", type: "text", placeholder: "Enter city/location", icon: <FiMapPin />, half: true },
    { name: "tourDate", label: "Tour Date", type: "date", icon: <FiCalendar />, half: true },
    { name: "groupSize", label: "Group Size", type: "select", icon: <FiUsers />, half: true, options: ["1-5", "5-10", "10-20", "20+"] },
    { name: "duration", label: "Duration", type: "select", icon: <FiCalendar />, half: true, options: ["Half Day", "Full Day", "Multi-day"] },
  ],
};

// ─── Common Contact Fields ───────────────────────────────────────────────────────
const commonContact: Array<{ name: string; label: string; type: string; placeholder: string; icon: React.ReactNode; half?: boolean }> = [
  { name: "fullName", label: "Full Name", type: "text", placeholder: "Your full name", icon: <FiUser />, half: true },
  { name: "email", label: "Email", type: "email", placeholder: "your@email.com", icon: <FiMail />, half: true },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX", icon: <FiPhone />, half: true },
];

// ─── Price map per service ───────────────────────────────────────────────────────
const servicePrices: Record<string, number> = {
  "hotel-booking": 2999,
  "bus-booking": 799,
  "train-booking": 599,
  "flight-booking": 4999,
  "car-rental": 1999,
  "tour-guide": 1499,
};

export default function ServiceBooking({ slug }: { slug: string }) {
  const service = serviceMap[slug];
  const { user, isLoaded } = useUser();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fields = serviceFields[slug] || [];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Service Not Found
        </h1>
        <Link href="/services">
          <button className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full text-sm mt-4">
            Browse Services
          </button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !user) {
      alert("Please sign in to book a service.");
      return;
    }

    const formData = new FormData(formRef.current!);
    const formValues: Record<string, string> = {};
    formData.forEach((val, key) => { formValues[key] = val as string; });

    const amount = servicePrices[slug] || 999;

    const options = {
      key: "rzp_test_T7RTKPxEimUNbD",
      amount: amount * 100,
      currency: "INR",
      name: "TourSpot",
      description: service.title,
      prefill: {
        name: formValues.fullName,
        email: formValues.email,
        contact: formValues.phone,
      },
      theme: { color: "#f97316" },
      handler: async function (response: any) {
        setLoading(true);
        try {
          // Get travel date from form (different field names per service)
          const travelDate =
            formValues.travelDate ||
            formValues.checkIn ||
            formValues.departDate ||
            formValues.pickupDate ||
            formValues.tourDate ||
            new Date().toISOString().split("T")[0];

          const guests = parseInt(
            (formValues.guests || formValues.passengers || formValues.groupSize || "1")
              .replace(/\D.*/, "")
          ) || 1;

          const res = await fetch("/api/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              packageSlug: slug,
              packageName: service.title,
              packageImage: service.image,
              location: formValues.destination || formValues.from || formValues.pickupLocation || "",
              duration: "As per booking",
              travelDate,
              guests,
              totalAmount: amount,
              bookingType: "service",
              serviceDetails: JSON.stringify(formValues),
            }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Failed to save booking");

          setSubmitted(true);
        } catch (err: any) {
          alert(err.message || "Booking could not be saved.");
        }
        setLoading(false);
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", (r: any) => {
      alert("Payment failed: " + r.error.description);
    });
    rzp.open();
  };

  if (submitted) {
    return (
      <div className="font-sans text-gray-800 bg-white">
        <section className="min-h-[100vh] flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <FiCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Booking Confirmed! 🎉
          </h1>
          <p className="text-gray-500 max-w-md mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your <strong className="text-orange-500">{service.title}</strong> booking has been confirmed and saved.
          </p>
          <p className="text-gray-400 text-sm mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Check your booking history to view or cancel anytime.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/booking-history">
              <button className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full text-sm">
                View My Bookings
              </button>
            </Link>
            <Link href="/services">
              <button className="btn-pro border border-orange-400 text-orange-500 font-semibold px-8 py-3 rounded-full text-sm hover:bg-orange-50 transition-colors">
                Back to Services
              </button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Hero, breadcrumb, sidebar — same as your existing code */}
      {/* Just replace the <form> part below */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-3 gap-6 sm:gap-10">
        <div className="lg:col-span-2">
          <button className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full text-sm mb-6 flex items-center gap-2"
            onClick={() => window.history.back()}>
            <FiArrowLeft /> Back To Services
          </button>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Booking Details
          </h2>
          <p className="text-gray-500 text-sm mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Fill in the details and complete payment to confirm your booking instantly.
          </p>

          {/* Price badge */}
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <FiCreditCard /> Starting from ₹{servicePrices[slug]?.toLocaleString("en-IN")}
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* Service-specific fields */}
            <div>
              <h3 className="text-lg font-bold text-orange-500 mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <FiCalendar className="text-orange-400" /> Trip Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.name} className={!field.half ? "md:col-span-2" : ""}>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {field.label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">{field.icon}</span>
                      {field.type === "select" ? (
                        <select name={field.name} required className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 outline-none bg-white appearance-none text-black">
                          <option value="">{`Select ${field.label}`}</option>
                          {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input type={field.type} name={field.name} placeholder={field.placeholder}
                          className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 outline-none text-black" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact fields */}
            <div>
              <h3 className="text-lg font-bold text-orange-500 mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <FiUser className="text-orange-400" /> Your Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonContact.map((field) => (
                  <div key={field.name} className={!field.half ? "md:col-span-2" : ""}>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {field.label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">{field.icon}</span>
                      <input type={field.type} name={field.name} required placeholder={field.placeholder}
                        className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 outline-none text-black" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Special Requests (optional)</label>
              <textarea name="specialRequests" rows={3} placeholder="Any special requirements..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 outline-none resize-none text-black" />
            </div>

            <button type="submit" disabled={loading}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold px-10 py-3 rounded-full text-sm transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              <FiCreditCard />
              {loading ? "Saving..." : `Pay ₹${servicePrices[slug]?.toLocaleString("en-IN")} & Confirm`}
            </button>
          </form>
        </div>

        {/* Sidebar — same as your existing sidebar code */}
      </section>
    </div>
  );
}