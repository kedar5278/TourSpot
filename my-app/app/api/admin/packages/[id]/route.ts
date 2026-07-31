import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single package
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pkg = await prisma.package.findUnique({ where: { id } });

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const parsed = {
      ...pkg,
      gallery: JSON.parse(pkg.gallery || "[]"),
      highlights: JSON.parse(pkg.highlights || "[]"),
      itinerary: JSON.parse(pkg.itinerary || "[]"),
      inclusions: JSON.parse(pkg.inclusions || "[]"),
      exclusions: JSON.parse(pkg.exclusions || "[]"),
    };

    return NextResponse.json({ package: parsed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update package
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existing = await prisma.package.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const updateData: any = {};
    const fields = [
      "slug", "name", "location", "image", "price", "originalPrice",
      "discount", "duration", "rating", "reviews", "category",
      "groupSize", "featured", "isSpecialOffer", "isNew", "bestTime",
      "description", "active",
    ];

    for (const field of fields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Handle JSON fields
    const jsonFields = ["gallery", "highlights", "itinerary", "inclusions", "exclusions"];
    for (const field of jsonFields) {
      if (body[field] !== undefined) {
        updateData[field] = JSON.stringify(body[field]);
      }
    }

    const pkg = await prisma.package.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ package: pkg });
  } catch (error: any) {
    console.error("Update package error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE package
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.package.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    await prisma.package.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
