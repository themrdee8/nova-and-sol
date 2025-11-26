"use client";
import Navbar from "@/components/Navbar";
import banner from "../public/images/banner.jpg";
import Image from "next/image";
import Button from "@/components/Button";
import NewArrivalsCard from "@/components/NewArrivalsCard";
import CategoryCard from "@/components/CategoryCard";
import Contact from "@/components/Contact";
import { productData } from "./data/products";
import { useRouter } from "next/navigation";
import fallbackImage from "@/public/images/cat.jpg";

export default function Home() {
  const router = useRouter();
  const newArrivals = () => {
    router.push("category/newArrivals");
  };

  return (
    <div className="">
      <main className="">
        <Navbar />
        <div className="h-[600px] grid place-items-center">
          <Image
            src={banner}
            alt="banner"
            className="h-[600px] object-cover col-start-1 row-start-1"
          />
        </div>

        <div className="bg-gray-100">
          <div className="bg-white flex justify-center p-8">
            <p className="uppercase text-4xl font-serif mt-4">new arrivals</p>
          </div>
          <div className="grid grid-cols-2 gap-1 py-10 px-4 place-items-center">
            {(productData["newArrivals"] ?? []).slice(0, 4).map((product) => (
              <NewArrivalsCard
                key={product.name}
                imageUrl={product.image || fallbackImage}
                name={product.name}
                price={product.price}
                category="newArrivals"
              />
            ))}
          </div>
          <Button
            onclick={newArrivals}
            name="view all"
            styles="flex justify-center pb-10"
          />
        </div>

        <CategoryCard />

        <Contact />
      </main>
    </div>
  );
}
