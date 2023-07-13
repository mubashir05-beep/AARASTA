import React from "react";
import { urlFor } from "@/lib/client";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";

const ProductCard = ({ product }) => {
  const { incQty } = useStateContext();

  const discountPercentage = product.discount
    ? ((product.discount / product.price) * 100).toFixed(0)
    : null;

  const discountedPrice = product.price - product.discount;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <Link href={`/shirts/${product.slug.current}`}>
        <div className="relative cursor-pointer">
          <img
            className=" object-cover "
            src={urlFor(product.image && product.image[0])}
            alt={product.name}
          />
          {product.discount && (
            <span className="absolute top-2 right-2 z-10 bg-red-500 text-white py-1 px-2 text-xs font-bold rounded">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href="/shirts">
          <p className="text-gray-600 font-light text-sm mb-2 cursor-pointer hover:underline">
            {product.category}
          </p>
        </Link>
        <Link href={`/shirts/${product.slug.current}`}>
          <h1 className="text-gray-800 text-lg font-medium mb-2 cursor-pointer hover:underline">
            {product.name}
          </h1>
        </Link>
        {product.discount && (
          <div className="flex items-center mb-2">
            <p className="text-red-500 text-xl font-medium pr-2">
              PKR {discountedPrice}
            </p>
            <p className="text-gray-500 text-sm line-through">
              PKR {product.price}
            </p>
          </div>
        )}
        {!product.discount && (
          <p className="text-gray-800 font-medium text-sm mb-4">
            PKR {product.price}
          </p>
        )}
        <div className="flex items-center justify-center">
          <Link href={`/shirts/${product.slug.current}`}>
            <button className="flex items-center px-4 py-2 bg-transparent text-black hover:border-gray-500 focus:outline-none border border-black rounded">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
