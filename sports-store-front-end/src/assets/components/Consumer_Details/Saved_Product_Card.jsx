import React from "react";
import savedBike from "../../images/BikeImg/BikeImg-3.webp";

const Saved_Product_Card = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-3xl rounded-lg p-6 gap-5">
      <div className="h-full flex justify-center items-center">
        <img
          src={savedBike}
          alt="Bike-img"
          className="max-w-full w-64  md:w-44 h-full"
        />
      </div>
      <div className="flex flex-col justify-start gap-3 w-full">
        <h3 className="font-semibold">Diverge Expert Carbon</h3>
        <p className="text-xs">
          Part No. 95423-3052
          <br />
          GLOSS DUNE WHITE/TAUPE
          <br />
          52
          <br />
          <div className="flex flex-row gap-3 ">
            <div className="line-through">$ 8000</div>
            <div>$ 6000</div>
          </div>
        </p>
        <div className="flex gap-3">
          <div className="text-green-400 text-xl">
            <ion-icon name="checkmark-outline"></ion-icon>
          </div>
          <div className="text-green-400">in stock</div>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end justify-between gap-5">
        <button className="text-center border-[1px] hover:border-[3px] w-full md:w-28 h-12 rounded-md border-gray-500 hover:border-gray-900 bg-white text-gray-800">
          Add To Cart
        </button>
        <a className="underline border-gray-800 font-semibold hover:text-red-600">
          Remov
        </a>
      </div>
    </div>
  );
};

export default Saved_Product_Card;
