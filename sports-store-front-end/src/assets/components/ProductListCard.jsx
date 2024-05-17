import React from 'react'

const ProductListCard = ({ItemName, ItemImg}) => {
  return (
    <div
    key={ItemName}
    className="w-56 h-52 my-20 mx-6 md:w-80 md:h-64"
  >
    <div className="relative overflow-hidden rounded-lg group">
      <img
        src={ItemImg}
        alt={ItemName}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 p-6 flex flex-col items-center gap-5 justify-center bg-black bg-opacity-20 md:bg-opacity-15">
        <div className="text-white font-bold text-lg">
          {ItemName}
        </div>
        <button className="bg-white w-20 h-10 rounded-lg font-bold text-sm mt-2 md:w-24 md:h-12">
          Shop
        </button>
      </div>
    </div>
  </div>
  )
}

export default ProductListCard
