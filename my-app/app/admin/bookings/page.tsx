"use client";

import { useState, useEffect } from "react";

interface Booking {
  id: string;
  bookingRef: string;
  email: string;
  packageSlug: string;
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

interface StatusCount {
  status: string;
  count: number;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [statusCounts, setStatusCounts] = useState<StatusCount[]>([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const statuses = ["All", "confirmed", "completed", "cancelled"];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      setBookings(data.bookings || []);
      setTotalRevenue(data.totalRevenue || 0);
      setStatusCounts(data.statusCounts || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    if (!confirm(`Mark this booking as ${newStatus}?`)) return;

    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === id
              ? {
                  ...b,
                  status: newStatus,
                  ...(newStatus === "cancelled" ? { cancelledAt: new Date().toISOString() } : {}),
                }
              : b
          )
        );
        showSuccess(`Booking marked as ${newStatus}`);
        // Refresh counts
        fetchBookings();
      }
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.packageName.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(search.toLowerCase()) ||
      booking.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
          ✅ {successMsg}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
          Manage Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1">{filteredBookings.length} bookings total</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Bookings",
            value: bookings.length,
            color: "bg-blue-500",
            icon: "📋",
          },
          {
            title: "Confirmed",
            value: statusCounts.find((s) => s.status === "confirmed")?.count || 0,
            color: "bg-green-500",
            icon: "✅",
          },
          {
            title: "Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            color: "bg-orange-500",
            icon: "💰",
          },
          {
            title: "Cancelled",
            value: statusCounts.find((s) => s.status === "cancelled")?.count || 0,
            color: "bg-red-500",
            icon: "❌",
          },
        ].map((card) => (
          <div key={card.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} w-11 h-11 rounded-lg flex items-center justify-center text-white text-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, ref number..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors capitalize ${
                  statusFilter === s
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              No bookings found
            </p>
            <p className="text-gray-400 text-sm mt-1">Bookings will appear here when users book packages</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Ref</th>
                  <th className="px-4 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Package</th>
                  <th className="px-4 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Customer</th>
                  <th className="px-4 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Travel Date</th>
                  <th className="px-4 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Guests</th>
                  <th className="px-4 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Amount</th>
                  <th className="px-4 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Status</th>
                  <th className="px-4 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm font-semibold text-orange-600">
                        {booking.bookingRef}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.packageImage}
                          alt={booking.packageName}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {booking.packageName}
                          </p>
                          <p className="text-xs text-gray-500">{booking.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-700">{booking.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-700">{formatDate(booking.travelDate)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{booking.guests}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                        ₹{booking.totalAmount.toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {booking.status === "confirmed" && (
                          <>
                            <button
                              onClick={() => updateStatus(booking.id, "completed")}
                              disabled={updatingId === booking.id}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50"
                            >
                              ✓ Complete
                            </button>
                            <button
                              onClick={() => updateStatus(booking.id, "cancelled")}
                              disabled={updatingId === booking.id}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                              ✕ Cancel
                            </button>
                          </>
                        )}
                        {booking.status === "cancelled" && (
                          <button
                            onClick={() => updateStatus(booking.id, "confirmed")}
                            disabled={updatingId === booking.id}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50"
                          >
                            ↻ Reopen
                          </button>
                        )}
                        {booking.status === "completed" && (
                          <span className="text-xs text-gray-400">No actions</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booked On Info */}
      {filteredBookings.length > 0 && (
        <div className="text-center text-xs text-gray-400" style={{ fontFamily: "'Playfair Display', serif" }}>
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      )}
    </div>
  );
}
