import React, {useState} from "react";
import Saved_Product_Card from "./Saved_Product_Card";

const WishList = () => {
  return (
    <>
      <div className="lg:hidden block mt-16">
        <div className=" bg-stone-100 mt-3 h-44">
          <div className="flex items-center justify-between p-5">
          <div className="flex justify-start mt-3 gap-0 hover:text-red-600">
                    <span className="text-2xl font-light pt-1">
                      <ion-icon name="chevron-back-outline"></ion-icon>
                    </span>
                    <p onClick={goBack} className="text-xl font-light">
                      Black
                    </p>
                  </div>
            <div className="underline font-semibold hover:text-red-600">Sign Out</div>
          </div>
          <div className="text-3xl text-center font-bold mt-7">
          Saved For Later
          </div>
        </div>
      </div>
      <div className="mt-16 m-8 md:m-20 ">
        <div className="">
          <div className="text-3xl font-bold hidden md:block">
            Saved For Later
          </div>
          <div className="grid grid-cols-1 mt-16 gap-8 ">
          <h3 className="block text-gray-950 md:hidden">Your Saved Items (2)</h3>
            <Saved_Product_Card />
            <Saved_Product_Card />
            <Saved_Product_Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
