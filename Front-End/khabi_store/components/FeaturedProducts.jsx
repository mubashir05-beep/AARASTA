import React from "react";
import HeaderTitle from "./HeaderTitle";
import Products from "./Products";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeaturedProducts = ({ products }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="flex flex-col item-center">
      <HeaderTitle />
      <Carousel
        responsive={responsive}
       className="flex
        gap-15"
      >
        {products
          .filter((product) => product.featured)
          .map((product) => (
            <div>
            
              <Products key={product._id} product={product} />
            </div>
          ))}
      </Carousel>
      ;
    </div>
  );
};

export default FeaturedProducts;
