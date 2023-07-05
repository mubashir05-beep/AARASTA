import { client, urlFor } from "@/lib/client";
import React, { useState } from "react";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect } from "react";
const Product = ({ products, product }) => {
  const {
    qty,
    incQty,
    decQty,
    onAdd,
    size,
    onSizeChange,
    selectedSize,
    discountedPrice,
    setDiscountedPrice,
  } = useStateContext();
  const [selected, setSelected] = useState("");
  useEffect(() => setDiscountedPrice(() => product.discount), []);

  const router = useRouter();
  const [err, setErr] = useState(false);
  const handleBuyNow = (event) => {
    event.preventDefault();
    
    if (!selectedSize) {
      setErr(true);
    } else {
      onAdd(product, qty);
      router.push("/cart");
    }
  };
  

  return (
    <>
      <div className="flex flex-col lg:flex-row  mx-[3rem] my-[3rem] gap-[6px]">
        <Link href="../" className="font-medium hover:underline">
          Home
        </Link>
        /
        <Link href="./" className="font-medium hover:underline">
          Shirts
        </Link>
        /<span className="font-medium ">{product.name}</span>
      </div>
      <div className="flex flex-col lg:flex-row items-center mx-[3rem] my-[3rem] justify-center gap-[45px]">
        <div className="max-w-[600px] relative">
          <img
            src={urlFor(product.image && product.image[0])}
            alt={product.name}
          />
          {product.discount && (
            <span className="absolute top-0 right-0 z-10 bg-red-500 text-white px-2 py-1  text-xs font-bold">
              {((product.discount / product.price) * 100).toFixed(0)}% OFF
            </span>
          )}
        </div>

        <div className="flex flex-col md:w-[450px]">
          <div className="flex flex-col gap-[1px] my-[12px]">
            <div>
              <div className="text-[35px]">{product.name}</div>
              <Link href={"/ready_to_wear"}>
                <div className="text-black text-[16px]">{product.category}</div>
              </Link>
            </div>

            <div className="text-black/[0.7]">
              Product Code :
              <span className="text-[14px]">{product.productCode} </span>
            </div>
          </div>
          <div>
            <div className="flex flex-row border-b border-black py-[12px] items-center justify-between">
              {discountedPrice ? (
                <div>
                  <div className="text-[20px] flex gap-4 items-center">
                    PKR {product.price - discountedPrice}
                  </div>
                  <div className="text-[16px] line-through">
                    PKR {product.price}
                  </div>
                </div>
              ) : (
                <div className="text-[22px]">PKR {product.price}</div>
              )}
              <div>
                {product.quantity ? (
                  <div className="text-green-400">In Stock</div>
                ) : (
                  <div className="text-red-400">Out of Stock</div>
                )}
              </div>
            </div>
            <div>
              <div>
                {product.Size && product.Size.length > 0 && (
                  <ul className="flex my-[15px] gap-4">
                    {product.Size.map((sizeOption, index) => (
                      <li key={index} className="text-center">
                        <div
                          className={`w-[30px] h-[30px] text-black rounded-full cursor-pointer bg-black/[0.1] flex items-center justify-center ${
                            selected === sizeOption ? "bg-black/[0.5]" : ""
                          }`}
                          onClick={() => {
                            onSizeChange(product._id, sizeOption);
                            setSelected(sizeOption);
                          }}
                        >
                          <span>{sizeOption}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="my-[1rem] flex flex-col justify-center gap-[6px]">
                <p className="text-[16px]">Quantity:</p>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l"
                    onClick={decQty}
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg">{qty}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r"
                    onClick={incQty}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="text-black/[0.6]">{product.details}</div>
            <div className="py-[12px] text-red-400">
              Hurry up! only limited stock left.
            </div>
            <div className={`text-red-800 ${err ? "block" : "hidden"}`}>
              Please select a size!
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                if (!selectedSize) {
                  setErr(true);
                } else {
                  onAdd(product, qty);
                }
              }}
              className="py-2 px-4 bg-black text-white rounded hover:bg-black/[0.4] active:bg-black/[0.6] disabled:opacity-50 mt-4 w-full flex items-center justify-center"
              disabled={!product.quantity}
            >
              Add to Cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ></svg>
            </button>
            {product.quantity && (
              <>
                {selected ? (
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-2 px-4 bg-red-400 text-white rounded hover:bg-black/[0.4] active:bg-black/[0.6] disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                  >
                    Buy Now
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setErr(true)}
                    className="py-2 px-4 bg-red-400 text-white rounded hover:bg-black/[0.4] active:bg-black/[0.6] disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                    disabled={!product.quantity}
                  >
                    Buy Now
                  </button>
                )}
              </>
            )}
          </div>

          <div className="py-[25px]">
            <p className="mb-[18px] text-black/[0.5] text-[15px]">
              Or buy this Product from Daraz!
            </p>
            <a
              href={`${product.darazLink}`}
              className="flex gap-2 
          bg-orange-600 h-[30px] w-[80px] text-white items-center rounded-md"
              target="_blank"
            >
              <Image src="/daraz.png" alt="daraz" width={25} height={25} />
              Buy
            </a>
          </div>
          <div className=" text-[14px] text-red-400">
            Disclaimer: Due to the difference in lighting used during
            photoshoots, the color or texture of the actual product may slightly
            vary from the image.
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
export async function getStaticPaths() {
  const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const product = await client.fetch(query);
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return {
    props: {
      products,
      product,
    },
  };
}
