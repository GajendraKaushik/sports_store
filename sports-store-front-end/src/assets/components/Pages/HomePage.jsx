import React from 'react'

import ProductsList from '../ProductsList'
import ImageSlider from '../ImageSlider'
import NormalProductSlider from '../NormalProductSlider'
import LimitedStock from '../LimitedStock'

const HomePage = () => {
  return (
<>
<ProductsList/>
<ImageSlider/>
<NormalProductSlider/>
<LimitedStock />
</>
  )
}

export default HomePage
