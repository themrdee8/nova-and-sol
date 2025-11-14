// import Image from "next/image";

import Navbar from "@/components/Navbar";
// import Link from "next/link";
import banner from "../public/images/banner.jpg";
import Image from "next/image";
import Button from "@/components/Button";
import NewArrivalsCard from "@/components/NewArrivalsCard";
import CategoryCard from "@/components/CategoryCard";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Navbar />
        <div className="bg-amber-200 h-[600px] grid place-items-center">
          <Image
            src={banner}
            alt="banner"
            className="h-[600px] object-cover col-start-1 row-start-1"
          />

          <Button name="Shop now" styles='col-start-1 row-start-1 mt-[550px]'/>
        </div>

        <div className="bg-gray-100">
          <div className="bg-white flex justify-center p-8">
            <p className="uppercase text-4xl font-serif mt-4">new arrivals</p>
          </div>
          <div className="grid grid-cols-2 gap-1 py-10 px-4 place-items-center">
            <NewArrivalsCard imageUrl={banner} name="banner" price="$4.00" />
            <NewArrivalsCard imageUrl={banner} name="banner" price="$4.00" />
            <NewArrivalsCard imageUrl={banner} name="banner" price="$4.00" />
            <NewArrivalsCard imageUrl={banner} name="banner" price="$4.00" />
          </div>
          <Button name="view all" styles="flex justify-center pb-10" />
        </div>

        
          <CategoryCard/>
        
        
      </main>
    </div>
  );
}
