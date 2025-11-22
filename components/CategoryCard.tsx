/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import cat from "@/public/images/cat.jpg";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";

export const categories = [
  { categoryName: "street wear", pageLink: "/streetWear", imageUrl: cat },
  {
    categoryName: "the sol strand",
    pageLink: "/theSolStrand",
    imageUrl: cat,
  },
  { categoryName: "amari", pageLink: "/amari", imageUrl: cat },
  {
    categoryName: "the charm bar",
    pageLink: "/theCharmBar",
    imageUrl: cat,
  },
  {
    categoryName: "the perfect find",
    pageLink: "/thePerfectFind",
    imageUrl: cat,
  },
];
const CategoryCard = () => {
  const router = useRouter();

  const handleClick = (link: any) => {
    router.push(link)
  };
  return (
    <div>
      {categories.map((category) => (
        <div key={category.pageLink} className="grid place-items-center">
          <Image
            src={category.imageUrl}
            alt={category.categoryName}
            className="object-cover col-start-1 row-start-1 h-[350px]"
          />
          <p className="col-start-1 row-start-1 uppercase font-Eb text-[20px] text-[#E8d3a4] mt-[200px]">
            {category.categoryName}
          </p>
          <Button
            onclick={() => handleClick(category.pageLink)}
            name="shop now"
            styles="col-start-1 row-start-1 mt-[280px]"
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
