"use client";
import NewArrivalsCard from "@/components/NewArrivalsCard";
import { charmbar } from "@/app/data/products";
import { useState } from "react";
import Button from "@/components/Button";

const TheCharmBarPage = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const initialVisibleCount: Record<string, number> = {
    bracelet: 4,
    necklace: 4,
    charms: 6,
  };

  const toggleExpand = (sectionName: string) => {
    setExpanded((previous) => ({
      ...previous,
      [sectionName]: !previous[sectionName],
    }));
  };

  return (
    <div className="grid gap-1 py-10 px-4">
      {Object.entries(charmbar).map(([sectionName, products]) => {
        const isExpanded = expanded[sectionName];
        const visibleCount = isExpanded
          ? products.length
          : initialVisibleCount[sectionName] || 4;
        return (
          <div key={sectionName}>
            <div className="flex items-center pt-14 pb-4">
              <p className="font-Eb text-[23px] uppercase font-medium">
                {sectionName}
              </p>
            </div>

            <div className="bg-gray-100 mb-8">
              <div className="grid grid-cols-2 gap-1 py-10 px-4">
                {products.slice(0, visibleCount).map((product) => (
                  <NewArrivalsCard
                    key={product.name}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.image}
                    category="theCharmbar"
                  />
                ))}
              </div>
              {products.length > initialVisibleCount[sectionName] && (
                <Button
                  onclick={() => toggleExpand(sectionName)}
                  name={isExpanded ? "view less" : "view all"}
                  styles="flex justify-center pb-10"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TheCharmBarPage;
