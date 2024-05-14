import React from "react";

import { useRef, useEffect, useState } from "react";

import "../components/ImageSlider.css";
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

  const cardListRef = useRef(null);
  const [shosArrow, setArrow] = useState({
    showLeft: "none",
    showRight: "block",
  });

  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const handleImageSliding = (direct) => {
    const direction = direct === "prev-slide" ? -0.25 : 0.25;
    const scrollAmount = cardListRef.current.clientWidth * direction;
    cardListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

  };

  useEffect(() => {
    setMaxScrollLeft(
      cardListRef.current.scrollWidth - cardListRef.current.clientWidth
    );
    console.log(cardListRef.current.scrollLeft, " sLeft");
  }, []);

  const handelScroll = () => {
    setArrow((prevstate) => ({
      ...prevstate,
      showLeft: cardListRef.current.scrollLeft <= 0 ? "none" : "block",
      showRight:
        cardListRef.current.scrollLeft >= maxScrollLeft ? "none" : "block",
    }));
  };

  return (
    <>
       {/* Carousel container */}
      <div className="container">
        <div className="slider-wrapper p-12 w-full rounded-sm">
          <div className="card-list" ref={cardListRef} onScroll={handelScroll}>
            {productItems.map((item) => {
              return (

                // image card itmes
                <div
                  key={item.name}
                  className="w-56 h-52 my-20 mx-6 md:w-80 md:h-64"
                >
                  <div className="relative overflow-hidden rounded-lg group">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 p-6 flex flex-col items-center gap-5 justify-center bg-black bg-opacity-20 md:bg-opacity-15">
                      <div className="text-white font-bold text-lg">
                        {item.name}
                      </div>
                      <button className="bg-white w-20 h-10 rounded-lg font-bold text-sm mt-2 md:w-24 md:h-12">
                        Shop
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
{/* scroller arrow button */}
          <button
            style={{ display: shosArrow.showLeft }}
            onClick={() => handleImageSliding("prev-slide")}
            id="prev-slide"
            className="slide-button material-icons "
          >
            chevron_left
          </button>

          <button
            style={{ display: shosArrow.showRight }}
            onClick={() => handleImageSliding("next-slide")}
            id="next-slide"
            className="slide-button material-icons "
          >
            chevron_right
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
