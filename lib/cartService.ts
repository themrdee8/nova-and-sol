import { supabaseClient } from "./supabaseClient";

export const addToCart = async (userId: string, productId: string) => {
  const { data: existing, error } = await supabaseClient
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  console.log(existing);
  if (error) {
    console.error("Error checking cart: ", error);
  }

  if (existing) {
    //increase quantity
    await supabaseClient
      .from("cart_items")
      .update({ quantity: existing.quantity + 1 })
      .eq("id", existing.id);
  } else {
    // insert new row
    const { error: insertError } = await supabaseClient
      .from("cart_items")
      .insert({
        user_id: userId,
        product_id: productId,
        quantity: 1,
      });

    if (insertError) {
      console.error("Insert failed: ", insertError);
    }
  }
};

export const getCartItems = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from("cart_items")
    .select(`id, quantity, products!inner (id, name, price, image_url)`)
    .eq("user_id", userId);

  if (error) throw error;
  console.log(data);
  return data;
};

export const updateCartItemQuantity = async (
  cartItemId: string,
  newQuantity: number
) => {
  if (newQuantity < 1) return;

  const { error } = await supabaseClient
    .from("cart_items")
    .update({ quantity: newQuantity })
    .eq("id", cartItemId);

  if (error) {
    console.error("Error updating quantity:", error);
  }
};