import React from "react";
import { client } from "@/lib/client";
import Products from "@/components/Products";
import Link from "next/link";

const ReadyToWear = ({ products }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row mx-3 my-3 gap-6">
        <Link href="/" className="font-medium hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium">Shirts</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 mx-3 my-5 md:px-0">
        {products.map((product) => (
          <div key={product._id}>
            <Products product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ReadyToWear;

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: {
      products,
    },
  };
};
