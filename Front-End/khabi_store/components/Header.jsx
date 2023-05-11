import React, { useState } from 'react'
import Menu from './Menu'

const Header = () => {
  const [shipFee,setShipFee]=useState(true);

  return (
    <>
      {shipFee && (
        <div className='text-center py-3 bg-red-200'>
          Free shipping on orders above PKR. 2999/-
        </div>
      )}
      <div className={`mx-[3rem] my-[1rem]`}>
        <Menu shipFee={shipFee} setShipFee={setShipFee} />
      </div>
    </>
  )
}

export default Header
