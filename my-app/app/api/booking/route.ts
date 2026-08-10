// app/api/booking/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      email,
      packageSlug,
      packageName,
      packageImage,
      location,
      duration,
      travelDate,
      guests,
      totalAmount,
    } = body ?? {};

    if (!packageSlug || !travelDate || typeof guests !== "number" || typeof totalAmount !== "number") {
      return NextResponse.json({ error: "Missing required booking data" }, { status: 400 });
    }

    const bookingRef = "TS" + Math.floor(100000 + Math.random() * 900000);

    const booking = await prisma.booking.create({
      data: {
        userId: userId || "guest",
        email: email || "",
        bookingRef,
        packageSlug,
        packageName,
        packageImage,
        location,
        duration,
        travelDate: new Date(travelDate),
        guests,
        totalAmount,
        status: "confirmed",
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error: any) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
