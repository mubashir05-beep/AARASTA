import Link from 'next/link';
import React from 'react';

const MobileMenu = () => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Tailored Clothing", url: "/tailored_clothing" },
    { id: 3, name: "Ready to Wear", url: "/ready_to_wear" },
    { id: 4, name: "About Us", url: "/about" },
    { id: 5, name: "Contact", url: "/contact" },
  ];  
  return (
    <div className='fixed top-[55px] right-0 bottom-0 left-0 bg-white z-50 '>
      <ul className='flex flex-col gap-4 mx-[3rem] my-[3rem]'>
        {data.map((menu) => {
          return (
            <li key={menu.id} className='border-b text-lg '>
              <Link href={menu.url} className='text-gray-800'>
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileMenu;
