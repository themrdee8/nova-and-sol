/* eslint-disable @typescript-eslint/no-explicit-any */
// GET single Product
import { NextResponse } from "next/server";
import { fetchProductBySlug } from "@/lib/productService";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (!slug) return NextResponse.json({ product: null });

    // expecting something like "amari-1" or "beads"
    const product = await fetchProductBySlug(slug);

    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
};
