"use client";

import Link from "next/link";
import React, { useState } from "react";
import Footer from "./footer";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiSend,
} from "react-icons/fi";

// ─── Component ────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* ── Hero Banner ── */}
      <section className="relative h-52 md:h-64">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&q=80"
          alt="Contact us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <p
            className="text-orange-400 text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get In Touch
          </p>
          <h1
            className="text-white text-3xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Us
          </h1>
        </div>
        <Link
          href="/"
          className="absolute top-4 right-6 md:right-10"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <button className="border border-white text-white px-3 py-1 rounded text-sm font-semibold hover:text-orange-500 hover:border-orange-500 transition-colors">
            Back to Home
          </button>
        </Link>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="max-w-5xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <FiPhone className="text-orange-500 text-xl" />,
              title: "Phone",
              lines: ["+91 98765 43210", "+91 98765 43211"],
            },
            {
              icon: <FiMail className="text-orange-500 text-xl" />,
              title: "Email",
              lines: ["hello@tourspot.in", "support@tourspot.in"],
            },
            {
              icon: <FiMapPin className="text-orange-500 text-xl" />,
              title: "Address",
              lines: ["Ahmedabad, Gujarat", "India – 380015"],
            },
            {
              icon: <FiClock className="text-orange-500 text-xl" />,
              title: "Working Hours",
              lines: ["Mon – Sat: 9AM – 8PM", "Sun: 10AM – 5PM"],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-lg border border-orange-100 p-5 flex flex-col items-center text-center gap-2"
            >
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
                {item.icon}
              </div>
              <h3
                className="font-bold text-gray-800 text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {item.title}
              </h3>
              {item.lines.map((line) => (
                <p
                  key={line}
                  className="text-gray-500 text-xs"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — Message */}
          <div>
            <p
              className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Send a Message
            </p>
            <h2
              className="text-2xl font-bold text-gray-800 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              We'd Love to Hear from You
            </h2>
            <p
              className="text-gray-500 text-sm leading-relaxed mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Have a question, need help with a booking, or want a customised
              travel plan? Drop us a message and our team will get back to you
              within 24 hours.
            </p>

            <div className="space-y-3">
              {[
                "Personalised travel itineraries",
                "Group & corporate tour packages",
                "Visa & documentation assistance",
                "24/7 emergency travel support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-600"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <FiCheckCircle className="text-orange-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div className="rounded-2xl border border-green-100 bg-green-50 p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <FiCheckCircle className="text-green-500 text-3xl" />
                </div>
                <h3
                  className="text-xl font-bold text-gray-800 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Message Sent!
                </h3>
                <p
                  className="text-gray-500 text-sm mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-orange-500 font-semibold text-sm hover:text-orange-600"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="text-xs font-semibold text-gray-700 block mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-semibold text-gray-700 block mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="text-xs font-semibold text-gray-700 block mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-semibold text-gray-700 block mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Subject
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none bg-white">
                    <option>General Enquiry</option>
                    <option>Booking Help</option>
                    <option>Custom Package</option>
                    <option>Complaint</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label
                    className="text-xs font-semibold text-gray-700 block mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="book-now-btn w-full inline-flex items-center justify-center gap-2 font-semibold text-sm border border-orange-500 text-orange-500 px-5 py-3 rounded-full"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span className="book-now-text">Send Message</span>
                  <FiSend className="book-now-arrow text-sm" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
