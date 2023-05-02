import { client, urlFor } from "@/lib/client";
import product from "../../sanity_backend/schemas/product";
import React from "react";
import Link from "next/link";


const Product = ({ products, product }) => {
  return (
    <div className="flex flex-col md:flex-row items-center mx-[3rem] my-[1rem] justify-center gap-[45px]">
      <div className="max-w-[500px]">
        <img src={urlFor(product.image && product.image[0])} />
      </div>
      <div className="flex flex-col md:w-[450px]">
        <div className="flex flex-col gap-[1px] my-[12px]">
            <div>
            <div className="text-[35px]">{product.name}</div>
            <Link href={'/ready_to_wear'}>
            <div className="text-black text-[16px]">{product.category}</div>
            </Link>
          
            </div>
        
        <div className="text-black/[0.7]">Product Code :<span className="text-[14px]"> SS-23-23-3-Black</span></div>
        </div>
        <div>
            <div className="flex flex-row border-b border-black py-[12px] items-center justify-between">
                <div className="text-[22px] ">PKR {product.price}</div>
                <div className="text-green-600">In Stock</div>
            </div>
            <div className="py-[12px] text-red-400">Hurry up! only limited stock left.</div>
        </div>
        
        

      </div>
    </div>
  );
};

export default Product;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug {
            current
        }
    }`
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
};

export const getStaticProps = async ({ params: { slug } }) => {
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
};
