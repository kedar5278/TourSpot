import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(req: Request) {
  try {
    console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);      
    console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET); 

    const { amount, currency = "INR" } = await req.json();
    console.log("Amount received:", amount); 

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