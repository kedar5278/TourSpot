"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Packages", href: "/packages" },
  { name: "Services", href: "/services" },
  { name: "Contact Us", href: "/contact" },
];

/** Shown when the user is NOT signed in — generic profile icon with a dropdown */
function GuestProfileDropdown() {
  const [dropOpen, setDropOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setDropOpen((prev) => !prev)}
        className="flex items-center text-white hover:text-orange-400 transition-colors duration-300 focus:outline-none"
        title="Account"
        aria-label="Open account menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </button>

      {/* Dropdown */}
      {dropOpen && (
        <div
          className="absolute right-0 mt-3 w-48 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{
            background: "linear-gradient(135deg, rgba(15,15,30,0.95) 0%, rgba(30,20,50,0.97) 100%)",
            backdropFilter: "blur(20px)",
            animation: "fadeSlideDown 0.18s ease",
          }}
        >
          {/* Arrow pointer */}
          <div
            className="absolute -top-2 right-4 w-4 h-4 rotate-45 border-t border-l border-white/10"
            style={{ background: "rgba(15,15,30,0.95)" }}
          />

          <div className="relative p-3 flex flex-col gap-2">
            <SignInButton mode="modal">
              <button
                onClick={() => setDropOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/90 hover:bg-white/10 hover:text-orange-400 transition-all duration-200 text-sm font-medium text-left"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </button>
            </SignInButton>

            <div className="h-px bg-white/10 mx-2" />

            <SignUpButton mode="modal">
              <button
                onClick={() => setDropOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-orange-500/90 hover:bg-orange-500 text-white transition-all duration-200 text-sm font-medium text-left"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/** Extracted as a top-level component to avoid hydration mismatch */
function IconCluster({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <div className={`flex items-center gap-5 ${mobile ? "p-6" : "ml-6"}`}>
      {/* History Icon */}
      <Link
        href="/history"
        onClick={onClose}
        className="flex items-center text-white hover:text-orange-400 transition-colors duration-300"
        title="Booking History"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </Link>

      {/* Profile: dropdown for guests, UserButton for signed-in */}
      <Show when="signed-out">
        <GuestProfileDropdown />
      </Show>
      <Show when="signed-in">
        <div className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-6 h-6",
              },
            }}
          />
        </div>
      </Show>
    </div>
  );
}

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
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
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

          <IconCluster />
        </div>

        {/* Mobile Toggle */}
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
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open
            ? "max-h-[500px] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
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

          <IconCluster mobile onClose={() => setOpen(false)} />
        </div>
      </div>
    </nav>
  );
}