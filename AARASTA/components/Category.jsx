import React from 'react';

const Category = () => {
  return (
    <div>
      <div className="flex justify-center mx-[3rem] max-[500px]:mx-[1.5rem] my-[3rem]">
        <img src="/shirt_sample.webp" alt="" className="rounded-l-lg object-none w-[400px] h-[400px]" />
        <div className="bg-white text-black flex-grow flex flex-col justify-center px-6 py-4">
          <h2 className="text-2xl font-bold">Shop our shirts</h2>
          <p className="mt-2">Discover our wide range of stylish and comfortable shirts for every occasion.</p>
          <button className="mt-4 px-4 py-2 w-[120px] bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
