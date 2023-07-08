import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import { RxCross2 } from "react-icons/rx";
import CartEmpty from "@/components/CartEmpty";
import { AiOutlineExclamation } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Link from "next/link";
import { client } from "@/lib/client";

const Cart = ({ coupons }) => {
  const {
    totalPrice,
    setTotalPrice,
    totalQuantities,
    cartItems,
    onRemove,
    toggleCartItemQuanitity,
    submited,
    setSubmited,
    address,
    setAddress,
    delivery,
    setDelivery,
    customerCoupon,
    setCustomerCoupon,
    couponStatus,
    setCouponStatus,
    couponSubmit,
    setCouponSubmit,
    originalPrice,
    setOriginalPrice,
    originalCart,
    setOriginalCart,
    lock,
    setLock,
    addCoupon,
    storedPrice,
    setStoredPrice,
    setAddCoupon,
    coupon,
    setCoupon,
    setMailState,
  } = useStateContext();
  const [processing, setProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [dropAddress, setDropAddress] = useState(false);
  const [showcoupon, setShowCoupon] = useState(false);

  const handleDrop = () => {
    return setDropAddress(!dropAddress);
  };
  let shipping = "Shipping Details";
  const [isOpen, setIsOpen] = useState(false);
  const [processingModal, setProcessingModal] = useState(false);
  const opencouponFunc = () => {
    setProcessingModal(true);
  };
  const closecouponFunc = () => {
    setProcessingModal(false);
  };
  useEffect(() => {
    if (totalPrice >= 2500) {
      setDelivery(totalPrice);
    } else {
      setDelivery(totalPrice + 99);
    }
  }, [totalPrice]);
  useEffect(() => {
    setCoupon(coupons);
  }, [coupons]);
  const openModal = () => {
    setIsOpen(true);
  };

  const [deleted, setDelete] = useState(false);
  const deleteForm = () => {
    shipping = "";
    setAddress({
      name: "",
      zip: "",
      email: "",
      city: "",
      phone: "",
      addressAll: "",
      nameErr: "",
      phoneErr: "",
      emailErr: "",
      zipErr: "",
      cityErr: "",
      addressErr: "",
    });
    handleDrop();
    setDelete(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const { name, phone, zip, city, addressAll, email } = address;
    let nameErr = "";
    let phoneErr = "";
    let emailErr = "";
    let zipErr = "";
    let cityErr = "";
    let addressErr = "";

    if (email === "") {
      emailErr = "The field must contain a value.";
    } else {
      const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!regex.test(email)) {
        emailErr = "Please enter a valid email!";
      }
    }

    if (addressAll === "") {
      addressErr = "The field must contain a value.";
    } else {
      const regex = /^[a-zA-Z0-9\s,#\/\-_@']+$/;
      if (!regex.test(addressAll)) {
        addressErr = "Please enter a valid address!";
      }
    }

    if (city === "") {
      cityErr = "The field must contain a value.";
    } else {
      const regex = /^[a-zA-Z\s]+$/;
      if (!regex.test(city)) {
        cityErr = "Please enter a valid City Name!";
      }
    }

    if (zip === "") {
      zipErr = "The field must contain a value.";
    } else {
      const regex = /^\d{5}$/;
      if (!regex.test(zip)) {
        zipErr = "Please enter a valid ZIP code!";
      }
    }

    if (name === "") {
      nameErr = "The field must contain a value.";
    } else {
      const regex = /^[a-zA-Z\s]+$/;
      if (!regex.test(name)) {
      }
    }

    if (phone === "") {
      phoneErr = "The field must contain a value.";
    } else {
      const regex = /^(\+92|0)?\d{10}$/;
      if (!regex.test(phone)) {
        phoneErr = "Please enter a valid number!";
      }
    }
    setAddress((prevState) => ({
      ...prevState,
      nameErr,
      phoneErr,
      emailErr,
      zipErr,
      cityErr,
      addressErr,
    }));
    // Update error messages
    // If there are no errors, submit the form
    if (!nameErr && !phoneErr && !zipErr && !cityErr && !addressErr) {
      setSubmited(true);
      setIsOpen(false);
    }
  };

  let orderIdSet = new Set();

  function generateOrderId() {
    let orderId = "";
    do {
      orderId = uuidv4().substr(0, 5).toUpperCase();
    } while (orderIdSet.has(orderId));

    orderIdSet.add(orderId);
    return "ORD-" + orderId;
  }
  let customer_Order_id = generateOrderId();
  // Data for Order schema
  const products =
    cartItems &&
    cartItems.map((item) => ({
      _key: `product${item._id}`,
      product: item.name,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
    }));

  const orderData = {
    orderId: customer_Order_id,
    customerAddress: `${
      address.addressAll + ", " + address.city + ", " + address.zip + "."
    }`,
    customerName: address.name,
    customerContactNumber: address.phone,
    customerContactMail: address.email,
    products: products,
    totalPrice: totalPrice,
  };

  const submitOrder = async (orderData) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // Perform any additional actions or show success message
        setOrderCompleted(true);
      } else {
        throw new Error(
          "Failed to submit order. Server returned status: " + response.status
        );
      }
    } catch (error) {
      console.error("Error submitting order:", error.message);
      // Handle error or show error message
      toast.error("Error submitting order!");
    }
  };

  const sendEmail = async () => {
    try {
      const products = cartItems.map((item) => ({
        name: item.name,
        price: item.price - item.discount,
        imgSrc: urlFor(item.image[0]).width(200).url(),
        size: item.size,
        quantity: item.quantity,
        discount:
          item.discount && ((item.discount / item.price) * 100).toFixed(0),
        dis: item.discount ? item.discount : 0,
        orgPrice: item.price,
      }));

      const response = await fetch("/api/send-email", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: address.name,
          address: address.addressAll,
          products: products,
          email: address.email,
          phone: address.phone,
          zip: address.zip,
          city: address.city,
          tlPrice: delivery,
          tlQty: totalQuantities,
          Id: customer_Order_id,
        }),
      });

      if (response.ok) {
        setMailState(true);
        toast.success("Email sent successfully!");

        // Create the order here
        await submitOrder(orderData);
        toast.success("Your order has been completed!");
      } else {
        toast.error("Error sending email!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email!");
    }
  };

  const router = useRouter();
  const [tryAgain, setTryAgain] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleCheckout = async () => {
    if (
      (Object.keys(address).length !== 0 && cartItems.length >= 1) ||
      submited === true
    ) {
      if (disable) {
        return; // Exit the function if the button is already disabled
      }

      setProcessing(true);
      setDisable(true); // Disable the button

      try {
        await sendEmail();
        setProcessing(false);

        setTimeout(() => {
          router.push("/success");
        }, 1000); // Wait for 1 second before redirecting
      } catch (error) {
        setProcessing(false);
        toast.error("Error processing order!");
        setTryAgain(true);

        setTimeout(() => {
          setTryAgain(false);
          setDisable(false); // Re-enable the button after an error
        }, 2000);
      }
    } else {
      toast.error("Please fill out the address form!");
    }
  };

  const isAddressFormFilled = () => {
    return (
      address.name &&
      address.city &&
      address.phone &&
      address.zip &&
      address.email &&
      address.addressAll
    );
  };
  const [priceSetter, setPriceSetter] = useState(0);
  const submitCoupon = (e) => {
    e.preventDefault();
    setCouponSubmit(true);

    if (customerCoupon.trim() === "") {
      // Clear coupon information when no coupon is entered
      setCouponStatus(false);
      setOriginalCart([]);
      setOriginalPrice(0);
      setTotalPrice(storedPrice);
    } else {
      coupon.forEach((couponItem) => {
        if (
          totalPrice >= couponItem.minCouponPrice &&
          customerCoupon === couponItem.couponCode
        ) {
          setStoredPrice(totalPrice);
          if (couponItem.couponDiscountPKR) {
            const discountPKR = Number(couponItem.couponDiscountPKR);
            const discountedPrice = totalPrice - discountPKR;
            setTotalPrice(discountedPrice);
            setShowCoupon(true);
            setOriginalCart(cartItems);
            setCouponStatus(true);
          } else if (couponItem.couponDiscountPercentage) {
            const discountPercentage = Number(
              couponItem.couponDiscountPercentage
            );
            const discountAmount = (totalPrice * discountPercentage) / 100;
            const discountedPrice = totalPrice - discountAmount;
            setTotalPrice(discountedPrice);
            setCouponStatus(true);
            setShowCoupon(true);
            setOriginalCart(cartItems);
          }
        }
      });
    }
  };
  useEffect(() => {
    if (cartItems.length !== originalCart) {
      if (cartItems.length === 0) {
        setTotalPrice(0); // Reset total price to 0 when cart is empty
        setCouponStatus(false);
        setCustomerCoupon("");
      }
      coupon &&
        coupon.map((couponItem) => {
          if (totalPrice >= couponItem.minCouponPrice) {
            if (coupon.couponDiscountPKR) {
              const discountPKR = Number(coupon.couponDiscountPKR);
              setTotalPrice(totalPrice - discountPKR);
              setCouponStatus(true);
            } else if (coupon.couponDiscountPercentage) {
              const discountPercentage = Number(
                coupon.couponDiscountPercentage
              );
              const discountAmount = (totalPrice * discountPercentage) / 100;
              const discountedPrice = totalPrice - discountAmount;
              setTotalPrice(discountedPrice);
              setCouponStatus(true);
            }
          }
        });
    }
  }, [cartItems.length, totalPrice]);
  const handleCoupon = (e) => {
    e.preventDefault();
    setCustomerCoupon(e.target.value);
  };
  return (
    <div className="mx-[3rem]  max-[500px]:mx-[1.5rem] my-[3rem] py-3">
      <div className="hidden sm:block text-center text-[34px] py-4 ">
        Shopping Cart
      </div>
      {cartItems.length < 1 && <CartEmpty />}
      {cartItems.length >= 1 && (
        <div className="flex flex-col items-center rounded-t-lg md:flex-row gap-[40px] bg-gray-800 p-7  w-full text-white">
          <div className="rounded-full border border-white flex items-center justify-center w-10 h-10">
            <AiOutlineExclamation size={20} />
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base">
              <span className="font-semibold">
                Delivery available in Islamabad and Rawalpindi.
              </span>
              <br />
              <span className="text-gray-300">
                Contact us for delivery in other areas.
              </span>
            </p>
            <p className="text-xs md:text-sm text-gray-300 mt-2">
              Thank you for choosing us.
            </p>
          </div>
        </div>
      )}

      {cartItems.length >= 1 && (
        <div className="flex flex-col min-[996px]:flex-row">
          <div className="flex flex-[1.5] border-l border-r justify-center border-b">
            {cartItems.length >= 1 && (
              <div className="px-5 py-5 flex flex-col items-center justify-start">
              

                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-[25rem] sm:w-full">
                      <div className="bg-white flex flex-col gap-6 items-center justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 flex flex-col gap-6 sm:mt-0 sm:ml-4 sm:text-left">
                            <div className="mt-2 flex flex-col items-center gap-6">
                              <label className="flex gap-3 items-center justify-center">
                                <div className="flex flex-col">
                                  <div className="flex">
                                    <p className="w-[89px] font-semibold">
                                      Full Name:
                                    </p>
                                    <input
                                      type="text"
                                      name="name"
                                      value={address.name}
                                      onChange={handleChange}
                                      className="border"
                                      required
                                    />
                                  </div>
                                  <div className="text-red-600 text-sm">
                                    {address.nameErr}
                                  </div>
                                </div>
                              </label>
                              <label className="flex gap-3 items-center justify-center">
                                <div className="flex flex-col">
                                  <div className="flex">
                                    <p className="w-[89px] font-semibold">
                                      Phone:
                                    </p>
                                    <input
                                      type="text"
                                      name="phone"
                                      value={address.phone}
                                      onChange={handleChange}
                                      className="border"
                                      required
                                    />
                                  </div>
                                  <div className="text-red-600 text-sm">
                                    {address.phoneErr}
                                  </div>
                                </div>
                              </label>
                              <label className="flex gap-3 items-center justify-center">
                                <div className="flex flex-col">
                                  <div className="flex">
                                    <p className="w-[89px] font-semibold">
                                      Email:
                                    </p>
                                    <input
                                      type="text"
                                      name="email"
                                      value={address.email}
                                      onChange={handleChange}
                                      className="border"
                                      required
                                    />
                                  </div>
                                  <div className="text-red-600 text-sm">
                                    {address.emailErr}
                                  </div>
                                </div>
                              </label>
                              <label className="flex gap-3 items-center justify-center">
                                <div className="flex flex-col">
                                  <div className="flex">
                                    <p className="w-[89px] font-semibold">
                                      ZIP Code:
                                    </p>
                                    <input
                                      type="text"
                                      name="zip"
                                      value={address.zip}
                                      onChange={handleChange}
                                      className="border"
                                      required
                                    />
                                  </div>
                                  <div className="text-red-600 text-sm">
                                    {address.zipErr}
                                  </div>
                                </div>
                              </label>
                              <label className="flex gap-3 items-center justify-center">
                                <div className="flex flex-col">
                                  <div className="flex">
                                    <p className="w-[89px] font-semibold">
                                      City:
                                    </p>
                                    <input
                                      type="text"
                                      name="city"
                                      value={address.city}
                                      onChange={handleChange}
                                      className="border"
                                      required
                                    />
                                  </div>
                                  <div className="text-red-600 text-sm">
                                    {address.cityErr}
                                  </div>
                                </div>
                              </label>
                              <label className="flex gap-3 items-center justify-center">
                                <div className="flex flex-col">
                                  <div className="flex">
                                    <p className="w-[89px] font-semibold">
                                      Address:
                                    </p>
                                    <textarea
                                      name="addressAll"
                                      value={address.addressAll}
                                      rows={6}
                                      cols={20}
                                      onChange={handleChange}
                                      className="border resize-none"
                                      required
                                    />
                                  </div>
                                  <div className="text-red-600 text-sm">
                                    {address.addressErr}
                                  </div>
                                </div>
                              </label>
                              <button
                                className="inline-flex justify-center rounded-md border border-transparent w-[80px] shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-600 sm:w-auto sm:text-sm transition-all duration-300"
                                type="submit"
                                onClick={handleSubmit}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  
                  <button
                    className="bg-gray-800 text-white border-t rounded-lg w-full h-11 hover:bg-gray-600 px-4 my-4 duration-300 relative overflow-hidden"
                    onClick={opencouponFunc}
                    disabled={disable || !isAddressFormFilled()}
                  >
                    Proceed to Checkout
                  </button>
                  {processingModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                      <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 transition-opacity">
                          <div
                            className="absolute inset-0 bg-black opacity-75"
                            onClick={closecouponFunc}
                          ></div>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-[25rem] sm:w-full">
                          <div className="bg-white flex flex-col gap-6 items-center justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <div className="absolute left-6 top-6">
                                <button
                                  onClick={closecouponFunc}
                                  className="underline underline-offset-4 text-sm"
                                >
                                  Go Back
                                </button>
                              </div>
                            </div>
                            <div className="sm:flex sm:items-start">
                              <div className="mt-3 flex flex-col gap-6 sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="mt-2 flex flex-col items-center gap-6">
                                  <div className="flex flex-col gap-5 border-t w-full px-2 border-b py-5">
                                    <div className="flex items-center justify-between min-w-[300px]">
                                      <div className="text-lg font-semibold underline underline-offset-8 px-8px">
                                        Have a Coupon?
                                      </div>
                                      <div
                                        onClick={() => setAddCoupon(!addCoupon)}
                                      >
                                        {!addCoupon ? (
                                          <AiFillCaretDown className="text-2xl cursor-pointer" />
                                        ) : (
                                          <AiFillCaretUp className="text-2xl cursor-pointer" />
                                        )}
                                      </div>
                                    </div>
                                    {addCoupon && (
                                      <div className="flex flex-col gap-2">
                                        {couponSubmit ? (
                                          couponStatus ? (
                                            <div className="text-sm text-green-500">
                                              Coupon Applied!
                                            </div>
                                          ) : (
                                            <div className="text-sm text-red-500">
                                              Invalid coupon code. Please try
                                              again.
                                            </div>
                                          )
                                        ) : (
                                          ""
                                        )}
                                        <input
                                          type="text"
                                          id="couponInput"
                                          className={`border border-gray-400 ${
                                            couponSubmit
                                              ? couponStatus
                                                ? "border-green-500"
                                                : "border-red-500"
                                              : ""
                                          } rounded-lg py-2px-4`}
                                          value={customerCoupon}
                                          placeholder="Enter coupon code"
                                          onChange={handleCoupon}
                                          onSubmit={submitCoupon}
                                          disabled={couponStatus}
                                        />
                                        <button
                                          onClick={submitCoupon}
                                          className="bg-gray-800 text-white rounded-lg py-2 px-4 hover:bg-gray-600"
                                          disabled={couponStatus}
                                        >
                                          Apply Coupon
                                        </button>
                                        <div className="text-sm text-gray-500">
                                          *Coupon can only be applied within the
                                          specified limit, before adding the
                                          shipping fee.
                                        </div>
                                      </div>
                                    )}
                                    {couponStatus && (
                                      <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-start flex-col gap-1">
                                            <span className="text-base font-semibold">
                                              Total Price
                                            </span>
                                            <span className="text-xs text-gray-500">
                                              (incl. shipping fee):
                                            </span>
                                          </div>
                                          <div className="flex flex-col items-end">
                                            <span className="text-lg text-blue-600 font-semibold">
                                              PKR {totalPrice + 99}/-
                                            </span>
                                            <span className="text-xs line-through text-gray-500">
                                              PKR {storedPrice + 99}/-
                                            </span>
                                          </div>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-gray-600 mr-2">
                                            Quantity:
                                          </span>
                                          <span className="text-base text-gray-800 font-semibold">
                                            {totalQuantities}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                               
                                  <button
                                    onClick={handleCheckout}
                                    className="bg-gray-800 text-white border-t rounded-lg w-full h-11 hover:bg-gray-600 px-4 my-4 duration-300 relative overflow-hidden"
                                    disabled={disable || !isAddressFormFilled()}
                                  >
                                    {processing ? (
                                      <span>Processing...</span>
                                    ) : orderCompleted ? (
                                      "Order Placed!"
                                    ) : tryAgain ? (
                                      <span>Try Again</span>
                                    ) : (
                                      "Continue"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className={`flex flex-col justify-start scrollbar-thin scrollbar-thumb-gray-700 flex-[0.5] `}
          >
            {cartItems.length >= 1 && (
              <div>
                {cartItems.map((items, index) => (
                  <div
                    className="flex items-center border-b py-3"
                    key={items._id}
                  >
                    <div className="relative">
                      <img
                        src={urlFor(items?.image[0])}
                        width={"200px"}
                        className="rounded-lg"
                      />
                      {items.discount && (
                        <span className="absolute top-0 right-0 z-10 bg-red-500 rounded-tr-lg text-white px-2 py-1 text-xs font-bold">
                          {((items.discount / items.price) * 100).toFixed(0)}%
                          OFF
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col ml-4">
                      <div className="font-semibold text-base break-words">
                        <Link href={`./ready_to_wear/${items.slug.current}`}>
                          {items.name}
                        </Link>
                      </div>
                      <div className="text-xs text-gray-500">
                        Code: {items.productCode}
                      </div>
                      <div className="text-xs text-gray-500">
                        <Link href={`./ready_to_wear/`}>{items.category}</Link>
                      </div>
                      <div className="text-xs flex items-center py-1 text-gray-500">
                        Size:
                        <span className="w-[18px] h-[18px] text-[10px] text-black rounded-full bg-black/[0.1] flex items-center justify-center ml-1">
                          {items.size}
                        </span>
                      </div>
                      <div className="hidden md:block">
                        {items.quantity ? (
                          <div className="text-green-400 text-xs">In Stock</div>
                        ) : (
                          <div className="text-red-400 text-xs">
                            Out of Stock
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col ml-auto">
                      <div className="flex flex-col items-end">
                        <div className="font-[500] text-xs hidden md:block">
                          Per Price
                        </div>
                        {items.discount ? (
                          <div className="flex flex-col items-end">
                            <div className="text-[14px] text-gray-600">
                              PKR {items.price - items.discount}
                            </div>
                            <div className="text-[12px] text-gray-600 line-through">
                              PKR {items.price}
                            </div>
                          </div>
                        ) : (
                          <div className="text-[12px] text-gray-600">
                            PKR {items.price}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end mt-1">
                        <div className="font-[500] text-xs  hidden md:block">
                          Quantity
                        </div>
                        <div className="flex items-center">
                          <button
                            className="px-1 bg-gray-200 text-gray-700 rounded-l text-xs"
                            onClick={() =>
                              toggleCartItemQuanitity(items._id, "dec")
                            }
                          >
                            -
                          </button>
                          <span className="mx-1 text-sm text-gray-600">
                            {items.quantity}
                          </span>
                          <button
                            className="px-1 bg-gray-200 text-gray-700 rounded-r text-xs"
                            onClick={() =>
                              toggleCartItemQuanitity(items._id, "inc")
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
               <div className="flex flex-col bg-gray-100 rounded-lg p-4 w-[100%]">
                  <div className="text-xl font-semibold underline text-gray-800 mb-4">
                    Order Summary
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <p className="font-medium text-gray-800 text-base">
                        Items Total:
                      </p>
                      <div className="text-base">{totalQuantities}</div>
                    </div>
                    <div className="flex items-center">
                      <p className="font-medium text-gray-800 text-base">
                        Delivery Fee:
                      </p>
                      <div className="text-base">
                        PKR {totalPrice >= 2499 ? "0" : "99"}/-
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-2">
                    <div className="bg-gray-800 text-white rounded-lg py-2 px-3">
                      <p className="font-medium text-[17px]">Grand Total:</p>
                      <div className="text-[17px]">
                        PKR {delivery}/-{" "}
                        <span className="text-sm">(incl. shipping fee)</span>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
export const getServerSideProps = async () => {
  const query = '*[_type=="coupon"]';
  const coupons = await client.fetch(query);
  return {
    props: {
      coupons,
    },
  };
};
