import { supabase } from "./supabaseClient";
import { Product } from "../entities/product";

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return (data as Product[]) || [];
}
