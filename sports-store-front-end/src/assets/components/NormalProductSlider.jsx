import React from 'react'
import CaroselContainer from './CaroselContainer'
import NormalProductCard from './NormalProductCard'



// List of images 

import Img1 from "../images/BikeImg/BikeImg-1.webp"
import Img2 from "../images/BikeImg/BikeImg-2.webp"
import Img3 from "../images/BikeImg/BikeImg-3.webp"
import Img4 from "../images/BikeImg/BikeImg-4.webp"
import Img5 from "../images/BikeImg/BikeImg-5.webp"
import Img6 from "../images/BikeImg/BikeImg-6.webp"
import Img7 from "../images/BikeImg/BikeImg-7.webp"
import ProductsList from './ProductsList'

const NormalProductSlider = () => {

   let  ProductList =[
        {img:Img1,
         Name:"Stumpjumper Comp Alloy",
         OfferPrice:"6,499.99",
         OriginalPrice:"11,500.00",
        },

        {img:Img1,
         Name:"S-Works Stumpjumper EVO",
         OfferPrice:"5,499.99",
         OriginalPrice:"10,500.00",
        },

        {img:Img1,
         Name:"Turbo Vado 4.0",
         OfferPrice:"2,749.99",
         OriginalPrice:"4,000.00",
        },
        
        {img:Img1,
         Name:"Turbo Como SL 4.0",
         OfferPrice:"1,799.99",
         OriginalPrice:"3,250.00",
        },

        {img:Img1,
         Name:"Diverge Comp E5",
         OfferPrice:"1,999.99",
         OriginalPrice:"2,500.00",
        },

        {img:Img1,
         Name:"Turbo Vado 4.0 Step-Through",
         OfferPrice:"2,749.99",
         OriginalPrice:"4,000.00",
        },

        {img:Img1,
         Name:"Roubaix Expert",
         OfferPrice:"5,499.99",
         OriginalPrice:"8,000.00",
        },
    ]
  return (   


    <CaroselContainer>

{ ProductList.map((item) => {
          return (
            // image card itmes ProductImg, ProductName, OfferPrice, OriginalPrice
            <NormalProductCard key={item.Name} ProductImg={item.img} ProductName={item.Name} OfferPrice={item.OfferPrice} OriginalPrice={item.OriginalPrice}/>
          );
        }) }
   </CaroselContainer>
  )
}

export default NormalProductSlider
