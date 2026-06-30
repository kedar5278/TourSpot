// app/api/cancel-booking/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Booking id is required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status: "cancelled",
        cancelledAt: new Date(),
      },
    });

    return NextResponse.json({ booking: updated }, { status: 200 });
  } catch (error: any) {
    console.error("Cancel booking error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}