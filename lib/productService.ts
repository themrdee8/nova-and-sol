// import { NextResponse } from "next/server";
import { supabaseClient } from "./supabaseClient";

export type ProductRow = {
  id: string;
  name: string;
  price: number;
  slug: string;
  new_arrival: boolean;
  description: string | null;
  image_url: string | null;
  image_url_2: string | null;
  category: string;
  charmbar_section: string | null; // null for normal categories else 'bracelet' or 'charms'
  created_at: string | null;
};

// Fetch products for a category (non-charmbar)
export const fetchProductsByCategory = async (categoryName: string) => {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .ilike("category", categoryName.trim());

  if (error) {
    console.error("Error fetching products by category: ", error.message);
    throw error;
  }

  return data || [];
};

// Fetch all charmbar sections and their products grouped by charmbar_section
export const fetchCharmbarSections = async () => {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .ilike("category", "theCharmBar");

  if (error) {
    console.error("Error fetching charmbar products: ", error.message);
    return {
      bracelet: [],
      necklace: [],
      charms: [],
    };
  }

  const grouped = {
    bracelet: data.filter((product) => product.charmbar_section === "bracelet"),
    necklace: data.filter((product) => product.charmbar_section === "necklace"),
    charms: data.filter((product) => product.charmbar_section === "charms"),
  };

  return grouped;
};

// Fetch single product by name (lowercase match)
export const fetchProductBySlug = async (slug: string) => {
  // : Promise<ProductRow | null>
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching single product: ", error);
    throw error;
  }
  return data;
};
