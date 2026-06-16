"use client";

import Link from "next/link";
import React from "react";
import Footer from "./footer";
import { FiTarget, FiEye, FiUsers, FiShield, FiStar, FiHeart } from "react-icons/fi";

// ─── Icon Components ──────────────────────────────────────────────────────────

const TargetIcon = () => <FiTarget className="text-orange-500 text-3xl" />;
const EyeIcon = () => <FiEye className="text-orange-500 text-3xl" />;
const UsersIcon = () => <FiUsers className="text-orange-500 text-3xl" />;
const ShieldIcon = () => <FiShield className="text-orange-500 text-3xl" />;
const StarIcon = () => <FiStar className="text-orange-500 text-3xl" />;
const HeartIcon = () => <FiHeart className="text-orange-500 text-3xl" />;

// ─── Data ─────────────────────────────────────────────────────────────────────

const missionCards = [
    {
        icon: <TargetIcon />,
        title: "Our Vision",
        text: "To become a trusted and leading travel company, inspiring people to explore the world with confidence and excitement. We aim to connect travellers with new destinations, cultures, and unforgettable experiences.",
    },
    {
        icon: <EyeIcon />,
        title: "Our Mission",
        text: "To become a trusted and leading travel company, inspiring people to explore the world with confidence and excitement. We aim to connect travellers with new destinations, cultures, and unforgettable experiences.",
    },
];

const values = [
    {
        icon: <UsersIcon />,
        title: "Customer First",
        text: "We put our customers' happiness and satisfaction above everything else. Their trust and comfort remain our highest priorities.",
    },
    {
        icon: <ShieldIcon />,
        title: "Trust & Safety",
        text: "We ensure safe, reliable, and transparent travel experiences through trusted services and dedicated support.",
    },
    {
        icon: <StarIcon />,
        title: "Excellence",
        text: "We are committed to delivering the highest standards of quality, professionalism, and customer service in every journey.",
    },
    {
        icon: <HeartIcon />,
        title: "Passion",
        text: "We love what we do and are passionate about creating unforgettable travel experiences for every traveler.",
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    return (
        <div className="font-sans text-gray-800 bg-white">
            {/* ── Nav breadcrumb ── */}

            {/* ── Hero ── */}
            <section className="relative h-60 md:h-100">
                <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
                    alt="Mountain landscape"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute bottom-8 left-8">
                    <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight">About US</h1>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r to-transparent">
                    <Link href="/" className="text-sm text-orange-600 font-semibold hover:text-orange-700 transition-colors absolute top-4 right-10">
                        <button className="border border-orange-400 text-orange-500 px-3 py-1 rounded text-sm font-medium hover:text-orange-700 hover:border-orange-700 transition-colors">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </section>

            {/* ── Who We Are ── */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-2xl font-bold text-orange-500 mb-4">Who We Are</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Tour Spot is a passionate team of travel enthusiasts dedicated to making your travel dreams a reality.
                        We believe travel is more than just visiting new places — it's about creating memories that last a lifetime.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        With carefully crafted tour packages, expert guidance, and 24/7 support, we ensure a smooth and
                        unforgettable experience for every traveler.
                    </p>
                    <button className="border border-orange-400 text-orange-500 px-6 py-2 rounded text-sm font-medium hover:bg-orange-50 transition-colors">
                        Explore Packages
                    </button>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md">
                    <img
                        src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80"
                        alt="Group of travellers celebrating on a mountain"
                        className="w-full h-100 object-cover"
                    />
                </div>
            </section>

            {/* ── Mission & Vision ── */}
            <section className="bg-orange-50 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-center text-orange-500 text-sm font-semibold tracking-widest uppercase mb-1">
                        Our Mission
                    </p>
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-12">Our Mission &amp; Vision</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {missionCards.map((card) => (
                            <div
                                key={card.title}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100 flex flex-col gap-4"
                            >
                                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Our Values ── */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-center text-gray-500 text-sm font-semibold tracking-widest uppercase mb-1">
                        Our Values
                    </p>
                    <h2 className="text-center text-3xl font-bold text-orange-500 mb-12">What Drives Us</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="flex flex-col items-center text-center gap-3 p-6">
                                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
                                    {v.icon}
                                </div>
                                <h3 className="font-bold text-gray-800">{v.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
