"use client";
import NewArrivalsCard from "@/components/NewArrivalsCard";
import { products } from "@/app/data/products";

const StreetWearPage = () => {
  return (
    <div className="grid grid-cols-2 gap-1 py-10 px-4 place-items-center">
      {products.map((product) => (
        <NewArrivalsCard
          key={product.name}
          imageUrl={product.image}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default StreetWearPage;
