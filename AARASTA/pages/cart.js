import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import { RxCross2 } from "react-icons/rx";
import CartEmpty from "@/components/CartEmpty";
import { toast } from "react-hot-toast";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Link from "next/link";
import { client } from "@/lib/client";
import CartHead from "@/components/CartHead";
import Image from "next/image";

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
    handleSubmit();
  };
  const closecouponFunc = () => {
    if (processing) {
      setProcessingModal(true);
    } else setProcessingModal(false);
  };
  useEffect(() => {
    if (totalPrice >= 2500) {
      setDelivery(totalPrice);
    } else {
      setDelivery(totalPrice + 99);
    }
  }, [totalPrice, setDelivery]);
  useEffect(() => {
    setCoupon(coupons);
  }, [coupons, setCoupon]);

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
  let nameErr = "";
  let phoneErr = "";
  let emailErr = "";
  let zipErr = "";
  let cityErr = "";
  let addressErr = "";
  const handleSubmit = (e) => {
    // e.preventDefault();

    // Perform form validation
    const { name, phone, zip, city, addressAll, email } = address;

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
    if (
      !nameErr &&
      !phoneErr &&
      !zipErr &&
      !cityErr &&
      !emailErr &&
      !addressErr &&
      isAddressFormFilled()
    ) {
      setSubmited(true);
      setIsOpen(false);
      setProcessingModal(true);
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
  const [submit, setSubmit] = useState(false);
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

        // Perform any additional actions or show success message
        setSubmit(true);
        console.log(submit);
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

        setOrderCompleted(true);

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
      submit === true
    ) {
      if (disable) {
        return; // Exit the function if the button is already disabled
      }

      setProcessing(true);
      setDisable(true); // Disable the button

      try {
        await sendEmail();
        setProcessing(false);

        // Redirect to the success page only if the order is successfully completed
        // You can modify this condition based on your specific requirements

        if (orderCompleted && submit) {
          router.push("/success");
        }
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
        setAddCoupon(false);

        setCouponSubmit(false);
        setOriginalCart([]);
        setOriginalPrice(0);
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
                couponItem.couponDiscountPercentage
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
    <>
      <div className="mx-[3rem]  max-[500px]:mx-[1.5rem] my-[3rem] py-3">
        <div className="hidden sm:block text-center text-[34px] py-4 ">
          Shopping Cart
        </div>
        {cartItems.length < 1 && <CartEmpty />}
        {cartItems.length >= 1 && <CartHead />}

        {cartItems.length >= 1 && (
          <div className="flex flex-col min-[1220px]:flex-row">
            <div className="flex  border-l border-r flex-1 border-b">
              {cartItems.length >= 1 && (
                <div className="max-[340px]:px-1 max-[340px]:py-3  px-5 py-5 flex flex-1 flex-col">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-baseline my-4 flex-grow ">
                      <label htmlFor="name" className="font-semibold">
                        Full Name:
                      </label>

                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={address.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="border rounded-lg px-4 py-2 mt-1 w-full flex-grow"
                        required
                      />
                      <div className="text-red-600 text-sm">
                        {address.nameErr}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 my-4">
                      <div className="flex flex-col flex-grow">
                        <label htmlFor="phone" className="font-semibold">
                          Phone:
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={address.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="border rounded-lg px-4 py-2 mt-1 flex-grow"
                          required
                        />
                        <div className="text-red-600 text-sm">
                          {address.phoneErr}
                        </div>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <label htmlFor="email" className="font-semibold">
                          Email:
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={address.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className="border rounded-lg px-4 py-2 mt-1 flex-grow"
                          required
                        />
                        <div className="text-red-600 text-sm">
                          {address.emailErr}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 my-4">
                      <div className="flex flex-col flex-grow">
                        <label htmlFor="zip" className="font-semibold">
                          ZIP Code:
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={address.zip}
                          onChange={handleChange}
                          placeholder="Enter your ZIP code"
                          className="border rounded-lg px-4 py-2 mt-1 flex-grow"
                          required
                        />
                        <div className="text-red-600 text-sm">
                          {address.zipErr}
                        </div>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <label htmlFor="city" className="font-semibold">
                          City:
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={address.city}
                          onChange={handleChange}
                          placeholder="Enter your city"
                          className="border rounded-lg px-4 py-2 mt-1 flex-grow"
                          required
                        />
                        <div className="text-red-600 text-sm">
                          {address.cityErr}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 my-4">
                      <div className="flex flex-col flex-grow">
                        <label htmlFor="addressAll" className="font-semibold">
                          Address:
                        </label>
                        <textarea
                          id="addressAll"
                          name="addressAll"
                          value={address.addressAll}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          rows={4}
                          className="border rounded-lg px-4 py-2 mt-1 resize-none flex-grow"
                          required
                        />
                        <div className="text-red-600 text-sm">
                          {address.addressErr}
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className="w-full flex flex-col pb-3 gap-4 bg-gray-100 rounded-lg p-4">
                    <div className="text-xl font-semibold text-gray-800 mb-2">
                      Your Address:
                    </div>
                    <div className="flex flex-col gap-2 ">
                      {address.name && (
                        <span className="break-words text-gray-600 text-sm">
                          <strong>Name:</strong> {address.name}
                        </span>
                      )}
                      {address.phone && (
                        <span className="break-words text-gray-600 text-sm">
                          <strong>Phone:</strong> {address.phone}
                        </span>
                      )}
                      {address.email && (
                        <span className="break-words text-gray-600 text-sm">
                          <strong>Email:</strong> {address.email}
                        </span>
                      )}
                      {address.addressAll && address.city && address.zip && (
                        <span className="break-words max-w-full sm:max-w-[300px]  text-gray-600 text-sm">
                          <strong>Address:</strong> {address.addressAll},{" "}
                          {address.city}, {address.zip}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`flex flex-col  justify-start py-5 max-[380px]:px-1 px-5 flex-[1]`}
            >
              <div className="flex flex-col  rounded-lg  w-full">
                <div className="text-xl font-semibold underline text-gray-800">
                  Order Summary
                </div>
                {cartItems.length >= 1 && (
                  <div className="">
                    {cartItems.map((item) => (
                      <div
                        className="flex items-center py-4 border-b border-gray-200 relative"
                        key={item._id}
                      >
                        <img
                          src={urlFor(item?.image[0])}
                          width="150"
                          className="rounded-lg max-[600px]:w-[150px] max-[350px]:w-[120px]"
                          alt={item.name}
                        />
                       

                        <div className="flex flex-col max-[600px]:gap-1 ml-3">
                          <div className="text-lg font-semibold max-[350px]:text-base">
                            <Link href={`./shirts/${item.slug.current}`}>
                              {item.name}
                            </Link>
                          </div>
                          {item.productCode && (
                            <div className="text-sm text-gray-500">
                              Code: {item.productCode}
                            </div>
                          )}
                          <div className="text-sm flex items-center">
                            Size:
                            <span className="w-4 h-4 text-xs text-black rounded-full bg-black/[0.1] flex items-center justify-center ml-1">
                              {item.size}
                            </span>
                          </div>
                          <div className="text-sm flex items-center min-[601px]:hidden">
                            Price:
                            <span className="ml-1">
                              {item.discount
                                ? "PKR " + (item.price - item.discount) + " /-"
                                : "PKR " + item.price + " /-"}
                            </span>
                          </div>

                          <div className="text-sm flex items-center min-[601px]:mt-2">
                            Quantity:
                            <div className="flex items-center ml-1">
                              <button
                                className="px-1.5 py-0.5 bg-slate-200 text-gray-700 rounded-l text-xs hover:bg-gray-300"
                                onClick={() =>
                                  toggleCartItemQuanitity(item._id, "dec")
                                }
                              >
                                -
                              </button>
                              <span className="px-2 min-[601px]:py-1 min-[601px]:text-lg max-[600px]:text-base text-gray-600">
                                {item.quantity}
                              </span>
                              <button
                                className="px-1.5 py-0.5 bg-slate-200 text-gray-700 rounded-r text-xs hover:bg-gray-300"
                                onClick={() =>
                                  toggleCartItemQuanitity(item._id, "inc")
                                }
                              >
                                +
                              </button>
                            </div>
                            <div className="absolute top-0 right-0 mt-1 mr-2">
                              <RxCross2
                                size={20}
                                className={`cursor-pointer ${
                                  processing ? "opacity-50" : ""
                                }`}
                                disabled={lock}
                                onClick={() => !processing && onRemove(item)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="min-[601px]:ml-auto max-[600px]:hidden flex flex-col justify-between">
                          <div className="text-xl text-gray-600">
                            PKR{" "}
                            {item.discount
                              ? item.price - item.discount
                              : item.price}
                            {item.discount && (
                              <span className="ml-2 text-xs text-red-500">
                                {((item.discount / item.price) * 100).toFixed(
                                  0
                                )}
                                % OFF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800 text-lg">
                      Items Total:
                    </p>
                    <div className="text-lg">{totalQuantities}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800 text-lg">
                      Delivery Fee:
                    </p>
                    <div className="text-lg">
                      PKR {delivery >= 2499 ? "0" : "99"}/-
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <div className="bg-gray-800 text-white rounded-lg py-4 px-6">
                      <p className="font-medium text-lg">Grand Total:</p>
                      <div className="text-2xl flex items-center gap-2 font-bold max-[340px]:flex-col max-[340px]:items-baseline">
                        PKR {delivery}/-
                        <span className="text-sm">(incl. shipping fee)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    className={`bg-gray-800 text-white border-t rounded-lg w-full h-11 ${
                      isAddressFormFilled() &&
                      !nameErr &&
                      !phoneErr &&
                      !zipErr &&
                      !emailErr &&
                      !cityErr &&
                      !addressErr
                        ? " hover:bg-gray-600"
                        : ""
                    } px-4 my-4 duration-300 relative overflow-hidden`}
                    onClick={handleSubmit}
                    disabled={
                      disable ||
                      (!isAddressFormFilled() &&
                        !nameErr &&
                        !phoneErr &&
                        !zipErr &&
                        !emailErr &&
                        !cityErr &&
                        !addressErr)
                    }
                  >
                    {isAddressFormFilled() &&
                    !nameErr &&
                    !phoneErr &&
                    !zipErr &&
                    !emailErr &&
                    !cityErr &&
                    !addressErr ? (
                      <div>Proceed to Checkout</div>
                    ) : (
                      <div>Please Fill Out Your Address Form Correctly! </div>
                    )}
                  </button>
                  <div className="flex items-center justify-center">
                    {processingModal && (
                      <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen">
                          <div className="fixed inset-0 transition-opacity">
                            <div
                              className="absolute inset-0 bg-black opacity-75"
                              onClick={closecouponFunc}
                            ></div>
                          </div>
                          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-[440px]:max-w-[25rem] max-[380px]:max-w-[18rem]">
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
                                <div className="mt-3 flex flex-col gap-6">
                                  <div className="mt-2 flex flex-col items-center gap-6">
                                    <div className="flex flex-col gap-5 border-t w-full px-2 border-b py-5">
                                      <div className="flex items-center justify-between min-[381px]:min-w-[300px] max-[380px]:min-w-[270px]">
                                        <div className="text-lg font-semibold underline underline-offset-8 px-[8px]">
                                          Have a Coupon?
                                        </div>
                                        <div
                                          onClick={() =>
                                            setAddCoupon(!addCoupon)
                                          }
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
                                            } rounded-lg py-2 px-4`}
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
                                            *Coupon can only be applied within
                                            the specified limit, before adding
                                            the shipping fee.
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
                                                PKR{" "}
                                                {totalPrice >= 2499
                                                  ? totalPrice
                                                  : totalPrice + 99}
                                                /-
                                              </span>
                                              <span className="text-xs line-through text-gray-500">
                                                PKR{" "}
                                                {storedPrice >= 2499
                                                  ? storedPrice
                                                  : storedPrice + 99}
                                                /-
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
                                      className="bg-gray-800 text-white border-t rounded-lg w-full max-[380px]:w-[200px]  h-11 hover:bg-gray-600 px-4 my-4 duration-300 relative overflow-hidden "
                                      disabled={
                                        disable || !isAddressFormFilled()
                                      }
                                    >
                                      {processing ? (
                                        <div className="flex items-center justify-center">
                                          <div className="rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-100 animate-spin"></div>
                                          <div className="ml-2">
                                            Processing...
                                          </div>
                                        </div>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
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
