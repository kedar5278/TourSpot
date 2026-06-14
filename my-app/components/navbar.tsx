"use client"

import React, { useState } from 'react';

const navLinks = ['Home', 'About', 'Packages', 'Services', 'Contact Us'];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-2">
        <span className="text-white font-bold text-xl tracking-wide">Tour<span className="text-orange-400">Spot</span></span>
      </div>

      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((l) => (
          <li key={l}>
            <a href="#" className="text-white text-sm font-medium hover:text-orange-400 transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-black/90 py-4 md:hidden">
          {navLinks.map((l) => (
            <a key={l} href="#" className="block px-8 py-2 text-white hover:text-orange-400 text-sm">
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
