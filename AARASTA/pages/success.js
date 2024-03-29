import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import { TiTruckDelivery } from "react-icons/ti"; // Corrected import for TiTruckDelivery
import Image from "next/image";
import Menu from "@/components/Menu";
import Link from 'next/link'; // Corrected import for Link

const Success = () => {

  // const { deleteCart } = useStateContext();

  // useEffect(() => {
  //   deleteCart();
  // }, [deleteCart]);


  return (
    <>
      <div className="flex flex-col justify-center items-center px-4 py-8 mx-auto max-w-[600px] h-auto md:h-[80vh]">
        <Image src="/pngegg.png" height={300} className="w-48 md:w-auto" width={300} alt="Success" />
        <h1 className="font-semibold text-4xl md:text-3xl text-center my-4 md:my-2">
          Your order is on its way!
        </h1>
        <h1 className="font-medium text-xl md:text-lg my-2">
          Thank you for choosing us!
        </h1>
        <p className="text-center md:text-left text-gray-600 my-4">
          Your order was successfully received, and an email confirmation has been
          sent to your registered email address. Please check your inbox, and if
          you don&apos;t find the email, kindly check your spam or junk folder. If you
          need any further assistance, please don&apos;t hesitate to contact our
          support service. Our team will shortly reach out to you regarding the
          confirmation of your order.
        </p>
        <div className="flex gap-4 mt-4">
        
          <Link
            href="/"
            className="cursor-pointer py-2 px-4 rounded-xl border hover:bg-black hover:border-black hover:text-white duration-300 active:bg-gray-300 active:text-black active:border-gray-300"
          >
            Home
          </Link>
          <Link
            href="/shirts"
            className="cursor-pointer py-2 px-4 rounded-xl border hover:bg-black hover:border-black hover:text-white duration-300 active:bg-gray-300 active:text-black active:border-gray-300"
          >
            Explore!
          </Link>
        </div>
        </div>
      
    </>
  );
};

export default Success;
