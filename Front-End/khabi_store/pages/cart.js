import React, { useRef, useState, useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import { RxCross2 } from "react-icons/rx";
import CartEmpty from "@/components/CartEmpty";
import { AiOutlineExclamation } from "react-icons/ai";

import { RiDeleteBinLine } from "react-icons/ri";
const Cart = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setItems,
    onRemove,
    setShowCart,
    toggleCartItemQuanitity,
    decQty,
    size,
    setSize,
    incQty,
    qty,
  } = useStateContext();
  const cartRef = useRef();
  const [scroll, setScoll] = useState("");
  
  return (
    <div className="mx-[3rem] my-[3rem] py-3">
      <div className="hidden sm:block text-center text-[34px] py-4 ">
        Shopping Cart
      </div>
      {cartItems.length < 1 && <CartEmpty />}
      {cartItems.length >= 1 && (
        <div className="flex items-center max-[499px]:flex-col  max-[499px]:items-start  max-[499px]:gap-2  max-[499px]:border-b justify-between border pb-8 px-5 pt-8">
          <div className="flex flex-row gap-2 items-center  ">
            <div className="text-lg font-semibold max-[339px]:text-[15px] ">
              Total Quantity:
            </div>
            <div className="text-[18px] max-[339px]:text-[16px]">{totalQuantities}</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-lg max-[339px]:text-[15px] font-semibold ">
              Sub-Total:
            </div>
            <div className="text-[18px] max-[339px]:text-[16px]">PKR {totalPrice}/-</div>
          </div>
        </div>
      )}

      <div className="flex flex-col min-[996px]:flex-row">
        <div
          className={`flex flex-col justify-between scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 gap-5 scrollbar-hide flex-[1.5]  scrollbar-track-rounded-full `}
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
                    <div className="flex flex-col gap-2 items-center  min-[500px]:items-start md:my-6 w-[200px]">
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
                          {size}
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
                            className="px-2  bg-gray-200 text-gray-700 rounded-r"
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
            <div className=" px-5 py-5 flex flex-col items-center justify-around  h-[556px] ">
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

              <button className="bg-black text-white border-t rounded-lg w-[100%] h-11 hover:bg-slate-900 duration-300">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
