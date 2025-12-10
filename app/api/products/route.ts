/* eslint-disable @typescript-eslint/no-explicit-any */
// GET all products
import { NextResponse } from "next/server";
import {
  fetchProductsByCategory,
  fetchCharmbarSections,
} from "@/lib/productService";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const charmbar = url.searchParams.get("charmbar");

    // If requesting theCharmBar sections
    if (charmbar === "1") {
      const charmbarSections = await fetchCharmbarSections();
      console.log("Charmbarsections: ", charmbarSections);
      return NextResponse.json({ charmbarSections });
    }

    // Regular category products
    if (category) {
      const products = await fetchProductsByCategory(category);
      console.log("Products: ", products);
      return NextResponse.json({ products });
    }

    // Default fallback
    return NextResponse.json({ products: [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
