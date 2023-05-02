import HeroBanner from "@/components/HeroBanner";
import React from "react";
import { client } from "@/lib/client";
export default function Home({products,bannerData}) {
  return <main >
    <HeroBanner setBannerData={bannerData.length&&bannerData[0]}/>
  </main>;
}

export const getServerSideProps=async()=>{
    const query ='*[_type=="product"]';
    const products =await client.fetch(query);
    const bannerQuery ='*[_type=="banner"]';
    const bannerData =await client.fetch(bannerQuery);
    return{
      props:{
        products,bannerData
      }
    }
}