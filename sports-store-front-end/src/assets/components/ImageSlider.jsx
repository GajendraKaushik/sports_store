import React from "react";

import { useRef, useEffect, useState } from "react";

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
  // `to` navigates to the products list pre-filtered by that tile's category
  // (carousel 1 tiles are categories, not single products).
  let productItems = [
    {
      name: "Electric Bike",
      img: offridingImg,
      to: "/products?category=electric-bikes",
    },
    {
      name: "Road Bikes",
      img: Tileimg,
      to: "/products?category=road-bikes",
    },
    {
      name: "Mountain Bike",
      img: forestImg,
      to: "/products?category=mountain-bikes",
    },
    {
      name: "Active Bike",
      img: singleridingImg,
      to: "/products?category=active-bikes",
    },
    {
      name: "Kids Bike",
      img: kids,
      to: "/products?category=kids-bikes",
    },
    {
      name: "Tire",
      img: tire,
      to: "/products?category=tires",
    },
    {
      name: "Apparel",
      img: apparel,
      to: "/products?category=apparel",
    },
    {
      name: "Accessaries",
      img: Accessa,
      to: "/products?category=accessories",
    },
  ];

return(
    <section className="w-full bg-white">
      <div className="px-12 pt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 text-left">New Arrivals</h2>
      </div>
      <CaroselContainer> 
        {productItems.map((item) => {
                return (
                  // image card itmes
                  <ProductListCard  key={item.name} ItemName={item.name} ItemImg ={item.img} to={item.to}/>
                );
              })}
      </CaroselContainer>
    </section>
  );
};

export default ImageSlider;
