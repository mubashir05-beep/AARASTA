import React from "react";
import HeaderTitle from "./HeaderTitle";
import Products from "./Products";

const FeaturedProducts = ({ products }) => {
  return (
    <div className="flex mx-[3rem]  items-center flex-col border border-black rounded-xl p-4 ">
      <HeaderTitle />
      <div className="flex  w-full justify-between">
        <div className="flex flex-wrap gap-8 p-8 w-full items-center justify-center ">
          {products
            .filter((product) => product.featured)
            .slice(0, 4) // Retrieve only the first three products
            .map((product) => (
              <div key={product._id} className="w-[400px]">
                <Products product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
