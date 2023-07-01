import React, { useEffect, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { urlFor } from "@/lib/client";
import { Gradient } from "./Gradient.js";

const HeroBanner = ({ setBannerData }) => {
  const ref = useRef();

  useEffect(() => {
    const gradient = new Gradient();
    if (ref.current) {
      gradient.initGradient("#gradient-canvas");
    }
  }, [ref]);

  return (
    <>
    <div className="flex items-center justify-between mx-[3rem] gap-[8px] max-w-[500px]  my-6">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showArrows={false}
        interval={3500}
        showStatus={false}
        showIndicators={false}
      >
        {setBannerData?.map((banner) => (
          <div key={banner._id}>
            <img
              src={urlFor(banner.image)}
              alt="Slide"
              className="rounded-tl-lg rounded-bl-lg h-[660px] object-cover"
            />
          </div>
        ))}
      </Carousel>
      
  
    </div>
    </>
  );
};

export default HeroBanner;
