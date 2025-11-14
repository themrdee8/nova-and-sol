import React from 'react'
import Button from './Button'
import { FaInstagram, FaPinterestP, FaWhatsapp } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'

const Contact = () => {
  return (
    <div className='bg-white p-6'>
    <div className='px-2 py-4 bg-gray-100 shadow-md'>
        <div>
            <p className='uppercase underline underline-offset-4 pb-2'>Shop</p>
            <p>Search</p>
            <p>Shipping / Deliveries</p>
            <p>FAQs</p>
            <p>Contact Information</p>
        </div>
            <p className='pt-4'>Socials</p>
        <div className='flex justify-around py-2'>
            <FaInstagram size={20} className='' />
            <FaPinterestP size={20} />
            <FaWhatsapp size={20} />
            <MdOutlineEmail size={20} />
        </div>
        <div className='pt-4'>
            <p>Sign up to our Emails</p>
            <Button name="Subscribe" styles="pt-2"/>
        </div>
    </div>
    </div>
  )
}

export default Contact