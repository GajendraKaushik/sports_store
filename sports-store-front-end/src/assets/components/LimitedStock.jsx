import React from 'react'

import img1 from "../images/BikeImg/BikeImg-1.webp"
import tire from "../images/BikeImg/Tire.jpg"
import BikeTempo from "../images/BikeImg/bike_in_temp.jpg"

const LimitedStock = () => {
  return (
    <>
    <div className='  w-[325px] h-[425px] bg-white'>
        <div className='px-3 py-8 bg-white'>
            <img src={img1} alt="img1" className='w-full h-3/4 rounded-md'/>
            <div className='flex  justify-between m-3'>
              <div className='text-gray-600'>Bike name</div>
              <div>
                <p className='text-gray-950'>$2000.99</p>
                <p className='text-gray-500 line-through'>$3000.99</p>
              </div>
            </div>
        </div>
    </div>

    <div className='w-full h-[750px] bg-white'>
        <div className='grid p-12 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-6 gap-y-11 md:gap-y-0'>
        <div className=''>
                <img src={BikeTempo} alt="tempo"  className='rounded-md'/>
                <div className='flex flex-col text-left'>
                    <div className='font-bold text-xl text-gray-900 mt-5'>
                        Evolution of the Fastest
                    </div>
                    <div className='text-gray-700 mt-2'>The All-New Epic 8</div>
                    <div className='grid grid-cols-[repeat(2, minmax(min-content, max-content))] h-14 bg-gray-800 hover:bg-gray-600 gap-x-6 mt-8 rounded-md md:w-28 md:h-10'>
                       <button className='text-white text-sm font-bold'>Shop Now</button>
                    </div>
                </div>
            </div>
            <div className=''>
                <img src={tire} alt="tire"  className='rounded-md'/>
                <div className='flex flex-col text-left'>
                    <div className='font-bold text-xl text-gray-900 mt-5'>
                        Keep Rolling
                    </div>
                    <div className='text-gray-700 mt-2'> All-New Hemisphere Tire</div>
                    <div className='grid grid-cols-[repeat(2, minmax(min-content, max-content))] h-14 bg-gray-800 hover:bg-gray-600 gap-x-6 mt-8 rounded-md md:w-28 md:h-10'>
                       <button className='text-white text-sm font-bold'>Shop Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default LimitedStock
