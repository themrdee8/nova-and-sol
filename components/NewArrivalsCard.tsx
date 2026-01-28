import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { addToCart } from "@/lib/cartService";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface NewArrivalsCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: StaticImageData | string;
  category: string;
  slug: string;
}

const NewArrivalsCard = ({ ...props }: NewArrivalsCardProps) => {
  const { user, openAuthModal } = useAuth();
  const { refreshCart } = useCart();

  const handleAddToCart = async () => {
    if (!user) {
      openAuthModal();
      return;
    }

    try {
      const result = await addToCart(user.id, props.id);
      toast.success(
        result.action === "added" ? "Product added to cart" : "Already in cart",
      );
      refreshCart();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div className="p-0">
      <Link href={`/category/${props.category}/${props.slug}`}>
        <div className="relative inline-block">
          <Image
            src={props.imageUrl}
            alt={props.name}
            width={700}
            height={20}
          />
          {/* <div className="rounded-full bg-white/30 backdrop-blur-sm h-7 w-7 font-Eb text-[17px] flex items-center justify-center absolute top-2 right-2">
            <p className="font-bold text-[#E8d3a4]">{props.quantity}</p>
          </div> */}
        </div>
      </Link>
      <div className="grid grid-cols-1 pt-1 pb-4 font-Eb text-[11px] uppercase">
        <p>{props.name}</p>
        <p>ghs {props.price}</p>
        <p
          onClick={handleAddToCart}
          className="my-2 underline-offset-4 underline cursor-pointer"
        >
          Add to cart
        </p>
      </div>
    </div>
  );
};

export default NewArrivalsCard;
