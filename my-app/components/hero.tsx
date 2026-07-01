"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { allPackages } from '@/data/packages';

export default function Hero() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const matches = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];

    return allPackages.filter((pkg) => {
      const haystack = `${pkg.name} ${pkg.location} ${pkg.category} ${pkg.highlights.join(' ')}`.toLowerCase();
      return haystack.includes(value);
    });
  }, [query]);

  const trimmedQuery = query.trim();
  const showNotFound = trimmedQuery.length >= 2 && matches.length === 0 && !error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Block invalid characters (only letters, numbers, spaces allowed)
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      setError("Special characters aren't allowed");
      return;
    }

    setQuery(value);
    if (error) setError('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setError('Please enter a destination to search');
      return;
    }

    if (trimmed.length < 2) {
      setError('Please enter at least 2 characters');
      return;
    }

    if (matches.length === 0) {
      // Stay on page and show "not found" state instead of redirecting
      return;
    }

    setError('');
    window.location.href = `/packages/${matches[0].slug}`;
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-2">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Explore The India With Us
        </h1>
        <p
          className="text-white/80 text-sm sm:text-base md:text-lg mb-8 sm:mb-10"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Discover amazing destinations and unforgettable experiences
        </p>

        <form onSubmit={handleSearch} className="mx-auto mb-6 sm:mb-8 max-w-md" noValidate>
          <div
            className={`flex items-center bg-white rounded-full overflow-hidden shadow-2xl transition-all ${
              error ? 'ring-2 ring-red-400' : ''
            }`}
          >
            <div className="flex items-center px-2 py-3 flex-1 gap-2">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search destination..."
                maxLength={50}
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="outline-none text-sm text-gray-700 flex-1 min-w-0 bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-3 md:px-4 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Search
            </button>
          </div>

          {/* Validation error */}
          {error && (
            <p
              className="mt-2 text-left text-xs sm:text-sm text-red-300 font-medium px-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {error}
            </p>
          )}

          {/* Suggestions - matches found */}
          {!error && trimmedQuery && matches.length > 0 && (
            <div className="mt-2 rounded-2xl border border-white/20 bg-white/95 p-2 text-left shadow-lg">
              {matches.slice(0, 4).map((pkg) => (
                <a
                  key={pkg.slug}
                  href={`/packages/${pkg.slug}`}
                  className="block rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  <span className="font-semibold">{pkg.name}</span>
                  <span className="ml-2 text-xs text-gray-500">{pkg.location}</span>
                </a>
              ))}
            </div>
          )}

          {/* No packages found */}
          {showNotFound && (
            <div className="mt-2 rounded-2xl border border-white/20 bg-white/95 p-4 text-center shadow-lg">
              <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Playfair Display', serif" }}>
                No packages found
              </p>
              <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                We couldn't find any destination matching "{trimmedQuery}"
              </p>
              <Link
                href="/packages"
                className="inline-block mt-3 text-xs font-semibold text-orange-500 hover:text-orange-600 underline"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Browse all packages
              </Link>
            </div>
          )}
        </form>

        <Link
          href="/packages"
          className="btn-pro inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg text-sm tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Book Journey
        </Link>
      </div>
    </section>
  );
}