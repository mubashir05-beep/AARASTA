import React from 'react'
import { useStateContext } from "@/context/StateContext";
const Success = () => {
    const {
       
        deleteCart,
      } = useStateContext();
      deleteCart(); 
  return (
    <div>Success Page</div>
  )
}

export default Success