import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import Link from "next/link";

const Success = () => {
  const router = useRouter();
  const { deleteCart } = useStateContext();

  useEffect(() => {
    deleteCart();
  }, []); // Run deleteCart only once, on component mount

  const gotoPage = () => {
    router.push("/ready_to_wear");
  };

  return (
    <div className="flex flex-col justify-center items-center  h-[80vh]">
      <h1 className='font-semibold text-4xl'>Thank you for your order</h1>
      <div onClick={gotoPage} className="cursor-pointer py-2 px-3 rounded-xl background- border my-[14px]">Go Home</div>
    </div>
  );
};

export default Success;
