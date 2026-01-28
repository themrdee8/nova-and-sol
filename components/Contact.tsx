import React from "react";
import Button from "./Button";
import { FaInstagram, FaPinterestP, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BsTiktok } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Contact = () => {
  const router = useRouter();
  return (
    <div className="bg-white p-6">
      <div className="px-2 py-4 bg-gray-100 shadow-md font-Eb">
        <div className="">
          <p className="uppercase underline underline-offset-4 pb-2">Shop</p>
          <p
            onClick={() => router.push("/about")}
            className="active:scale-90 transition duration-300 ease-in"
          >
            About Us
          </p>
          <p
            onClick={() => router.push("/shipping")}
            className="active:scale-90 transition duration-300 ease-in"
          >
            Shipping / Deliveries
          </p>
          <p
            onClick={() => router.push("/about")}
            className="active:scale-90 transition duration-300 ease-in"
          >
            FAQs
          </p>
        </div>
        <p className="pt-4">Socials</p>
        <div className="flex justify-around py-2">
          <Link href="https://www.instagram.com/novaandsolatilier/">
            <div className="bg-[#422727] p-1 rounded-md active:scale-90 transition duration-300 ease-in">
              <FaInstagram size={20} className="text-[#E8d3a4]" />
            </div>
          </Link>

          <Link href="https://pin.it/7Dp9JWEvr/">
            <div className="bg-[#422727] p-1 rounded-md active:scale-90 transition duration-300 ease-in">
              <FaPinterestP size={20} className="text-[#E8d3a4]" />
            </div>
          </Link>

          <Link href="https://wa.me/0202357800/">
            <div className="bg-[#422727] p-1 rounded-md active:scale-90 transition duration-300 ease-in">
              <FaWhatsapp size={20} className="text-[#E8d3a4]" />
            </div>
          </Link>

          <Link href="mailto:shopnovaandsol@gmail.com">
            <div className="bg-[#422727] p-1 rounded-md active:scale-90 transition duration-300 ease-in">
              <MdOutlineEmail size={20} className="text-[#E8d3a4]" />
            </div>
          </Link>

          <Link href="https://www.tiktok.com/@nova.sol.atelier/">
            <div className="bg-[#422727] p-1 rounded-md active:scale-90 transition duration-300 ease-in">
              <BsTiktok size={20} className="text-[#E8d3a4]" />
            </div>
          </Link>
        </div>
        <div className="pt-4">
          <p>Sign up to our Emails (Coming Soon)</p>
          <Button name="Subscribe" styles="pt-2" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
