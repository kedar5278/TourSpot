"use client";

import Link from "next/link";
import React, { useState } from "react";
import Footer from "./footer";
import { allPackages } from "@/data/packages";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiCalendar,
  FiUsers,
  FiMail,
  FiMapPin,
  FiShield,
  FiCreditCard,
  FiStar,
  FiClock,
  FiHeart,
  FiAlertCircle,
  FiCheck,
  FiXCircle,
} from "react-icons/fi";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3;

interface TravelerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface BookingState {
  travelDate: string;
  guests: number;
  travelers: TravelerInfo[];
  addOns: string[];
  specialRequests: string;
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  upiId: string;
}

const ADD_ONS = [
  { id: "travel-insurance", label: "Travel Insurance", price: 499, icon: "🛡️" },
  { id: "airport-pickup", label: "Airport Pickup", price: 799, icon: "🚖" },
  { id: "guided-tour", label: "Professional Guide", price: 999, icon: "🧭" },
  { id: "photography", label: "Trip Photography", price: 1499, icon: "📷" },
  { id: "adventure-kit", label: "Adventure Kit", price: 599, icon: "🎒" },
  { id: "luxury-upgrade", label: "Luxury Room Upgrade", price: 2499, icon: "⭐" },
];

const EMPTY_TRAVELER: TravelerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

// ─── Validation Helpers ─────────────────────────────────────────────────────

const NAME_REGEX = /^[a-zA-Z\s]{2,30}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian 10-digit mobile
const PINCODE_REGEX = /^\d{6}$/;
const MAX_SPECIAL_REQUEST_LEN = 500;

type TravelerErrors = Partial<Record<keyof TravelerInfo, string>>;

function validateTraveler(t: TravelerInfo): TravelerErrors {
  const errors: TravelerErrors = {};

  const firstName = t.firstName.trim();
  const lastName = t.lastName.trim();
  const email = t.email.trim();
  const phoneDigits = t.phone.replace(/\D/g, "");
  const pincode = t.pincode.trim();

  if (!firstName) errors.firstName = "First name is required";
  else if (!NAME_REGEX.test(firstName)) errors.firstName = "Only letters, min 2 characters";

  if (!lastName) errors.lastName = "Last name is required";
  else if (!NAME_REGEX.test(lastName)) errors.lastName = "Only letters, min 2 characters";

  if (!email) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Enter a valid email address";

  if (!phoneDigits) errors.phone = "Phone number is required";
  else if (!PHONE_REGEX.test(phoneDigits.slice(-10)) || phoneDigits.length !== 10)
    errors.phone = "Enter a valid 10-digit mobile number";

  if (pincode && !PINCODE_REGEX.test(pincode)) errors.pincode = "Enter a valid 6-digit pin code";

  return errors;
}

