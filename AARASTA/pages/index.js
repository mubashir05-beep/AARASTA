import React, { useState, useEffect, useRef } from "react";
import { client } from "@/lib/client";
import { useStateContext } from "@/context/StateContext";
import Link from "next/link";

import Shirts from "@/components/Shirts";

import Kameez from "@/components/Kameez";
import Landing_Offer from "@/components/Landing_Offer";
import Result_Search from "@/components/Result_Search";
import ChooseUs from "@/components/ChooseUs";


const Home = ({ products }) => {
  const { setProducts } = useStateContext();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return (
    <main>
      <div className="flex items-center m-8 max-[1500px]:flex-col max-[1300px]:gap-[60px]  justify-center">
        <Shirts />
        <div className="border  border-r max-[1500px]:border-none h-[500px] max-[1500px]:h-0 border-black" />
        <Kameez />
      </div>
      <div className="flex max-[860px]:flex-col max-[860px]:gap-4 justify-between items-center mx-[3rem] max-[500px]:mx-[1.5rem] my-[3rem] bg-gradient-to-r from-purple-300 p-[2rem] rounded-lg">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-4  max-[860px]:text-center">
          Welcome!
        </h2>
        <div className="text-lg pt-1 text-black ">
                  Welcome to AARASTA! We are a brand built on the passion and
                  dedication of two brothers who share a common vision - to
                  create exceptional &ldquo;Kameez Shalwar&rdquo; and suits for
                  men. Our story began with a deep-rooted love for traditional
                  craftsmanship and a desire to bring the essence of our
                  heritage to the modern world. Want to
                  <span className="underline underline-offset-4 cursor-pointer">
                    <Link href="/aboutus">learn more?</Link>
                  </span>
                </div>
    
    </div>
    </div>
      <ChooseUs />
      <Landing_Offer />
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
