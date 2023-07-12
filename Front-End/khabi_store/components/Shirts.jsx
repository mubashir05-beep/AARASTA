import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Shirts = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // max-[1250px]:flex-col

  return (
    <div
      className="w-[50vw] flex items-center  flex-row-reverse gap-[20px] max-[950px]:w-[750px] max-[830px]:flex-col  max-[750px]:w-[500px] max-[500px]:w-[70vw]  max-[1500px]:w-[850px]  max-[1500px]:justify-between "
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <Link href="/shirts">
          <Image
            src="/Header_shirt-transformed.png"
            className={`${
              isHovered ? "scale-[1.11]" : "scale-[1.09]"
            } object-contain transition-transform duration-500 relative  max-[700px]:w-[400px] `}
            height={200}
            width={500}
          />
        </Link>
        <h1
          className={`${
            isHovered ? "scale-105" : "scale-85"
          } transition-transform duration-500 text-7xl max-[500px]:text-[20vw] text-center text-gray-200 max-[831px]:block min-[831px]:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold`}
        >
          Shirts
        </h1>
      </div>
      <div className="border-white max-[830px]:w-[500px] max-[500px]:w-[300px] max-w-[400px] flex items-center gap-6 flex-col">
        <Link href="/shirts">
          <h1
            className={`${
              isHovered ? "scale-105" : "scale-85"
            } transition-transform duration-500 text-7xl  max-[830px]:hidden font-semibold`}
          >
            Shirts
          </h1>
        </Link>
        <p className="text-center">
          Explore our carefully crafted shirts, seamlessly merging style and
          comfort. With perfect tailoring, premium fabrics, and meticulous
          attention to detail, our shirts offer an impeccable fit and
          exceptional quality.
        </p>
        <Link href="/shirts">
          <button className="bg-transparent hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded border border-black transition-colors duration-300 ease-in-out">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Shirts;
