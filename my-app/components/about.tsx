import React from "react";

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="h-[500px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-orange-400 mb-2">Back To Home</p>
            <h1 className="text-5xl font-bold text-white">About Us</h1>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-orange-500 font-semibold mb-4">Who We Are</h3>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-gray-600 leading-8 mb-6">
              Tour Spot is a passionate team of travel enthusiasts dedicated to
              helping people discover the world through unforgettable journeys.
              We provide trusted travel information, curated experiences, and
              travel packages for every explorer.
            </p>

            <p className="text-gray-600 leading-8 mb-6">
              We carefully craft travel experiences that inspire adventure,
              relaxation, and cultural exploration while ensuring comfort and
              safety.
            </p>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
              Explore Packages
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60"
            alt="Travelers"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-5xl mb-4">🎯</div>

            <h3 className="text-2xl font-bold text-orange-500 mb-4">
              Our Mission
            </h3>

            <p className="text-gray-600">
              To inspire and empower travelers by providing exceptional travel
              experiences, reliable guidance, and memorable adventures.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-5xl mb-4">👁️</div>

            <h3 className="text-2xl font-bold text-orange-500 mb-4">
              Our Vision
            </h3>

            <p className="text-gray-600">
              To become the most trusted travel platform connecting people with
              the beauty and culture of destinations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-orange-500 font-semibold">
            Our Values
          </p>

          <h2 className="text-center text-4xl font-bold mb-12">
            What Drives Us
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="border rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold mb-2">Customer First</h3>
              <p className="text-gray-600 text-sm">
                Delivering memorable travel experiences for every customer.
              </p>
            </div>

            <div className="border rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-bold mb-2">Travel & Safety</h3>
              <p className="text-gray-600 text-sm">
                Ensuring safety and comfort throughout every journey.
              </p>
            </div>

            <div className="border rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-bold mb-2">Adventure</h3>
              <p className="text-gray-600 text-sm">
                Encouraging exploration and unforgettable discoveries.
              </p>
            </div>

            <div className="border rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="font-bold mb-2">Passion</h3>
              <p className="text-gray-600 text-sm">
                Passionately helping people explore the world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}