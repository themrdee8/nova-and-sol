import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface NewArrivalsCardProps {
  name: string;
  price: number;
  imageUrl: StaticImageData | string;
  category: string;
  slug: string;
}

const NewArrivalsCard = ({
  imageUrl,
  name,
  price,
  category,
  slug,
}: NewArrivalsCardProps) => {
  return (
    <div className="p-0">
      <Link href={`/category/${category}/${slug}`}>
        <Image src={imageUrl} alt={name} width={700} height={20} />
      </Link>
      <div className="grid grid-cols-1 pt-1 pb-4 font-Eb uppercase">
        <p className="text-[15px]">{name}</p>
        <p className="text-[13px]">ghs {price}</p>
        <Link
          href="/"
          className="my-2 text-[13px] underline-offset-4 underline"
        >
          Add to cart
        </Link>
      </div>
    </div>
  );
};

export default NewArrivalsCard;
