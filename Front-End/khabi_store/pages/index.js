import HeroBanner from "@/components/HeroBanner";
import Products from "@/components/Products";
import React, { useState, useEffect,useRef } from "react";
import { client } from "@/lib/client";
import FeaturedProducts from "@/components/FeaturedProducts";
import { useStateContext } from "@/context/StateContext";
import ChooseUs from "@/components/ChooseUs";
import Header_Hero from "@/components/Header_Hero";
import Landing_Offer from "@/components/Landing_Offer";
import Category from "@/components/Category";
import Kameez from "@/components/Kameez";
import Link from "next/link";
import Shirts from "@/components/Shirts";
import { BsCart } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import Result_Search from "@/components/Result_Search";
export default function Home({ products, bannerData }) {
  const {
    showCart,
    setShowCart,
    mobileMenu,
    setMobileMenu,
    totalQuantities,
    setProducts,
    searchToggle,
    setTop,
    setSearchToggle,
    shipFee,
    searchState,
    setSearchState,
    setShipFee,
    setSearchData,
  } = useStateContext();
  useEffect(() => {
    setProducts(products);
  }, [products]);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const [hide,setHide]=useState(false);


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


 
  return (
    <main>
      <div className="flex items-center justify-between py-8 px-8">
        <div />
        <Link href="/">
          <div className="font-semibold pointer text-[24px] logo2">AARASTA</div>
        </Link>
        <div className="flex gap-4">
          <div className="ml-auto">
          <GoSearch
              className="cursor-pointer"
        
              size={22}
              onClick={() => {
                setSearchState(!searchState);
                setHide(!hide);
              }}
            />
            {searchState && (
              <div
                className="fixed top-0 right-0 bottom-0 p-10 left-0 bg-white"
                ref={searchRef}
              >
                <div className="flex flex-row items-center justify-normal h-9 border p-3 gap-2 rounded-lg">
                  <GoSearch className="cursor-pointer" size={22} />
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
                        setHide(!hide)
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
          <div>
            <Link href={"/cart"}>
              <div className={`relative ${hide ? 'hidden':'block'}`}>
                <BsCart size={22} />
                <span className="absolute bottom-2 left-3 inline-flex items-center justify-center px-[6px] py-[3px] mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalQuantities}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Shirts />
        <div
          className="border border-r border-black"
          style={{ height: "500px" }}
        />
        <Kameez />
      </div>
      <Landing_Offer />
    </main>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type=="product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type=="banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: {
      products,
      bannerData,
    },
  };
};
