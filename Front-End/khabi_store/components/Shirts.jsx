import Image from 'next/image'
import React from 'react'

const Shirts = () => {
  return (

 <div className=''>
        <Image src='/Header_shirt.webp' className='w-[50vw] object-cover h-[100vh]' height={200} width={500}/>
        <div className="w-[50vw] object-cover h-[100vh] bg-black opacity-[0.1]" />
    </div>
 
  )
}

export default Shirts