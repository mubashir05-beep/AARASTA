import React from "react";
import { urlFor } from "@/lib/client";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";

const Products = ({ product }) => {
  const { incQty, onAdd } = useStateContext();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <Link href={`/ready_to_wear/${product.slug.current}`}>
        <div className="relative cursor-pointer">
          <img
            className="w-full h-40 object-cover"
            src={urlFor(product.image && product.image[0])}
            alt={product.name}
          />
          {product.discount && (
            <span className="absolute top-2 right-2 z-10 bg-red-500 text-white py-1 px-2 text-xs font-bold rounded">
              {((product.discount / product.price) * 100).toFixed(0)}% OFF
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href="/ready_to_wear">
          <p className="text-gray-600 font-light text-xs mb-2 cursor-pointer hover:underline">
            {product.category}
          </p>
        </Link>
        <Link href={`/ready_to_wear/${product.slug.current}`}>
          <h1 className="text-gray-800 text-lg font-medium mb-2 cursor-pointer hover:underline">
            {product.name}
          </h1>
        </Link>
        <p className="text-gray-800 font-medium mb-4">PKR {product.price}</p>
        <div className="flex items-center justify-center">
          <Link href={`/ready_to_wear/${product.slug.current}`}>
            <button className="flex items-center px-4 py-2 bg-transparent text-black hover:underline focus:outline-none">
              View More
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
