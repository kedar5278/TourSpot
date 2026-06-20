import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const cols = [
    {
      title: 'TourSpot',
      items: ['We help you explore the world with curated travel experiences at the best prices.'],
      isBrand: true, 
      href: '/',
    },
    {
      title: 'Menu',
      items: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Packages', href: '/packages' },
        { label: 'Services', href: '/services' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Places',
      items: [
        { label: 'Nainital', href: '/packages/nainital' },
        { label: 'Jaipur', href: '/packages/jaipur' },
        { label: 'Kerala', href: '/packages/kerala' },
        { label: 'Ujjain', href: '/packages/ujjain' },
        { label: 'Northeast India', href: '/packages/northeast-india' },
      ],
    },
    {
      title: 'Services',
      items: [
        { label: 'Hotel Booking', href: '/services/book/hotel-booking' },
        { label: 'Flight Booking', href: '/services/book/flight-booking' },
        { label: 'Tour Guide', href: '/services/book/tour-guide' },
        { label: 'Travel Insurance', href: '/services/book/train-booking' },
        { label: 'Visa Help', href: '/services/book/bus-booking' },
      ],
    },
    {
      title: 'Contact',
      items: ['+91 98765 43210', 'hello@tourspot.in', 'Ahmedabad, Gujarat'],
      href: '/',
    },
  ];

  return (
    <footer
      className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-10 text-white"
      style={{
        backgroundImage: "url('/images/footer.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {cols.map((col) => (
          <div key={col.title} className={col.isBrand ? 'col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1' : ''}>
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-orange-400" style={{ fontFamily: "'Playfair Display', serif" }}>
              {col.title}
            </h3>
            {col.isBrand ? (
              <>
                <p className="text-white text-xs leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {col.items[0]}
                </p>
                <div className="flex gap-3">
                  {['facebook', 'instagram', 'twitter'].map((s) => (
                    <a key={s} href="#" className="social-btn w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-[10px] capitalize text-white">{s[0].toUpperCase()}</span>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ul className="space-y-2">
                {col.items.map((item) => {
                  const label = typeof item === 'string' ? item : item.label;
                  const href = typeof item === 'string' ? '#' : item.href;

                  return (
                    <li key={label}>
                      {typeof item === 'object' ? (
                        <Link href={href} className="text-white text-[14px] hover:text-gray-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {label}
                        </Link>
                      ) : (
                        <span className="text-white text-[14px] hover:text-gray-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-gray-500 text-xs" style={{ fontFamily: "'Playfair Display', serif" }}>
        © 2026 TourSpot. All rights reserved.
      </div>
    </footer>
  );
}
