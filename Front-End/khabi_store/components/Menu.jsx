import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCart } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import MobileMenu from "./MobileMenu";
import { useStateContext } from "@/context/StateContext";


const Menu = () => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Tailored Clothing", url: "/tailored_clothing" },
    { id: 3, name: "Ready to Wear", url: "/ready_to_wear" },
    { id: 4, name: "About Us", url: "/about" },
  ];
  const [mobileMenu, setMobileMenu] = useState(false);
  const [shipFee,setShipFee]=useState(true);
  const handleMenu = () => {
    setShipFee(!shipFee)
    setMobileMenu(!mobileMenu);
    
    if (mobileMenu) {
      document.body.style.overflow = "auto"; // allow scroll
    } else {
      document.body.style.overflow = "hidden"; // disable scroll
    }
  };
  const {showCart,setShowCart,totalQuantities} =useStateContext();
    
  return (
    <>
 {shipFee && (
  <div className='text-center py-3 bg-red-200'>
    Free shipping on orders above PKR. 2999/-
  </div>
)}
     
    <div className="flex justify-between items-center w-full ">
      <Link href="/">
        {" "}
        <div className="font-semibold pointer text-[24px] logo">Khaabi</div>
      </Link>
      <ul className="flex gap-6 items-center text-[17px] ">
        {data.map((object) => {
          return (
            <li key={object.id} className="hidden md:block">
              <Link href={object.url}>{object.name}</Link>
            </li>
          );
        })}
        <Link href={'/cart'}>
          <div class="relative">
            <BsCart size={22} />
            <span class="absolute bottom-2 left-3 inline-flex items-center justify-center px-[6px] py-[3px] mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {totalQuantities}
            </span>
          </div>
        </Link>

        {mobileMenu ? (
          <div className="block md:hidden ">
            <RxCross2
              size={24}
              className="cursor-pointer block md:hidden "
              onClick={handleMenu}
            />
            <MobileMenu />
          </div>
        ) : (
          <RxHamburgerMenu
            size={24}
            className="cursor-pointer block md:hidden"
            onClick={handleMenu}
          />
        )}
      </ul>
    </div>
    </>
  );
};

export default Menu;
