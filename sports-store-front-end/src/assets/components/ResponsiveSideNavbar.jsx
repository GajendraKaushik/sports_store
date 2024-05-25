import React from "react";
import login from "../images/login.png";
import saveLater from "../images/bookmark.png";
import {useState} from "react"

const ResponsiveSideNavbar = () => {
   const [hide, setHide] = useState("translate-x-0")
  return (
    <div className={`relative ${hide} transition-all duration-300 ease-in`}>
    <div className=" bg-white ml-12 mt-9">
      <div className="text-3xl font-medium text-gray-900 italic uppercase pb-9">
        <a href="">Sports store</a>
      </div>

      <div className="flex items-start justify-evenly flex-col text-2xl gap-5 ">
        <div className="text-gray-900 font-bold py-2">
          <a href="">Bike</a>
        </div>
        <div className="text-gray-900 font-bold py-2">
          <a href="">Parts</a>
        </div>
        <div className="text-gray-900 font-bold py-2">
          <a href="">Apparel</a>
        </div>
        <div className="text-gray-900 font-bold py-2">
          <a href="">Accessaries</a>
        </div>
        <div className="text-gray-900 font-bold py-2">
          <a href="">Sale</a>
        </div>
        <div className="text-gray-900 font-bold py-2">
          <a href="">Inside Specialized</a>
        </div>
        <div className="text-gray-900 font-bold py-2">
          <a href=""> Support</a>
        </div>
      </div>
      <hr className=" bg-slate-500 my-6 mr-7" />
      <div className="flex flex-col items-start justify-start w-full gap-8">
        <div className="flex items-center justify-between w-full">
          <div className="text-gray-900 font-bold">My Account</div>
          <div className="text-gray-600 mr-7 w-8 h-8">
            <img src={login} alt="login" />
          </div>
        </div>
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

      <div className="flex items-center justify-between">
        <div className="text-gray-900 font-bold"> Saved for Later</div>
        <div className="text-gray-600 mr-6  w-8 h-8">
          <img src={saveLater} alt="" />
        </div>
      </div>
      <hr className=" bg-slate-500 my-6 mr-7 mb-40" />
    </div>
    <div className="absolute top-1 left-[90%] ">
        <button  onClick={()=>setHide("-translate-x-full")} className="flex justify-center w-12 h-12 font-thin text-3xl rounded-sm items-center bg-stone-200"><ion-icon name="close"></ion-icon></button>
    </div>
    </div>
  );
};

export default ResponsiveSideNavbar;
