import React from "react";
import Product_Card from "./Product_Card";
import Img1 from "../../images/BikeImg/BikeImg-4.webp";

const Product_List_Page = () => {
  let ProductList = [
    {
      img: Img1,
      Name: "Stumpjumper Comp Alloy",
      OfferPrice: "6,499.99",
      OriginalPrice: "11,500.00",
    },

    {
      img: Img1,
      Name: "S-Works Stumpjumper EVO",
      OfferPrice: "5,499.99",
      OriginalPrice: "10,500.00",
    },

    {
      img: Img1,
      Name: "Turbo Vado 4.0",
      OfferPrice: "2,749.99",
      OriginalPrice: "4,000.00",
    },

    {
      img: Img1,
      Name: "Turbo Como SL 4.0",
      OfferPrice: "1,799.99",
      OriginalPrice: "3,250.00",
    },

    {
      img: Img1,
      Name: "Diverge Comp E5",
      OfferPrice: "1,999.99",
      OriginalPrice: "2,500.00",
    },

    {
      img: Img1,
      Name: "Turbo Vado 4.0 Step-Through",
      OfferPrice: "2,749.99",
      OriginalPrice: "4,000.00",
    },

    {
      img: Img1,
      Name: "Roubaix Expert",
      OfferPrice: "5,499.99",
      OriginalPrice: "8,000.00",
    },
    {
      img: Img1,
      Name: "Roubaix Expert",
      OfferPrice: "5,499.99",
      OriginalPrice: "8,000.00",
    },
    {
      img: Img1,
      Name: "Roubaix Expert",
      OfferPrice: "5,499.99",
      OriginalPrice: "8,000.00",
    },
  ];
  return (
    <>
    <div className="mt-32 ml-8 lg:mx-20 bg-white">
      <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold ">Bikes</h1>
      <section>
        <p>
        Perfection. It's hard to define, yet easy to recognize. We specialize in the science of perfection, however, and every bike we make embodies it. No matter your motivation or discipline, you'll benefit from our attention to detail and innovative spirit. So whether you're getting dirty on cyclocross bikes, leaving it all on the road, or testing your limits in a triathlon, you can rest assured that the bike underneath you is simply the best.
        </p>
      </section>

      <section className="flex justify-between">
        <button className="md:block hidden md:w-28 w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold rounded-md text-center"><div className="flex justify-start gap-3 p-2"><p>Featured</p> <p className="text-xl text-white font-bold"><ion-icon name="chevron-down-outline"></ion-icon></p></div></button>
        <button className="md:w-48 w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold rounded-md"><div className="flex justify-between mx-4"><p>Filter & sort</p> <p className="text-xl text-white font-bold"><ion-icon name="options-outline"></ion-icon></p></div></button>
      </section>

      </div>

      <div className="grid grid-cols-[repeat[auto-fit,minmax(310px, 1fr)]] gap-5 lg:grid-cols-3 md:grid-cols-2 m-4 mt-16">
        {ProductList.map((item)=>{
            return (
                // image card itmes ProductImg, ProductName, OfferPrice, OriginalPrice
                <Product_Card key={item.Name} ProductImg={item.img} ProductName={item.Name} OfferPrice={item.OfferPrice} OriginalPrice={item.OriginalPrice}/>
              );
        
    }

    )}

      </div>
      </div>
    </>
  );
};
export default Product_List_Page;
