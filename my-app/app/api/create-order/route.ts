import { NextResponse } from "next/server";
import Razorpay from "razorpay";

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export async function POST(req: Request) {
  try {
    const razorpay = getRazorpayClient();

    if (!razorpay) {
      return NextResponse.json(
        { error: "Razorpay is not configured yet" },
        { status: 503 }
      );
    }

    const { amount, currency = "INR" } = await req.json();

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (err: any) {
    console.error("Razorpay error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}