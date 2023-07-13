import React, { useState } from "react";
import Menu from "./Menu";
import { useStateContext } from "@/context/StateContext";
const Header = () => {
  const {
    shipFee,

    setShipFee,
  } = useStateContext();

  return (
    <>
      {shipFee && (
        <div className="text-center py-2 bg-red-200">
          Free shipping on orders above PKR. 2499/-
        </div>
      )}
      <div >
        <Menu />
      </div>
    </>
  );
};

export default Header;
