import React from "react";

import Tileimg from "../images/NavigationalTiles_RoadBikes_1200x1200_02.webp"
import forestImg  from "../images/forestRider.webp"
import offridingImg  from "../images/offriding.webp"
import singleridingImg  from "../images/Single_rider.webp"

import Button from "./Button";
import ImageSlider from "./ImageSlider";

const ProductsList = () =>{
    let productItems = [{
        name:"",
        img:""

    }]


   return(
    <>
        {/* <div className="w-56 h-52 my-20 mx-6">
            <div className="relative overflow-hidden rounded-lg ">
            <img src={Tileimg} alt="img" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"/>
            
            <div className="absolute p-6 w-full h-full flex gap-7 flex-col items-center justify-center ">
                <div className="text-slate-50 font-bold"> Electric Bick </div>
                <button  className="bg-white w-20 h-10 rounded-lg font-bold text-sm"> Shop </button>
            </div>
           

            </div>
        </div> */}


<div className="w-56 h-52 my-20 mx-6 md:w-80 md:h-64">
    <div className="relative overflow-hidden rounded-lg group">
        <img
            src={Tileimg} 
            alt="Electric Bike"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />  
        {/* Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col items-center gap-5 justify-center bg-black bg-opacity-20 md:bg-opacity-15">
            <div className="text-white font-bold text-lg">Electric Bike</div>
            <button className="bg-white w-20 h-10 rounded-lg font-bold text-sm mt-2 md:w-24 md:h-12">Shop</button>
        </div>
    </div>
</div>
 
    </>
   )

}

export default ProductsList ;