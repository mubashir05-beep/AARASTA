import React from "react";
import { client } from "@/lib/client";
import Products from "@/components/Products";

const ready_to_wear = ({ products }) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  px-5 mx-[3rem] my-[5rem] md:px-0">
      {products.map((product) => (
        <div>
          <Products key={product._id} product={product} />
        </div>
      ))}
    </div>
  );
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
