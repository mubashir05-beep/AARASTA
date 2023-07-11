import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Shirts = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link href='/shirts'>
    <div
      className={`w-[50vw] flex items-center flex-row-reverse  transition-transform duration-500 ${
        isHovered ? 'scale-105' : 'scale-95'
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <Image src='/Header_shirt-transformed.png' className='' height={200} width={500} />
      </div>
      <div className="border-white w-[250px] flex items-center gap-6 flex-col">
        <h1 className="text-[3rem] font-semibold">Shirts</h1>
        <p>
          Discover our meticulously crafted shirts that effortlessly blend style and comfort.
          Tailored to perfection with premium fabrics and attention to detail, our shirts offer
          a perfect fit and exceptional quality.
        </p>
        <Link href='/shirts'>
          <button className="bg-transparent hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded border border-black transition-colors duration-300 ease-in-out">
            Learn More
          </button>
        </Link>
      </div>
    </div>
    </Link>
  )
}

export default Shirts
