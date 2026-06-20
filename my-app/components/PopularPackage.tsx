import React from 'react';
import Link from 'next/link';

const packages = [
  {
    name: 'Goa',
    slug: 'goa',
    location: 'India',
    price: '₹5,499',
    originalPrice: '₹7,499',
    image: '/images/Goa.jpg',
  },
  {
    name: 'Lakshadweep',
    slug: 'lakshadweep',
    location: 'India',
    price: '₹6,000',
    image: '/images/Lakshdweep.jpg',
  },
  {
    name: 'Manali',
    slug: 'manali',
    location: 'India',
    price: '₹7,500',
    image: '/images/Manali.jpg',
  },
  {
    name: 'North India',
    slug: 'northeast-india',
    location: 'India',
    price: '₹3,500',
    image: '/images/North India.jpg',
  },
];

export default function PopularPackages() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-white">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Popular Packages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {packages.map((pkg) => (
          <Link
            key={pkg.name}
            href={`/packages/${pkg.slug}`}
            className="card-hover rounded-2xl overflow-hidden shadow-md cursor-pointer group block"
          >
            {/* Image section */}
            <div className="relative h-48 sm:h-44 md:h-52 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <h3
                className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow-md"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {pkg.name}
              </h3>
            </div>

            {/* White info panel */}
            <div className="p-3 bg-white">
              <p className="text-sm sm:text-base text-gray-500 flex items-center gap-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z" />
                </svg>
                {pkg.location}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base sm:text-lg font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {pkg.price}
                </span>
                {pkg.originalPrice && (
                  <span className="text-sm sm:text-base text-orange-500 line-through" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {pkg.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
