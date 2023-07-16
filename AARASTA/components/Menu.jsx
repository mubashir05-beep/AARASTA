import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCart } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import MobileMenu from "./MobileMenu";
import { useStateContext } from "@/context/StateContext";
import { GrSearch } from "react-icons/gr";
import Result_Search from "./Result_Search";

const Menu = () => {
  const {
    showCart,
    setShowCart,
    mobileMenu,
    setMobileMenu,
    totalQuantities,
    products,
    searchToggle,
    setSearchToggle,
    shipFee,
    setShipFee,
    setSearchData,
  } = useStateContext();

  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Shirts", url: "/shirts" },
    { id: 3, name: "Contact", url: "/contact" },
    { id: 4, name: "About Us", url: "/about" },
  ];

  const handleMenu = () => {
    setShipFee(!shipFee);
    setMobileMenu(!mobileMenu);

    if (mobileMenu) {
      document.body.style.overflow = "auto"; // allow scroll
    } else {
      document.body.style.overflow = "hidden"; // disable scroll
    }
  };

  const handleToggleSearch = () => {
    setSearchToggle(!searchToggle);
  };

  const handleSearchData = (e) => {
    const searchData = e.target.value;
    setSearchData(searchData);
    if (searchData.trim() === "") {
      setSearchResults([]);
    } else {
      getSearchResults(searchData);
    }
  };

  const getSearchResults = (searchData) => {
    const searchItems = products.filter((item) => {
      const productCode = item.productCode
        ? item.productCode.toLowerCase()
        : "";
      const name = item.name ? item.name.toLowerCase() : "";

      return (
        productCode.includes(searchData.toLowerCase()) ||
        name.includes(searchData.toLowerCase())
      );
    });

    setSearchResults(searchItems);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchToggle(false);
    }
  };


  return (
    <div className="flex justify-between  items-center w-full z-[55555555555] py-4 px-8 transition-colors duration-300 bg-white text-black ">
      <Link href="/">
        <div className="font-semibold pointer text-[24px] logo">AARASTA</div>
      </Link>
      <ul className="flex gap-6 items-center text-[17px]">
        {data.map((object) => {
          return (
            <li key={object.id} className="hidden md:block">
              <Link href={object.url}>{object.name}</Link>
            </li>
          );
        })}
        <div
          className={`flex relative flex-row items-center justify-normal transition-all ${
            searchToggle ? "h-9 border p-3 gap-2 rounded-lg" : ""
          }`}
          ref={searchRef}
        >
          <GrSearch
            className="cursor-pointer"
            size={22}
            onClick={handleToggleSearch}
          />
          <input
            className={`p-1 outline-none w-[10rem] ${
              !searchToggle ? "hidden" : ""
            } transition-width ${searchToggle ? "w-full" : "w-0"}`}
            onChange={handleSearchData}
            placeholder="Search..."
          />

          {searchToggle && (
            <div className="bg-white mt-2 p-4 rounded block max-[767px]:hidden shadow-md absolute top-[calc(100%+8px)] z-[1000000] right-0 w-64">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-semibold">Search Results</span>
                <button
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setSearchToggle(false)}
                >
                  <RxCross2 size={24} />
                </button>
              </div>
              <Result_Search searchResults={searchResults} />
            </div>
          )}
          {searchToggle && (
            <div
              className="fixed hidden top-0 right-0 bottom-0 p-10 left-0 max-[767px]:block bg-white z-[11111111111111111111] " 
              
            >
              <div className="flex flex-row items-center justify-normal h-9 border p-3 gap-2 rounded-lg">
                <GrSearch className="cursor-pointer" size={22} />
                <input
                  className="p-1 outline-none w-full"
                  onChange={handleSearchData}
                  placeholder="Search..."
                />
                <button
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => {
                    setSearchToggle(false);
                 
                  }}
                >
                  <RxCross2
                    size={24}
                    onClick={() => {
                   
                      setSearchToggle(false)
                    }}
                  />
                </button>
              </div>
              <div className="bg-white mt-2 p-4 rounded shadow-md max-w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-semibold max-w-[390px]">
                    Search Results
                  </span>
                </div>
                <Result_Search searchResults={searchResults} />
              </div>
            </div>
          )}
       
        </div>

        <Link href={"/cart"}>
          <div className="relative">
            <BsCart size={22} />
            <span className="absolute bottom-2 left-3 inline-flex items-center justify-center px-[6px] py-[3px] mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {totalQuantities}
            </span>
          </div>
        </Link>

        {mobileMenu ? (
          <div className="block md:hidden">
            <RxCross2
              size={24}
              className="cursor-pointer block md:hidden"
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
