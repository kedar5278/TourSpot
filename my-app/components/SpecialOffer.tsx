import React from 'react';

const offers = [
  {
    name: 'Varanasi',
    location: 'India',
    price: '₹4,999',
    originalPrice: '₹7,499',
    image: 'https://images.unsplash.com/photo-1561361058-c24e09e0b2a1?w=400&q=80',
    badge: null,
  },
  {
    name: 'Northeast India',
    location: 'India',
    price: '₹9,999',
    originalPrice: '₹12,000',
    image: 'https://images.unsplash.com/photo-1600175079-0ece4d83ef3e?w=400&q=80',
    badge: null,
  },
  {
    name: 'Statue of Unity',
    location: 'India',
    price: '₹5,999',
    originalPrice: '₹7,999',
    image: 'https://images.unsplash.com/photo-1599232288111-29ea78231b29?w=400&q=80',
    badge: null,
  },
  {
    name: 'Lakshadweep',
    location: 'India',
    price: '₹22,000',
    originalPrice: '₹38,000',
    image: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=400&q=80',
    badge: 'Lakshadweep\nOfficial',
  },
];

export default function SpecialOffers() {
  return (
    <section className="py-14 px-4 md:px-10 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
        Special Offers
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {offers.map((offer) => (
          <div
            key={offer.name}
            className="card-hover rounded-4xl w-80 h-80 overflow-hidden shadow-md cursor-pointer group relative"
          >
            {/* Image section */}
            <div className="relative h-44 md:h-55 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.name}
                className="img-zoom w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {offer.badge && (
                <div
                  className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded text-center leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {offer.badge.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                </div>
              )}
              <h3
                className="absolute bottom-3 left-3 text-white font-bold text-base drop-shadow-md"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {offer.name}
              </h3>
            </div>

            {/* White info panel — original design */}
            <div className="p-3 bg-white">
              <p className="text-xl text-gray-500 flex items-center gap-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z" />
                </svg>
                {offer.location}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {offer.price}
                </span>
                <span className="text-xl text-orange-500 line-through" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {offer.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
