import React from "react";
import HeaderTitle from "./HeaderTitle";
import Products from "./Products";

const FeaturedProducts = ({ products }) => {
  return (
    <div className="flex mx-[3rem] items-center flex-col border border-black rounded-xl p-[1rem] md:flex-row">
      <HeaderTitle />
      <div className="flex mx-3 w-full justify-between">
        <div className="flex flex-wrap gap-3 w-full justify-between md:gap-50">
          {products
            .filter((product) => product.featured)
            .slice(0, 3) // Retrieve only the first three products
            .map((product) => (
              <div key={product._id} className="w-full md:w-[350px]">
                <Products product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
