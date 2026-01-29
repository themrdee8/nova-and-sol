/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { categories } from "@/components/CategoryCard";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { addToCart } from "@/lib/cartService";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { SpinnerCustom } from "@/components/ui/spinner";

const ProductDetailsPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const params = useParams();
  const { user, openAuthModal } = useAuth();
  const { refreshCart } = useCart();
  // const productName = params.productDetails;
  const safeName = String(params.productDetails);

  // For supabase
  const [productDetails, setProductDetails] = useState<any | null>(null);
  const [isLoadingProductDetails, setIsLoadingProductDetails] =
    useState<boolean>(false);
  const [productDetailsError, setProductDetailsError] = useState<string | null>(
    null
  );

  // fetch product details by name
  useEffect(() => {
    async function loadProductDetails() {
      if (!safeName) return;
      setIsLoadingProductDetails(true);
      setProductDetailsError(null);

      try {
        const response = await fetch(
          `/api/product?slug=${encodeURIComponent(safeName)}`
        );
        const json = await response.json();
        setProductDetails(json.product || null);
      } catch (error: any) {
        setProductDetailsError(error.message || "Failed to fetch product");
      } finally {
        setIsLoadingProductDetails(false);
      }
    }

    loadProductDetails();
  }, [safeName]);

  // Add to cart
  const handleAddToCart = async () => {
    if (!user) {
      openAuthModal();
      return;
    }

    try {
      const result = await addToCart(user.id, productDetails.id);
      toast.success(
        result.action === "added" ? "Product added to cart" : "Already in cart",
      );
      refreshCart();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    }
  };

  if (isLoadingProductDetails) return <SpinnerCustom />;
  if (productDetailsError) return <div>Error: {productDetailsError}</div>;
  if (!productDetails) return <div>Product not find</div>;

  const items = productDetails;
  const images = [
    items?.image_url || items?.image,
    items?.image_url_2 || items?.image2,
  ].filter(Boolean) as (string | never)[];

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
          width={700}
          height={20}
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
        <p>ghs {items.price}</p>
      </div>

      <div className="grid place-items-center">
        <Button name="add to cart" styles="mt-4" onclick={handleAddToCart} />
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
          <Link key={category.categoryName} href={`/${category.pageLink}`}>
            <Button name={category.categoryName} styles="pb-4" />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductDetailsPage;
