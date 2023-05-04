import React from "react";
import { urlFor } from "@/lib/client";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";
const Products = ({ product }) => {
  const {incQty,onAdd}=useStateContext();
  return (
    <div className="bg-white shadow rounded  ">
      <Link href={`/ready_to_wear/${product.slug.current}`}>
        <div className="h-48 md:h-60 bg-gray-200 flex flex-col justify-between bg-cover bg-center">
          <img
            className="w-full h-full object-cover object-center"
            src={urlFor(product.image && product.image[0])}
            alt=""
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col items-center">
        <p className="text-gray-600 font-light text-xs text-center">
          <Link href={"/ready_to_wear"}>{product.category}</Link>
        </p>
        <Link href={`/product/${product.slug.current}`}>
          <h1 className="text-gray-800 text-center mt-1">{product.name}</h1>
        </Link>
        <p className="text-center text-gray-800 mt-1">
          {"PKR " + product.price}
        </p>
        <button  className="py-2 px-4 bg-black text-white rounded hover:bg-black/[0.4] active:bg-black/[0.6] disabled:opacity-50 mt-4 w-full flex items-center justify-center">
          Add to Cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Products;
