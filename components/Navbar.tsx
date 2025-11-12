"use client"
import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const [navBg, setNavBg] = useState("transparent")

  useEffect(() => {
    const handleNavBg = () => {
      if (window.scrollY >= 90) setNavBg("white")
      else setNavBg("transparent")
    }

    window.addEventListener("scroll", handleNavBg)
  }, [])

  return (
    <div className={navBg ? 'flex justify-between p-2.5 items-center fixed w-full': ""}>
        <div className=''>
            <RxHamburgerMenu size={18} className='text-white' />
        </div>
        <div>
          <p className='font-Satisfy text-[20px] text-white'>Nova & Sol</p>
        </div>
        <div className='flex space-x-2'>
          <FiSearch size={18} className='text-white' />
          <MdOutlineShoppingCart size={18} className='text-white' />
        </div>
    </div>
  )
}

export default Navbar