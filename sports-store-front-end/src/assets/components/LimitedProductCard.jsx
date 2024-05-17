import React from 'react'

const LimitedProductCard = ({ProductImg, ProductSpec, ProductName}) => {
  return (
    <div className=''>
    <img src={ProductImg} alt="tempo"  className='rounded-md'/>
    <div className='flex flex-col text-left'>
        <div className='font-bold text-xl text-gray-900 mt-5'>
            {ProductSpec}
        </div>
        <div className='text-gray-700 mt-2'>{ProductName}</div>
        <div className='grid grid-cols-[repeat(2, minmax(min-content, max-content))] h-14 bg-gray-800 hover:bg-gray-600 gap-x-6 mt-8 rounded-md md:w-28 md:h-10'>
           <button className='text-white text-sm font-bold'>Shop Now</button>
        </div>
    </div>
</div>
  )
}

export default LimitedProductCard
