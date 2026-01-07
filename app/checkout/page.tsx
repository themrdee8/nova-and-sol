/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getCartItems } from "@/lib/cartService";

const CheckoutPage = () => {
  const { user } = useAuth();

  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!user) return;

    const loadCart = async () => {
      const items = await getCartItems(user.id);
      setCartItems(items || []);

      const sum = items.reduce(
        (account: number, item: any) =>
          account + item.quantity * item.products.price,
        0
      );

      setTotal(sum);
    };

    loadCart();
  }, [user]);

  // Paystack
  const handlePayment = async () => {
    try {
      if (!user) throw new Error("User not logged in");
      if (!user.email) throw new Error("User email missing");
      if (!deliveryLocation || !deliveryAddress)
        throw new Error("Missing delivery info");
      if (!total || total <= 0) throw new Error("Cart total invalid");

      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) throw new Error("Paystack public key missing");

      setLoading(true);

      const Paystack = (await import("@paystack/inline-js")).default;
      const paystack = new Paystack();

      console.log({
        email: user?.email,
        total,
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      });

      paystack.newTransaction({
        key: publicKey,
        email: user.email,
        amount: total * 100,
        currency: "GHS",

        metadata: {
          custom_fields: [
            {
              display_name: "User ID",
              variable_name: "user_id",
              value: user.id,
            },
            {
              display_name: "Delivery Location",
              variable_name: "delivery_location",
              value: deliveryLocation,
            },
            {
              display_name: "Delivery Address",
              variable_name: "delivery_address",
              value: deliveryAddress,
            },
          ],
        },

        onSuccess: async (transaction) => {
          console.log("Payment success:", transaction);
          await confirmOrder(transaction.reference);
        },

        onCancel: () => {
          setLoading(false);
          console.log("Payment cancelled");
        },

        onError: (error) => {
          console.error("Paystack error:", error);
          alert("Payment failed. Check console.");
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : "Checkout failed");
      setLoading(false);
    }

    // Verify and create order
    const confirmOrder = async (reference: string) => {
      setLoading(true);

      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          delivery_location: deliveryLocation,
          delivery_address: deliveryAddress,
        }),
      });

      const result = await response.json();

      console.log("Verify result:", result);

      if (!response.ok || !result.success) {
        alert("Payment verification failed");
        setLoading(false);
        return;
      }

      // TODO:
      // 1. Save order to database
      // 2. Save order items
      // 3. Clear cart
      // 4. Redirect to success page

      alert("Payment successful!");
      setLoading(false);
    };
  };
  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Checkout</h1>

      <select
        value={deliveryLocation}
        onChange={(e) => setDeliveryLocation(e.target.value)}
      >
        <option value="">Select location</option>
        <option value="Accra">Accra</option>
        <option value="Kumasi">Kumasi</option>
      </select>

      <input
        type="text"
        placeholder="Delivery address (Yango)"
        value={deliveryAddress}
        onChange={(e) => setDeliveryAddress(e.target.value)}
      />

      <p>Total: GHS {total}</p>

      <button disabled={loading} onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutPage;
