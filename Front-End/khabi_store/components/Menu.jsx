import Link from "next/link";
import React from "react";

const Menu = () => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About Us", url: "/about" },
    { id: 3, name: "Custom Shirts", url: "/custom_shirts" },
    { id: 4, name: "Contact", url: "/contact" },
  ];
  return (
    <div className="flex justify-between width-full ">
        <div className="font-semibold pointer ">Khaabi</div>
      <ul className="flex gap-5 ">
        {data.map((object) => {
          return (
            <li key={object.id}>
              <Link href={object.url}>{object.name}</Link>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
