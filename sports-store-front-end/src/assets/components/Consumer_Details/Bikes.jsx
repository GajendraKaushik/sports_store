import React from "react";
import InfoDetailCard from "./InfoDetailCard";

const BiKes = () => {
  return (
  <>   
     <div className="mb-12">
      <div className="md:hidden block mt-16">
        <div className="pt-4 px-6 pb-px bg-stone-100 mt-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-light">Black</p>
            </div>
            <div className="underline font-semibold">Sign Out</div>
          </div>
          <div className="text-3xl text-center font-bold mb-10">
            Address Book
          </div>
        </div>
      </div>

     <div className="bg-white grid-col-[repeat(1,minmax(min-content, max-content))] ">
      <div className="grid-cols-2 gap-5 hidden md:grid ml-11 mt-36">
        <div className="mx-2 mb-5">
           <div className="text-3xl font-bold">
            Registered Bike
           </div>
        </div>
      </div>

      <div className="m-10"> 
        <div className="flex gap-4 justify-between bg-white shadow-3xl shadow-stone-100 flex-col md:flex-row p-5 rounded-md">
          <header>
            <h6 className="text-xl mb-3 font-semibold">Register a new product</h6>
            <p>Make sure to register your bike before your first ride to activate your lifetime frame warranty.</p>
          </header>
          <button className="md:w-28 h-12 w-full bg-neutral-900 text-white hover:bg-neutral-400 object-cover rounded-md">
            <span className=" hidden md:block">Register</span>
            <span className=" block md:hidden">Register Your Bike</span>
            </button>
        </div>
      </div>

     <InfoDetailCard />

  </div>
  </div>

  </>
)
};

export default BiKes;
