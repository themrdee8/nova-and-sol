/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const Button = ({ onclick, name, styles}: any) => {
  return (
    <div className={`${styles}`}>
        <button onClick={onclick} className='bg-black text-[#E8E7E3] font-serif text-[12.5px] px-9 py-2 uppercase'>
            {name}
        </button>
    </div>
  )
}

export default Button