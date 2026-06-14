import React from 'react';

const stats = [
  { value: '2000+', label: 'Happy Customers' },
  { value: '10+ Year', label: 'Experience' },
  { value: '24/7', label: 'Support' },
];

export default function Stats() {
  return (
    <section className="py-14 px-4 md:px-10 bg-white">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-2xl md:text-3xl font-bold text-orange-500">{s.value}</p>
            <p className="text-gray-600 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
