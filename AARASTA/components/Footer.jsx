import React from "react";

import { BsInstagram } from "react-icons/bs";

import { AiOutlineTwitter } from "react-icons/ai";

import { SiGmail } from "react-icons/si";
import Link from "next/link";

const Footer = () => {
  const data = [
    { id: 1, name: "Tailored Clothing", url: "/" },
    { id: 2, name: "Shirts", url: "/shirts" },
    { id: 3, name: "About Us", url: "/about" },
    { id: 4, name: "Contact Us", url: "/contact" },
    { id: 5, name: "Privacy Policy", url: "/policy" },
    { id: 6, name: "Terms and Conditions ", url: "/terms_conditions" },
  ];
  function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }
  const year = getCurrentYear();
      
  return (
    <div className="flex flex-col bg-black  text-white px-[3rem] py-[1rem]">
      <div className="font-semibold text-[32px]">Explore with Us!</div>
      <div className="flex flex-col md:flex-row justify-between">
        <ul className="flex flex-col gap-3 my-5">
          {data.map((item) => {
            return (
              <li key={item.id}>
                <Link href={item.url}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
        <div>
          <div className="bg-black py-8 ">
            <div className="max-w-6xl">
              <div className="flex flex-col gap-4 justify-between">
                <h3 className="text-lg font-medium text-white mb-4 md:mb-0">
                  Join Our Newsletter
                </h3>
                <form className="flex flex-col gap md:flex-row mt-4 md:mt-0">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 border border-gray-400 rounded-l-md mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-white/[0.3] hover:text-white text-black px-4 py-2 rounded-r-md transition duration-300 ease-in-out"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mt-2 justify-between">
        <p className="text-white/[0.7] break-words">
          Copyright © {year} AARASTA. All Rights Reserved
        </p>
        <div className="flex gap-5 items-center ">
          <Link href={"#"}>
            {" "}
            <AiOutlineTwitter size={24} className="cursor-pointer" />
          </Link>

          <Link href={"#"}>
            {" "}
            <BsInstagram size={17} className="cursor-pointer" />
          </Link>
          <Link href={"#"}>
            <SiGmail size={18} className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
