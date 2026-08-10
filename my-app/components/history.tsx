"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiMapPin, FiCalendar, FiUsers, FiClock,
  FiCheckCircle, FiXCircle, FiArrowLeft, FiAlertCircle,
  FiMail, FiSearch
} from "react-icons/fi";

interface Booking {
  id: string;
  bookingRef: string;
  email: string;
  packageName: string;
  packageImage: string;
  location: string;
  duration: string;
  travelDate: string;
  guests: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  cancelledAt?: string;
}

export default function BookingHistory() {
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/get-bookings?email=${encodeURIComponent(email.trim())}`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      setBookings([]);
    }
    setLoading(false);
  };

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
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled", cancelledAt: new Date().toISOString() } : b))
      );
      alert(`Booking cancelled! ₹${amount.toLocaleString("en-IN")} refund in 5-7 business days.`);
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setCancellingId(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

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
            <p className="text-xs text-gray-400" style={{ fontFamily: "'Playfair Display', serif" }}>
              Enter your email to view booking history
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Email Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🔍 Find Your Bookings
          </h2>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchBookings()}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-black focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
              />
            </div>
            <button
              onClick={fetchBookings}
              disabled={loading || !email.trim()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <FiSearch /> Search
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Loading your bookings...</p>
          </div>
        )}

        {/* No search yet */}
        {!loading && !searched && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-orange-300 text-3xl" />
            </div>
            <h2 className="text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Search by Email
            </h2>
            <p className="text-gray-400 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
              Enter the email you used while booking to see your bookings
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && searched && bookings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
              <FiClock className="text-orange-300 text-3xl" />
            </div>
            <h2 className="text-lg font-bold text-gray-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No bookings found
            </h2>
            <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              No bookings found for <span className="font-semibold text-gray-600">{email}</span>
            </p>
            <Link href="/packages">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors">
                Explore Packages
              </button>
            </Link>
          </div>
        )}

        {/* Bookings list */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {bookings.length} booking{bookings.length > 1 ? "s" : ""} found for <span className="font-semibold text-gray-700">{email}</span>
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

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="text-orange-400" />
                        <span>{formatDate(b.travelDate)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiUsers className="text-orange-400" />
                        <span>{b.guests} {b.guests === 1 ? "Guest" : "Guests"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock className="text-orange-400" />
                        <span>{b.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiMail className="text-orange-400" />
                        <span className="truncate">{b.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400">
                          Booking ID: #{b.bookingRef}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Booked: {b.createdAt ? formatDateTime(b.createdAt) : "—"}
                        </p>
                        {b.cancelledAt && (
                          <p className="text-xs text-red-400 mt-0.5">
                            Cancelled: {formatDateTime(b.cancelledAt)}
                          </p>
                        )}
                        <p className="font-bold text-orange-500 text-lg mt-1">
                          ₹{b.totalAmount.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {b.status === "confirmed" && (
                        <button
                          onClick={() => handleCancel(b.id, b.totalAmount)}
                          disabled={cancellingId === b.id}
                          className="text-sm font-semibold text-red-500 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {cancellingId === b.id ? "Cancelling..." : "Cancel & Refund"}
                        </button>
                      )}

                      {b.status === "cancelled" && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-full">
                          <FiAlertCircle />
                          <span>Refund in 5-7 days</span>
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
