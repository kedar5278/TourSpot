import { NextResponse } from "next/server";
import { allPackages } from "@/data/packages";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "packages.json");

function readPackages() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading packages:", error);
  }
  return allPackages;
}

// GET public packages (for frontend)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured");
    const isSpecialOffer = searchParams.get("isSpecialOffer");
    const isNew = searchParams.get("isNew");
    const slug = searchParams.get("slug");

    let packages = readPackages();

    if (slug) {
      packages = packages.filter((p: any) => p.slug === slug);
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
    console.error("Get public packages error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
