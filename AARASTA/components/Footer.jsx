import React from "react";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import Link from "next/link";

const Footer = () => {
  const data = [
    { id: 1, name: "Tailored Clothing", url: "/" },
    { id: 2, name: "Shirts", url: "/shirts" },
    { id: 3, name: "About Us", url: "/aboutus" },
    { id: 4, name: "Contact Us", url: "/contact" },
    { id: 5, name: "Size Guide", url: "/size_guide" },
    { id: 6, name: "Privacy Policy", url: "/policy" },
    { id: 6, name: "Terms and Conditions", url: "/terms_conditions" },
  ];

  const contact = [
    { id: 1, name: "aarasta.customer@gmail.com" },
    { id: 2, name: "0300-00000000" },
  ];

  function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }

  const year = getCurrentYear();

  return (
    <div className="flex flex-col bg-black text-white px-[3rem] max-[500px]:px-[1rem] py-[1rem]">
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
        <div className="flex items-baseline  gap-[50px]">
          <div>
            <h3 className="text-3xl font-medium text-white mb-4 md:mb-0">
              Need Help?
            </h3>
            <ul className="flex flex-col gap-3 my-5">
              {contact.map((item) => {
                return (
                  <li key={item.id}>
                    <div>{item.name}</div>
                  </li>
                );
              })}
              <li>Mon - Sat (9AM - 5PM)</li>
            </ul>
          </div>
          <div className="bg-black py-8">
            <div className="max-w-6xl">
              <div className="flex flex-col gap-4 max-w-[500px] justify-between">
                <h3 className="text-3xl font-medium text-white mb-4 md:mb-0">
                  About Us
                </h3>
                <div className="text-lg pt-1 text-white">
                  Welcome to AARASTA! We are a brand built on the passion and
                  dedication of two brothers who share a common vision - to
                  create exceptional &ldquo;Kameez Shalwar&rdquo; and suits for
                  men. Our story began with a deep-rooted love for traditional
                  craftsmanship and a desire to bring the essence of our
                  heritage to the modern world. Want to{" "}
                  <span className="underline underline-offset-4 cursor-pointer">
                    <Link href="/aboutus">learn more?</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mt-2 justify-between">
        <p className="text-white/[0.7] break-words">
          Copyright &copy; {year} AARASTA. All Rights Reserved
        </p>
        <div className="flex gap-5 items-center">
          <Link href="#">
            <AiOutlineTwitter size={24} className="cursor-pointer" />
          </Link>
          <Link href="#">
            <BsInstagram size={17} className="cursor-pointer" />
          </Link>
          <Link href="#">
            <SiGmail size={18} className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
