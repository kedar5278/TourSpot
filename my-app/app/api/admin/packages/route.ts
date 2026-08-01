import { NextResponse } from "next/server";
import { allPackages } from "@/data/packages";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "packages.json");

// Read packages from JSON file
function readPackages() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading packages:", error);
  }
  // Fallback to static data
  return allPackages;
}

// Write packages to JSON file
function writePackages(packages: any[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(packages, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing packages:", error);
    return false;
  }
}

// GET all packages
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured");
    const isSpecialOffer = searchParams.get("isSpecialOffer");
    const isNew = searchParams.get("isNew");

    let packages = readPackages();

    // Filter
    if (search) {
      packages = packages.filter((p: any) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category && category !== "All") {
      packages = packages.filter((p: any) => p.category === category);
    }

    if (featured === "true") {
      packages = packages.filter((p: any) => p.featured);
    }

    if (isSpecialOffer === "true") {
      packages = packages.filter((p: any) => p.discount);
    }

    if (isNew === "true") {
      packages = packages.filter((p: any) => p.isNew);
    }

    return NextResponse.json({ packages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create new package
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const packages = readPackages();

    // Check if slug exists
    if (packages.find((p: any) => p.slug === body.slug)) {
      return NextResponse.json({ error: "Package with this slug already exists" }, { status: 409 });
    }

    const newPackage = {
      slug: body.slug,
      name: body.name,
      location: body.location,
      image: body.image || "/images/placeholder.jpg",
      gallery: body.gallery || [],
      price: body.price,
      originalPrice: body.originalPrice || null,
      discount: body.discount || null,
      duration: body.duration,
      rating: body.rating || 0,
      reviews: body.reviews || 0,
      category: body.category,
      highlights: body.highlights || [],
      groupSize: body.groupSize || "2–10",
      featured: body.featured || false,
      isSpecialOffer: body.isSpecialOffer || false,
      isNew: body.isNew || false,
      bestTime: body.bestTime || "",
      description: body.description || "",
      itinerary: body.itinerary || [],
      inclusions: body.inclusions || [],
      exclusions: body.exclusions || [],
    };

    packages.push(newPackage);
    writePackages(packages);

    return NextResponse.json({ package: newPackage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
