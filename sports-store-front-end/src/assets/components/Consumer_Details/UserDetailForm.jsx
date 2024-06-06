import React, { useState } from "react";

const UserDetailForm = () => {

  const [close, setClose] = useState(false)

  return (
    <>
      <div className={`relative transform duration-200 ease-in`}>
        <div className="bg-white absolute w-full  flex flex-col  jus right-0">
          <div>
            <div className="flex flex-nowrap justify-end absolute top-3 right-6 w-full">
              <div className="bg-white flex justify-center items-center w-12 h-12 rounded ">
                <div>
                  <div className="flex justify-center items-center text-3xl">
                  <ion-icon name="close-outline"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 pt-12">
            <div className="flex">
          <div className="flex w-full sm:mx-16  md:mx-auto ">
            <form action="" className="mt-2">
              <div className=" flex flex-col gap-5">
                <h1 className="flex justify-center text-3xl font-bold py-8">Edit Rider Profile</h1>
                  <div className="flex-wrap flex justify-between">
                    <div className="relative  basis-[47%]">
                      <input
                        type="text"
                        id="myInput"
                        required
                        className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                      />
                      <span
                        htmlFor="myInput"
                        className="floating-lable absolute left-3 top-3 text-gray-500"
                      >
                        First Name
                      </span>
                    </div>
                    <div className="relative basis-[47%]">
                      <input
                        type="text"
                        id="myInput"
                        required
                        className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                      />
                      <span
                        htmlFor="myInput"
                        className="floating-lable absolute left-3 top-3 text-gray-500"
                      >
                        Last Name
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        id="myInput"
                        required
                        className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                      />
                      <span
                        htmlFor="myInput"
                        className="floating-lable absolute left-3 top-3 text-gray-500"
                      >
                        Email
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        id="myInput"
                        required
                        className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                      />
                      <span
                        htmlFor="myInput"
                        className="floating-lable absolute left-3 top-3 text-gray-500"
                      >
                        Phone Number
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                      <input
                        type="date"
                        id="myInput"
                        required
                        className="input-field h-[50px] w-1/2 p-3 rounded-md border-slate-400 border-2 "
                      />
                      <span
                        htmlFor="myInput"
                        className="floating-lable absolute left-3 top-3 text-gray-500"
                      >
                        Birthday
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id="myInput"
                        required
                        className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                      />
                      <span
                        htmlFor="myInput"
                        className="floating-lable absolute left-3 top-3 text-gray-500"
                      >
                        Country
                      </span>
                    </div>

                    <div className="flex flex-wrap justify-between">
                      <div className="relative basis-[47%]">
                        <input
                          type="email"
                          id="myInput"
                          required
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                        />
                        <span
                          htmlFor="myInput"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          City
                        </span>
                      </div>
                      <div className="relative basis-[47%]">
                        <input
                          type="email"
                          id="myInput"
                          required
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                        />
                        <span
                          htmlFor="myInput"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          State/Province
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-start gap-3 mr-8 gap-3">
                      <input
                        type="checkbox"
                        name="Accept"
                        id=""
                        required
                        className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                      />
                      <div className="text-xl text-gray-600 font-light">
                        Keep Me Informed Of Specialized News, Events And Product
                        Information
                      </div>
                    </div>

                    <div>
                      <h3 className="pt-5">Riding Style(s)</h3>
                      <div className="flex mt-5 ml-3">
                      <div className="flex flex-col ">
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800 rounded-lg"
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Mountain
                          </div>
                        </div>
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Road
                          </div>
                        </div>
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Fitness
                          </div>
                        </div>
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Adventure/Bike Packing
                          </div>
                        </div>
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Dirt/Park
                          </div>
                        </div>
                        </div>


                        <div> 
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Cyclocross
                          </div>
                        </div>
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Casual/Commute
                          </div>
                        </div>
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Downhill
                          </div>
                        </div>
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Triathon
                          </div>
                        </div>
                        <div className="flex justify-start gap-3 mr-8">
                          <input
                            type="checkbox"
                            name="Accept"
                            id=""
                            required
                            className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800 "
                          />
                          <div className="text-xl text-gray-600 font-light">
                            Pedal Assist
                          </div>
                        </div>
                        </div>

                       
                      </div>
                    </div>

                    <div className="flex justify-between mt-10">
                      <div>
                        <button className="h-12 w-48 bg-neutral-700 text-white rounded font-bold ">
                          {" "}
                          Save Changes
                        </button>
                      </div>
                      <div className="underline text-neutral-800 font-semibold">Cancel</div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailForm;
