import { useAuth } from "@/context/AuthContext";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface NewArrivalsCardProps {
  name: string;
  price: number;
  imageUrl: StaticImageData | string;
  category: string;
  slug: string;
}

const NewArrivalsCard = ({ ...props }: NewArrivalsCardProps) => {
  const { user, openAuthModal } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    // TODO: add addToCart logic later
  };

  return (
    <div className="p-0">
      <Link href={`/category/${props.category}/${props.slug}`}>
        <Image src={props.imageUrl} alt={props.name} width={700} height={20} />
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
