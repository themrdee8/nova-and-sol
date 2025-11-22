/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewArrivalsCard = ({ imageUrl, name, price }: any) => {
  return (
    <div className="p-0">
      <Link href={`/productDetails/${name}`}>
        <Image src={imageUrl} alt={imageUrl} />
      </Link>
      <div className="grid grid-cols-1 pt-1 pb-4 text-[#422727] font-Eb uppercase">
        <p className="text-[15px]">{name}</p>
        <p className="text-[13px]">{price}</p>
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
