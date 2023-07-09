import React from "react";
import HeaderTitle from "./HeaderTitle";
import Products from "./Products";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeaturedProducts = ({ products }) => {
  const responsive = {
    superLargeDesktop: {
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

  const renderCarouselItems = () => {
    return products
      .filter((product) => product.featured)
      .map((product) => (
        <div key={product._id}>
          <Products product={product} />
        </div>
      ));
  };

  return (
    <div className="flex flex-col items-center">
      <HeaderTitle />
      <Carousel
        responsive={responsive}
        itemClass="carousel-item-padding"
        className="mx-3"
      >
        {renderCarouselItems()}
      </Carousel>

      <style jsx>{`
        .carousel-item-padding {
          padding-right: 50px; /* adjust the gap size as needed */
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;
