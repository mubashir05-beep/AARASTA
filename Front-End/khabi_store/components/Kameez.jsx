import Image from "next/image";
import React, { useState } from "react";

const Kameez = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="w-[50vw] m-4 flex items-center max-[830px]:flex-col py-8 max-[750px]:w-[500px] gap-[30px] max-[500px]:w-[60vw] max-[950px]:w-[750px] max-[700px]:w-[500px] max-[1500px]:w-[850px] max-[1500px]:justify-between "
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <Image
          src="/47039-1_1_-transformed.png"
          className={`${
            isHovered ? "scale-[1.26]" : "scale-[1.2]"
          } transition-transform  duration-500  max-[700px]:w-[400px]  `}
          height={200}
          width={500}
        />
        <h1
          className={`${
            isHovered ? "scale-105" : "scale-85"
          } transition-transform duration-500 text-7xl max-[535px]:text-[6rem] max-[500px]:text-[20vw] text-center text-gray-400 max-[831px]:block min-[831px]:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold`}
        >
          Shalwar Kameez
        </h1>
      </div>
      <div className="mt-[20px]">
        <div className="w-[400px] max-[410px]:w-[300px] max-[500px]:w-[300px] max-[830px]:max-w-[500px] border-b  border-white gap-6 flex  flex-col items-center">
          <h1
            className={`${
              isHovered ? "scale-105" : "scale-85"
            } transition-transform duration-500 text-7xl text-center max-[830px]:hidden font-semibold`}
          >
            Shalwar Kameez
          </h1>
          <p className="text-center ">
            Experience the perfect fusion of tradition and contemporary style
            with our stunning Kameez Shalwar collection. Each piece is
            meticulously crafted with intricate details and vibrant colors,
            celebrating our vibrant cultural heritage.
          </p>
          <button className="bg-transparent hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded border border-black transition-colors duration-300 ease-in-out">
            Coming Soon!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kameez;
