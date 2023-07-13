import React from 'react';

const HeaderTitle = () => {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg p-8 bg-gradient-to-r from-purple-200 to-blue-200  w-full'>
      <h2 className='text-2xl text-center font-bold text-white mb-6'>Featured Products</h2>
      <div className='text-lg text-center text-gray-800'>Discover our handpicked selection of top-notch products, crafted to elevate your everyday life.</div>
    </div>
  );
};

export default HeaderTitle;
