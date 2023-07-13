import React, { useState, useRef, useEffect } from "react";
import { client } from "@/lib/client";
import Products from "@/components/Products";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import { Gradient } from "@/components/Gradient";
import FeaturedProducts from "@/components/FeaturedProducts";
import Landing_Offer from "@/components/Landing_Offer";

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
  const ref = useRef();

  useEffect(() => {
    const gradient = new Gradient();
    if (ref.current) {
      gradient.initGradient("#gradient-canvas");
    }
  }, []);

  return (
    <>
      <div>
        <div className="relative h-[60vh]" ref={ref}>
          <canvas
            id="gradient-canvas"
            data-transition-in
            className="w-full h-full"
            style={{
              backgroundImage: `url("/hero-background.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-end justify-between gap-[1rem] px-[3rem] py-8">
  <div className="flex flex-col justify-center gap-[1rem] mix-blend-difference">
    <span className="text-white font-bold text-4xl max-[425px]:text-3xl">SUMMER SALE</span>
    <span className="text-white font-bold text-2xl max-[425px]:text-3xl">
      Unleash Your Style This Summer!
    </span>
    <span className="text-white font-bold text-sm max-[425px]:text-3xl">
      Discover the Perfect Blend of Comfort and Elegance at Unbeatable Prices!
    </span>
    <span className="text-white font-bold text-sm max-[425px]:text-3xl">
      UPTO <span className="text-5xl">50% OFF</span>
    </span>
  </div>
  <div className="flex flex-col w-[300px]">
  <div className="text-white font-bold text-lg">Coupon 10% OFF</div>
  <div className="text-white font-bold text-4xl">'SUMMER10'</div>
  <div className="text-white font-bold text-xs">*Coupon code is valid for orders above $1500 and must be applied before the inclusion of any shipping fees. Please review terms and conditions for further details.</div>
  </div>
  
</div>


        </div>

        <div className="flex flex-row mx-12 rounded-xl px-12 border-black border my-12 py-4 gap-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold">Shirts</span>
        </div>

        <FeaturedProducts products={products} />
        <Landing_Offer/>
        <div>
          <div className="flex flex-row items-center mx-12 rounded-xl px-12 border-black border my-12 py-4 gap-2">
            <span className="mr-2">Sort by:</span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="py-2 px-2 border border-gray-300 rounded"
            >
              <option className="" value="">
                None
              </option>
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
                className="border border-black  p-4 rounded-xl"
              >
                <Products product={product} />
              </div>
            ))}
          </div>
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
