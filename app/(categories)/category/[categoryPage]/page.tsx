/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import banner from "@/public/images/banner.jpg";
import { categoryConfig } from "../../categoryConfig";
import { usePathname } from "next/navigation";
import { productData } from "@/app/data/products";
import NewArrivalsCard from "@/components/NewArrivalsCard";
import TheCharmBarPage from "@/components/CharmbarSection";

const CategoryPage = () => {
  const pathname = usePathname();
  const categoryKey = pathname?.split("/category/")[1];
  const category = categoryConfig[categoryKey as keyof typeof categoryConfig];
  const title = category?.title || "";
  const description = category?.description || [];

  if (!category) {
    return (
      <div>
        <Navbar />
        <p>Category not found</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="grid place-items-center">
        <Image
          src={banner}
          alt="banner"
          className="h-[260px] object-cover col-start-1 row-start-1"
        />

        <div className="bg-white col-start-1 row-start-1 w-[380px] h-[180px] mt-12">
          <p className="text-[38px] font-Eb text-center uppercase pt-4 mt-6 mb-2">
            {title}
          </p>
          <ul className="list-disc flex space-x-8 font-serif justify-center uppercase ml-3">
            {description.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {categoryKey === "theCharmBar" ? (
        <TheCharmBarPage />
      ) : (
        <>
          {productData[categoryKey] && productData[categoryKey].length ? (
            <div className="grid grid-cols-2 gap-1 py-10 px-4 place-items-center">
              {(productData[categoryKey] || []).map((product: any) => (
                <NewArrivalsCard
                  key={product.name}
                  imageUrl={product.image}
                  name={product.name}
                  price={product.price}
                  category={categoryKey}
                />
              ))}
            </div>
          ) : (
            <p>Coming soon</p>
          )}
        </>
      )}
      <Contact />
    </div>
  );
};

export default CategoryPage;
