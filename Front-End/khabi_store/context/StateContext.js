import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CART_ITEMS_STORAGE_KEY = "cartItems";
const TOTAL_QUANTITIES_STORAGE_KEY = "totalQuantities";
const TOTAL_PRICE_STORAGE_KEY = "totalPrice";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [size, setSize] = useState("");
  const [showCart, setShowCart] = useState(false);
  // Address

  const [fullName, setFullName] = useState("");
  const [mobNumber, setMobNumber] = useState(0);
  const [city, setCity] = useState("");
  const [landMark, setLandMark] = useState("");
  const [address, setAddress] = useState("");

  const localCart =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(CART_ITEMS_STORAGE_KEY))) ||
    [];

  const [cartItems, setCartItems] = useState([]);
  const localPrice =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(TOTAL_PRICE_STORAGE_KEY))) ||
    0;

  const [totalPrice, setTotalPrice] = useState(0);
  const localQty =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(TOTAL_QUANTITIES_STORAGE_KEY))) ||
    0;
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [cartChange, setCartChange] = useState("");

  useEffect(() => {
    setCartItems(localCart);
    setTotalPrice(localPrice);
    setTotalQuantities(localQty);
  }, []);
  useEffect(() => {
    localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
    localStorage.setItem(TOTAL_QUANTITIES_STORAGE_KEY, totalQuantities);
    localStorage.setItem(TOTAL_PRICE_STORAGE_KEY, totalPrice);
  }, [cartItems, totalQuantities, totalPrice]);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) =>
        cartProduct._id === product._id
          ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
          : cartProduct
      );
      setCartItems(updatedCartItems);
      toast.success(`${quantity} ${product.name} (${size}) added to the cart`);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
      toast.success(`${quantity} ${product.name} (${size}) added to the cart`);
    }

    setTotalQuantities((prev) => prev + quantity);
    setTotalPrice((prev) => prev + product.price * quantity);
  };

  const incQty = () => {
    setQty((prev) => prev + 1);
  };

  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };
  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };
  const toggleCartItemQuanitity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((product) => product._id === id);

    if (foundProduct) {
      const newCartItems = [...cartItems];
      if (value === "inc") {
        newCartItems[index] = {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        };
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          newCartItems[index] = {
            ...foundProduct,
            quantity: foundProduct.quantity - 1,
          };
          setTotalPrice(
            (prevTotalPrice) => prevTotalPrice - foundProduct.price
          );
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        }
      }

      setCartItems(newCartItems);
    }
  };


  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        size,
        setSize,
        totalQuantities,
        qty,
        onAdd,
        incQty,
        onRemove,
        toggleCartItemQuanitity,
        decQty,
        fullName,
        setFullName,
        mobNumber,
        setMobNumber,
        city,
        setCity,
        landMark,
        setLandMark,
        address,
        setAddress,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
