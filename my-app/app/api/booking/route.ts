import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Booking API is ready" }, { status: 200 });
}

export async function POST() {
  return NextResponse.json(
    { message: "Booking creation is handled by the booking flow" },
    { status: 200 }
  );
}