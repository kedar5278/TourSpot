import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all bookings (admin)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const where: any = {};

    if (search) {
      where.OR = [
        { packageName: { contains: search } },
        { email: { contains: search } },
        { bookingRef: { contains: search } },
        { location: { contains: search } },
      ];
    }

    if (status && status !== "All") {
      where.status = status;
    }

    let bookings: any[] = [];
    let totalRevenue = 0;
    let statusCounts: { status: string; count: number }[] = [];

    try {
      bookings = await prisma.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      totalRevenue = bookings.reduce(
        (sum: number, b: any) => sum + (b.totalAmount || 0),
        0
      );

      const counts = await prisma.booking.groupBy({
        by: ["status"],
        _count: true,
      });

      statusCounts = counts.map((s: any) => ({
        status: s.status,
        count: s._count,
      }));
    } catch (dbError) {
      // Database not available — return empty results
      console.warn("Database unavailable for bookings:", (dbError as Error).message);
    }

    return NextResponse.json({
      bookings,
      total: bookings.length,
      totalRevenue,
      statusCounts,
    });
  } catch (error: any) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update booking status (admin)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    try {
      const booking = await prisma.booking.update({
        where: { id },
        data: {
          status,
          ...(status === "cancelled" ? { cancelledAt: new Date() } : {}),
        },
      });

      return NextResponse.json({ booking });
    } catch (dbError) {
      return NextResponse.json({ error: "Database unavailable. Please try again later." }, { status: 503 });
    }
  } catch (error: any) {
    console.error("Update booking error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
