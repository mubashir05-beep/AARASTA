import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { urlFor } from "@/lib/client";

const HeroBanner = ({ setBannerData }) => {
  return (
    <div className="flex">
      <div className="relative w-[50%]">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showArrows={false}
          interval={1000}
          showStatus={false}
          showIndicators={false}
        >
          {setBannerData?.map((banner) => (
            <div key={banner._id} className="">
              <img src={urlFor(banner.image)} alt="Slide" />
            </div>
          ))}
        </Carousel>
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
  <h1 className="text-4xl font-bold text-white">Welcome to our store</h1>
  <p className="mt-4 text-lg text-white">
    Shop our latest collection now!
  </p>
  <button className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-300 transition-colors duration-300">
    hello
  </button>
</div> */}
      </div>
      <div className="w-[50%]">Hello</div>
    </div>
  );
};

export default HeroBanner;
