import React from "react";

import Tileimg from "../images/NavigationalTiles_RoadBikes_1200x1200_02.webp";
import forestImg from "../images/forestRider.webp";
import offridingImg from "../images/offriding.webp";
import singleridingImg from "../images/Single_rider.webp";
import Accessa from "../images/Accesaries.webp";
import apparel from "../images/apparel.webp";
import kids from "../images/kids_bike.webp";
import tire from "../images/Tire.webp";
import Homeimg from "../images/BikeImg/HomeBike.webp";
import Homeimgsm from "../images/BikeImg/HomeBikesm.webp";

import Button from "./Button";
const ProductsList = () => {
  let productItems = [
    {
      name: "Electric Bike",
      img: offridingImg,
    },
    {
      name: "Road Bikes",
      img: Tileimg,
    },
    {
      name: "Mountain Bike",
      img: forestImg,
    },
    {
      name: "Active Bike",
      img: singleridingImg,
    },
    {
      name: "Kids Bike",
      img: kids,
    },
    {
      name: "Tire",
      img: tire,
    },
    {
      name: "Apparel",
      img: apparel,
    },
    {
      name: "Accessaries",
      img: Accessa,
    },
  ];

  return (
    <>



<div className='md:hidden'>
    <img src={Homeimgsm} alt="tempo"  className=' mt-16'/>
    <div className='flex flex-col items-center text-center mt-3'>
        <div className=' text-black font-semibold uppercase mt-3 '>
        NOW WITH NEW SRAM RED AXS
        </div>
        <div className='mt-5 font-bold text-3xl text-black'>The Greatest Road Line-Up Ever Created</div>
        <div className='grid grid-cols-[repeat(2, minmax(min-content, max-content))] h-14 bg-gray-800 hover:bg-gray-600 gap-x-6 mt-8 rounded-md w-4/5'>
           <button className='text-white text-sm font-bold'>Shop Now</button>
        </div>
    </div>
</div>
       <div className="LandinImageContainer hidden md:block">
        <div className="relative w-full h-[810px] top-16">
          <img src={Homeimg} alt="HomeImg" className=" absolute w-full h-full" />
          <div className="absolute flex flex-col text-left ml-20 mt-56 w-1/4 h-1/3 bg-black bg-opacity-20">
               <div className="text-white uppercase font-semibold  mt-5">
               NOW WITH NEW SRAM RED AXS
               </div>
               <div className="mt-3 leading-10  text-white font-extrabold text-4xl">The Greatest Road Line-Up Ever </div>
               <div className="mt-2 text-white font-extrabold text-4xl">Created</div>
               <div className="grid grid-cols-[repeat(2, minmax(min-content, max-content))] h-16 bg-gray-800 hover:bg-gray-600 gap-x-6 mt-8 rounded-md md:w-28 md:h-10">
              <button className="text-sm text-gray-600 bg-white rounded-md h- ">Shop Now</button>
               </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
