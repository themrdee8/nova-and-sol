import cat from "@/public/images/cat.jpg";
import banner from "@/public/images/banner.jpg";

import { StaticImageData } from "next/image";

export interface Product {
  name: string;
  price: string;
  image?: StaticImageData | string;
  image2?: StaticImageData | string;
}

export type ProductData = {
  [key: string]: Product[];
};

export const productData: ProductData = {
  amari: [
    { name: "amari-1", image: cat, image2: banner, price: "£10.00" },
    { name: "amari-2", image: cat, image2: banner, price: "£20.00" },
    { name: "amari-3", image: cat, image2: banner, price: "£30.00" },
  ],

  theSolStrand: [
    { name: "solstrand-1", image: banner, image2: cat, price: "£15.00" },
    { name: "solstrand-2", image: banner, image2: cat, price: "£18.00" },
  ],

  thePerfectFind: [
    { name: "perf-1", image: banner, image2: cat, price: "£8.00" },
    { name: "perf-2", image: banner, image2: cat, price: "£14.00" },
    { name: "perf-3", image: banner, image2: cat, price: "£25.00" },
  ],

  streetWear: [
    { name: "sw-1", image: banner, image2: cat, price: "£12.00" },
    { name: "sw-2", image: banner, image2: cat, price: "£16.00" },
    { name: "sw-3", image: banner, image2: cat, price: "£5.00" },
  ],

  newArrivals: [
    { name: "beads", image: cat, image2: banner, price: "£5.00" },
    { name: "beady", image: cat, image2: banner, price: "£12.00" },
    { name: "beada", image: cat, image2: banner, price: "£24.00" },
    { name: "beadx", image: cat, image2: banner, price: "£50.00" },
    { name: "beadt", image: cat, image2: banner, price: "£22.00" },
  ],
};

export const charmbar = {
  bracelet: [
    { name: "bracelet1", image: cat, image2: banner, price: "£100.00" },
    { name: "bracelet2", image: cat, image2: banner, price: "£9.99" },
    { name: "bracelet3", image: cat, image2: banner, price: "£16.00" },
  ],

  necklace: [
    { name: "necklace1", image: cat, image2: banner, price: "£9.00" },
    { name: "necklace2", image: cat, image2: banner, price: "£3.00" },
    { name: "necklace3", image: cat, image2: banner, price: "£44.00" },
    { name: "necklace4", image: cat, image2: banner, price: "£44.00" },
    { name: "necklace5", image: cat, image2: banner, price: "£44.00" },
  ],

  charms: [
    { name: "charms", image: cat, image2: banner, price: "£4.00" },
    { name: "star", image: cat, image2: banner, price: "£56.00" },
    { name: "mooon", image: cat, image2: banner, price: "£12.00" },
    { name: "moon", image: cat, image2: banner, price: "£12.00" },
    { name: "sun", image: cat, image2: banner, price: "£12.00" },
    { name: "gold", image: cat, image2: banner, price: "£12.00" },
    { name: "fish", image: cat, image2: banner, price: "£12.00" },
    { name: "lion", image: cat, image2: banner, price: "£12.00" },
    { name: "googoo", image: cat, image2: banner, price: "£12.00" },
    { name: "mint", image: cat, image2: banner, price: "£12.00" },
  ],
};

export const products = [
  { name: "beads", image: cat, image2: banner, price: "£5.00" },
  { name: "beady", image: cat, image2: banner, price: "£12.00" },
  { name: "beada", image: cat, image2: banner, price: "£24.00" },
  { name: "beadx", image: cat, image2: banner, price: "£50.00" },
  { name: "beadt", image: cat, image2: banner, price: "£22.00" },
];
