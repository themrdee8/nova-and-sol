/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import banner from "@/public/images/banner.jpg";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/cartService";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface CartMenuProps {
  openCart: () => void;
  isOpen: boolean;
}

const CartMenu = ({ openCart, isOpen }: CartMenuProps) => {
  const { user } = useAuth();
  const { refreshKey, refreshCart } = useCart();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isOpen || !user) return;

    const loadCart = async () => {
      setLoading(true);
      const items = await getCartItems(user.id);
      setCartItems(items || []);
      setLoading(false);
    };

    loadCart();
  }, [isOpen, user, refreshKey]);

  const handleIncrease = async (item: any) => {
    await updateCartItemQuantity(item.id, item.quantity + 1);
    refreshCart();
  };

  const handleDecrease = async (item: any) => {
    if (item.quantity === 1) return;
    await updateCartItemQuantity(item.id, item.quantity - 1);
    refreshCart();
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.products.price,
    0
  );

  const handleRemoveItem = async (cartItemId: string) => {
    await removeCartItem(cartItemId);
    refreshCart();
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white/40 backdrop-blur-sm w-full h-full ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className={`fixed top-0 right-0 overflow-hidden bg-white w-[80%] h-full font-Eb uppercase flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex-none flex items-center justify-between py-2 px-2 text-[22px] border-b border-[#422727]/40">
          <p>Cart</p>
          <FaPlus className="rotate-45 active:scale-90" onClick={openCart} />
        </div>

        <div
          id="cartitems"
          style={{ WebkitOverflowScrolling: "touch" }}
          className="relative flex-1 mx-2 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y"
        >
          {loading && (
            <p className="h-full w-full flex items-center justify-center">
              Loading cart...
            </p>
          )}

          {!loading && cartItems.length === 0 && (
            <div className="h-full w-full flex items-center justify-center">
              <p>your cart is empty</p>
            </div>
          )}

          <div
            style={{ WebkitOverflowScrolling: "touch" }}
            className="pb-2 mt-2 grid grid-rows-2 grid-flow-col auto-cols-max gap-x-5 gap-y-3 overflow-y-hidden touch-pan-x"
          >
            {cartItems.map((item) => {
              if (!item.products) return null;

              const product = item.products;
              const itemTotal = product.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="text-[13px] w-[200px] relative inline-block mt-4"
                >
                  <Image
                    src={banner}
                    alt="banner"
                    width={200}
                    height={20}
                    className=""
                  />
                  <div
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-white/30 backdrop-blur-sm rounded-full h-7 w-7 flex items-center justify-center absolute top-1 right-1 active:scale-90 transition duration-150 ease-in"
                  >
                    <IoClose className="text-[18px]" />
                  </div>
                  <div className="flex justify-between pt-2">
                    <p>quantity: {item.quantity}</p>
                    <div className="flex space-x-2">
                      <div
                        onClick={() => handleDecrease(item)}
                        className="rounded-full active:scale-90 bg-[#E8d3a4] backdrop-blur-sm h-5 w-5 grid place-items-center transition duration-150 ease-in"
                      >
                        <FaMinus />{" "}
                      </div>
                      <div
                        onClick={() => handleIncrease(item)}
                        className="rounded-full active:scale-90 bg-[#E8d3a4] backdrop-blur-sm h-5 w-5 grid place-items-center transition duration-150 ease-in"
                      >
                        <FaPlus />
                      </div>
                    </div>
                  </div>

                  <p>{product.name}</p>
                  <p>ghs {product.price}</p>
                  <p>total&rarr; ghs {itemTotal}</p>
                </div>
              );
            })}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="grid place-items-center py-4 flex-none">
            <p className="text-[15px] pb-2">Total&rarr; ghs {cartTotal}</p>
            <Button name="checkout" onclick={() => router.push("/checkout")} />
          </div>
        )}
        {/*  */}
        <div className="border-t py-2 text-center text-[13px] flex-none">
          <p>Free delivery in Accra and</p>
          <p>purchases ghs 450 and above</p>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
