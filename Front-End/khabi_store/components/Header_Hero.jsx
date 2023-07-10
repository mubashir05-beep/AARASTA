import React, { useEffect, useRef } from "react";
import { Gradient } from "./Gradient.js";

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
      <canvas
        id="gradient-canvas"
        data-transition-in
        className="w-full h-full"
        style={{
          backgroundImage: `url("/hero-background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute bottom-0 right-0 flex p-8 flex-col left-0 w-70vw h-40vh border-t gap-4 border-white">
        <div className="text-4xl text-[#fde8c0] mix-blend-difference font-semibold">AARASTA</div>
        <div className="text-2xl text-white">Crafting Tradition with <span className="mix-blend-difference">Style</span>!</div>
        <div className="text-lg pt-3 text-white">
          Welcome to AARASTA! We are a brand built on the passion and dedication of two brothers who share a common vision - to create exceptional "Kameez Salwar" and suits for men. Our story began with a deep-rooted love for traditional craftsmanship and a desire to bring the essence of our heritage to the modern world. Want to <span className="underline underline-offset-4 cursor-pointer">learn more?</span> 
        </div>
      </div>
      <div className="absolute bottom-0 right-0 border-r border-t w-30vw h-60vh border-white">Hello</div>
    </div>
  );
};

export default HeaderHero;
