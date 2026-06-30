"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiMapPin, FiCalendar, FiUsers, FiClock,
  FiCheckCircle, FiXCircle, FiArrowLeft, FiAlertCircle
} from "react-icons/fi";

interface Booking {
  id: string;
  bookingRef: string;
  packageName: string;
  packageImage: string;
  location: string;
  duration: string;
  travelDate: string;
  guests: number;
  totalAmount: number;
  status: string;
}

export default function BookingHistory() {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) {
      setLoading(false);
      return;
    }
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return;

    fetch(`/api/get-bookings?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isLoaded, user]);

  const handleCancel = async (id: string, amount: number) => {
    if (!confirm("Cancel this booking? Refund will be processed in 5-7 business days.")) return;
    setCancellingId(id);
    try {
      await fetch("/api/cancel-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
      );
      alert(`Booking cancelled! ₹${amount.toLocaleString("en-IN")} refund in 5-7 business days.`);
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setCancellingId(null);
  };

  // Not logged in
  if (isLoaded && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="text-orange-400 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Please Sign In
          </h2>
          <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sign in to view your booking history
          </p>
          <Link href="/sign-in">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-orange-500 transition-colors">
            <FiArrowLeft className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Bookings
            </h1>
            {user && (
              <p className="text-xs text-gray-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                {user.primaryEmailAddress?.emailAddress}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
              Loading your bookings...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && bookings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <FiClock className="text-orange-300 text-3xl" />
            </div>
            <h2 className="text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No bookings yet
            </h2>
            <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your booked packages will appear here
            </p>
            <Link href="/packages">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Explore Packages
              </button>
            </Link>
          </div>
        )}

        {/* Bookings list */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {bookings.length} booking{bookings.length > 1 ? "s" : ""} found
            </p>

            {bookings.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0">
                    <img src={b.packageImage} alt={b.packageName} className="w-full h-full object-cover" />
                    {b.status === "cancelled" && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-sm bg-red-500 px-3 py-1 rounded-full">Cancelled</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {b.packageName}
                        </h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <FiMapPin className="text-xs" /> {b.location}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 flex-shrink-0 ${
                        b.status === "confirmed" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                      }`}>
                        {b.status === "confirmed" ? <FiCheckCircle /> : <FiXCircle />}
                        {b.status === "confirmed" ? "Confirmed" : "Cancelled"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="text-orange-400" />
                        <span style={{ fontFamily: "'Playfair Display', serif" }}>
                          {new Date(b.travelDate).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiUsers className="text-orange-400" />
                        <span style={{ fontFamily: "'Playfair Display', serif" }}>
                          {b.guests} {b.guests === 1 ? "Guest" : "Guests"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock className="text-orange-400" />
                        <span style={{ fontFamily: "'Playfair Display', serif" }}>{b.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                          Booking ID: #{b.bookingRef}
                        </p>
                        <p className="font-bold text-orange-500 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                          ₹{b.totalAmount.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {b.status === "confirmed" && (
                        <button
                          onClick={() => handleCancel(b.id, b.totalAmount)}
                          disabled={cancellingId === b.id}
                          className="text-sm font-semibold text-red-500 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {cancellingId === b.id ? "Cancelling..." : "Cancel & Refund"}
                        </button>
                      )}

                      {b.status === "cancelled" && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-full">
                          <FiAlertCircle />
                          <span style={{ fontFamily: "'Playfair Display', serif" }}>Refund in 5-7 days</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}