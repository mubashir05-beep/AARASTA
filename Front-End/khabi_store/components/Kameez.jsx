import Image from 'next/image'
import React, { useState } from 'react'

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
      className={`w-[50vw] flex items-center transition-transform cursor-pointer duration-500 ${
        isHovered ? 'scale-110' : ''
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <Image src='/47039-1_1_-transformed.png' className='' height={200} width={500} />
      </div>
      <div>
        <div className="w-[250px] border-b border-white p-4 gap-6 flex flex-col items-center">
          <h1 className="text-[3rem] font-semibold">Salwar Kameez</h1>
          <p>
            Experience the perfect blend of tradition and contemporary style
            with our exquisite Kameez Shalwar collection. Meticulously crafted
            with intricate details and vibrant colors, each piece celebrates our
            rich cultural heritage.
          </p>
          <button className="bg-transparent hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded border border-black transition-colors duration-300 ease-in-out">
            Coming Soon!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Kameez;
