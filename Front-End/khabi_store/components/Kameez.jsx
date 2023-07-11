import Image from 'next/image'
import React from 'react'

const Kameez = () => {
  return (
    <div className=''>
        <Image src='/47039-1_1_.webp' className='w-[50vw] object-cover h-[100vh]' height={200} width={500}/>
        <div className="w-[50vw] object-cover h-[100vh] bg-black opacity-[0.1]" />
    </div>
  )
}

export default Kameez