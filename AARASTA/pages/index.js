import React, { useState, useEffect, useRef } from "react";
import { client } from "@/lib/client";
import { useStateContext } from "@/context/StateContext";
import Link from "next/link";
import Products from "@/components/Products";

import Shirts from "@/components/Shirts";

import Kameez from "@/components/Kameez";
import Landing_Offer from "@/components/Landing_Offer";
import Result_Search from "@/components/Result_Search";
import ChooseUs from "@/components/ChooseUs";
import FeaturedProducts from "@/components/FeaturedProducts";

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
            dedication of two brothers who share a common vision - to create
            exceptional &ldquo;Kameez Shalwar&rdquo; and suits for men. Our
            story began with a deep-rooted love for traditional craftsmanship
            and a desire to bring the essence of our heritage to the modern
            world. Want to
            <span className="underline underline-offset-4 cursor-pointer">
              <Link href="/aboutus"> learn more?</Link>
            </span>
          </div>
        </div>
      </div>
      <ChooseUs />
      <div className="flex max-[860px]:flex-col max-[860px]:gap-4 justify-between items-center mx-[3rem] max-[500px]:mx-[1.5rem] my-[3rem] bg-gradient-to-r from-purple-300 p-[2rem] rounded-lg">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold mb-4  ">
            Have a Query or Need to Book an Appointment? Contact Us Now!
          </h2>
          <p className="mb-2 ">
            We'll Be More Than Happy to Assist You! And Solve All of Your
            Queries
          </p>
          <Link href="/contact">
            <button className="border rounded-lg border-black px-4  h-12 bg-black text-white hover:bg-gray-800 transition-colors duration-300">
              Contact Now!
            </button>
          </Link>
        </div>
      </div>
      <div className="mb-10">

      <div className="flex mx-[3rem] max-[500px]:mx-[1rem] max-[500px]:gap-[1rem] items-center flex-col border border-black rounded-xl p-8 ">
      <div className='flex flex-col  rounded-lg p-8 bg-gradient-to-r from-purple-300   w-full'>
      <h2 className='text-2xl font-bold text-black mb-6'>Best Selling Products!</h2>
      <div className='text-lg  text-gray-800'>Discover Our Best Selling Products and Experience Unmatched Quality!</div>
    </div>
        <div className="flex  w-full justify-between">
          <div className="flex flex-wrap gap-8 max-[500px]:p-0 p-8 w-full items-center justify-center ">
            {products
              .filter((product) => product.featured)
              .slice(0, 4) // Retrieve only the first three products
              .map((product) => (
                <div key={product._id} className="w-[400px]">
                  <Products product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
      </div>
    
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
