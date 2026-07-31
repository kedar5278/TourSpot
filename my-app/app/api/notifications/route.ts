import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET new package notifications
export async function GET() {
  try {
    const newPackages = await prisma.package.findMany({
      where: {
        isNew: true,
        active: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const parsed = newPackages.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      slug: pkg.slug,
      image: pkg.image,
      location: pkg.location,
      price: pkg.price,
      discount: pkg.discount,
      createdAt: pkg.createdAt,
    }));

    return NextResponse.json({ notifications: parsed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
