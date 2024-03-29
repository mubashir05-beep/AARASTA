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
        <div className="relative h-[70vh]" ref={ref}>
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
          <div className="absolute top-0 left-0 w-full h-full px-[3rem]  max-[1060px]:justify-center max-[1060px]:p-0 bg-black bg-opacity-20 flex max-[1060px]:flex-col max-[1060px]:items-start items-end justify-between gap-[1rem] py-8">
            <div className="flex max-[640px]:flex-col max-[640px]:items-start flex-col max-[1060px]:flex-row max-[1060px]:items-center max-[1060px]:h-[70vh]  w-[70vw] max-[640px]:justify-center max-[1060px]:justify-between max-[1060px]:w-screen max-[1060px]:px-12 max-[500px]:px-[1rem] max-[1060px]:py-8  gap-[1rem]   ">
              <div className="flex flex-col max-w-[600px] max-[1010px]:w-[400px] max-[485px]:w-auto">
                <span className="text-white font-bold max-[710px]:text-[2rem] text-[3rem] max-[400px]:text-[2rem]  ">
                  SUMMER SALE
                </span>
                <span className="text-white font-bold  max-[400px]:font-semibold text-base max-[815px]:text-sm  max-[710px]:text-xs ">
                  Sizzling Discounts Await You! Hurry, Shop Now to Enjoy Our Hottest Deals of the Season!. Prepare to be dazzled by up to 50% off on a wide range of shirts! It&apos;s the perfect opportunity to revamp your wardrobe without breaking the bank.
                </span>
              </div>

              <div className="text-white font-bold flex flex-col max-[1060px]:items-center max-[400px]:text-base text-xl max-[640px]:flex-row max-[640px]:gap-2 max-[400px]:gap-1">
                Enjoy UPTO <span className="text-7xl max-[710px]:text-[2rem] max-[795px]:text-[3rem] max-[400px]:[2rem]  ">50% OFF</span>
              </div>
            </div>
            <div className="flex flex-col max-[1060px]:h-[30vh] max-[1060px]:w-[100vw] max-[1060px]:px-12 max-[1060px]:py-8  max-[1060px]:border-t max-[500px]:px-[1rem]  max-[1060px]:border-black w-[30vw] gap-2">
              <div className="text-white font-bold text-lg max-[400px]:text-sm">
                Exclusive Coupon: Use it to Get an Additional 10% OFF!
              </div>
              <div className="text-white font-bold text-4xl max-[1060px]:text-[2xl] max-[400px]:text-xl">
                &apos;SUMMER10&apos;
              </div>
              <div className="text-white font-bold text-xs max-[400px]:font-semibold">
                *Coupon code is valid for orders above $1500 and must be applied
                before the inclusion of any shipping fees. Please review terms
                and conditions for further details.
              </div>
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
        <Landing_Offer />
        <div className="mx-[1rem] min-[500px]:mx-[3rem] min-[500px]:p-8 p-4 border border-black rounded-xl font-bold text-2xl">Discover Product Variety!</div>
        <div>

          <div className="flex flex-row items-center mx-12 max-[500px]:mx-[1rem]  rounded-xl max-[370px]:px-4 max-[370px]:justify-center px-12  border-black border my-12 py-4 gap-2">
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
        
          <div className="grid grid-cols-1 md:grid-cols-2 mx-12 max-[500px]:mx-[1rem] max-[500px]:gap-[1rem] lg:grid-cols-3 gap-5 px-5 max-[500px]:px-0 my-16 md:px-0">
            {sortedProducts.map((product) => (
              <div
                key={product._id}
                className="border border-black  p-4    rounded-xl"
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
