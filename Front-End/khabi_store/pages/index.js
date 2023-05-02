import HeroBanner from "@/components/HeroBanner";
import Products from "@/components/Products";
import React from "react";
import { client } from "@/lib/client";
import FeaturedProducts from "@/components/FeaturedProducts";
export default function Home({ products, bannerData }) {
  return (
    <main>
      <HeroBanner setBannerData={bannerData} />
      <FeaturedProducts products={products} />
  
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
