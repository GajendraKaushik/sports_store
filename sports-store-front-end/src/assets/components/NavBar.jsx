import React from "react";
import { useState } from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import ResponsiveSideNavbar from "./ResponsiveSideNavbar";
import login from "../images/login.png";
import saveLater from "../images/bookmark.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "Saved", link: "myaccout/Wishlist" },
    { name: "Cart", link: "/" },
    { name: "Login", link: "myaccout" },
  ];
   const navigate = useNavigate()
  const handleNavidation =(path)=>{
         navigate(path)
  }

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
              <ion-icon
                name={open ? "close-outline" : "menu-outline"}
              ></ion-icon>
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
            <div className={`fixed left-0 w-full h-full md:w-[600px] z-[999] bg-white  top-0  pb-5 ${open ? "translate-x-0" : "-translate-x-full" } transition-all duration-200 dur ease-in`}>
              <div className=" bg-white h-full ml-12 mt-9 overflow-y-scroll scroll-smooth">
                <div className="text-3xl font-medium text-gray-900 italic uppercase pb-9">
                  <a href="">Sports store</a>
                </div>

                <div className="flex items-start justify-evenly flex-col text-2xl gap-5">
                  <div className="text-gray-900 font-bold py-2">
                    <NavLink onClick={() => setOpen()} to={"product"}>Bike</NavLink>
                  </div>
                  <div className="text-gray-900 font-bold py-2">
                    <NavLink onClick={() => setOpen()} to={"product"}>Parts</NavLink>
                  </div>
                  <div className="text-gray-900 font-bold py-2">
                    <NavLink onClick={() => setOpen()} to={"product"}>Apparel</NavLink>
                  </div>
                  <div className="text-gray-900 font-bold py-2">
                    <NavLink onClick={() => setOpen()} to={"product"}>Accessaries</NavLink>
                  </div>
                  <div className="text-gray-900 font-bold py-2">
                  <NavLink onClick={() => setOpen()} to={"product"}>Sales</NavLink>
                  </div>
                  <div className="text-gray-900 font-bold py-2">
                    <NavLink onClick={() => setOpen()} to={"product"}>Inside Specialized</NavLink>
                  </div>
                  <div className="text-gray-900 font-bold py-2">
                    <a href=""> Support</a>
                  </div>
                </div>
                <hr className=" bg-slate-500 my-6 mr-7" />
                <div className="flex flex-col items-start justify-start w-full gap-8">
                  <NavLink onClick={() => setOpen()} to={"myaccout"} className="flex items-center justify-between w-full">
                    <div className="text-gray-900 font-bold">My Account</div>
                    <div className="text-gray-600 mr-7 w-8 h-8">
                      <img src={login} alt="login" />
                    </div>
                  </NavLink>
                  <div>Login in or sign up for an account</div>
                  <div className="flex items-center justify-start gap-16">
                    <button className="bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-400 outline-none w-20 h-12">
                      Log In
                    </button>
                    <button className="bg-white text-slate-800 font-semibold rounded-lg  hover:border-[3px]  border-2 border-black w-20 h-12">
                      Sign Up
                    </button>
                  </div>
                </div>

                <hr className=" bg-slate-500 h-[1px] my-6 mr-7" />

                <NavLink onClick={() => setOpen()} to={"myaccout/Wishlist"} className="flex items-center justify-between">
                  <div className="text-gray-900 font-bold">
                    {" "}
                    Saved for Later
                  </div>
                  <div className="text-gray-600 mr-6  w-8 h-8">
                    <img src={saveLater} alt="" />
                  </div>
                </NavLink>
                <hr className=" bg-slate-500 my-6 mr-7 mb-40" />
     
              </div>
              <div className="absolute  left-[85%] top-5 ">
                <button
                  onClick={() => setOpen()}
                  className={`flex justify-center w-12 h-12 font-thin text-3xl rounded-sm items-center bg-stone-200`}
                >
                  <ion-icon name="close"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

export default NavBar;
