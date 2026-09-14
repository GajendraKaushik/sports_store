import React from 'react'
import { Link } from "react-router-dom";

// "Shop Now" navigates to the product detail page (/products/:productSlug),
// same pattern as ProductListCard and NormalProductCard.
const LimitedProductCard = ({ProductImg, ProductSpec, ProductName, to}) => {
  return (
    <div className=''>
    <img src={ProductImg} alt={ProductName}  className='rounded-md w-full aspect-[4/3] object-cover'/>
    <div className='flex flex-col text-left'>
        <div className='font-bold text-xl text-gray-900 mt-5'>
            {ProductSpec}
        </div>
        <div className='text-gray-700 mt-2'>{ProductName}</div>
        <Link to={to ?? "/products"} className='grid grid-cols-[repeat(2, minmax(min-content, max-content))] h-14 bg-gray-800 hover:bg-gray-600 gap-x-6 mt-8 rounded-md md:w-28 md:h-10 items-center justify-center'>
           <span className='text-white text-sm font-bold'>Shop Now</span>
        </Link>
    </div>
</div>
  )
}

export default LimitedProductCard
