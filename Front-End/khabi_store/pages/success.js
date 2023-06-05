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
    <div>
      Success Page
      <Link href="/ready_to_wear">GO SHOP</Link>
      <a href="/ready_to_wear">jell</a>
      <div onClick={gotoPage}>newpage</div>
    </div>
  );
};

export default Success;
