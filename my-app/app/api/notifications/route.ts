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

// GET new package notifications
export async function GET() {
  try {
    const packages = readPackages();

    // Get packages that are new (have a discount or are recently added)
    const newPackages = packages
      .filter((p: any) => p.isNew || p.discount)
      .slice(0, 10)
      .map((p: any) => ({
        id: p.slug,
        name: p.name,
        slug: p.slug,
        image: p.image,
        location: p.location,
        price: p.price,
        discount: p.discount || null,
        createdAt: new Date().toISOString(),
      }));

    return NextResponse.json({ notifications: newPackages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
