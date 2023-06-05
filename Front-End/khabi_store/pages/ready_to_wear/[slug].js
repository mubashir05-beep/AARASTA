import { client, urlFor } from "@/lib/client";
import React, { useState } from "react";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";

const Product = ({ products, product }) => {
  const {
    qty,
    incQty,
    decQty,
    onAdd,
    size,
    onSizeChange,
    selectedSize,
  } = useStateContext();
  const [selected, setSelected] = useState("");

  return (
    <div className="flex flex-col lg:flex-row items-center mx-[3rem] my-[3rem] justify-center gap-[45px]">
      <div className="max-w-[600px]">
        <img
          src={urlFor(product.image && product.image[0])}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col md:w-[450px]">
        <div className="flex flex-col gap-[1px] my-[12px]">
          <div>
            <div className="text-[35px]">{product.name}</div>
            <Link href={"/ready_to_wear"}>
              <div className="text-black text-[16px]">{product.category}</div>
            </Link>
          </div>
          {console.log(size)}
          <div className="text-black/[0.7]">
            Product Code :
            <span className="text-[14px]">{product.productCode} </span>
          </div>
        </div>
        <div>
          <div className="flex flex-row border-b border-black py-[12px] items-center justify-between">
            <div className="text-[22px] ">PKR {product.price}</div>
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
        </div>
        <div>
          {product.quantity ? (
            <div>
              <button
                onClick={() => {
                  if (selectedSize === "") {
                    alert("Please select a size!");
                  } else {
                    onAdd(product, qty);
                  }
                }}
                className="py-2 px-4 bg-black text-white rounded hover:bg-black/[0.4] active:bg-black/[0.6] disabled:opacity-50 mt-4 w-full flex items-center justify-center"
              >
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
              {selectedSize === "" ? (
                <button
                  onClick={() => {
                    alert("Please select a size!");
                  }}
                  className="py-2 px-4 bg-red-400 text-white rounded hover:bg-black/[0.4] active:bg-black/[0.6] disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                >
                  Buy Now
                </button>
              ) : (
                <Link href={"/cart"}>
                  <button
                    onClick={() => {
                      onAdd(product, qty);
                    }}
                    className="py-2 px-4 bg-red-400 text-white rounded hover:bg-black/[0.4] active:bg-black/[0.6] disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                  >
                    Buy Now
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div>
              <button
                disabled
                onClick={() => {
                  if (size === "") {
                    alert("Please select a size!");
                  } else {
                    onAdd(product, qty);
                  }
                }}
                className="py-2 px-4 bg-black text-white rounded hover:bg-black/[0.4] active:bg-black/[0.6] disabled:opacity-50 mt-4 w-full flex items-center justify-center"
              >
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
              <Link href={"/cart"}>
                <button
                  disabled
                  className="py-2 px-4 bg-red-400 text-white rounded hover:bg-black/[0.4] active:bg-black/[0.6] disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                >
                  Buy Now
                </button>
              </Link>
            </div>
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
            <img
              height={24}
              width={24}
              src="http://icms-image.slatic.net/images/ims-web/fb7adc81-c369-4fe8-b62e-7595b09c7741.png"
            />
            Buy
          </a>
        </div>
        <div className=" text-[14px] text-red-400">
          Disclaimer: Due to the difference in lighting used during photoshoots,
          the color or texture of the actual product may slightly vary from the
          image.
        </div>
      </div>
    </div>
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
