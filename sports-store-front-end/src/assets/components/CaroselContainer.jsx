import React from 'react'
import ProductListCard from './ProductListCard';
import "../components/ImageSlider.css";

import { useRef, useEffect, useState } from "react";

const CaroselContainer = (props) => {


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
      <div className="container">
        <div className="slider-wrapper p-12 w-full rounded-sm">
          <div className="card-list" ref={cardListRef} onScroll={handelScroll}>
            {props.children}
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
  )
}

export default CaroselContainer
