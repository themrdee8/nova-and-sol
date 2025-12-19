/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import banner from "@/public/images/banner.jpg";
import { categoryConfig } from "../../categoryConfig";
import { usePathname } from "next/navigation";
// import { productData } from "@/app/data/products";
import NewArrivalsCard from "@/components/NewArrivalsCard";
import TheCharmBarPage from "@/components/CharmbarSection";
import { useEffect, useState } from "react";
// import { getCategoryProducts } from "./fetchCategoryProducts";

const CategoryPage = () => {
  const pathname = usePathname();
  const categoryKey = pathname?.split("/category/")[1];
  const category = categoryConfig[categoryKey as keyof typeof categoryConfig];
  const title = category?.title || "";
  const description = category?.description || [];

  // Backend data call for products
  const [productsForCategory, setProductsForCategory] = useState<any[] | null>(
    null
  );
  const [charmbarSectionsState, setCharmbarSectionsState] = useState<Record<
    string,
    any[]
  > | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [fetchProductsError, setFetchProductsError] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function loadProducts() {
      if (!categoryKey) return;
      setIsLoadingProducts(true);
      setFetchProductsError(null);

      try {
        if (categoryKey === "theCharmBar") {
          // fetch charmbar sections
          const response = await fetch("/api/products?charmbar=1");
          const json = await response.json();
          setCharmbarSectionsState(json.charmbarSections || {});
        } else if (categoryKey === "newArrivals") {
          // fetch new arrivals
          const response = await fetch("/api/new-arrivals");
          const json = await response.json();
          setProductsForCategory(json.products ?? []);
        } else {
          //fetch categories
          const response = await fetch(
            `/api/products?category=${encodeURIComponent(categoryKey)}`
          );
          const json = await response.json();
          setProductsForCategory(json.products || []);
        }
      } catch (error: any) {
        setFetchProductsError(error.message || "Failed to fetch products");
      } finally {
        setIsLoadingProducts(false);
      }
    }

    loadProducts();
  }, [categoryKey]);

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
          {isLoadingProducts ? (
            <p>Loading...</p>
          ) : fetchProductsError ? (
            <p>Error loading products: {fetchProductsError}</p>
          ) : productsForCategory && productsForCategory.length ? (
            <div className="grid grid-cols-2 gap-1 py-10 px-4 place-items-center">
              {productsForCategory.map((product: any) => (
                <NewArrivalsCard
                  key={product.name}
                  id={product.id}
                  imageUrl={product.image_url || product.image}
                  name={product.name}
                  price={product.price}
                  category={categoryKey}
                  slug={product.slug}
                  quantity={product.quantity}
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
