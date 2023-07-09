import React, { useState } from 'react'
import Menu from './Menu'

import { useStateContext } from "@/context/StateContext";
const Header = () => {
  const {
    shipFee,setShipFee,
  } = useStateContext();

  return (
    <>
      {shipFee && (
     <div className="text-center text-sm py-2 bg-red-200">
     Free shipping on orders above PKR. 2499/-
   </div>
   
      )}
      <div className={`mx-[3rem] max-[500px]:mx-[1.5rem] my-[1rem]`}>
        <Menu />
      </div>
    </>
  )
}

export default Header
