import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET public packages (for frontend)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured");
    const isSpecialOffer = searchParams.get("isSpecialOffer");
    const isNew = searchParams.get("isNew");
    const slug = searchParams.get("slug");

    const where: any = { active: true };

    if (slug) {
      where.slug = slug;
    }

    if (category && category !== "All") {
      where.category = category;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (isSpecialOffer === "true") {
      where.isSpecialOffer = true;
    }

    if (isNew === "true") {
      where.isNew = true;
    }

    const packages = await prisma.package.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const parsed = packages.map((pkg) => ({
      ...pkg,
      gallery: JSON.parse(pkg.gallery || "[]"),
      highlights: JSON.parse(pkg.highlights || "[]"),
      itinerary: JSON.parse(pkg.itinerary || "[]"),
      inclusions: JSON.parse(pkg.inclusions || "[]"),
      exclusions: JSON.parse(pkg.exclusions || "[]"),
    }));

    return NextResponse.json({ packages: parsed });
  } catch (error: any) {
    console.error("Get public packages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
