import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all packages (admin view)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured");
    const isSpecialOffer = searchParams.get("isSpecialOffer");
    const isNew = searchParams.get("isNew");

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { location: { contains: search } },
        { category: { contains: search } },
      ];
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

    // Parse JSON fields
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
    console.error("Get packages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create new package
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      slug,
      name,
      location,
      image,
      gallery,
      price,
      originalPrice,
      discount,
      duration,
      rating,
      reviews,
      category,
      highlights,
      groupSize,
      featured,
      isSpecialOffer,
      isNew,
      bestTime,
      description,
      itinerary,
      inclusions,
      exclusions,
    } = body;

    if (!slug || !name || !location || !image || !price || !duration || !category) {
      return NextResponse.json(
        { error: "Missing required fields: slug, name, location, image, price, duration, category" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.package.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Package with this slug already exists" }, { status: 409 });
    }

    const pkg = await prisma.package.create({
      data: {
        slug,
        name,
        location,
        image,
        gallery: JSON.stringify(gallery || []),
        price,
        originalPrice: originalPrice || null,
        discount: discount || null,
        duration,
        rating: rating || 0,
        reviews: reviews || 0,
        category,
        highlights: JSON.stringify(highlights || []),
        groupSize: groupSize || "2–10",
        featured: featured || false,
        isSpecialOffer: isSpecialOffer || false,
        isNew: isNew || false,
        bestTime: bestTime || null,
        description: description || "",
        itinerary: JSON.stringify(itinerary || []),
        inclusions: JSON.stringify(inclusions || []),
        exclusions: JSON.stringify(exclusions || []),
      },
    });

    return NextResponse.json({ package: pkg }, { status: 201 });
  } catch (error: any) {
    console.error("Create package error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
