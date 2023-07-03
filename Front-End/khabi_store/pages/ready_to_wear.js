import React from "react";
import { client } from "@/lib/client";
import Products from "@/components/Products";
import Link from "next/link";

const ready_to_wear = ({ products }) => {
  return (
    <>
    <div className="flex flex-col lg:flex-row  mx-[3rem] my-[3rem] gap-[6px]">
        <Link href='./' className='font-medium hover:underline transition-all  ease-in-out duration-300 '>
        Home /
        </Link>
       
      </div>
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  px-5 mx-[3rem] my-[5rem] md:px-0">
      {products.map((product) => (
        <div>
          <Products key={product._id} product={product} />
        </div>
      ))}
    </div>
    </>);
};

export default ready_to_wear;
export const getServerSideProps = async () => {
  const query = '*[_type=="product"]';
  const products = await client.fetch(query);

  return {
    props: {
      products,
    },
  };
};
