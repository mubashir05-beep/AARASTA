import Link from "next/link";
import React from "react";
import { useStateContext } from "@/context/StateContext";

const MobileMenu = () => {
  const { showCart, setShowCart,mobileMenu, setMobileMenu,totalQuantities } = useStateContext();
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Shirts", url: "/shirts" },
    { id: 3, name: "About Us", url: "/about" },
    { id: 4, name: "Contact", url: "/contact" },
  ];

  return (
    <div className="fixed top-[55px] right-0 bottom-0 left-0 bg-white z-50">
      <ul className="flex flex-col gap-4 mx-4 my-4">
        {data.map((menu) => {
          return (
            <li key={menu.id} className="border-b text-lg">
              <Link
                href={menu.url}
                onClick={() => setMobileMenu(!mobileMenu)}
                className="text-gray-800 block px-2 py-1 hover:bg-gray-200 rounded transition duration-300"
              >
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileMenu;
