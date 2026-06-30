// app/api/get-bookings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}