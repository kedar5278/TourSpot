import React from 'react';

const reviews = [
  {
    name: 'Priyanka Sharma',
    rating: 5,
    text: 'Amazing experience! The trip was well organised and the team was very supportive.',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    name: 'Rohit Verma',
    rating: 4,
    text: 'Great service and beautiful destinations. Highly recommend this tour!',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    name: 'Anjali Mehta',
    rating: 5,
    text: 'Everything was perfect. From booking to the journey. Will travel again with them.',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? 'text-orange-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-14 px-4 md:px-10 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                <Stars count={r.rating} />
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
