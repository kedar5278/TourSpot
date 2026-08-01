"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Package {
  slug: string;
  name: string;
  location: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  duration: string;
  rating: number;
  reviews: number;
  category: string;
  highlights: string[];
  groupSize: string;
  featured?: boolean;
  description: string;
  bestTime: string;
  itinerary: { day: string; title: string; text: string }[];
  inclusions: string[];
  exclusions: string[];
}

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const categories = ["All", "Mountain", "Beach", "Heritage", "Adventure", "Pilgrimage"];

  // New package form state
  const [form, setForm] = useState({
    slug: "",
    name: "",
    location: "",
    image: "",
    price: "",
    originalPrice: "",
    discount: "",
    duration: "",
    rating: 0,
    reviews: 0,
    category: "Mountain",
    highlights: "",
    groupSize: "2–10",
    featured: false,
    bestTime: "",
    description: "",
    inclusions: "",
    exclusions: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/admin/packages");
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      slug: "", name: "", location: "", image: "", price: "",
      originalPrice: "", discount: "", duration: "", rating: 0,
      reviews: 0, category: "Mountain", highlights: "", groupSize: "2–10",
      featured: false, bestTime: "", description: "", inclusions: "", exclusions: "",
    });
  };

  // Add Package
  const handleAdd = async () => {
    try {
      const res = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
          highlights: form.highlights.split(",").map((h) => h.trim()).filter(Boolean),
          inclusions: form.inclusions.split(",").map((i) => i.trim()).filter(Boolean),
          exclusions: form.exclusions.split(",").map((e) => e.trim()).filter(Boolean),
          itinerary: [{ day: "Day 1", title: "Arrival", text: "Welcome to " + form.name }],
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        resetForm();
        fetchPackages();
        showSuccess("Package added successfully!");
      }
    } catch (error) {
      console.error("Failed to add package:", error);
    }
  };

  // Delete Package
  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      const res = await fetch(`/api/admin/packages/${slug}`, { method: "DELETE" });
      if (res.ok) {
        fetchPackages();
        showSuccess("Package deleted!");
      }
    } catch (error) {
      console.error("Failed to delete package:", error);
    }
  };

  // Toggle Featured (Popular)
  const toggleFeatured = async (slug: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/packages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !current }),
      });
      if (res.ok) {
        fetchPackages();
        showSuccess(current ? "Removed from Popular" : "Added to Popular!");
      }
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  // Toggle Special Offer
  const toggleSpecialOffer = async (slug: string, currentDiscount: string | null | undefined) => {
    try {
      const res = await fetch(`/api/admin/packages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discount: currentDiscount ? null : "20% OFF",
        }),
      });
      if (res.ok) {
        fetchPackages();
        showSuccess(currentDiscount ? "Removed from Special Offers" : "Added to Special Offers!");
      }
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  // Edit Package
  const handleEdit = async () => {
    if (!editingPackage) return;
    try {
      const res = await fetch(`/api/admin/packages/${editingPackage.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          highlights: form.highlights.split(",").map((h) => h.trim()).filter(Boolean),
          inclusions: form.inclusions.split(",").map((i) => i.trim()).filter(Boolean),
          exclusions: form.exclusions.split(",").map((e) => e.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        setEditingPackage(null);
        resetForm();
        fetchPackages();
        showSuccess("Package updated!");
      }
    } catch (error) {
      console.error("Failed to update package:", error);
    }
  };

  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setForm({
      slug: pkg.slug,
      name: pkg.name,
      location: pkg.location,
      image: pkg.image,
      price: pkg.price,
      originalPrice: pkg.originalPrice || "",
      discount: pkg.discount || "",
      duration: pkg.duration,
      rating: pkg.rating,
      reviews: pkg.reviews,
      category: pkg.category,
      highlights: (pkg.highlights || []).join(", "),
      groupSize: pkg.groupSize,
      featured: pkg.featured || false,
      bestTime: pkg.bestTime || "",
      description: pkg.description || "",
      inclusions: (pkg.inclusions || []).join(", "),
      exclusions: (pkg.exclusions || []).join(", "),
    });
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || pkg.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const FormModal = ({ isEdit }: { isEdit: boolean }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { isEdit ? setEditingPackage(null) : setShowAddModal(false); resetForm(); }}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {isEdit ? "Edit Package" : "Add New Package"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Name", key: "name", required: true },
            { label: "Location", key: "location", required: true },
            { label: "Image URL", key: "image", required: true },
            { label: "Price (e.g. ₹5,999)", key: "price", required: true },
            { label: "Original Price", key: "originalPrice" },
            { label: "Discount (e.g. 20% OFF)", key: "discount" },
            { label: "Duration (e.g. 3 Days / 2 Nights)", key: "duration", required: true },
            { label: "Group Size", key: "groupSize" },
            { label: "Best Time", key: "bestTime" },
            { label: "Rating (0-5)", key: "rating", type: "number" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-xs font-semibold text-gray-600 block mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type || "text"}
                value={(form as any)[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-orange-300 outline-none"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-600 block mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-orange-300 outline-none"
            >
              {categories.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-600 block mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-orange-300 outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-600 block mb-1">Highlights (comma separated)</label>
            <input
              value={form.highlights}
              onChange={(e) => setForm({ ...form, highlights: e.target.value })}
              placeholder="Lake Boating, Mall Road, Snow View"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-orange-300 outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-600 block mb-1">Inclusions (comma separated)</label>
            <input
              value={form.inclusions}
              onChange={(e) => setForm({ ...form, inclusions: e.target.value })}
              placeholder="Hotel, Breakfast, Transfers"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-orange-300 outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-600 block mb-1">Exclusions (comma separated)</label>
            <input
              value={form.exclusions}
              onChange={(e) => setForm({ ...form, exclusions: e.target.value })}
              placeholder="Travel, Lunch, Personal expenses"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-orange-300 outline-none"
            />
          </div>
          <div className="sm:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-orange-500"
            />
            <label className="text-sm font-semibold text-gray-600">Add to Popular Packages</label>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={isEdit ? handleEdit : handleAdd}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {isEdit ? "Save Changes" : "Add Package"}
          </button>
          <button
            onClick={() => { isEdit ? setEditingPackage(null) : setShowAddModal(false); resetForm(); }}
            className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {successMsg && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
          ✅ {successMsg}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && <FormModal isEdit={false} />}

      {/* Edit Modal */}
      {editingPackage && <FormModal isEdit={true} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            Manage Packages
          </h1>
          <p className="text-sm text-gray-500 mt-1">{filteredPackages.length} packages total</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-lg">+</span> Add Package
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search packages..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  category === cat
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Packages List */}
      <div className="space-y-3">
        {filteredPackages.map((pkg) => (
          <div key={pkg.slug} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Image */}
              <img src={pkg.image} alt={pkg.name} className="w-full sm:w-24 h-32 sm:h-24 rounded-lg object-cover flex-shrink-0" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{pkg.name}</h3>
                    <p className="text-sm text-gray-500">{pkg.location} • {pkg.duration} • {pkg.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-800 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{pkg.price}</p>
                    {pkg.originalPrice && <p className="text-sm text-orange-500 line-through">{pkg.originalPrice}</p>}
                  </div>
                </div>

                {/* Badges & Actions */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {/* Popular Toggle */}
                  <button
                    onClick={() => toggleFeatured(pkg.slug, pkg.featured || false)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      pkg.featured
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-600"
                    }`}
                  >
                    {pkg.featured ? "★ Popular" : "+ Popular"}
                  </button>

                  {/* Special Offer Toggle */}
                  <button
                    onClick={() => toggleSpecialOffer(pkg.slug, pkg.discount)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      pkg.discount
                        ? "bg-purple-500 text-white hover:bg-purple-600"
                        : "bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-600"
                    }`}
                  >
                    {pkg.discount ? `🏷 ${pkg.discount}` : "+ Special Offer"}
                  </button>

                  {/* Rating */}
                  <span className="text-xs text-gray-500">⭐ {pkg.rating} ({pkg.reviews} reviews)</span>

                  <div className="flex-1" />

                  {/* Edit */}
                  <button
                    onClick={() => openEditModal(pkg)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    ✏️ Edit
                  </button>

                  {/* View */}
                  <Link
                    href={`/packages/${pkg.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                  >
                    👁 View
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(pkg.slug)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No packages found</p>
        </div>
      )}
    </div>
  );
}
