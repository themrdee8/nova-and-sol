"use client";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaPlus, FaArrowRightToBracket } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [scrollBg, setScrollBg] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [categoryList, setCategoryList] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const pathname = usePathname();
  const isProductPage = pathname.startsWith(`/category/`);

  const { user, openAuthModal, logout } = useAuth();

  const categoryLink = [
    { pageName: "streetwear", pageLink: "/streetWear" },
    { pageName: "the sol strand", pageLink: "/theSolStrand" },
    { pageName: "amari", pageLink: "/amari" },
    { pageName: "the charm bar", pageLink: "/theCharmBar" },
    { pageName: "the perfect find", pageLink: "/thePerfectFind" },
  ];

  useEffect(() => {
    const handleNavBg = () => {
      setScrollBg(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleNavBg);
    return () => window.removeEventListener("scroll", handleNavBg);
  }, []);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const toggleCategory = () => {
    setCategoryList(!categoryList);
  };

  const toggleSearch = () => {
    setSearchBar(!searchBar);
  };

  const toggleCartMenu = () => {
    setCartMenu(!cartMenu);
  };

  const glassEffect = searchBar || scrollBg || isProductPage;

  return (
    <div
      className={`flex justify-between transition-all duration-300 p-2.5 items-center fixed w-full ${
        glassEffect ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Navbar */}
      <div onClick={toggleSidebar} className={``}>
        <RxHamburgerMenu
          size={20}
          className={`active:scale-90 ${
            glassEffect ? "text-[#422727]" : "text-[#E8d3a4]"
          }`}
        />
      </div>
      <div className="ml-2">
        <Link href="/">
          <p
            className={`font-Cinzel transition-all duration-300 ${
              glassEffect
                ? "text-[#422727] text-[20px]"
                : "text-[#E8d3a4] text-[22px]"
            }`}
          >
            Nova & Sol
          </p>
        </Link>
      </div>
      <div className="flex space-x-4">
        <FiSearch
          size={20}
          className={`active:scale-90 ${
            glassEffect ? "text-[#422727]" : "text-[#E8d3a4]"
          }`}
          onClick={toggleSearch}
        />
        <MdOutlineShoppingCart
          size={20}
          className={`active:scale-90 ${
            glassEffect ? "text-[#422727]" : "text-[#E8d3a4]"
          }`}
          onClick={toggleCartMenu}
        />
      </div>

      {/* Toggle Search bar */}
      <div
        className={`bg-white/40 fixed left-0 w-full h-full top-20 ${
          searchBar ? "" : "hidden"
        }`}
      >
        <div
          className={`fixed bg-white shadow-md left-0 w-full h-[14%] top-12 p-4 flex items-center justify-center`}
        >
          <div className="flex items-center justify-between bg-gray-100 w-[400px]">
            <div className=" p-3">
              <FiSearch size={20} className="active:scale-90" />
            </div>
            <textarea
              className="place-content-center w-[300px]"
              placeholder="Search our store..."
              name=""
              id=""
            ></textarea>
            <div
              onClick={toggleSearch}
              className={`p-3 transition-colors duration-300`}
            >
              <IoIosClose size={20} className="active:scale-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Toggle CartMenu */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white/40 w-full h-full ${
          cartMenu ? "" : "hidden"
        }`}
      >
        <div
          className={`fixed top-0 right-0 bg-white w-[80%] h-full font-Eb uppercase flex flex-col transition-transform duration-300 ${
            cartMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between py-4 px-2 text-[22px] border-b border-[#422727]/40">
            <p>Cart</p>
            <FaPlus
              className="rotate-45 active:scale-90"
              onClick={toggleCartMenu}
            />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <p>your cat is empty</p>
          </div>
          <div className="border-t py-4 text-center">
            <p>Free delivery in Accra</p>
          </div>
        </div>
      </div>

      {/* Toggle Sidebar */}
      <div
        className={`fixed left-0 top-0 w-full h-full bg-white/40 transition-opacity duration-300
          ${sidebar ? "" : "hidden"}`}
      >
        <div
          className={` fixed left-0 top-0 w-[80%] uppercase font-medium font-Eb h-full bg-white p-4 transform transition-transform duration-500 ease-in-out
            ${sidebar ? " translate-x-0" : "-translate-x-full"}`}
        >
          {user ? (
            <div className="flex justify-end">
              <p>{user.user_metadata?.full_name || user.email}</p>
              <FaArrowRightToBracket
                className="active:scale-90"
                onClick={toggleSidebar}
              />
            </div>
          ) : (
            <div className="flex justify-end">
              <FaArrowRightToBracket
                className="active:scale-90"
                onClick={toggleSidebar}
              />
            </div>
          )}
          {/* <div className="flex justify-end" onClick={toggleSidebar}>
            <FaArrowRightToBracket className="active:scale-90" />
          </div> */}
          <div className="pb-4 mb-4 pt-4 border-b">
            <Link href="/category/newArrivals">
              <p className="">new arrivals</p>
            </Link>
          </div>
          <div className="items-center pb-6 mb-4 pt-4 border-b">
            <div className="flex items-center justify-between">
              <p>shop by category</p>
              <div
                onClick={toggleCategory}
                className={` transition ease-in-out duration-300
                  ${categoryList ? "rotate-45" : ""}`}
              >
                <FaPlus />
              </div>
            </div>
            <div
              className={
                categoryList
                  ? "transition-all duration-300 ease-in pt-2 mt-3 border-t"
                  : "hidden"
              }
            >
              <ul className="text-[14px] space-y-2">
                {categoryLink.map((item) => (
                  <Link
                    key={item.pageName}
                    href={`/category${item.pageLink}`}
                    onClick={toggleSidebar}
                  >
                    <li>{item.pageName}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="py-4 pb-4 mb-4 pt-4 border-b">
            <p>about us</p>
          </div>
          {user ? (
            <div className="py-4 pb-4 mb-4 pt-4 border-b">
              <p onClick={logout}>Logout</p>
            </div>
          ) : (
            <div className="py-4 pb-4 mb-4 pt-4 border-b">
              <p className="cursor-pointer" onClick={openAuthModal}>
                Login / sign up
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Toggle Sidebar */}
    </div>
  );
};

export default Navbar;
