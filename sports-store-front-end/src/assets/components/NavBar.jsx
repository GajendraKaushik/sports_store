import React from "react";
import { useState } from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "Saved", link: "myaccout/Wishlist" },
    { name: "Cart", link: "/" },
    { name: "Login", link: "myaccout" },
  ];

  let [open, setOpen] = useState(false);
  return (
    <>
      <div className="shadow-md w-full top-0 left-0 absolute">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7 z-auto">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Popins] italic uppercase">
            <span></span>
            Sports Store
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close-outline" : "menu-outline"}></ion-icon>
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0  w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-15 opacity-100 z-40" : "top-[-490px]"
            } `}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                <NavLink
                 to={link.link}
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <Button>Login</Button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