function isTravelerValid(t: TravelerInfo): boolean {
  return Object.keys(validateTraveler(t)).length === 0;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function parsePriceNumber(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { num: 1, label: "Trip Details" },
    { num: 2, label: "Travelers" },
    { num: 3, label: "Add-ons" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => (
        <React.Fragment key={s.num}>
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${current > s.num
                ? "bg-green-500 text-white"
                : current === s.num
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-gray-100 text-gray-400"
                }`}
            >
              {current > s.num ? <FiCheck className="text-sm" /> : s.num}
            </div>
            <span
              className={`mt-1.5 text-xs font-semibold hidden sm:block ${current >= s.num ? "text-orange-500" : "text-gray-400"
                }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 w-12 sm:w-20 mx-1 transition-all duration-500 ${current > s.num ? "bg-green-400" : "bg-gray-200"
                }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Summary Card ─────────────────────────────────────────────────────────────

function SummaryCard({
  pkg,
  booking,
}: {
  pkg: NonNullable<ReturnType<typeof allPackages.find>>;
  booking: BookingState;
}) {
  const base = parsePriceNumber(pkg.price) * booking.guests;
  const addOnTotal = booking.addOns.reduce((sum, id) => {
    const a = ADD_ONS.find((x) => x.id === id);
    return sum + (a ? a.price * booking.guests : 0);
  }, 0);
  const taxes = Math.round((base + addOnTotal) * 0.05);
  const total = base + addOnTotal + taxes;

  return (
    <div className="rounded-2xl border border-orange-100 bg-white shadow-md overflow-hidden sticky top-24">
      <div className="relative h-36 overflow-hidden">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <h3
            className="text-white font-bold text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pkg.name}
          </h3>
          <p className="text-white/80 text-xs flex items-center gap-1">
            <FiMapPin className="text-xs" /> {pkg.location}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {booking.travelDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiCalendar className="text-orange-400 flex-shrink-0" />
            <span style={{ fontFamily: "'Playfair Display', serif" }}>
              {new Date(booking.travelDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiUsers className="text-orange-400 flex-shrink-0" />
          <span style={{ fontFamily: "'Playfair Display', serif" }}>
            {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiClock className="text-orange-400 flex-shrink-0" />
          <span style={{ fontFamily: "'Playfair Display', serif" }}>{pkg.duration}</span>
        </div>

        <hr className="border-gray-100" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span style={{ fontFamily: "'Playfair Display', serif" }}>
              {pkg.price} × {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
            </span>
            <span style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{base.toLocaleString("en-IN")}
            </span>
          </div>
          {booking.addOns.length > 0 && (
            <div className="flex justify-between text-gray-600">
              <span style={{ fontFamily: "'Playfair Display', serif" }}>
                Add-ons ({booking.addOns.length})
              </span>
              <span style={{ fontFamily: "'Playfair Display', serif" }}>
                ₹{addOnTotal.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          <div className="flex justify-between text-gray-500 text-xs">
            <span style={{ fontFamily: "'Playfair Display', serif" }}>Taxes & fees (5%)</span>
            <span style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{taxes.toLocaleString("en-IN")}
            </span>
          </div>
          <hr className="border-gray-100" />
          <div className="flex justify-between font-bold text-gray-800 text-base">
            <span style={{ fontFamily: "'Playfair Display', serif" }}>Total</span>
            <span className="text-orange-500" style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="pt-2 space-y-1.5">
          {[
            { icon: <FiShield className="text-green-500" />, text: "Secure Booking" },
            { icon: <FiClock className="text-blue-500" />, text: "Free cancellation up to 48 hrs" },
            { icon: <FiStar className="text-orange-400" />, text: `Rated ${pkg.rating}/5 by travelers` },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500">
              {item.icon}
              <span style={{ fontFamily: "'Playfair Display', serif" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 1 — Trip Details ─────────────────────────────────────────────────────

function Step1({
  booking,
  pkg,
  onChange,
  showErrors,
}: {
  booking: BookingState;
  pkg: NonNullable<ReturnType<typeof allPackages.find>>;
  onChange: (k: keyof BookingState, v: BookingState[keyof BookingState]) => void;
  showErrors: boolean;
}) {
  const today = new Date().toISOString().split("T")[0];
  const maxGuests = Math.min(20, parseInt(String(pkg.groupSize || "20"), 10) || 20);

  const dateError = showErrors && !booking.travelDate ? "Please select a travel date" : "";
  const guestsError =
    showErrors && (booking.guests < 1 || booking.guests > maxGuests)
      ? `Guests must be between 1 and ${maxGuests}`
      : "";

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl font-bold text-gray-800 mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Trip Details
        </h2>
        <p className="text-gray-500 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
          Choose your travel date and the number of guests.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { icon: <FiClock className="text-orange-400" />, text: pkg.duration },
          { icon: <FiUsers className="text-orange-400" />, text: `${pkg.groupSize} guests max` },
          { icon: <FiMapPin className="text-orange-400" />, text: pkg.location },
        ].map((chip) => (
          <div
            key={chip.text}
            className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-700 text-xs px-3 py-1.5 rounded-full"
          >
            {chip.icon}
            <span style={{ fontFamily: "'Playfair Display', serif" }}>{chip.text}</span>
          </div>
        ))}
      </div>

      <div>
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Select Travel Date <span className="text-orange-500">*</span>
        </label>
        <div className="relative">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
          <input
            type="date"
            min={today}
            value={booking.travelDate}
            onChange={(e) => onChange("travelDate", e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm text-black focus:ring-2 outline-none transition-all ${
              dateError
                ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                : "border-gray-200 focus:ring-orange-300 focus:border-orange-400"
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          />
        </div>
        {dateError && (
          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            <FiAlertCircle className="text-xs" /> {dateError}
          </p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Number of Guests <span className="text-orange-500">*</span>
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onChange("guests", Math.max(1, booking.guests - 1))}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors font-bold text-lg"
          >
            −
          </button>
          <div className="flex-1 text-center">
            <span
              className="text-3xl font-bold text-gray-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {booking.guests}
            </span>
            <p className="text-xs text-gray-400" style={{ fontFamily: "'Playfair Display', serif" }}>
              {booking.guests === 1 ? "Guest" : "Guests"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange("guests", Math.min(maxGuests, booking.guests + 1))}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Group size: {pkg.groupSize} guests
        </p>
        {guestsError && (
          <p className="text-xs text-red-500 mt-1.5 text-center flex items-center justify-center gap-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            <FiAlertCircle className="text-xs" /> {guestsError}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            className="block text-sm font-semibold text-gray-700"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Special Requests <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <span className="text-xs text-gray-400" style={{ fontFamily: "'Playfair Display', serif" }}>
            {booking.specialRequests.length}/{MAX_SPECIAL_REQUEST_LEN}
          </span>
        </div>
        <textarea
          rows={3}
          maxLength={MAX_SPECIAL_REQUEST_LEN}
          value={booking.specialRequests}
          onChange={(e) => onChange("specialRequests", e.target.value)}
          placeholder="Dietary requirements, accessibility needs, special occasions..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none resize-none transition-all"
          style={{ fontFamily: "'Playfair Display', serif" }}
        />
      </div>

      <div className="rounded-xl bg-orange-50 border border-orange-100 p-4">
        <h4
          className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <FiHeart className="text-orange-500" /> Package Highlights
        </h4>
        <div className="flex flex-wrap gap-2">
          {pkg.highlights.map((h) => (
            <span
              key={h}
              className="text-xs text-orange-700 bg-white border border-orange-100 px-3 py-1 rounded-full flex items-center gap-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <FiCheckCircle className="text-orange-400 text-xs" /> {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Traveler Form ─────────────────────────────────────────────────────────────

function TravelerForm({
  index,
  data,
  errors,
  showErrors,
  onChange,
}: {
  index: number;
  data: TravelerInfo;
  errors: TravelerErrors;
  showErrors: boolean;
  onChange: (field: keyof TravelerInfo, val: string) => void;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const [touched, setTouched] = useState<Partial<Record<keyof TravelerInfo, boolean>>>({});

  const markTouched = (key: keyof TravelerInfo) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const fields: {
    key: keyof TravelerInfo;
    label: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    inputMode?: "numeric" | "text" | "email" | "tel";
    maxLength?: number;
  }[] = [
      { key: "firstName", label: "First Name", placeholder: "John", required: true },
      { key: "lastName", label: "Last Name", placeholder: "Doe", required: true },
      { key: "email", label: "Email", type: "email", placeholder: "john@example.com", required: true },
      { key: "phone", label: "Phone", type: "tel", placeholder: "9876543210", required: true, inputMode: "numeric", maxLength: 10 },
      { key: "address", label: "Address", placeholder: "123 Street, Area" },
      { key: "city", label: "City", placeholder: "Delhi" },
      { key: "state", label: "State", placeholder: "Maharashtra" },
      { key: "pincode", label: "Pin Code", placeholder: "400001", inputMode: "numeric", maxLength: 6 },
    ];

  const handleFieldChange = (f: typeof fields[number], raw: string) => {
    let value = raw;
    // Restrict phone / pincode to digits only
    if (f.key === "phone" || f.key === "pincode") {
      value = raw.replace(/\D/g, "").slice(0, f.maxLength);
    }
    onChange(f.key, value);
  };

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${expanded ? "bg-orange-50" : "bg-gray-50 hover:bg-orange-50/50"
          }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
            {index + 1}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
              {data.firstName || data.lastName
                ? `${data.firstName} ${data.lastName}`.trim()
                : `Traveler ${index + 1}`}
            </p>
            {index === 0 && (
              <p className="text-xs text-orange-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                Primary Contact
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showErrors && Object.keys(errors).length > 0 && (
            <span className="flex items-center gap-1 text-xs text-red-500 font-semibold">
              <FiAlertCircle /> {Object.keys(errors).length} issue{Object.keys(errors).length > 1 ? "s" : ""}
            </span>
          )}
          <span className="text-gray-400 text-lg">{expanded ? "−" : "+"}</span>
        </div>
      </button>

      {expanded && (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => {
            const errorMsg = errors[f.key];
            const shouldShowError = !!errorMsg && (showErrors || touched[f.key]);
            return (
              <div key={f.key} className={f.key === "address" ? "sm:col-span-2" : ""}>
                <label
                  className="block text-xs font-semibold text-gray-600 mb-1.5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {f.label}
                  {f.required && <span className="text-orange-500"> *</span>}
                </label>
                <input
                  type={f.type || "text"}
                  inputMode={f.inputMode}
                  maxLength={f.maxLength}
                  placeholder={f.placeholder}
                  value={data[f.key]}
                  onChange={(e) => handleFieldChange(f, e.target.value)}
                  onBlur={() => markTouched(f.key)}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm text-black focus:ring-2 outline-none transition-all ${
                    shouldShowError
                      ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                      : "border-gray-200 focus:ring-orange-300 focus:border-orange-400"
                  }`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
                {shouldShowError && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <FiAlertCircle className="text-xs flex-shrink-0" /> {errorMsg}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Step 2 — Traveler Info ────────────────────────────────────────────────────

function Step2({
  booking,
  onChange,
  showErrors,
}: {
  booking: BookingState;
  onChange: (k: keyof BookingState, v: BookingState[keyof BookingState]) => void;
  showErrors: boolean;
}) {
  const updateTraveler = (idx: number, field: keyof TravelerInfo, val: string) => {
    const updated = [...booking.travelers];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange("travelers", updated);
  };

  const travelerErrorsList = booking.travelers.map(validateTraveler);
  const hasAnyError = travelerErrorsList.some((e) => Object.keys(e).length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl font-bold text-gray-800 mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Traveler Information
        </h2>
        <p className="text-gray-500 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
          Please fill in details for all {booking.guests}{" "}
          {booking.guests === 1 ? "traveler" : "travelers"}.
        </p>
      </div>

      {showErrors && hasAnyError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
          <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-600 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
            Please correct the highlighted fields below before continuing.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {booking.travelers.map((t, i) => (
          <TravelerForm
            key={i}
            index={i}
            data={t}
            errors={travelerErrorsList[i]}
            showErrors={showErrors}
            onChange={(field, val) => updateTraveler(i, field, val)}
          />
        ))}
      </div>

      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <FiAlertCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700" style={{ fontFamily: "'Playfair Display', serif" }}>
          Please ensure all details match the traveler's government-issued ID. This information
          will be used for all travel arrangements.
        </p>
      </div>
    </div>
  );
}

// ─── Step 3 — Add-ons ─────────────────────────────────────────────────────────

function Step3({
  booking,
  onChange,
}: {
  booking: BookingState;
  onChange: (k: keyof BookingState, v: BookingState[keyof BookingState]) => void;
}) {
  const toggle = (id: string) => {
    const updated = booking.addOns.includes(id)
      ? booking.addOns.filter((x) => x !== id)
      : [...booking.addOns, id];
    onChange("addOns", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="text-2xl font-bold text-gray-800 mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Enhance Your Trip
        </h2>
        <p className="text-gray-500 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
          Optional add-ons to make your journey even more memorable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ADD_ONS.map((addon) => {
          const selected = booking.addOns.includes(addon.id);
          return (
            <button
              key={addon.id}
              type="button"
              onClick={() => toggle(addon.id)}
              className={`text-left rounded-xl border-2 p-4 transition-all duration-200 ${selected
                ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100"
                : "border-gray-100 bg-white hover:border-orange-200 hover:shadow-sm"
                }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{addon.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {addon.label}
                    </p>
                    <p className="text-orange-500 text-sm font-bold mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                      +₹{addon.price.toLocaleString("en-IN")} / person
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? "border-orange-500 bg-orange-500" : "border-gray-300"
                    }`}
                >
                  {selected && <FiCheck className="text-white text-xs" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {booking.addOns.length > 0 && (
        <div className="rounded-xl bg-green-50 border border-green-100 p-4">
          <p
            className="text-sm text-green-700 font-semibold flex items-center gap-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <FiCheckCircle className="text-green-500" />
            {booking.addOns.length} add-on{booking.addOns.length > 1 ? "s" : ""} selected — Great
            choice!
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Success Screen ────────────────────────────────────────────────────────────

function SuccessScreen({
  pkg,
  booking,
}: {
  pkg: NonNullable<ReturnType<typeof allPackages.find>>;
  booking: BookingState;
}) {
  const base = parsePriceNumber(pkg.price) * booking.guests;
  const addOnTotal = booking.addOns.reduce((sum, id) => {
    const a = ADD_ONS.find((x) => x.id === id);
    return sum + (a ? a.price * booking.guests : 0);
  }, 0);
  const taxes = Math.round((base + addOnTotal) * 0.05);
  const total = base + addOnTotal + taxes;
  const bookingId = `TS${Date.now().toString().slice(-8).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
            <FiCheckCircle className="text-white text-4xl" />
          </div>
          <h1
            className="text-3xl font-bold text-gray-800 mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Booking Confirmed! 🎉
          </h1>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your adventure is booked. Get ready for an amazing journey!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-5">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-xs opacity-80" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Booking ID
                </p>
                <p
                  className="text-xl font-bold tracking-wider"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  #{bookingId}
                </p>
              </div>
              <FiCheckCircle className="text-3xl opacity-90" />
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h3
                  className="font-bold text-gray-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {pkg.name}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <FiMapPin className="text-xs" /> {pkg.location}
                </p>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                {
                  label: "Travel Date",
                  value: booking.travelDate
                    ? new Date(booking.travelDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    : "—",
                },
                {
                  label: "Guests",
                  value: `${booking.guests} ${booking.guests === 1 ? "Person" : "Persons"}`,
                },
                { label: "Duration", value: pkg.duration },
                {
                  label: "Primary Contact",
                  value:
                    booking.travelers[0]?.firstName || booking.travelers[0]?.lastName
                      ? `${booking.travelers[0].firstName} ${booking.travelers[0].lastName}`.trim()
                      : "—",
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.label}
                  </p>
                  <p className="font-semibold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <hr className="border-gray-100" />

            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Total Paid
              </span>
              <span
                className="text-2xl font-bold text-orange-500"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            {booking.travelers[0]?.email && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-xs text-blue-700 border border-blue-100">
                <FiMail className="flex-shrink-0" />
                <span style={{ fontFamily: "'Playfair Display', serif" }}>
                  Confirmation sent to{" "}
                  <span className="font-semibold">{booking.travelers[0].email}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link href="/packages" className="flex-1">
            <button
              className="w-full btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore More Packages
            </button>
          </Link>
          <Link href="/" className="flex-1">
            <button
              className="w-full border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-full text-sm hover:border-orange-400 hover:text-orange-500 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PackageBooking({ slug }: { slug: string }) {
  const pkg = allPackages.find((p) => p.slug === slug);
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    travelDate: "",
    guests: 2,
    travelers: [{ ...EMPTY_TRAVELER }, { ...EMPTY_TRAVELER }],
    addOns: [],
    specialRequests: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    upiId: "",
  });

  const handleChange = (
    key: keyof BookingState,
    value: BookingState[keyof BookingState]
  ) => {
    setBooking((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "guests") {
        const g = value as number;
        const curr = prev.travelers;
        if (g > curr.length) {
          next.travelers = [
            ...curr,
            ...Array.from({ length: g - curr.length }, () => ({ ...EMPTY_TRAVELER })),
          ];
        } else {
          next.travelers = curr.slice(0, g);
        }
      }
      return next;
    });
  };

  const handleBooking = async () => {
    if (!pkg) return;

    const base = parsePriceNumber(pkg.price) * booking.guests;
    const addOnTotal = booking.addOns.reduce((sum, id) => {
      const a = ADD_ONS.find((x) => x.id === id);
      return sum + (a ? a.price * booking.guests : 0);
    }, 0);
    const taxes = Math.round((base + addOnTotal) * 0.05);
    const total = base + addOnTotal + taxes;

    const options = {
      key: "rzp_test_T7RTKPxEimUNbD", // 👈 paste your Key ID directly here
      amount: total * 100, // in paise
      currency: "INR",
      name: "TourSpot",
      description: pkg.name,
      prefill: {
        name: `${booking.travelers[0]?.firstName} ${booking.travelers[0]?.lastName}`,
        email: booking.travelers[0]?.email,
        contact: booking.travelers[0]?.phone,
      },
      theme: { color: "#f97316" },
      handler: async function (response: any) {
        try {
          const res = await fetch("/api/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              packageSlug: slug,
              packageName: pkg.name,
              packageImage: pkg.image,
              location: pkg.location,
              duration: pkg.duration,
              travelDate: booking.travelDate,
              guests: booking.guests,
              totalAmount: total,
              status: "Confirmed",
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error ?? "Failed to save booking");
          }

          console.log("Payment success:", response);
          console.log("Booking saved:", data.booking);
          setSubmitted(true);
        } catch (error: any) {
          console.error("Booking save failed:", error);
          alert(error.message || "Booking could not be saved. Please contact support.");
        }
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", (response: any) => {
      console.error("Payment failed reason:", response.error);
      alert("Payment failed: " + response.error.description);
    });
    rzp.open();
  };

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <FiXCircle className="text-orange-500 text-5xl mb-4" />
        <h1
          className="text-3xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Package Not Found
        </h1>
        <p className="text-gray-500 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          The package you're trying to book doesn't exist.
        </p>
        <Link href="/packages">
          <button
            className="btn-pro bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full text-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Browse All Packages
          </button>
        </Link>
      </div>
    );
  }

  if (submitted) {
    return <SuccessScreen pkg={pkg} booking={booking} />;
  }

  const maxGuests = Math.min(20, parseInt(String(pkg.groupSize || "20"), 10) || 20);

  const canProceed = () => {
    if (step === 1) {
      return !!booking.travelDate && booking.guests >= 1 && booking.guests <= maxGuests;
    }
    if (step === 2) {
      return booking.travelers.every((t) => isTravelerValid(t));
    }
    if (step === 3) return true;
    return true;
  };

  const handleContinue = () => {
    if (!canProceed()) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => (s + 1) as Step);
  };

  const handlePrevious = () => {
    setShowErrors(false);
    setStep((s) => (s - 1) as Step);
  };

  const handlePayNow = () => {
    if (!canProceed()) {
      setShowErrors(true);
      return;
    }
    handleBooking();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href={`/packages/${slug}`}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition-colors font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <FiArrowLeft /> Back to Package
          </Link>
          <h1
            className="text-base font-bold text-gray-800 hidden sm:block"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Book <span className="text-orange-500">{pkg.name}</span>
          </h1>
          <div
            className="text-xs text-gray-400 flex items-center gap-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <FiShield className="text-green-500" /> Secure Booking
          </div>
        </div>
      </div>

      {/* Hero strip */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <img
          src={pkg.gallery[0] || pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-10">
          <div>
            <p
              className="text-orange-300 text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              You're booking
            </p>
            <h2
              className="text-white text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {pkg.name}
            </h2>
            <p
              className="text-white/70 text-xs mt-1 flex items-center gap-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <FiMapPin className="text-xs" /> {pkg.location} &nbsp;·&nbsp; {pkg.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-3 gap-6 sm:gap-10">
        {/* Form column */}
        <div className="lg:col-span-2">
          <StepIndicator current={step} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            {step === 1 && (
              <Step1 booking={booking} pkg={pkg} onChange={handleChange} showErrors={showErrors} />
            )}
            {step === 2 && (
              <Step2 booking={booking} onChange={handleChange} showErrors={showErrors} />
            )}
            {step === 3 && <Step3 booking={booking} onChange={handleChange} />}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <FiArrowLeft /> Previous
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="btn-pro flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Continue <FiArrowRight />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePayNow}
                  className="btn-pro flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <FiCreditCard /> Pay Now ₹
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Summary column */}
        <div className="lg:col-span-1">
          <SummaryCard pkg={pkg} booking={booking} />
        </div>
      </div>
    </div>
  );
}