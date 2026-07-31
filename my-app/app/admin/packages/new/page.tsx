"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPackage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    slug: "",
    name: "",
    location: "",
    image: "",
    gallery: "",
    price: "",
    originalPrice: "",
    discount: "",
    duration: "",
    rating: "4.5",
    reviews: "100",
    category: "Mountain",
    highlights: "",
    groupSize: "2–10",
    featured: false,
    isSpecialOffer: false,
    isNew: true,
    bestTime: "",
    description: "",
    itinerary: "",
    inclusions: "",
    exclusions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        rating: parseFloat(form.rating) || 0,
        reviews: parseInt(form.reviews) || 0,
        gallery: form.gallery
          ? form.gallery.split("\n").map((s) => s.trim()).filter(Boolean)
          : [],
        highlights: form.highlights
          ? form.highlights.split("\n").map((s) => s.trim()).filter(Boolean)
          : [],
        itinerary: form.itinerary
          ? form.itinerary.split("\n").filter(Boolean).map((line) => {
              const match = line.match(/^(Day \d+[-\d]*):\s*(.+?)\s*[-–]\s*(.+)$/);
              if (match) {
                return { day: match[1], title: match[2], text: match[3] };
              }
              return { day: "", title: line, text: "" };
            })
          : [],
        inclusions: form.inclusions
          ? form.inclusions.split("\n").map((s) => s.trim()).filter(Boolean)
          : [],
        exclusions: form.exclusions
          ? form.exclusions.split("\n").map((s) => s.trim()).filter(Boolean)
          : [],
      };

      const res = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create package");
        return;
      }

      router.push("/admin/packages");
    } catch (err) {
      setError("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/admin/packages"
            className="text-orange-500 hover:text-orange-600 text-sm font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ← Back to Packages
          </Link>
          <h1
            className="text-2xl font-bold text-gray-800 mt-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Add New Package
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 admin-form">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Package Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Slug (auto-generated)
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                placeholder="e.g., Rajasthan, India"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                required
              >
                <option value="Mountain">Mountain</option>
                <option value="Beach">Beach</option>
                <option value="Heritage">Heritage</option>
                <option value="Adventure">Adventure</option>
                <option value="Pilgrimage">Pilgrimage</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Main Image URL *
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                placeholder="/images/YourImage.jpg or https://..."
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Pricing & Duration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Price *
              </label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                placeholder="₹5,499"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Original Price
              </label>
              <input
                type="text"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                placeholder="₹7,499"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Discount
              </label>
              <input
                type="text"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                placeholder="27% OFF"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                placeholder="3 Days / 2 Nights"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Reviews Count
              </label>
              <input
                type="number"
                name="reviews"
                value={form.reviews}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Group Size
              </label>
              <input
                type="text"
                name="groupSize"
                value={form.groupSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                placeholder="2–12"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Best Time
              </label>
              <input
                type="text"
                name="bestTime"
                value={form.bestTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white"
                placeholder="October �� June"
              />
            </div>
          </div>
        </div>

        {/* Gallery & Highlights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gallery & Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Gallery Images (one URL per line)
              </label>
              <textarea
                name="gallery"
                value={form.gallery}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white text-sm"
                placeholder="/images/photo1.jpg&#10;/images/photo2.jpg&#10;https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Highlights (one per line)
              </label>
              <textarea
                name="highlights"
                value={form.highlights}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white text-sm"
                placeholder="Lake Boating&#10;Mall Road&#10;Snow View"
              />
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Itinerary
          </h2>
          <p className="text-sm text-gray-500 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Format: Day X: Title - Description (one per line)
          </p>
          <textarea
            name="itinerary"
            value={form.itinerary}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white text-sm"
            placeholder="Day 1: Arrival & Lake Tour - Arrive in Nainital, check in to hotel.&#10;Day 2: Sightseeing - Visit Snow View Point via ropeway."
          />
        </div>

        {/* Inclusions & Exclusions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Inclusions & Exclusions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Inclusions (one per line)
              </label>
              <textarea
                name="inclusions"
                value={form.inclusions}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white text-sm"
                placeholder="2 nights hotel accommodation&#10;Daily breakfast & dinner&#10;Airport transfers"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Exclusions (one per line)
              </label>
              <textarea
                name="exclusions"
                value={form.exclusions}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-black bg-white text-sm"
                placeholder="Travel to / from destination&#10;Lunch not included&#10;Personal expenses"
              />
            </div>
          </div>
        </div>

        {/* Flags */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Visibility Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Popular Package
                </p>
                <p className="text-xs text-gray-500">Show in Popular Packages section</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                name="isSpecialOffer"
                checked={form.isSpecialOffer}
                onChange={handleChange}
                className="w-5 h-5 text-purple-500 rounded focus:ring-purple-500"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Special Offer
                </p>
                <p className="text-xs text-gray-500">Show in Special Offers section</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                name="isNew"
                checked={form.isNew}
                onChange={handleChange}
                className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                  New Package
                </p>
                <p className="text-xs text-gray-500">Show notification badge</p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {saving ? "Creating..." : "Create Package"}
          </button>
          <Link
            href="/admin/packages"
            className="text-gray-600 hover:text-gray-800 font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
