"use client";

import Link from "next/link";
import React, { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Packages", href: "/packages" },
  { name: "Services", href: "/services" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className="text-white font-bold text-xl tracking-wide cursor-pointer" style={{ fontFamily: "'Playfair Display', serif" }}>
            Tour<span className="text-orange-400">Spot</span>
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="nav-link text-white text-15px font-medium hover:text-orange-400 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setOpen(!open)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              open
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-black/90 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-8 py-2 text-white hover:text-orange-400 text-sm"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}