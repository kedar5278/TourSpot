"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Packages", href: "/packages" },
  { name: "Services", href: "/services" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="absolute top-0 left-0 right-0 z-[9999] flex flex-col">
      <div className="relative flex items-center justify-between px-4 sm:px-6 md:px-8 py-4">

          {/* Logo */}
          <Link href="/">
            <span
              className="text-white font-bold text-xl tracking-wide cursor-pointer"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tour<span className="text-orange-400">Spot</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white hover:text-orange-400 transition-colors duration-300 text-base font-medium"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden text-white z-[9999] relative"
            aria-label="Toggle Menu"
          >
            {!open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-96 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}
        >
          <div className="backdrop-blur-md border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 text-white hover:text-orange-400 hover:bg-white/5 transition-all duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
    </nav>
  );
}
