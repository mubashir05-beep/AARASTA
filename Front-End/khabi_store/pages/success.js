import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import {TbTruckDelivery } from "react-icons/tb";
import Image from "next/image";
const Success = () => {
  const router = useRouter();
  const { deleteCart } = useStateContext();

  useEffect(() => {
    deleteCart();
  }, []); // Run deleteCart only once, on component mount

  const gotoPage = () => {
    router.push("/ready_to_wear");
  };
  const gotoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center mx-[2rem] items-center h-[80vh] max-[400px]:my-[2rem]">
      <Image src="/pngegg.png" height={300} className="max-[400px]:w-48" width={300} />
      <TbTruckDelivery size={23}/>
      <h1 className="font-semibold text-4xl max-[470px]:text-3xl text-center">
        Your order is on its way!
      </h1>
      <h1 className="font-medium my-[12px] text-xl max-[470px]:text-lg ">
        Thank you for choosing us!
      </h1>
      <p className="max-w-[600px] text-center word-break text-gray-600">
        Your order was successfully received, and an email confirmation has been
        sent to your registered email address. Please check your inbox, and if
        you don't find the email, kindly check your spam or junk folder. If you
        need any further assistance, please don't hesitate to contact our
        support service. Our team will shortly reach out to you regarding the
        confirmation of your order.
      </p>
      <div className="flex gap-[20px] my-[18px]">
        <div
          onClick={gotoHome}
          className="cursor-pointer py-2 px-3 rounded-xl border  hover:bg-black hover:border-black hover:text-white duration-300 active:bg-gray-300 active:text-black active:border-gray-300"
        >
          Home
        </div>
        <div
          onClick={gotoPage}
          className="cursor-pointer py-2 px-3 rounded-xl  border hover:bg-black hover:border-black hover:text-white duration-300 active:bg-gray-300 active:text-black active:border-gray-300"
        >
          Explore!
        </div>
      </div>
    </div>
  );
};

export default Success;
