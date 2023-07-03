import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CART_ITEMS_STORAGE_KEY = "cartItems";
const TOTAL_QUANTITIES_STORAGE_KEY = "totalQuantities";
const TOTAL_PRICE_STORAGE_KEY = "totalPrice";
const ADDRESS_STORAGE_KEY = "address";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [submited, setSubmited] = useState(false);
  const [mailState, setMailState] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState({});
  const [discountedPrice, setDiscountedPrice] = useState(0);

  const [address, setAddress] = useState(() => {
    let localAddress = {
      name: "",
      city: "",
      phone: "",
      zip: "",
      email: "",
      addressAll: "",
    };
    if (
      typeof window !== "undefined" &&
      localStorage.getItem(ADDRESS_STORAGE_KEY)
    ) {
      try {
        localAddress = JSON.parse(localStorage.getItem(ADDRESS_STORAGE_KEY));
      } catch (error) {
        console.error("Error parsing address from localStorage:", error);
      }
    }
    return localAddress;
  });

  const localCart =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(CART_ITEMS_STORAGE_KEY))) ||
    [];
  const [cartItems, setCartItems] = useState(localCart);

  const localPrice =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(TOTAL_PRICE_STORAGE_KEY))) ||
    0;
  const [totalPrice, setTotalPrice] = useState(localPrice);

  const localQty =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(TOTAL_QUANTITIES_STORAGE_KEY))) ||
    0;
  const [totalQuantities, setTotalQuantities] = useState(localQty);

  const [qty, setQty] = useState(1);

  useEffect(() => {
    localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
    localStorage.setItem(
      TOTAL_QUANTITIES_STORAGE_KEY,
      JSON.stringify(totalQuantities)
    );
    localStorage.setItem(TOTAL_PRICE_STORAGE_KEY, JSON.stringify(totalPrice));
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(address));
  }, [cartItems, totalQuantities, totalPrice, address]);

  const onAdd = (selectedProduct, quantity) => {
    const selectedProductSize = selectedSize[selectedProduct._id];

    if (!selectedProductSize) {
      alert("Please select a size!");
      return;
    }

    const existingProductIndex = cartItems.findIndex(
      (item) =>
        item._id === selectedProduct._id && item.size === selectedProductSize
    );

    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += quantity;

      setCartItems(updatedCartItems);
      toast.success(
        `${quantity} ${selectedProduct.name} (${selectedProductSize}) added to the cart`
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...selectedProduct,
          quantity,
          size: selectedProductSize,
        },
      ]);
      toast.success(
        `${quantity} ${selectedProduct.name} (${selectedProductSize}) added to the cart`
      );
    }

    const discountedPrice = selectedProduct.price - selectedProduct.discount;
    setTotalQuantities((prev) => prev + quantity);
    setTotalPrice((prev) => prev + discountedPrice * quantity);
  };

  const deleteCart = () => {
    setCartItems([]);
    setTotalQuantities(0);
    setTotalPrice(0);
  };

  const incQty = () => {
    setQty((prev) => {
      if (prev + 1 == 5) return 1;
     return prev + 1});
  };

  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  const onRemove = (product) => {
    const removedProducts = cartItems.filter(
      (item) => item._id === product._id && item.size === product.size
    );

    if (removedProducts.length > 0) {
      const removedQuantity = removedProducts.reduce(
        (total, item) => total + item.quantity,
        0
      );

      const removedPrice = removedProducts.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      setTotalPrice((prevTotalPrice) => {
        const newTotalPrice = prevTotalPrice - removedPrice;
        return newTotalPrice >= 0 ? newTotalPrice : 0;
      });

      setTotalQuantities((prevTotalQuantities) => {
        const newTotalQuantities = prevTotalQuantities - removedQuantity;
        return newTotalQuantities >= 0 ? newTotalQuantities : 0;
      });
    }

    const updatedCartItems = cartItems.filter(
      (item) => item._id !== product._id || item.size !== product.size
    );

    setCartItems(updatedCartItems);
  };

  const toggleCartItemQuanitity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);

    if (foundProduct) {
      const newCartItems = [...cartItems];
      const index = newCartItems.findIndex((product) => product._id === id);

      if (value === "inc") {
        newCartItems[index] = {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        };
      } else if (value === "dec") {
        if (foundProduct.quantity > 1) {
          newCartItems[index] = {
            ...foundProduct,
            quantity: foundProduct.quantity - 1,
          };
        } else {
          newCartItems.splice(index, 1);
        }
      }

      setCartItems(newCartItems);

      const totalPrice = newCartItems.reduce(
        (acc, item) => acc + (item.price - item.discount) * item.quantity,
        0
      );
      setTotalPrice(totalPrice);

      const totalQuantities = newCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setTotalQuantities(totalQuantities);
    }
  };

  const onSizeChange = (productId, selectedSize) => {
    setSelectedSize((prevSelectedSize) => ({
      ...prevSelectedSize,
      [productId]: selectedSize,
    }));
  };

  const [delivery, setDelivery] = useState(0);

  return (
    <Context.Provider
      value={{
        showCart,
        delivery,
        setDelivery,
        deleteCart,
        cartItems,
        setCartItems,
        totalPrice,
        selectedSize,
        setSelectedSize,
        totalQuantities,
        qty,
        mailState,
        setMailState,
        onAdd,
        incQty,
        onRemove,
        toggleCartItemQuanitity,
        decQty,
        address,
        setAddress,
        submited,
        setTotalPrice,
        setSubmited,
        onSizeChange,
        discountedPrice, setDiscountedPrice
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
