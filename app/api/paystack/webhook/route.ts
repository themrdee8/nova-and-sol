/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseClient } from "@/lib/supabaseClient";
import { sendReceiptEmail, sendAdminEmail } from "@/lib/email";

export const POST = async (request: Request) => {
  const body = await request.text();

  const signature = request.headers.get("x-paystack-signature");
  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 401 });
  }

  // Verify Paystack signature
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  // Only successful charges necessary
  if (event.event !== "charges.success") {
    return NextResponse.json({ received: true });
  }

  const data = event.data;

  const reference = data.reference;
  const amount = data.amount / 100;
  const email = data.customer.email;

  const metadata = data.metadata?.custom_fields || [];

  const userId = metadata.find(
    (field: any) => field.variable_name === "user_id",
  )?.value;
  const firstName = metadata.find(
    (field: any) => field.variable_name === "first_name",
  )?.value;
  const lastName = metadata.find(
    (field: any) => field.variable_name === "last_name",
  )?.value;
  const contact = metadata.find(
    (field: any) => field.variable_name === "contact",
  )?.value;
  const deliveryAddress = metadata.find(
    (field: any) => field.variable_name === "delivery_address",
  )?.value;
  const deliveryLocation = metadata.find(
    (field: any) => field.variable_name === "delivery_location",
  )?.value;

  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  // Get cart items
  const { data: cartItems, error: cartError } = await supabaseClient
    .from("cart_items")
    .select("product_id, quantity, products(name, price)")
    .eq("user_id", userId);

  if (cartError || !cartItems || cartItems.length === 0) {
    return NextResponse.json({ error: "Cart Empty" }, { status: 400 });
  }

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity * item.products.price,
    0,
  );

  // create order
  const { data: order, error: orderError } = await supabaseClient
    .from("orders")
    .insert({
      user_id: userId,
      reference,
      total_amount: total,
      delivery_location: deliveryLocation,
      delivery_address: deliveryAddress,
      first_name: firstName,
      contact: contact,
      last_name: lastName,
    })
    .select()
    .single();

    if (orderError) throw orderError;

    // create order items
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products.price,
    }));

    await supabaseClient.from("order_items").insert(orderItems);

    // clear cart
    await supabaseClient.from("cart_items").delete().eq("user_id", userId);

    // send emails
    await sendReceiptEmail({
      to: email,
      order,
      items: cartItems,
    });

    await sendAdminEmail({
      order,
      items: cartItems,
      userEmail: email,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
};
