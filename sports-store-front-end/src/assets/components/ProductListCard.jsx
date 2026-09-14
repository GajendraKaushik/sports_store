import React from 'react'
import { Link } from "react-router-dom";

// Whole tile navigates to its category's filtered product list; "Shop" is a
// styled span (a real <button> inside a link is invalid HTML).
const ProductListCard = ({ItemName, ItemImg, to}) => {
  return (
    <Link
      to={to}
      className="my-20 mx-5 w-full h-64 block"
    >
      <div className="relative overflow-hidden rounded-lg group w-full h-full">
        <img
          src={ItemImg}
          alt={ItemName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 p-6 flex flex-col items-center gap-5 justify-center bg-black bg-opacity-20 md:bg-opacity-15">
          <div className="text-white font-bold text-lg">
            {ItemName}
          </div>
          <span className="bg-white w-20 h-10 rounded-lg font-bold text-sm mt-2 md:w-24 md:h-12 flex items-center justify-center">
            Shop
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductListCard
