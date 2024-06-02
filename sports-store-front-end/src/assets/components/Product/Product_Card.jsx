import React from "react";

const Product_Card = ({ProductImg, ProductName,OfferPrice, OriginalPrice}) => {
  return (
    <div className="w-full h-full bg-white">
    <div className="px-6 py-8  bg-white relative">
    <div className="absolute p-4 left-[75%] font-thin text-sm">2023</div>
      <img src={ProductImg} alt="img1" className="w-full h-3/4 rounded-md" />
      <div className="flex justify-between flex-col w-full">
        <div className="text-gray-900 text-[1.17em] font-bold my-3">{ProductName}</div>
        <div className="flex justify-start gap-4">
          <p className="text-gray-950 tex font-medium">${OfferPrice}</p>
          <p className="text-gray-500 line-through">${OriginalPrice}</p>
        </div>
      </div>
    </div>
  </div> 
  );
};

export default Product_Card;
