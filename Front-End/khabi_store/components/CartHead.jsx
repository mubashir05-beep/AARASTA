import React from 'react'
import { AiOutlineExclamation } from "react-icons/ai";
const CartHead = () => {
  return (
    <div className="flex flex-col items-center rounded-t-lg md:flex-row gap-[40px] bg-gray-800 p-7  w-full text-white">
          <div className="rounded-full border border-white flex items-center justify-center w-10 h-10">
            <AiOutlineExclamation size={20} />
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base">
              <span className="font-semibold">
                Delivery available in Islamabad and Rawalpindi.
              </span>
              <br />
              <span className="text-gray-300">
                Contact us for delivery in other areas.
              </span>
            </p>
            <p className="text-xs md:text-sm text-gray-300 mt-2">
              Thank you for choosing us.
            </p>
          </div>
        </div>
  )
}

export default CartHead