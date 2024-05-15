import { useState } from 'react'
import viteLogo from '/vite.svg'

import NavBar from './assets/components/NavBar'
import ProductsList from './assets/components/ProductsList'
import ImageSlider from './assets/components/ImageSlider'

function App() {

  return (
    <>

      <NavBar/>
      <ProductsList />
      <ImageSlider/>
       

    </>
  )
}

export default App
