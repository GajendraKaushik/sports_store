import React from "react";

import { useRef, useEffect, useState } from "react";

import "../components/ImageSlider.css";
import ProductListCard from "./ProductListCard";
import CaroselContainer from "./CaroselContainer";

import Tileimg from "../images/NavigationalTiles_RoadBikes_1200x1200_02.webp";
import forestImg from "../images/forestRider.webp";
import offridingImg from "../images/offriding.webp";
import singleridingImg from "../images/Single_rider.webp";
import Accessa from "../images/Accesaries.webp";
import apparel from "../images/apparel.webp";
import kids from "../images/kids_bike.webp";
import tire from "../images/Tire.webp";


const ImageSlider = (props) => {
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

return(
    <CaroselContainer> 
      {productItems.map((item) => {
              return (
                // image card itmes
                <ProductListCard  key={item.name} ItemName={item.name} ItemImg ={item.img}/>
              );
            })}
    </CaroselContainer>
      
  );
};

export default ImageSlider;
