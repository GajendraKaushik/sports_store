import React from "react";

import Tileimg from "../images/NavigationalTiles_RoadBikes_1200x1200_02.webp"
import forestImg  from "../images/forestRider.webp"
import offridingImg  from "../images/offriding.webp"
import singleridingImg  from "../images/Single_rider.webp"
import Accessa  from "../images/Accesaries.webp"
import apparel  from "../images/apparel.webp"
import kids  from "../images/kids_bike.webp"
import tire  from "../images/Tire.webp"
import Homeimg from "../images/BikeImg/HomeBike.webp"

import Button from "./Button";
const ProductsList = () =>{
    let productItems = [
        {
        name:"Electric Bike",
        img:offridingImg},
        {
        name:"Road Bikes",
        img:Tileimg},
        {
        name:"Mountain Bike",
        img:forestImg},
        {
        name:"Active Bike",
        img:singleridingImg},
        {
        name:"Kids Bike",
        img:kids},
        {
        name:"Tire",
        img:tire},
        {
        name:"Apparel",
        img:apparel},
        {
        name:"Accessaries",
        img:Accessa},
]


   return(
    <>
        <div className="LandinImageContainer">
            <div className="w-full h-[810px] top-20 relative">
            <img src={Homeimg} alt="HomeImg" className="w-full h-full z-50 transform " />
            </div>
            <div></div>
        </div>
        
 
    </>
   )

}

export default ProductsList ;