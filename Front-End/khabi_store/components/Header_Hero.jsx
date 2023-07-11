import React, { useEffect, useRef } from "react";
import { Gradient } from "./Gradient.js";
import Link from "next/link.js";

const HeaderHero = () => {
  const ref = useRef();

  useEffect(() => {
    const gradient = new Gradient();
    if (ref.current) {
      gradient.initGradient("#gradient-canvas");
    }
  }, []);

  return (
    <div className="relative h-screen" ref={ref}>
      {/* <canvas
        id="gradient-canvas"
        data-transition-in
        className="w-full h-full"
        style={{
          backgroundImage: `url("/hero-background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      /> */}
         <div className="absolute top-0 left-0 w-full h-full bg-black opacity-[0.1]" />
      <div className="absolute bottom-0 right-0 flex p-8 flex-col left-0 w-[70vw] h-[40vh] border-t gap-4 border-white">
        <div className="text-4xl text-[#fde8c0] mix-blend-difference font-semibold">
          AARASTA
        </div>
        <div className="text-2xl text-white">
          Crafting Tradition with{" "}
          <span className="mix-blend-difference text-[#ffdfa4]">Style</span>!
        </div>
        <div className="text-lg pt-3 text-white">
          Welcome to AARASTA! We are a brand built on the passion and dedication
          of two brothers who share a common vision - to create exceptional
          "Kameez Shalwar" and suits for men. Our story began with a deep-rooted
          love for traditional craftsmanship and a desire to bring the essence
          of our heritage to the modern world. Want to{" "}
          <span className="underline underline-offset-4 cursor-pointer">
            learn more?
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 border-l border-t w-[30vw] h-[80vh] text-white border-white">
        <div className="h-[40vh] border-b border-white  p-4 gap-6 flex flex-col items-center justify-between">
          <h1 className="text-[3rem] font-semibold">Salwar Kameez</h1>
          <p>
            Experience the perfect blend of tradition and contemporary style
            with our exquisite  Kameez Shalwar collection. Meticulously crafted
            with intricate details and vibrant colors, each piece celebrates our
            rich cultural heritage.
          </p>
          <button className="bg-transparent hover:bg-black hover:border-black text-white font-bold py-2 px-4 rounded border border-white transition-colors duration-300 ease-in-out">
            Coming Soon!
          </button>
        </div>
        <div className="h-[40vh] border-white flex p-4 items-center gap-6 justify-between flex-col">
          <h1 className=" text-[3rem] font-semibold ">Shirts</h1>
          <p >
            Discover our meticulously crafted shirts that effortlessly blend
            style and comfort. Tailored to perfection with premium fabrics and
            attention to detail, our shirts offer a perfect fit and exceptional
            quality.
          </p>
          <Link href='/shirts'>
          <button className="bg-transparent hover:bg-black  hover:border-black text-white font-bold py-2 px-4 rounded border border-white transition-colors duration-300 ease-in-out">
            Learn More
          </button>
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default HeaderHero;
