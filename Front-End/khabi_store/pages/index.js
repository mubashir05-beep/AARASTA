import HeroBanner from "@/components/HeroBanner";
import Products from "@/components/Products";
import React, { useState, useEffect } from "react";
import { client } from "@/lib/client";
import FeaturedProducts from "@/components/FeaturedProducts";
import { useStateContext } from "@/context/StateContext";
import ChooseUs from "@/components/ChooseUs";
import Header_Hero from "@/components/Header_Hero";

export default function Home({ products, bannerData }) {
  const { setProducts } = useStateContext();
  useEffect(() => {
    setProducts(products);
  }, [products]);
  return (
    <main>
      {/* <HeroBanner setBannerData={bannerData} /> */}
      <Header_Hero />
      <ChooseUs />
      {/* <FeaturedProducts products={products} /> */}
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
