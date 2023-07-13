import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const CartEmpty= () => {
  return (
    <div className='flex flex-col items-center '>
      <Image src={'/empty-cart.jpg'} width={400} height={400}/>
      <div className='flex flex-col items-center gap-3'>
        <div className='text-xl font-semibold '>Your Cart is Empty</div>
    
        <div className='text-gray-500 break-words text-center' >Your cart is currently empty. We invite you to explore our "Ready to Wear" page, where you'll find a wide variety of interesting products to choose from.</div>
        </div>
        <div className='py-6'>
        <Link href={'/ready_to_wear'}>
        <button className='py-3 rounded-md text-white px-[20px] bg-black/[0.9] hover:bg-black/[0.6] active:bg-black/[0.4] duration-200'>Explore Now</button>
       </Link>
        </div>
    

    </div>
  )
}

export default CartEmpty