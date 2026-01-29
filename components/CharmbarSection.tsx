/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import NewArrivalsCard from "@/components/NewArrivalsCard";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { SpinnerCustom } from "./ui/spinner";

const TheCharmBarPage = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const initialVisibleCount: Record<string, number> = {
    bracelet: 4,
    charms: 6,
  };

  const [charmbarSectionsState, setCharmbarSectionsState] = useState<Record<
    string,
    any[]
  > | null>(null);
  const [isLoadingCharmbarState, setIsLoadingCharmbarState] =
    useState<boolean>(false);
  const [charmbarErrorState, setCharmbarErrorState] = useState<string | null>(
    null
  );

  // Fetch charmbar section from API
  useEffect(() => {
    async function loadCharmbarSections() {
      setIsLoadingCharmbarState(true);
      setCharmbarErrorState(null);

      try {
        const response = await fetch(`/api/products?charmbar=1`);
        const json = await response.json();

        setCharmbarSectionsState(json.charmbarSections || {});
      } catch (error: any) {
        setCharmbarErrorState(
          error.message || "Failed to load charmbar products"
        );
      } finally {
        setIsLoadingCharmbarState(false);
      }
    }
    loadCharmbarSections();
  }, []);

  const toggleExpand = (sectionName: string) => {
    setExpanded((previous) => ({
      ...previous,
      [sectionName]: !previous[sectionName],
    }));
  };

  if (isLoadingCharmbarState) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <SpinnerCustom />
      </div>
    )
  }
  // <p className="py-10 text-center">Loading charmbar products...</p>

  if (charmbarErrorState) {
    return <p className="py-10 text-center">Error: {charmbarErrorState}</p>;
  }

  if (!charmbarSectionsState) {
    return <p className="py-10 text-center">No charmbar products found.</p>;
  }

  return (
    <div className="grid gap-1 py-10 px-4">
      {Object.entries(charmbarSectionsState).map(([sectionName, products]) => {
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
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.image_url}
                    slug={product.slug}
                    category="theCharmBar"
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
