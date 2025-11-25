import React from "react";
import Button from "./Button";
import { FaInstagram, FaPinterestP, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="bg-white p-6">
      <div className="px-2 py-4 bg-gray-100 shadow-md font-Eb">
        <div className="">
          <p className="uppercase underline underline-offset-4 pb-2">Shop</p>
          <p>Search</p>
          <p>Shipping / Deliveries</p>
          <p>FAQs</p>
          <p>Contact Information</p>
        </div>
        <p className="pt-4">Socials</p>
        <div className="flex justify-around py-2">
          <div className="bg-[#422727] p-1 rounded-md active:scale-90 transition duration-300 ease-in">
            <FaInstagram size={20} className="text-[#E8d3a4]" />
          </div>
          <div className="bg-[#422727] p-1 rounded-md active:scale-90 transition duration-300 ease-in">
            <FaPinterestP size={20} className="text-[#E8d3a4]" />
          </div>
          <div className="bg-[#422727] p-1 rounded-md active:scale-90 transition duration-300 ease-in">
            <FaWhatsapp size={20} className="text-[#E8d3a4]" />
          </div>
          <div className="bg-[#422727] p-1 rounded-md active:scale-90 transition duration-300 ease-in">
            <MdOutlineEmail size={20} className="text-[#E8d3a4]" />
          </div>
        </div>
        <div className="pt-4">
          <p>Sign up to our Emails</p>
          <Button name="Subscribe" styles="pt-2" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
