"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminPackages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Mountain", "Beach", "Heritage", "Adventure", "Pilgrimage"];

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category !== "All") params.set("category", category);

      const res = await fetch(`/api/admin/packages?${params.toString()}`);
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchPackages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPackages(packages.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete package:", error);
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !current }),
      });

      if (res.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error("Failed to update package:", error);
    }
  };

  const toggleSpecialOffer = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSpecialOffer: !current }),
      });

      if (res.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error("Failed to update package:", error);
    }
  };

  const toggleNew = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isNew: !current }),
      });

      if (res.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error("Failed to update package:", error);
    }
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1
          className="text-2xl font-bold text-gray-800"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Manage Packages
        </h1>
        <Link
          href="/admin/packages/new"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          + Add Package
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search packages..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setLoading(true);
                  setTimeout(() => fetchPackages(), 100);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  category === cat
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-sm">
                <th className="px-6 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Package</th>
                <th className="px-6 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Category</th>
                <th className="px-6 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Price</th>
                <th className="px-6 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Duration</th>
                <th className="px-6 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Popular</th>
                <th className="px-6 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Offer</th>
                <th className="px-6 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>New</th>
                <th className="px-6 py-3 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {pkg.name}
                        </p>
                        <p className="text-xs text-gray-500">{pkg.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {pkg.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {pkg.price}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {pkg.duration}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFeatured(pkg.id, pkg.featured)}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        pkg.featured ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          pkg.featured ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleSpecialOffer(pkg.id, pkg.isSpecialOffer)}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        pkg.isSpecialOffer ? "bg-purple-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          pkg.isSpecialOffer ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleNew(pkg.id, pkg.isNew)}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        pkg.isNew ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          pkg.isNew ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/packages/${pkg.id}/edit`}
                        className="text-blue-500 hover:text-blue-600"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/packages/${pkg.slug}`}
                        target="_blank"
                        className="text-green-500 hover:text-green-600"
                        title="View"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500" style={{ fontFamily: "'Playfair Display', serif" }}>
              No packages found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
