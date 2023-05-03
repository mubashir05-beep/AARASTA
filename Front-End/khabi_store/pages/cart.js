import React from "react";

const cart = () => {
  return (
    <div>
      <div>Shopping cart </div>
      <div>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/4 p-4">
            <div className="bg-gray-100 h-32">hj</div>
            <div className="bg-gray-100 h-32"></div>
          </div>
          <div className="w-full sm:w-1/4 p-4">
            <div className="bg-gray-100 h-32"></div>
            <div className="bg-gray-100 h-32"></div>
          </div>
          <div className="w-full sm:w-1/4 p-4">
            <div className="bg-gray-100 h-32"></div>
            <div className="bg-gray-100 h-32"></div>
          </div>
          <div className="w-full sm:w-1/4 p-4">
            <div className="bg-gray-100 h-32"></div>
            <div className="bg-gray-100 h-32"></div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default cart;
