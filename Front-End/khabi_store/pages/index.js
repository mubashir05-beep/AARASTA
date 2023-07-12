import React, { useState, useEffect, useRef } from "react";
import { client } from "@/lib/client";
import { useStateContext } from "@/context/StateContext";
import Link from "next/link";

import Shirts from "@/components/Shirts";

import Kameez from "@/components/Kameez";
import Landing_Offer from "@/components/Landing_Offer";
import Result_Search from "@/components/Result_Search";

const Home = ({ products }) => {
  const { setProducts } = useStateContext();

  useEffect(() => {
    setProducts(products);
  }, [products]);

  return (
    <main>
      <div className="flex items-center m-8 max-[1500px]:flex-col max-[1300px]:gap-[60px]  justify-center">
        <Shirts />
        <div className="border  border-r max-[1500px]:border-none h-[500px] max-[1500px]:h-0 border-black" />
        <Kameez />
      </div>
      {/* <Landing_Offer /> */}
    </main>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type=="product"]';
  const products = await client.fetch(query);
  return {
    props: {
      products,
    },
  };
};

export default Home;
