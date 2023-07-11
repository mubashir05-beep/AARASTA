import HeroBanner from "@/components/HeroBanner";
import Products from "@/components/Products";
import React, { useState, useEffect } from "react";
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

  return (
    <main>
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center">
          <Link href="/">
            <div className="font-semibold pointer text-[24px] logo2">
              AARASTA
            </div>
          </Link>
          <div className="ml-auto">
            <GoSearch
              className="cursor-pointer"
              size={22}
              onClick={() => {
                setSearchState(!searchState);
              }}
            />
            {searchState && (
              <div className="fixed top-0 right-0 bottom-0 p-10 left-0 bg-white">
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
                      }}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <Link href={"/cart"}>
              <div className="relative">
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
