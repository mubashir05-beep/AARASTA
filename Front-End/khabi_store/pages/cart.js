import React, { useRef, useEffect, useState } from "react";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import { RxCross2 } from "react-icons/rx";
import CartEmpty from "@/components/CartEmpty";
import { AiOutlineExclamation } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { client } from "../utils/apiClient";
import product from "@/sanity_backend/schemas/product";
import { v4 as uuidv4 } from "uuid";
const Cart = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,

    onRemove,

    toggleCartItemQuanitity,

    submited,
    setSubmited,

    address,
    setAddress,
  } = useStateContext();
  const [processing, setProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [dropAddress, setDropAddress] = useState(false);

  const handleDrop = () => {
    return setDropAddress(!dropAddress);
  };
  let shipping = "Shipping Details";
  const [isOpen, setIsOpen] = useState(false);

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
    let orderId = '';
    do {
      orderId = uuidv4().substr(0, 5).toUpperCase();
    } while (orderIdSet.has(orderId));
  
    orderIdSet.add(orderId);
    return "ORD-" + orderId;
  }
  
  // Data for Order schema
  const products = cartItems.map((item) => ({
    _key: `product${item._id}`,
    product: item.name,
    size: item.size,
    price: item.price,
    quantity: item.quantity,
  }));
  
  const orderData = {
    orderId: generateOrderId(),
    customerAddress: `${
      address.addressAll + ", " + address.city + ", " + address.zip + "."
    }`,
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
        price: item.price,
        imgSrc: urlFor(item.image[0]).width(200).url(),
        size: item.size,
        quantity: item.quantity,
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
          zip: address.zip,
          city: address.city,
        }),
      });

      if (response.ok) {
        toast.success("Email sent successfully!");
      } else {
        toast.error("Error sending email!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email!");
    }
  };

  const handleCheckout = async () => {
    if (
      (Object.keys(address).length !== 0 && cartItems.length >= 1) ||
      submited === true
    ) {
      setProcessing(true);
      try {
        await sendEmail();
        await submitOrder(orderData);
        toast.success("Your order has been completed!");
      } catch (error) {
        toast.error("Error processing order!");
      } finally {
        setProcessing(false);
      }
    } else {
      toast.error("Please fill out address form!");
    }
  };
  return (
    <div className="mx-[3rem]  max-[500px]:mx-[1.5rem] my-[3rem] py-3">
      <div className="hidden sm:block text-center text-[34px] py-4 ">
        Shopping Cart
      </div>
      {cartItems.length < 1 && <CartEmpty />}
      {cartItems.length >= 1 && (
        <div className="flex items-center rounded-t-lg max-[499px]:flex-col  max-[499px]:items-start  max-[499px]:gap-2  max-[499px]:border-b justify-between border pb-8 px-5 pt-8">
          <div className="flex flex-row gap-2 items-center  ">
            <div className="text-lg font-semibold max-[339px]:text-[15px] ">
              Total Quantity:
            </div>
            <div className="text-[18px] max-[339px]:text-[16px]">
              {totalQuantities}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-lg max-[339px]:text-[15px] font-semibold ">
              Sub-Total:
            </div>
            <div className="text-[18px] max-[339px]:text-[16px]">
              PKR {totalPrice}/-
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col min-[996px]:flex-row">
        <div
          className={`flex flex-col justify-start scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300  scrollbar-hide flex-[1.5]  scrollbar-track-rounded-full `}
        >
          {cartItems.length >= 1 &&
            cartItems.map((items, index) => (
              <div className="flex  border-b  py-5 " key={items._id}>
                <div className="flex min-[500px]:flex-row md:flex-row items-center md:items-start flex-col gap-6 md:gap-[3rem] md:justify-evenly w-[100%] ">
                  <img
                    src={urlFor(items?.image[0])}
                    width={"200px"}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col md:flex-row items-center min-[500px]:items-start">
                    <div className="flex flex-col gap-2 items-center min-[500px]:items-start md:my-6 w-[200px]">
                      <div className="font-semibold text-lg break-words">
                        {items.name}
                      </div>
                      <div className="text-[15px] text-gray-500">
                        Code: {items.productCode}
                      </div>
                      <div className="text-[15px] text-gray-500">
                        {items.category}
                      </div>
                      <div className="text-[15px] flex gap-1 items-center py-1 text-gray-500">
                        {" "}
                        Size:
                        <span className="w-[20px] h-[20px] text-[12px] text-black rounded-full bg-black/[0.1] flex items-center justify-center">
                          {items.size}
                        </span>
                      </div>
                      <div className="hidden md:block">
                        {items.quantity ? (
                          <div className="text-green-400 text-[14px]">
                            In Stock
                          </div>
                        ) : (
                          <div className="text-red-400 text-[14px]">
                            Out of Stock
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col  gap-2 md:w-[100px] md:items-center md:my-6">
                      <div className="flex flex-col gap-2 md:my-1  items-center">
                        <div className="font-[500] text-[15px] text-lg hidden md:block">
                          Per Price
                        </div>
                        <div className="text-gray-600">PKR {items.price}/-</div>
                      </div>
                      <div className="flex flex-col md:my-1 gap-2  items-center ">
                        <div className="font-[500] text-[15px] text-lg hidden md:block">
                          Quantity
                        </div>
                        <div className="flex items-center ">
                          <button
                            className="px-2 bg-gray-200 text-gray-700 rounded-l"
                            onClick={() =>
                              toggleCartItemQuanitity(items._id, "dec")
                            }
                          >
                            -
                          </button>
                          <span className="mx-2 text-lg text-gray-600">
                            {items.quantity}
                          </span>
                          <button
                            className="px-2 bg-gray-200 text-gray-700 rounded-r"
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
                  <div className="w-[100px] md:block hidden">
                    <RxCross2
                      size={25}
                      className="cursor-pointer"
                      onClick={() => onRemove(items)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-[0.5] border-l border-r justify-center border-b">
          {cartItems.length >= 1 && (
            <div className="px-5 py-5 flex flex-col items-center justify-around">
              <div className="flex flex-col min-[1534px]:flex-row items-center bg-red-200 p-7 rounded-2xl w-[100%] text-black gap-5">
                <div className="rounded-full border-black border-2">
                  <AiOutlineExclamation size={20} />
                </div>
                <div className="text center  max-[1534px]:text-[14px]">
                  Delivery available in Islamabad and Rawalpindi. Contact us for
                  other areas. Thank you for choosing us.
                </div>
              </div>
              {/* Address Modal */}
              {!(
                address.name === "" &&
                address.zip === "" &&
                address.email === "" &&
                address.city === "" &&
                address.phone === "" &&
                address.addressAll === ""
              ) && (
                <div className="flex flex-col w-[100%]">
                  <div className="mt-4 w-[100%] flex items-center justify-between px-2 py-4 border-t rounded-t-md border-b">
                    <div className=" text-lg font-semibold max-[500px]:text-sm">
                      {address.name}
                    </div>
                    <div onClick={() => handleDrop()}>
                      {dropAddress ? (
                        <AiFillCaretUp className="text-2xl  cursor-pointer" />
                      ) : (
                        <AiFillCaretDown className="text-2xl cursor-pointer" />
                      )}
                    </div>
                  </div>
                  {dropAddress && (
                    <div className="px-2 flex items-center justify-between pb-2 pt-3">
                      <span className="max[500px]:text-sm font-semibold">
                        Shipping Details
                      </span>
                      <div className="flex gap-3">
                        <div
                          className="cursor-pointer hover:underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                          onClick={openModal}
                        >
                          Edit
                        </div>
                        <div
                          className="cursor-pointer hover:underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
                          onClick={deleteForm}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {dropAddress && (
                <div className=" w-[100%] flex pb-3 gap-[2rem]">
                  <div className="flex flex-col gap-1 mx-2">
                    <span className="break-words  text-gray-600 text-sm">
                      {address.phone}
                    </span>

                    <span className="break-words  text-gray-600 text-sm">
                      {address.email}
                    </span>
                    <span className="break-words max-w-[150px] sm:max-w-[300px] md:max-w-[600px]  text-gray-600 text-sm ">
                      {address.addressAll +
                        ", " +
                        address.city +
                        ", " +
                        address.zip +
                        "."}
                    </span>
                  </div>
                </div>
              )}

              <div>
                {!(
                  address.name === "" &&
                  address.zip === "" &&
                  address.email === "" &&
                  address.city === "" &&
                  address.phone === "" &&
                  address.addressAll === ""
                ) ? (
                  ""
                ) : (
                  <button
                    className="bg-black text-white border-t w-[150px] mb-4 mt-4  rounded-lg h-11 hover:bg-gray-600 duration-300"
                    onClick={openModal}
                  >
                    Add Address
                  </button>
                )}

                {isOpen && (
                  <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="fixed inset-0 transition-opacity">
                        <div
                          className="absolute inset-0 bg-black opacity-75"
                          onClick={closeModal}
                        ></div>
                      </div>
                      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all  sm:max-w-[25rem] sm:w-full">
                        <div className="bg-white flex flex-col gap-6 items-center justify-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <div className="absolute right-6 top-6">
                              <button onClick={closeModal}>
                                <RxCross2 size={24} />
                              </button>
                            </div>
                          </div>
                          <div className="sm:flex sm:items-start">
                            <div className="mt-3 flex flex-col gap-6  sm:mt-0 sm:ml-4 sm:text-left">
                              <div className="mt-2 flex flex-col items-center gap-6">
                                <form
                                  onSubmit={handleSubmit}
                                  className="flex flex-col gap-5 justify-center "
                                  name="addressForm"
                                >
                                  <label className="flex gap-3 items-center justify-center">
                                    <div className="flex flex-col">
                                      <div className="flex ">
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
                                      <div className="flex ">
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
                                      <div className="flex ">
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
                                      <div className="flex ">
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
                                      <div className="flex ">
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
                                      <div className="flex ">
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
                                </form>
                                <button
                                  className=" inline-flex justify-center rounded-md border border-transparent w-[80px] shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-600 sm:w-auto sm:text-sm transition-all duration-300"
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
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-5 border-t w-[100%] border-b py-5">
                <div className="text-lg font-semibold underline underline-offset-8">
                  Order Summary
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p className="font-medium">Items Total:</p>
                    <div>{totalQuantities}</div>
                  </div>

                  <div className="flex gap-2">
                    <p className="font-medium">Delivery Fee:</p>
                    <div>PKR 99/-</div>
                  </div>

                  <div className="flex items-center gap-2 w-[100%] bg-gray-600 text-white px-1">
                    <p className="font-medium text-[16px]  ">Grand Total:</p>
                    <div className=" text-[16px]">
                      PKR {totalPrice + 99}/-{" "}
                      <span className="text-sm"> (incl shipping fee)</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
      onClick={handleCheckout}
      className="bg-black text-white border-t rounded-lg w-full h-11 hover:bg-gray-600 px-4 my-2 duration-300"
      disabled={processing}
    >
      {processing ? "Processing..." : orderCompleted ? "Order Placed!" : "Proceed to Checkout"}
    </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
