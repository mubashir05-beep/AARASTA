import React, { useRef, useState, useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import { RxCross2 } from "react-icons/rx";
import CartEmpty from "@/components/CartEmpty";

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
        <div className="flex items-center justify-between border-t border-b pb-8 pt-8">
          <div className="flex flex-row gap-2 items-center  ">
            <div className="text-lg font-semibold ">Total Quantity:</div>
            <div className="text-[18px]">{totalQuantities}</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-lg font-semibold ">Sub-Total:</div>
            <div className="text-[18px]">PKR {totalPrice}/-</div>
          </div>
        </div>
      )}

      <div className="flex flex-col min-[996px]:flex-row">
        <div
          className={`flex flex-col justify-between scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 gap-5 scrollbar-hide flex-[1.5]  scrollbar-track-rounded-full `}
        >
          {cartItems.length >= 1 &&
            cartItems.map((items, index) => (
              <div className="flex border-b  py-5 " key={items._id}>
                <div className="flex gap-[3rem] justify-center ">
                  <img
                    src={urlFor(items?.image[0])}
                    width={"200px"}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col gap-2 my-6 w-[200px]">
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
                    <div>
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
                  <div className="flex flex-col gap-2 w-[100px] items-center my-6">
                    <div className="flex flex-col gap-2 my-1  items-center">
                      <div className="font-[500] text-[15px] text-lg">
                        Per Price
                      </div>
                      <div className="text-gray-600">PKR {items.price}/-</div>
                    </div>
                    <div className="flex flex-col my-1 gap-2  items-center ">
                      <div className="font-[500] text-[15px] text-lg">
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
                  <div className="w-[100px] flex justify-center">
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
        <div className="flex  flex-[0.5] border-l border-r border-b">
          {cartItems.length >= 1 && (
            <div className="py-5 px-5 flex flex-col ">
              <div className="flex  flex-col gap-5">
                <div className="text-lg font-semibold">Order Summary</div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p className="font-medium">Items Total:</p>
                    <div>{totalQuantities}</div>
                  </div>

                  <div className="flex gap-2">
                    <p  className="font-medium">Delivery Fee:</p>
                    <div>PKR 99/-</div>
                  </div>

                  <div  className="flex gap-2 bg-gray-600 text-white px-2" >
                    <p className="font-medium">Grand Total:</p>
                    <div>PKR {totalPrice+99}/-</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
