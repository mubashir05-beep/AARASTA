import React, { useState } from 'react'
import Menu from './Menu'

const Header = () => {
  const [shipFee,setShipFee]=useState(true);

  return (
    <>
      {shipFee && (
        <div className='text-center text-[14px] py-2 bg-red-200'>
          Free shipping on orders above PKR. 2499/-
        </div>
      )}
      <div className={`mx-[3rem] max-[500px]:mx-[1.5rem] my-[1rem]`}>
        <Menu shipFee={shipFee} setShipFee={setShipFee} />
      </div>
    </>
  )
}

export default Header
