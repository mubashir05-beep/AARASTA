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
    <div className="flex items-center justify-between mx-[3rem] max-[500px]:mx-[1.5rem] mt-[3.5rem] mb-[2rem]">
      <div ref={ref} className="relative max-w-[50vw] h-[660px] ">
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
      <div className="w-[60vw] flex justify-center items-center flex-col max-w-[50vw]">
        <div className="text-black text-center">
        <video autoPlay muted loop controls style={{ width: '500px'}}>
        <source src="hero_video.mp4" type="video/mp4" />
      </video>
          <h2 className="text-3xl font-semibold mb-4">Get Trendy</h2>
          <p className="text-lg">Discover the latest fashion trends</p>
          <button className="mt-6 px-6 py-2 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors duration-300">
            Learn More
          </button>
        </div>
        
        <div className="flex">
          <div>1</div>
          <div>2</div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
