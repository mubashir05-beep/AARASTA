import React, { useState } from "react";
import Menu from "./Menu";

import { useStateContext } from "@/context/StateContext";
const Header = () => {
  const {} = useStateContext();

  return (
    <>
      <Menu />
    </>
  );
};

export default Header;
