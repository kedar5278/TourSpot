"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Stats {
  totalPackages: number;
  popularPackages: number;
  specialOffers: number;
  newPackages: number;
  categories: { [key: string]: number };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPackages: 0,
    popularPackages: 0,
    specialOffers: 0,
    newPackages: 0,
    categories: {},
  });
  const [recentPackages, setRecentPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/packages");
      const data = await res.json();
      const packages = data.packages || [];

      const categories: { [key: string]: number } = {};
      packages.forEach((pkg: any) => {
        categories[pkg.category] = (categories[pkg.category] || 0) + 1;
      });

      setStats({
        totalPackages: packages.length,
        popularPackages: packages.filter((p: any) => p.featured).length,
        specialOffers: packages.filter((p: any) => p.isSpecialOffer).length,
        newPackages: packages.filter((p: any) => p.isNew).length,
        categories,
      });

      setRecentPackages(packages.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

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
    },
    {
      title: "Popular Packages",
      value: stats.popularPackages,
      color: "bg-green-500",
      href: "/admin/packages?featured=true",
    },
    {
      title: "Special Offers",
      value: stats.specialOffers,
      color: "bg-purple-500",
      href: "/admin/packages?special=true",
    },
    {
      title: "New Packages",
      value: stats.newPackages,
      color: "bg-orange-500",
      href: "/admin/packages?new=true",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1
          className="text-2xl font-bold text-gray-800"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Dashboard
        </h1>
        <Link
          href="/admin/packages/new"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          + Add Package
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
                <p
                  className="text-sm text-gray-500 mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {card.title}
                </p>
                <p
                  className="text-3xl font-bold text-gray-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2
          className="text-lg font-bold text-gray-800 mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Packages by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(stats.categories).map(([category, count]) => (
            <div
              key={category}
              className="bg-gray-50 rounded-lg p-3 text-center"
            >
              <p
                className="text-2xl font-bold text-orange-500"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {count}
              </p>
              <p
                className="text-xs text-gray-500"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {category}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Packages */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-bold text-gray-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Recent Packages
          </h2>
          <Link
            href="/admin/packages"
            className="text-orange-500 hover:text-orange-600 text-sm font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b border-gray-100">
                <th className="pb-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Package</th>
                <th className="pb-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Category</th>
                <th className="pb-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Price</th>
                <th className="pb-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Status</th>
                <th className="pb-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentPackages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-gray-50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {pkg.name}
                        </p>
                        <p className="text-xs text-gray-500">{pkg.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-gray-600" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {pkg.category}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {pkg.price}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      {pkg.featured && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                      {pkg.isSpecialOffer && (
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                          Offer
                        </span>
                      )}
                      {pkg.isNew && (
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/admin/packages/${pkg.id}/edit`}
                      className="text-orange-500 hover:text-orange-600 text-sm font-semibold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
