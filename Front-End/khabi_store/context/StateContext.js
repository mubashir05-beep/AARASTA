import { type } from "os";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CART_ITEMS_STORAGE_KEY = "cartItems";
const TOTAL_QUANTITIES_STORAGE_KEY = "totalQuantities";
const TOTAL_PRICE_STORAGE_KEY = "totalPrice";
const ADDRESS_STORAGE_KEY = "address";
const COUPON_STATUS = "couponStatus";
const COUPON_SUBMIT = "couponSubmit";
const ORG_PRICE = "originalPrice";
const ORG_CART = "originalCart";
const CUS_COUPON = "customerCoupon";
const Context = createContext();
const STORED_PRICE = "storedPrice";
export const StateContext = ({ children }) => {
  const [submited, setSubmited] = useState(false);
  const [mailState, setMailState] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState({});
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [customerCoupon, setCustomerCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState(false);
  const [couponSubmit, setCouponSubmit] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [addCoupon, setAddCoupon] = useState(false);
  const [originalCart, setOriginalCart] = useState(0);
  const [storedPrice, setStoredPrice] = useState(0);
  const [lock, setLock] = useState(false);
  const [searchToggle,setSearchToggle]=useState(false);
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
  const [cartItems, setCartItems] = useState(0);

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
  const localcouponStatus =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(COUPON_STATUS))) ||
    false;
  const localCouponSubmit =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(COUPON_SUBMIT))) ||
    false;
  const localCustomerCoupon =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(CUS_COUPON))) ||
    "";

  const localOriginalPrice =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(ORG_PRICE))) ||
    0;
  const localOriginalCart =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(ORG_CART))) ||
    0;
  const localStoredPrice =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem(STORED_PRICE))) ||
    0;

  useEffect(() => {
    setCartItems(localCart);
    setTotalPrice(localPrice);
    setTotalQuantities(localQty);
    setCouponStatus(localcouponStatus);
    setCouponSubmit(localCouponSubmit);
    setCustomerCoupon(localCustomerCoupon);
    setOriginalPrice(localOriginalPrice);
    setOriginalCart(localOriginalCart);
    setStoredPrice(localStoredPrice);
    // setAddress(localAddress);
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
    localStorage.setItem(
      TOTAL_QUANTITIES_STORAGE_KEY,
      JSON.stringify(totalQuantities)
    );
    localStorage.setItem(TOTAL_PRICE_STORAGE_KEY, JSON.stringify(totalPrice));
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(address));
    localStorage.setItem(COUPON_STATUS, JSON.stringify(couponStatus));
    localStorage.setItem(COUPON_SUBMIT, JSON.stringify(couponSubmit));
    localStorage.setItem(CUS_COUPON, JSON.stringify(customerCoupon));
    localStorage.setItem(ORG_PRICE, JSON.stringify(originalPrice));
    localStorage.setItem(ORG_CART, JSON.stringify(originalCart));
    localStorage.setItem(STORED_PRICE, JSON.stringify(storedPrice));
  }, [
    cartItems,
    totalQuantities,
    storedPrice,
    totalPrice,
    address,
    couponStatus,
    couponSubmit,
    customerCoupon,
  ]);

  const deleteCart = () => {
    setCartItems([]);
    setTotalQuantities(0);
    setTotalPrice(0);
  };

  const incQty = () => {
    setQty((prev) => {
      if (prev + 1 <= 5) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };

  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 >= 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) =>
        cartProduct._id === product._id
          ? {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
              size: selectedSize[product._id] || "", // Use selected size from state
            }
          : cartProduct
      );
      setCartItems(updatedCartItems);
      toast.success(
        `${quantity} ${product.name} (${
          selectedSize[product._id]
        }) added to the cart`
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity,
          size: selectedSize[product._id] || "", // Use selected size from state
        },
      ]);
      toast.success(
        `${quantity} ${product.name} (${
          selectedSize[product._id]
        }) added to the cart`
      );
    }

    setTotalQuantities((prev) => prev + quantity);
    setTotalPrice((prev) => prev + product.price * quantity);
  };

  const toggleCartItemQuanitity = (id, value) => {
    setCouponStatus(false);
    setCustomerCoupon("");
    setAddCoupon(false);
    setCouponSubmit(false);
    setOriginalCart([]);
    setOriginalPrice(0);

    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        if (value === "inc") {
          if (item.quantity < 5) {
            return { ...item, quantity: item.quantity + 1 };
          }
        } else if (value === "dec") {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
      }
      return item;
    });

    const totalPrice = updatedCartItems.reduce((acc, item) => {
      if (item.discount) {
        const discountedPrice = item.price - item.discount;
        return acc + (discountedPrice || item.price) * item.quantity;
      } else {
        return acc + item.price * item.quantity;
      }
    }, 0);

    const totalQuantities = updatedCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    setCartItems(updatedCartItems);
    setTotalPrice(totalPrice);
    setTotalQuantities(totalQuantities);

    // Remove the product if the quantity is less than 1
    const updatedCartItemsFiltered = updatedCartItems.filter(
      (item) => item.quantity >= 1
    );
    setCartItems(updatedCartItemsFiltered);
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

      const removedPrice = removedProducts.reduce((total, item) => {
        if (item.discount) {
          return total + (item.discountedPrice || item.price) * item.quantity;
        } else {
          return total + item.price * item.quantity;
        }
      }, 0);

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
        mobileMenu,
        setMobileMenu,
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
        discountedPrice,
        coupon,
        searchToggle,setSearchToggle,
        setCoupon,
        setDiscountedPrice,
        customerCoupon,
        setCustomerCoupon,
        couponStatus,
        setCouponStatus,
        couponSubmit,
        setCouponSubmit,
        originalPrice,
        setOriginalPrice,
        addCoupon,
        setAddCoupon,
        originalCart,
        setOriginalCart,
        lock,
        setLock,
        storedPrice,
        setStoredPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
