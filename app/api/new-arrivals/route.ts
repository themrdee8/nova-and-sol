import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

// GET new arrivals
export const GET = async () => {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .eq("new_arrival", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch new arrivals" });
  }

  return NextResponse.json({ products: data });
};
