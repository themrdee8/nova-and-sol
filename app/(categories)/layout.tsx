"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import banner from "@/public/images/banner.jpg";
import { categoryConfig } from "./categoryConfig";
import { usePathname } from "next/navigation";
import Contact from "@/components/Contact";

interface CategoriesLayoutProps {
  children: React.ReactNode;
}

const CategoriesLayout = ({ children }: CategoriesLayoutProps) => {
  const pathname = usePathname();
  const categoryKey = pathname?.split("/")[1];
  const data = categoryConfig[categoryKey as keyof typeof categoryConfig];
  const title = data?.title || "";
  const description = data?.description || [];

  return (
    <div>
      <Navbar />
      <div className="grid place-items-center">
        <Image
          src={banner}
          alt="banner"
          className="h-[260px] object-cover col-start-1 row-start-1"
        />

        <div className="bg-white col-start-1 row-start-1 w-[380px] h-[180px] mt-6">
          <p className="text-[#422727] text-[38px] font-Eb text-center uppercase pt-4 mt-6 mb-2">
            {title}
          </p>
          <ul className="list-disc flex space-x-8 text-[#422727] font-serif justify-center uppercase ml-3">
            {description.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {children}
      <Contact />
    </div>
  );
};

export default CategoriesLayout;
