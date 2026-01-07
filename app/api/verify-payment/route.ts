/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { sendReceiptEmail, sendAdminEmail } from "@/lib/email";

export const POST = async (request: Request) => {
  try {
    const { reference, delivery_location, delivery_address } =
      await request.json();

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }
    // verify payment with paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackResponse.json();

    console.log("Paystack verify response:", paystackData);

    if (!paystackData.status || paystackData.data.status !== "success") {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 400 }
      );
    }

    const metadata = paystackData.data.metadata.custom_fields;
    const userId = metadata.find(
      (field: any) => field.variable_name === "user_id"
    )?.value;

    const { data: cartItems } = await supabaseClient
      .from("cart_items")
      .select("product_id, quantity, products(name, price)")
      .eq("user_id", userId);

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const total = cartItems.reduce(
      (sum, item: any) => sum + item.quantity * item.products.price,
      0
    );

    // create order
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        user_id: userId,
        reference,
        total_amount: total,
        delivery_location,
        delivery_address,
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
      to: paystackData.data.customer.email,
      order,
      items: cartItems,
    });

    await sendAdminEmail({
      order,
      items: cartItems,
      userEmail: paystackData.data.customer.email,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 400 });
  }
};
