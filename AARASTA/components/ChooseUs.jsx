import React from "react";
// FaShippingFast

import { ImPriceTags } from "react-icons/im";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { VscWorkspaceTrusted } from "react-icons/vsc";
const ChooseUs = () => {
  return (
    <div className="bg-[#242424] flex flex-col   max-[1300px]:p-[4rem] max-[460px]:px[2rem] max-[500px]:px-[1rem] p-[6rem] max-[860px]:items-center ">
      <div className="text-white max-[500px]:text-center  font-bold text-5xl">Why choose us</div>
      <div className="flex flex-row justify-between gap-8 flex-wrap  mt-12 max-[860px]:items-center max-[860px]:justify-center">
       <div className="flex items-baseline  gap-2 my-5 relative ">
        {/* <MdOutlineLocalShipping color="white" className="absolute top-[4px] left-[-30px] max-[860px]:left-[70px]  max-[380px]:left-[40px] "  size={24}/> */}
       <div className="flex flex-col max-[860px]:items-center  max-w-[350px]  text-white max-[860px]:text-center ">
          <h2 className=" text-2xl underline font-medium ">
            Free shipping
          </h2>
          <p className=" text-base font-light break-words text-gray-200">
            Enjoy shopping with our exclusive offer free shipping on all
            purchases over PKR 2499 /- so hurry to take advantage of the offer
          </p>
        </div>
       </div>
       <div className="flex items-baseline  gap-2 relative ">
       {/* <MdOutlineDiscount color="white" size={24} className="absolute top-[26px] left-[-30px] max-[860px]:left-[93px] max-[380px]:"/> */}
        <div className="flex flex-col max-[860px]:items-center  max-w-[350px]  text-white max-[860px]:text-center">
          <h2 className=" text-2xl  font-medium my-5 underline">Best price</h2>
          <p className=" text-base font-light break-words text-gray-200">
            We offer and provide the best value for money with quality that
            matches or exceeds other stores on the market
          </p>
        </div>
        </div>
        <div className="flex items-baseline  gap-2 relative ">
        {/* <VscWorkspaceTrusted color="white" size={24} className="absolute top-[25px] left-[-30px] max-[860px]:left-[50px] max-[380px]:"/> */}
       <div className="flex flex-col  max-[860px]:items-center max-w-[350px] text-white max-[860px]:text-center">

          <h2 className=" text-2xl underline font-medium my-5">
            Product warranty
          </h2>
          <p className=" text-base font-light break-words text-gray-200">
            We are confident in the quality of our products, so we provide a
            warrenty period to ensure customer satisfaction
          </p>
        </div>
       </div>
     
      </div>
    </div>
  );
};

export default ChooseUs;
