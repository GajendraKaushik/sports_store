import React from "react";


import "../components/ImageSlider.css"

const ImageSlider = (products) =>{
const cardList = document.querySelector(".slider-wrapper .card-list")
const maxScrollLeft = cardList.scrollWidth - cardList.clientWidth;

  let showLeft = cardList.scrollLeft <= 0  ? "none" : "block"
  let showRight = cardList.scrollLeft <= maxScrollLeft  ? "none" : "block"

const handleImageSliding = (direct) =>{
    const direction = direct === "prev-slide" ? -1 : 1;
    const scrollAmount = cardList.clientWidth * direction;
    cardList.scrollBy({left:scrollAmount, behavior:"smooth"});
}  

return(
    <>
    <div className="container">
        <div className="slider-wrapper">
            <button  style={`display:${showLeft}`} onClick={()=>handleImageSliding("prev-slide")}  id="prev-slide" className="slide-button material-icons">chevron_left</button>
            <div className="card-list">
                {products}
            </div>
            <button style={`display:${showRight}`} onClick={()=>handleImageSliding("next-slide")} id="next-slide" className=" slide-button material-icons">chevron_right</button>
        </div>


    </div>
    </>
)

}

export default ImageSlider;