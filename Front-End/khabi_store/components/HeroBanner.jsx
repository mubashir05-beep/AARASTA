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
      <div ref={ref} className="relative max-w-[45vw] h-[660px]">
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
            <div key={banner._id} className="rounded">
              <img
                src={urlFor(banner.image)}
                alt="Slide"
                className="rounded-lg h-[660px]"
              />
            </div>
          ))}
        </Carousel>
        {/* <canvas
          id="gradient-canvas"
          data-transition-in
          className="rounded-tl-xl rounded-bl-xl"
          style={{
            backgroundImage: `url("/hero-background.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        /> */}
        <div className="absolute bottom-0 left-0 ml-4 mb-4 text-white">
          <h1 className="text-4xl font-bold">New Summer Collection Arrived!</h1>
          <p className="mt-4 text-lg">Discover our trendy styles for this summer season.</p>
          <button className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-300 transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-[8px] items-center flex-col max-w-[55vw] h-[660px]">
        <div className="text-black relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <video autoPlay muted loop className="rounded-tr-xl">
            <source src="hero_video.mp4" type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 ml-4 mb-4 text-white">
            <h1 className="text-4xl font-bold">New Summer Collection Arrived!</h1>
            <p className="mt-4 text-lg">Discover our trendy styles for this summer season.</p>
            <button className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-300 transition-colors duration-300">
              Shop Now
            </button>
          </div>
        </div>

        <div className="flex h-[330px] gap-[8px] ">
          <div className="w-[26vw] border flex flex-col items-center justify-center relative">
            <img src="./fabric.jpg" alt="Fabric Photo" className="absolute inset-0 w-full h-full object-cover" />
            <div className="text-white text-center z-10">
              <div className="text-lg font-bold">Tailored Suits</div>
              <div className="flex flex-col items-center mt-2">
                <div className="text-sm">Description</div>
                <div className="text-xs italic">Generate your own style with our tailored suits.</div>
                <button className="mt-4 px-2 py-1 text-white underline hover:no-underline">Coming Soon</button>
              </div>
            </div>
          </div>
          
          <div className="w-[26vw] border rounded-br-xl flex items-center justify-center">
            {/* Content for the second section */}
            <div className="text-white text-center">
              <h2 className="text-3xl font-bold">Stylish Shirts</h2>
              <p className="mt-4 text-lg">Discover our collection of stylish shirts for every occasion.</p>
              <button className="mt-8 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-300 transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
