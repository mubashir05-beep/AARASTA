import React, { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-hot-toast";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const incQty = () => {
    setQty((prev) => prev + 1);
  };
  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };
  const onAdd = (product, quatity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice((prev) => {
      prev + prev * quatity;
    });
    setTotalQuantities((prev) => prev + quatity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProuct) => {
        if (cartProuct._id === product._id)
          return {
            ...cartProuct,
            quatity: cartProuct.quatity + quatity,
          };
      });
      setCartItems(updatedCartItems);
      toast.success(`${qty} ${product.name} added to the cart`);
    } else {
        product.quatity=quatity;
        setCartItems([...cartItems,{...product}])
    }
  };
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        onAdd,
        incQty,
        decQty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
