import React from "react";

const cart = () => {
  return (
    <div className="mx-[3rem] my-[3rem]">
      <div>Shopping cart </div>
     
      <div className="flex flex-col sm:flex-row justify-center items-center">
  <div className="flex flex-col items-center sm:items-start sm:flex-row">
    <div className="bg-gray-100 border-b border-black w-32">Product</div>
    <div className="bg-gray-100 w-32">
      <img src="" />
    </div>
  </div>
  <div className="flex flex-col items-center sm:items-start sm:flex-row gap-8 mt-4 sm:mt-0">
    <div className="p-4 flex flex-col items-center sm:items-start">
      <div className="bg-gray-100 w-32">Price</div>
      <div className="bg-gray-100 w-32">hj</div>
    </div>
    <div className="flex flex-col items-center sm:items-start">
      <div className="bg-gray-100 w-32">Quantity</div>
      <div className="bg-gray-100 w-32">hj</div>
    </div>
    <div className="flex flex-col items-center sm:items-start">
      <div className="bg-gray-100 w-32">Total</div>
      <div className="bg-gray-100 w-32">hj</div>
    </div>
  </div>
</div>

      

    </div>
  );
};

export default cart;
