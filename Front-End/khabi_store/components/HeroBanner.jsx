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
    <div className="flex items-center justify-between h-[660px] mx-[3rem] gap-[8px]  max-[500px]:mx-[1.5rem] my-2">
      <div ref={ref} className="relative max-w-[45vw] h-[660px] ">
        {/* <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showArrows={false}
          interval={3500}
          showStatus={false}
          showIndicators={false}
        >
          {setBannerData?.map((banner) => (
            <div key={banner._id} className="rounded">
              <img
                src={urlFor(banner.image)}
                alt="Slide"
                className="rounded-lg"
              />
            </div>
          ))}
        </Carousel> */}
        <canvas
          id="gradient-canvas"
          data-transition-in
          className="rounded-tl-xl rounded-bl-xl"
          style={{
            backgroundImage: `url("/hero-background.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to our store
          </h1>
          <p className="mt-4 text-lg text-white">
            Shop our latest collection now!
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-300 transition-colors duration-300">
            Explore Now
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-[8px] items-center flex-col max-w-[55vw] h-[660px]">
        <div className="text-black text-center ">
          <video autoPlay muted loop className="rounded-tr-xl">
            <source src="hero_video.mp4" type="video/mp4"  />
          </video>
        </div>

        <div className="flex h-[330px] gap-[2vw] ">
          <div className="w-[29vw] border flex items-center justify-center">1</div>
          <div className="w-[29vw] border rounded-br-xl flex items-center justify-center">2</div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
