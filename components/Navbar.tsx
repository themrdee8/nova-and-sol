"use client"
import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const [scrollBg, setScrollBg] = useState(false);

  useEffect(() => {
    const handleNavBg = () => {
      setScrollBg(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleNavBg)
    return () => window.removeEventListener("scroll", handleNavBg)
  }, [])

  return (
    <div className={`flex justify-between transition-all duration-300 p-2.5 items-center fixed w-full ${scrollBg ? 'bg-white shadow-md': "bg-transparent"}`}>
        <div className=''>
            <RxHamburgerMenu size={20} className={`${scrollBg ? 'text-black': "text-white" }`} />
        </div>
        <div className='ml-2'>
          <p className={`font-Satisfy transition-all duration-300 ${scrollBg ? 'text-black text-[18px]': "text-white text-[20px]" }`}>Nova & Sol</p>
        </div>
        <div className='flex space-x-4'>
          <FiSearch size={20} className={`${scrollBg ? 'text-black': "text-white" }`} />
          <MdOutlineShoppingCart size={20} className={`${scrollBg ? 'text-black': "text-white" }`} />
        </div>
    </div>
  )
}

export default Navbar