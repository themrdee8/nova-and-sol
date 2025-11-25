"use client";
import { charmbar, productData } from "@/app/data/products";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Image, { StaticImageData } from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { categories } from "@/components/CategoryCard";
import Link from "next/link";

const ProductDetailsPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const params = useParams();
  const productName = params.productDetails;
  const pathname = usePathname();
  const categoryKey = pathname?.split("/category/")[1]?.split("/")[0];

  const items =
    productData[categoryKey]?.find(
      (item) => item.name.toLowerCase() === productName
    ) ||
    Object.values(charmbar)
      .flat()
      .find((product) => product.name.toLowerCase() === productName);
  console.log("product:", items);
  console.log("Available categories:", Object.keys(productData));

  if (!items) return <div>Product not find</div>;

  const images = [items?.image, items?.image2].filter(Boolean) as (
    | StaticImageData
    | string
  )[];

  const previousImage = () => {
    setCurrentImage((previous) =>
      previous === 0 ? images.length - 1 : previous - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((next) => (next === images.length - 1 ? 0 : next + 1));
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 flex justify-center">
        <Image
          src={images[currentImage]}
          alt={items.name}
          className="h-[450px] w-96 items-center object-cover rounded-4xl"
        />
      </div>
      <div className="flex space-x-2 text-3xl items-center justify-center pt-4">
        <GoChevronLeft
          onClick={previousImage}
          className="active:scale-75 transition-transform duration-150"
        />
        {images.map((_, index) => (
          <div
            key={index}
            className={`p-[5px] rounded-full transition-all duration-300 ${
              currentImage === index ? "bg-[#422727] border" : "border"
            }`}
          />
        ))}

        <GoChevronRight
          onClick={nextImage}
          className="active:scale-75 transition-transform duration-150"
        />
      </div>
      <div className="grid place-items-center text-[18px] uppercase font-Eb">
        <p>{items.name}</p>
        <p>{items.price}</p>
      </div>

      <div className="grid place-items-center">
        <Button name="add to cart" styles="mt-4" />
      </div>

      <div className="py-14 px-4">
        <p className="pb-2 uppercase font-Eb font-medium">Additional comment</p>
        <textarea name="" id="" className="border-2 w-full"></textarea>
      </div>

      <div className="px-6">
        <p className="uppercase pb-4 text-[25px] font-Eb underline underline-offset-4">
          Shop
        </p>
        {categories.map((category) => (
          <Link key={category.categoryName} href={category.pageLink}>
            <Button name={category.categoryName} styles="pb-4" />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductDetailsPage;
