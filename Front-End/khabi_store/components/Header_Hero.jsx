
import Image from 'next/image';
import { Gradient } from "./Gradient.js";
import React, { useEffect, useState, useRef } from "react";

const HeaderHero = () => {
const ref = useRef();

useEffect(() => {
const gradient = new Gradient();
if (ref.current) {
gradient.initGradient("#gradient-canvas");
}
}, [ref]);

return (
<div className="relative h-[100vh]" ref={ref}>
{/* <canvas
          id="gradient-canvas"
          data-transition-in
        
          style={{
            backgroundImage: `url("/hero-background.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        /> */}
<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 flex items-center justify-center">
<span className="text-white font-bold text-5xl max-w-xs text-center">EMBRACE YOUR STYLE</span>
</div>
</div>
);
};

export default HeaderHero;