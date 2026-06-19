import React from 'react';

export default function Footer() {
  const cols = [
    {
      title: 'TourSpot',
      items: ['We help you explore the world with curated travel experiences at the best prices.'],
      isBrand: true, 
    },
    {
      title: 'Menu',
      items: ['Home', 'About', 'Packages', 'Services', 'Contact Us'],
    },
    {
      title: 'Places',
      items: ['Nainital', 'Jaipur', 'Kerala', 'Ujjain', 'Northeast India'],
    },
    {
      title: 'Services',
      items: ['Hotel Booking', 'Flight Booking', 'Tour Guide', 'Travel Insurance', 'Visa Help'],
    },
    {
      title: 'Contact',
      items: ['+91 98765 43210', 'hello@tourspot.in', 'Ahmedabad, Gujarat'],
    },
  ];

  return (
    <footer
      className="relative py-16 px-4 md:px-10 text-white"
      style={{
        backgroundImage: "url('/images/footer.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {cols.map((col) => (
          <div key={col.title} className={col.isBrand ? 'col-span-2 md:col-span-1' : ''}>
            <h3 className="font-bold text-2xl mb-4 text-orange-400" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white text-[14px] hover:text-gray-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item}
                    </a>
                  </li>
                ))}
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
