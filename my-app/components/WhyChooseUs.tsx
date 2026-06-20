import React from 'react';

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    bg: 'bg-orange-500',
    title: 'Best Travel Plans',
    desc: 'Expertly planned trips for unforgettable experiences',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    bg: 'bg-green-600',
    title: 'Luxury Hotels',
    desc: 'Carefully selected hotels for a luxurious stay',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    bg: 'bg-blue-600',
    title: 'Safe Journey',
    desc: 'Your safety is our priority every step of the way',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    bg: 'bg-pink-500',
    title: 'Affordable Price',
    desc: 'Great travel experiences at budget-friendly prices',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
        {/* Left text */}
        <div className="w-full md:w-1/3">
          <p className="text-orange-500 font-semibold text-sm mb-2 uppercase tracking-widest" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why Choose Us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
            Travel Made Easy With US
          </h2>
        </div>

        {/* Right grid */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((f) => (
            <div key={f.title} className="feature-card flex items-start gap-4">
              <div className={`feature-icon ${f.bg} p-3 rounded-xl flex-shrink-0 shadow-sm`}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {f.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
