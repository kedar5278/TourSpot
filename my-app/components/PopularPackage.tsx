import React from 'react';
import Image from 'next/image';

const packages = [
  {
    name: 'Nainital',
    location: 'India',
    price: '₹5,499',
    originalPrice: '₹7,499',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80',
  },
  {
    name: 'Jaipur',
    location: 'India',
    price: '₹6,000',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80',
  },
  {
    name: 'Kerala',
    location: 'India',
    price: '₹7,500',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80',
  },
  {
    name: 'Ujjain',
    location: 'India',
    price: '₹3,500',
    image: 'https://images.unsplash.com/photo-1545126222-f6b43f9d3e62?w=400&q=80',
  },
];

export default function PopularPackages() {
  return (
    <section className="py-14 px-4 md:px-10 bg-white">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Popular Packages</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="rounded-4xl w-80 h-80 overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
          >
            <div className="relative h-44 md:h-55 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow-md">
                {pkg.name}
              </h3>
            </div>
            <div className="p-3 bg-white">
              <p className="text-xl text-gray-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z" />
                </svg>
                {pkg.location}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-gray-800">{pkg.price}</span>
                {pkg.originalPrice && (
                  <span className="text-xl text-orange-500 line-through">{pkg.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
