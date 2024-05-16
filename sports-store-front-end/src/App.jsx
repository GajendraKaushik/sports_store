import { useState } from 'react'
import viteLogo from '/vite.svg'

import NavBar from './assets/components/NavBar'
import ProductsList from './assets/components/ProductsList'
import ImageSlider from './assets/components/ImageSlider'
import LimitedStock from './assets/components/LimitedStock'
import Footer from './assets/components/Footer'


function App() {

  return (
    <>

    <div className='flex flex-col'>
      <div className='row-span-1'>
       <NavBar/>
      </div>
      <div className='row-span-1 w-full'>
      <ProductsList />
      </div>
      <div className='row-span-3 w-full'>
      <ImageSlider/>
      </div>
      <div className='row-span-4 w-full'>
      <LimitedStock />
      </div>
      <div className='row-span-4 w-full'>
      <Footer />
      </div>
    </div>

     
      {/* <ProductsList />
      <ImageSlider/>
      <LimitedStock />
      <Footer /> */}
       
       
    </>
  )
}

export default App
