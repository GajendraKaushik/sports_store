import React from 'react'
import NormalProductCard from './NormalProductCard'
import LimitedProductCard from './LimitedProductCard'

import img1 from "../images/BikeImg/BikeImg-1.webp"
import tire from "../images/BikeImg/Tire.jpg"
import BikeTempo from "../images/BikeImg/bike_in_temp.jpg"
import FindStore from "../images/BikeImg/FindStores.jpg"
import DownloadApp from "../images/BikeImg/DownloadApp.jpeg"

const LimitedStock = () => {
  return (
    <>
    <div className='w-full bg-white'>
        <div className='grid p-12 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-6 gap-y-11 md:gap-y-0'>
         <LimitedProductCard ProductImg={BikeTempo}  ProductSpec={"Evolution of the Fastest"} ProductName={"The All-New Epic 8"}/>
         <LimitedProductCard ProductImg={tire}  ProductSpec={"Keep Rolling"} ProductName={"All-New Hemisphere Tire"}/>
        </div>
    </div>
    <div className='w-full bg-white'>
        <div className='grid p-12 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-6 gap-y-11 md:gap-y-0'>
         <LimitedProductCard ProductImg={FindStore}  ProductSpec={"Evolution of the Fastest"} ProductName={"The All-New Epic 8"}/>
         <LimitedProductCard ProductImg={DownloadApp}  ProductSpec={"Keep Rolling"} ProductName={"All-New Hemisphere Tire"}/>
        </div>
    </div>
    </>
  )
}

export default LimitedStock
