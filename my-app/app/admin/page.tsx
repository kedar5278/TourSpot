"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Package {
  slug: string;
  name: string;
  location: string;
  image: string;
  price: string;
  category: string;
  featured?: boolean;
  discount?: string;
}

interface Booking {
  id: string;
  bookingRef: string;
  email: string;
  packageName: string;
  packageImage: string;
  location: string;
  travelDate: string;
  guests: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPackages: 0,
    popularPackages: 0,
    specialOffers: 0,
    categories: {} as { [key: string]: number },
  });
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    confirmed: 0,
    cancelled: 0,
    revenue: 0,
  });
  const [recentPackages, setRecentPackages] = useState<Package[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/packages").then((r) => r.json()),
      fetch("/api/admin/bookings").then((r) => r.json()),
    ])
      .then(([packagesData, bookingsData]) => {
        const packages = packagesData.packages || [];
        const bookings = bookingsData.bookings || [];

        // Package stats
        const categories: { [key: string]: number } = {};
        packages.forEach((pkg: Package) => {
          categories[pkg.category] = (categories[pkg.category] || 0) + 1;
        });

        setStats({
          totalPackages: packages.length,
          popularPackages: packages.filter((p: Package) => p.featured).length,
          specialOffers: packages.filter((p: Package) => p.discount).length,
          categories,
        });

        setRecentPackages(packages.slice(0, 5));

        // Booking stats
        const confirmed = bookings.filter((b: Booking) => b.status === "confirmed").length;
        const cancelled = bookings.filter((b: Booking) => b.status === "cancelled").length;

        setBookingStats({
          total: bookings.length,
          confirmed,
          cancelled,
          revenue: bookingsData.totalRevenue || 0,
        });

        setRecentBookings(bookings.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Packages",
      value: stats.totalPackages,
      color: "bg-blue-500",
      href: "/admin/packages",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Popular Packages",
      value: stats.popularPackages,
      color: "bg-green-500",
      href: "/admin/packages",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      title: "Special Offers",
      value: stats.specialOffers,
      color: "bg-purple-500",
      href: "/admin/packages",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      title: "Total Bookings",
      value: bookingStats.total,
      color: "bg-orange-500",
      href: "/admin/bookings",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
          Dashboard
        </h1>
        <Link
          href="/"
          target="_blank"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          View Website →
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Revenue & Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Total Revenue
          </h2>
          <p className="text-3xl font-bold text-green-600" style={{ fontFamily: "'Playfair Display', serif" }}>
            ₹{bookingStats.revenue.toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-gray-500 mt-1">From {bookingStats.confirmed} confirmed bookings</p>
        </div>

        {/* Booking Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Booking Overview
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600" style={{ fontFamily: "'Playfair Display', serif" }}>
                {bookingStats.confirmed}
              </p>
              <p className="text-xs text-gray-500">Confirmed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                {bookingStats.cancelled}
              </p>
              <p className="text-xs text-gray-500">Cancelled</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: "'Playfair Display', serif" }}>
                {bookingStats.total - bookingStats.confirmed - bookingStats.cancelled}
              </p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Packages by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(stats.categories).map(([category, count]) => (
            <div key={category} className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-orange-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                {count}
              </p>
              <p className="text-xs text-gray-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                {category}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Recent Packages + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Packages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              Recent Packages
            </h2>
            <Link href="/admin/packages" className="text-orange-500 hover:text-orange-600 text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentPackages.map((pkg) => (
              <div key={pkg.slug} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <img src={pkg.image} alt={pkg.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {pkg.name}
                  </p>
                  <p className="text-xs text-gray-500">{pkg.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-gray-800 text-sm">{pkg.price}</p>
                  <div className="flex gap-1">
                    {pkg.featured && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Popular</span>}
                    {pkg.discount && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">{pkg.discount}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              Recent Bookings
            </h2>
            <Link href="/admin/bookings" className="text-orange-500 hover:text-orange-600 text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              View All
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <img src={booking.packageImage} alt={booking.packageName} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {booking.packageName}
                    </p>
                    <p className="text-xs text-gray-500">{booking.email}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-gray-800 text-sm">₹{booking.totalAmount.toLocaleString("en-IN")}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                      booking.status === "cancelled" ? "bg-red-100 text-red-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
