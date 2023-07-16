import Link from 'next/link';
import React from 'react';

const Landing_Offer = () => {
  return (
    <div className="flex max-[860px]:flex-col max-[860px]:gap-4 justify-between items-center mx-[3rem] max-[500px]:mx-[1.5rem] my-[3rem] bg-gradient-to-r from-purple-300 p-[2rem] rounded-lg">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4  max-[860px]:text-center">
          Free Shipping on Orders Above PKR 2499/-
        </h2>
        <p className="mb-2 max-[860px]:text-center">
          Shop now and enjoy the freedom of free shipping on AARASTA!
        </p>
      </div>
      <Link href='./shirts'>
      <button className="border rounded-lg border-black px-4 h-12 bg-black text-white hover:bg-gray-800 transition-colors duration-300">
        Shop Now!
      </button>
      </Link>
    
    </div>
  );
};

export default Landing_Offer;
