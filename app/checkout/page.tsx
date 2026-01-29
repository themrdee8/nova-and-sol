/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getCartItems } from "@/lib/cartService";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import { SpinnerCustom } from "@/components/ui/spinner";

const CheckoutPage = () => {
  const { user } = useAuth();

  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
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
        0,
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
      if (!firstName || !contact)
        throw new Error("Missing first name and contact info");
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
            {
              display_name: "First Name",
              variable_name: "first_name",
              value: firstName,
            },
            {
              display_name: "Last Name",
              variable_name: "last_name",
              value: lastName,
            },
            {
              display_name: "Contact",
              variable_name: "contact",
              value: contact,
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
      toast.error(error instanceof Error ? error.message : "Checkout failed");
      setLoading(false);
    }

    // Verify and create order
    const confirmOrder = async (reference: string) => {
      setLoading(true);

      const response = await fetch("/api/paystack/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          delivery_location: deliveryLocation,
          delivery_address: deliveryAddress,
          first_name: firstName,
          last_name: lastName,
          contact: contact,
        }),
      });

      const result = await response.json();

      console.log("Verify result:", result);

      if (!response.ok || !result.success) {
        toast.error("Payment verification failed");
        setLoading(false);
        return;
      }

      // TODO:
      // 1. Save order to database
      // 2. Save order items
      // 3. Clear cart
      // 4. Redirect to success page

      toast.success("Payment successful!");
      setLoading(false);
    };
  };

  if (loading) return <SpinnerCustom />;

  return (
    <div>
      <Navbar />

      <div className="pt-20 px-4 grid grid-cols-1 font-Eb text-[18px]">
        <div>
          <p className="text-[22px] font-semibold uppercase pb-2">Delivery</p>
        </div>
        <select
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
          className="border w-full h-12 rounded-lg mb-4 px-1"
        >
          <option value="">Select location</option>
          <option value="Accra">Accra</option>
          <option value="Tema">Tema</option>
          <option value="Kumasi">Kumasi</option>
        </select>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border w-full h-12 rounded-lg mb-4 p-2"
        />

        <input
          type="text"
          placeholder="Last Name (Optional)"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border w-full h-12 rounded-lg mb-4 p-2"
        />

        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border w-full h-12 rounded-lg mb-4 p-2"
        />

        <input
          type="text"
          placeholder="Delivery address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className="border w-full h-12 rounded-lg mb-4 p-2"
        />

        <p className="mb-2 uppercase">Total: GHS {total}</p>
        <p className="uppercase text-[15px]">
          ( Delivery ranges from ¢30 - ¢35 for orders in Accra and Tema and ¢40
          for orders to Kumasi )
        </p>

        <p className="uppercase text-[15px]">
          ( Delivery goes out on Fridays )
        </p>

        <Button
          name="Pay Now"
          styles="grid px-10 py-2"
          onclick={handlePayment}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
