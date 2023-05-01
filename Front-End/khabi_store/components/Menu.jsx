import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { RxCross2 } from "react-icons/rx";
import MobileMenu from "./MobileMenu";

const Menu = () => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Tailored Clothing", url: "/tailored_clothing" },
    { id: 3, name: "Ready to Wear", url: "/ready_to_wear" },
    { id: 4, name: "About Us", url: "/about" },
    { id: 5, name: "Contact", url: "/contact" },
  ];
  const [mobileMenu, setMobileMenu] = useState(false);
  const handleMenu = () => {
    setMobileMenu(!mobileMenu);
    console.log(mobileMenu);
  };

  return (
    <div className="flex justify-between items-center w-full ">
      <Link href="/">
        {" "}
        <div className="font-semibold pointer text-[24px] logo">Khaabi</div>
      </Link>
      <ul className="flex gap-6 text-[17px] ">
        {data.map((object) => {
          return (
            <li key={object.id} className="hidden md:block">
              <Link href={object.url}>{object.name}</Link>
            </li>
          );
        })}

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
  );
};

export default Menu;
