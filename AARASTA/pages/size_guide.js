import Image from 'next/image';
import React from 'react';

const Guide = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8">
      <h2 className="text-3xl font-bold mt-4 md:mt-8">Size Guide</h2>
      <div className="max-w-full md:max-w-screen-md lg:max-w-screen-lg mt-4 md:mt-8">
        <Image
          src="/casual-shirt-sizechart.webp"
          alt="Size Guide"
          width={800}
          height={600}
       
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Guide;
