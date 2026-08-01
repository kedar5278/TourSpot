"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Notification {
  id: string;
  name: string;
  slug: string;
  image: string;
  location: string;
  price: string;
  discount?: string;
  createdAt: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    fetchNotifications();
    // Check for new notifications every 5 minutes
    const interval = setInterval(fetchNotifications, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      const newNotifications = data.notifications || [];
      setNotifications(newNotifications);
      setHasNew(newNotifications.length > 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const clearNotifications = () => {
    setHasNew(false);
  };

  return (
    <div className="relative">
      <button
        suppressHydrationWarning
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) clearNotifications();
        }}
        className="relative flex items-center text-white hover:text-orange-400 transition-colors duration-300"
        title="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {hasNew && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">{notifications.length}</span>
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 mt-3 w-80 sm:w-96 z-[9999] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,15,30,0.98) 0%, rgba(30,20,50,0.99) 100%)",
              backdropFilter: "blur(20px)",
              animation: "fadeSlideDown 0.18s ease",
            }}
          >
            {/* Arrow pointer */}
            <div
              className="absolute -top-2 right-4 w-4 h-4 rotate-45 border-t border-l border-white/10"
              style={{ background: "rgba(15,15,30,0.98)" }}
            />

            <div className="p-4">
              <h3
                className="text-white font-bold text-sm mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                New Package Alerts
              </h3>

              {notifications.length === 0 ? (
                <div className="py-6 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-600 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                    No new packages yet
                  </p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto space-y-2">
                  {notifications.map((notif) => (
                    <Link
                      key={notif.id}
                      href={`/packages/${notif.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={notif.image}
                        alt={notif.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-white text-sm font-semibold truncate"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {notif.name}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {notif.location}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-orange-400 text-xs font-bold">
                            {notif.price}
                          </span>
                          {notif.discount && (
                            <span className="bg-green-500/20 text-green-400 text-[10px] px-1.5 py-0.5 rounded">
                              {notif.discount}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {notifications.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <Link
                    href="/packages"
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-orange-400 text-xs font-semibold hover:text-orange-300"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    View All Packages →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
