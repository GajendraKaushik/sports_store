import React from "react";

const CostumerDashbord = () => {
  return (
    <>
      <div>
        <div className="w-full mt-28">
          <div className=" flex items-center justify-between">
            <p>My Account</p>
            <a href="">Sign Out</a>
          </div>
          <h3 className="text-center font-extrabold text-3xl">CustomerName</h3>

          <div className="flex justify-center items-center mb-10 ">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5  flex-wrap w-full m-11 md:m-36 lg:m-10">
              <div className=" bg-black min-h-36"></div>
              <div className="min-h-36 bg-black"></div>
              <div className="min-h-36 bg-black"></div>
              <div className="min-h-36 bg-black"></div>
              <div className="min-h-36 bg-black"></div>
              <div className="min-h-36 bg-black"></div>
              <div className="min-h-36 bg-black"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// 2 col
// 640 2 col 
// 768 3 col 
//1024
//1268
//1500

export default CostumerDashbord;
