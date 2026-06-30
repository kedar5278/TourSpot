// app/api/booking/route.ts
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
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

    const email = user.primaryEmailAddress?.emailAddress ?? "";
    const bookingRef = "TS" + Math.floor(100000 + Math.random() * 900000);

    const booking = await prisma.booking.create({
      data: {
        userId,
        email,
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