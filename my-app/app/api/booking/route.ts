import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({ message: "Booking API is ready" }, { status: 200 });
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      packageSlug,
      travelDate,
      guests,
      totalAmount,
      status = "Confirmed",
    } = body ?? {};

    if (!packageSlug || !travelDate || typeof guests !== "number" || typeof totalAmount !== "number") {
      return NextResponse.json(
        { error: "Missing required booking data" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        packageSlug,
        travelDate: new Date(travelDate),
        guests,
        totalAmount,
        status,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error: any) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}