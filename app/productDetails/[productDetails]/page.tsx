"use client";
import { products } from "@/app/data/products";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { categories } from "@/components/CategoryCard";
import Link from "next/link";

const ProductDetailsPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const params = useParams();
  const productName = params.productDetails;

  const product = products.find(
    (item) => item.name.toLowerCase() === productName
  );

  if (!product) return <div>Product not find</div>;

  const images = [product?.image, product?.image2];

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
          alt={product.name}
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
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>

      <div className="grid place-items-center">
        <Button name="add to cart" styles="mt-4" />
      </div>

      <div className="py-14 px-4">
        <p className="pb-2 uppercase font-Eb font-medium">Additional comment</p>
        <textarea
          name=""
          id=""
          className="border-2 w-full"
        ></textarea>
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
