/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const Button = ({ onclick, name, styles }: any) => {
  return (
    <div className={`${styles}`}>
      <button
        onClick={onclick}
        className="bg-[#422727] rounded-full active:scale-90 transition ease-in duration-300 text-[#E8d3a4] font-serif text-[12.5px] px-6 py-1 uppercase"
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
