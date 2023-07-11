import React, { useState } from "react";
import { client } from "@/lib/client";
import Products from "@/components/Products";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
Menu
const Shirts = ({ products }) => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortProducts = () => {
    let sortedProducts = [...products];

    if (sortBy === "priceLowToHigh") {
      sortedProducts.sort((a, b) => {
        const discountedPriceA = calculateDiscountedPrice(a);
        const discountedPriceB = calculateDiscountedPrice(b);

        if (discountedPriceA === discountedPriceB) {
          return a.price - b.price; // Sort by actual price if discounted prices are equal
        }

        return discountedPriceA - discountedPriceB;
      });
    } else if (sortBy === "priceHighToLow") {
      sortedProducts.sort((a, b) => {
        const discountedPriceA = calculateDiscountedPrice(a);
        const discountedPriceB = calculateDiscountedPrice(b);

        if (discountedPriceA === discountedPriceB) {
          return b.price - a.price; // Sort by actual price if discounted prices are equal
        }

        return discountedPriceB - discountedPriceA;
      });
    } else if (sortBy === "nameAtoZ") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "nameZtoA") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return sortedProducts;
  };

  const calculateDiscountedPrice = (product) => {
    if (product.discount) {
      return product.price - product.discount;
    }
    return product.price;
  };

  const sortedProducts = sortProducts();

  return (
    <>
  
    <div>
      <div className="relative h-[300px]">
        <Image src="/sky.jpg" layout="fill" objectFit="cover" alt="Product Image" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
          <span className="text-white font-bold text-[5rem] max-[425px]:text-[3rem]">SHIRTS</span>
        </div>
      </div>

      <div className="flex flex-row mx-12 mt-12 gap-2">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold">Shirts</span>
      </div>
      <div className="mb-4 mx-12 mt-4 flex items-center">
        <span className="mr-2">Sort by:</span>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="py-2 border border-gray-300 rounded"
        >
          <option value="">None</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="nameAtoZ">Name: A to Z</option>
          <option value="nameZtoA">Name: Z to A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mx-12 lg:grid-cols-3 gap-5 px-5 my-16 md:px-0">
        {sortedProducts.map((product) => (
          <div
            key={product._id}
            className="border border-gray-300 p-4 rounded"
          >
            <Products product={product} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Shirts;

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: {
      products,
    },
  };
};
