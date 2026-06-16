import React from 'react';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Explore The World With Us
        </h1>
        <p className="text-white/80 text-base md:text-lg mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
          Discover amazing destinations and unforgettable experiences
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-2xl max-w-md mx-auto mb-8">
          <div className="flex items-center px-4 py-3 flex-1 gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search destination..." style={{ fontFamily: "'Playfair Display', serif" }}
              className="outline-none text-sm text-gray-700 flex-1 bg-transparent"
            />
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Search
          </button>
        </div>

        <button className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg text-sm tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
          Book Journey
        </button>
      </div>
    </section>
  );
}
