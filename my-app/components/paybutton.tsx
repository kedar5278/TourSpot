"use client";

import Script from "next/script";

interface PayButtonProps {
  amount: number; // in ₹
  bookingDetails: {
    name: string;
    email: string;
    phone: string;
    description?: string;
  };
  onSuccess?: (response: any) => void;
  onFailure?: (error: any) => void;
}

export default function PayButton({
  amount,
  bookingDetails,
  onSuccess,
  onFailure,
}: PayButtonProps) {
  const handlePayment = async () => {
    // Step 1: Create order
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const order = await res.json();

    // Step 2: Open Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "TourSpot",
      description: bookingDetails.description || "Tour Booking",
      order_id: order.id,
      prefill: {
        name: bookingDetails.name,
        email: bookingDetails.email,
        contact: bookingDetails.phone,
      },
      theme: { color: "#6366f1" }, // change to your brand color
      handler: async (response: any) => {
        // Step 3: Verify payment
        const verify = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const result = await verify.json();

        if (result.success) {
          onSuccess?.(response);
        } else {
          onFailure?.({ message: "Payment verification failed" });
        }
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", (response: any) => onFailure?.(response));
    rzp.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        onClick={handlePayment}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Pay ₹{amount}
      </button>
    </>
  );
}