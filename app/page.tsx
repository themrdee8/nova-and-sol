"use client";
import Navbar from "@/components/Navbar";
import banner from "../public/images/banner.jpg";
import Image from "next/image";
import Button from "@/components/Button";
import NewArrivalsCard from "@/components/NewArrivalsCard";
import CategoryCard from "@/components/CategoryCard";
import Contact from "@/components/Contact";
import { useRouter } from "next/navigation";
import fallbackImage from "@/public/images/cat.jpg";
import { useEffect, useState } from "react";
import { ProductRow } from "@/lib/productService";

export default function Home() {
  const router = useRouter();
  const newArrivals = () => {
    router.push("category/newArrivals");
  };

  // For supabse new arrivals fetch
  const [newArrival, setNewArrival] = useState<ProductRow[]>([]);
  useEffect(() => {
    async function loadNewArrivals() {
      const response = await fetch("/api/new-arrivals");
      const json = await response.json();
      setNewArrival(json.products ?? []);
    }
    loadNewArrivals();
  }, []);

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

        {newArrival && (
          <div className="bg-gray-100">
            <div className="bg-white flex justify-center p-8">
              <p className="uppercase text-4xl font-serif mt-4">new arrivals</p>
            </div>
            <div className="grid grid-cols-2 gap-1 py-10 px-4 place-items-center">
              {newArrival.slice(0, 4).map((product) => (
                <NewArrivalsCard
                  key={product.id}
                  id={product.id}
                  imageUrl={product.image_url || fallbackImage}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
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
        )}

        <CategoryCard />

        <Contact />
      </main>
    </div>
  );
}
