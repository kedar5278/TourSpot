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

// PUT update package
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const packages = readPackages();

    const index = packages.findIndex((p: any) => p.slug === id);
    if (index === -1) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Update package
    packages[index] = {
      ...packages[index],
      ...body,
    };

    writePackages(packages);

    return NextResponse.json({ package: packages[index] });
  } catch (error: any) {
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
    const packages = readPackages();

    const index = packages.findIndex((p: any) => p.slug === id);
    if (index === -1) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Remove package
    packages.splice(index, 1);
    writePackages(packages);

    return NextResponse.json({ message: "Package deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
