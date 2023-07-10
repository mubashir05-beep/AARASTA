import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCart } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import MobileMenu from "./MobileMenu";
import { useStateContext } from "@/context/StateContext";
import { GoSearch } from "react-icons/go";
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
    setTop,
    setSearchToggle,
    shipFee,
    searchState,
    setSearchState,
    setShipFee,
    setSearchData,
  } = useStateContext();

  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const [navbarBackground, setNavbarBackground] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Shirts", url: "/shirts" },
    { id: 3, name: "About Us", url: "/about" },
    { id: 4, name: "Contact", url: "/contact" },
  ];

  const handleMenu = () => {
    setNavbarBackground(!navbarBackground);
    setShipFee(!shipFee);
    setMobileMenu(!mobileMenu);

    if (mobileMenu) {
      document.body.style.overflow = "auto"; // allow scroll
    } else {
      document.body.style.overflow = "hidden"; // disable scroll
    }
  };

  const handleSearchData = (e) => {
    const searchData = e.target.value;
    setSearchToggle(!searchToggle);
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

  const handleScroll = () => {
    const navbarHeight = window.innerHeight;
    if (window.scrollY > navbarHeight) {
      setNavbarBackground(false);
    } else {
      setNavbarBackground(true);
    }
    if (window.scrollY >= 36) {
      setTop(0);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* {!shipFee && (
        <div className={`text-center text-sm py-2 bg-red-200 ${!top === 36 ? "" : "hidden"}`}>
          Free shipping on orders above PKR. 2499/-
        </div>
      )} */}
      <div
        className={`flex justify-between items-center fixed w-full z-[55555555555] left-0 p-4 transition-colors duration-300 ${
          navbarBackground ? "bg-transparent text-white " : "bg-white top-0 text-black"
        }`}
      >
        <Link href="/">
          <div className="font-semibold pointer mix-blend-difference text-[24px] logo">AARASTA</div>
        </Link>
        <ul className="flex gap-6 items-center px-3 text-[17px]">
          {data.map((object) => (
            <li key={object.id} className="hidden md:block">
              <Link href={object.url}>{object.name}</Link>
            </li>
          ))}
          <GoSearch
            className="cursor-pointer "
            color={`${navbarBackground ? 'white':'black'}`}
            size={22}
            onClick={() => {
              setSearchState(!searchState);
            }}
          />
          {searchState && (
            <div
              className="fixed top-0 right-0 bottom-0 p-10 left-0 bg-white z-[500000]"
              ref={searchRef}
            >
              <div className="flex flex-row items-center justify-normal h-9 border p-3 gap-2 rounded-lg">
                <GoSearch className="cursor-pointer"  size={22} />
                <input
                  className="p-1 outline-none w-full"
                  onChange={handleSearchData}
                  placeholder="Search..."
                />
                <button
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setSearchToggle(false)}
                >
                  <RxCross2
                    size={24}
                    onClick={() => {
                      setSearchState(!searchState);
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
    </>
  );
};

export default Menu;
