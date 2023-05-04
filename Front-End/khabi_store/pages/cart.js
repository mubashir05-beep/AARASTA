import React, { useRef } from "react";
import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import CartItems from "@/components/CartItems";
import { RxCross2 } from "react-icons/rx";

const Cart = () => {
  const {
    totalPrice,
    totalQuantites,
    cartItems,
    setItems,
    onRemove,
    setShowCart,
    toggleCartItemQuanitity,
    decQty,
    incQty,
    qty,
  } = useStateContext();
  const cartRef = useRef();

  return (
    <div className="mx-[3rem] my-[3rem]">
      <div className="hidden sm:block text-center text-[34px] ">
        Shopping Cart
      </div>
      {cartItems.length < 1 && <div>Cart Empty</div>}

      <div>Total Items:</div>
      <div>
   
      {cartItems.length >= 1 &&
        cartItems.map((items, index) => (
          <div
            className="flex border-b border-t  justify-between py-8 my-12"
            key={items._id}
          >
            <div className="flex gap-8 ">
              <img
                src={urlFor(items?.image[0])}
                width={"200px"}
                className="rounded-lg"
              />
              <div className="flex flex-col gap-2 my-6 w-[250px]">
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
                    S
                  </span>
                </div>
                <div>
                  {items.quantity ? (
                    <div className="text-green-400 text-[14px]">In Stock</div>
                  ) : (
                    <div className="text-red-400 text-[14px]">Out of Stock</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 my-6 w-[150px]">
                <div className="font-semibold text-[15px] text-lg">Price</div>
                <div>PKR {items.price}/-</div>
              </div>
              <div className="flex flex-col my-6 gap-2 w-[150px] ">
                <div className="font-semibold text-[15px] text-lg">
                  Quantity
                </div>
                <div className="flex items-center ">
                  <button
                    className="px-2 bg-gray-200 text-gray-700 rounded-l"
                    onClick={()=> toggleCartItemQuanitity(items._id,'dec')}
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg">{items.quantity}</span>
                  <button
                    className="px-2  bg-gray-200 text-gray-700 rounded-r"
                    onClick={()=> toggleCartItemQuanitity(items._id,'inc')}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <RxCross2 size={25} className="cursor-pointer" onClick={()=>onRemove(items)} />
            </div>
          </div>
        ))}
             
      </div>
      {/* <div>
      for sub total
        {
          cartItems.length>=1 && (
            <div>
              <h3>{totalPrice}</h3>
               
            </div>
          )
        }
      </div> */}
    </div>
  );
};

export default Cart;
