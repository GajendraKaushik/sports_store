import React, { useState, useRef } from "react";

const UserDetailForm = ({ onClose, handleUserInfo, userInfo }) => {
  const [inputValue, setInputValue] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const acquisitionChannel = fd.getAll("Ridjing_Styles");
    data.Ridjing_Styles = acquisitionChannel;

    console.log(data, "data");
    handleUserInfo(data);
    event.target.reset();
  };

  return (
    <>
      <div className="w-full fixed z-1010 opacity-100">
        <div className="fixed p-2 overflow-hidden w-full md:w-[555px] h-full">
          <div className="flex justify-end">
            <div className=" p-4 flex w-auto flex-nowrap justify-end">
              <div className="bg-gray-300 flex justify-center items-center w-12 h-12 rounded relative">
                <div>
                  <div
                    onClick={onClose}
                    className="flex justify-center items-center text-3xl"
                  >
                    <ion-icon name="close-outline"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full overflow-y-scroll scroll-smooth flex flex-col">
            <div className="flex mb-20 mr-8">
              <div className="flex ">
                <form onSubmit={handleSubmit} className="mt-2">
                  <div className=" flex flex-col gap-5">
                    <h1 className="flex justify-center text-3xl font-bold pb-8">
                      Edit Rider Profile
                    </h1>
                    <div className="flex-wrap flex justify-between">
                      <div className="relative  basis-[47%]">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          // value={userInfo && userInfo.name}

                          required
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2  text-gray-500 focus:border-neutral-800"
                        />
                        <span
                          htmlFor="name"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          First Name
                        </span>
                      </div>
                      <div className="relative basis-[47%]">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          // value={userInfo && "Kaushik"}
                          required
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 text-gray-500"
                        />
                        <span
                          htmlFor="lastName"
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
                          id="email"
                          name="email"
                          // value={userInfo && userInfo.email}
                          required
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 text-gray-500"
                        />
                        <span
                          htmlFor="email"
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
                          id="PhoneNumber"
                          name="PhoneNumber"
                          // value={userInfo && userInfo.PhoneNumber}
                          required
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 text-gray-500 "
                        />
                        <span
                          htmlFor="PhoneNumber"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          Phone Number
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="date"
                        id="dod"
                        name="dod"
                        // value={userInfo && userInfo.dob}
                        required
                        className="input-field h-[50px] w-1/2 p-3 rounded-md border-slate-400 border-2 text-gray-500 "
                      />
                      <span
                        htmlFor="bod"
                        className="floating-lable absolute left-3 top-3 text-gray-500"
                      >
                        Birthday
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id="country"
                        name="country"
                        // value={userInfo && userInfo.country}
                        required
                        className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 text-gray-500"
                      />
                      <span
                        htmlFor="country"
                        className="floating-lable absolute left-3 top-3 text-gray-500"
                      >
                        Country
                      </span>
                    </div>

                    <div className="flex flex-wrap justify-between">
                      <div className="relative basis-[47%]">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          // value={userInfo && userInfo.city}
                          required
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 text-gray-500"
                        />
                        <span
                          htmlFor="city"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          City
                        </span>
                      </div>
                      <div className="relative basis-[47%]">
                        <input
                          type="text"
                          id="state"
                          name="state"
                          // value={userInfo && userInfo.state}
                          required
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 text-gray-500"
                        />
                        <span
                          htmlFor="state"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          State/Province
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-start mr-8 gap-3">
                      <input
                        type="checkbox"
                        name="Ridjing_Styles"
                        value="keep_info"
                        id=""
                        className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md ml-2"
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
                              name="Ridjing_Styles"
                              value="Mountain"
                              // defaultChecked={userInfo.Ridjing_Styles && "Mountain" in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md"
                            />
                            <div className="text-xl text-gray-600 font-light">
                              Mountain
                            </div>
                          </div>
                          <div className="flex justify-start gap-3 mr-8">
                            <input
                              type="checkbox"
                              name="Ridjing_Styles"
                              value="Road"
                              // defaultChecked={userInfo.Ridjing_Styles && "Road" in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md"
                            />
                            <div className="text-xl text-gray-600 font-light">
                              Road
                            </div>
                          </div>
                          <div className="flex justify-start gap-3 mr-8">
                            <input
                              type="checkbox"
                              name="Ridjing_Styles"
                              value="Fitness"
                              // defaultChecked={userInfo.Ridjing_Styles && "Fitness" in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md"
                            />
                            <div className="text-xl text-gray-600 font-light">
                              Fitness
                            </div>
                          </div>
                          <div className="flex justify-start gap-3 mr-8">
                            <input
                              type="checkbox"
                              name="Ridjing_Styles"
                              value="Adventure/Bike Packing"
                              // defaultChecked={userInfo.Ridjing_Styles && value in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md"
                            />
                            <div className="text-xl text-gray-600 font-light">
                              Adventure/Bike Packing
                            </div>
                          </div>
                          <div className="flex justify-start gap-3 mr-8">
                            <input
                              type="checkbox"
                              name="Ridjing_Styles"
                              value="Dirt/Park"
                              // defaultChecked={userInfo.Ridjing_Styles && value in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md"
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
                              name="Ridjing_Styles"
                              value="Cyclocross"
                              // defaultChecked={userInfo.Ridjing_Styles && value in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md"
                            />
                            <div className="text-xl text-gray-600 font-light">
                              Cyclocross
                            </div>
                          </div>
                          <div className="flex justify-start gap-3 mr-8">
                            <input
                              type="checkbox"
                              name="Ridjing_Styles"
                              value="Casual/Commute"
                              // defaultChecked={userInfo.Ridjing_Styles && value in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md"
                            />
                            <div className="text-xl text-gray-600 font-light">
                              Casual/Commute
                            </div>
                          </div>
                          <div className="flex justify-start gap-3 mr-8">
                            <input
                              type="checkbox"
                              name="Ridjing_Styles"
                              value="Downhill"
                              // defaultChecked={userInfo.Ridjing_Styles && value in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md"
                            />
                            <div className="text-xl text-gray-600 font-light">
                              Downhill
                            </div>
                          </div>
                          <div className="flex justify-start gap-3 mr-8">
                            <input
                              type="checkbox"
                              name="Ridjing_Styles"
                              value="Triathon"
                              // defaultChecked={userInfo.Ridjing_Styles && value in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-800 border-[1.5px] mt-2 accent-neutral-800 rounded-md"
                            />
                            <div className="text-xl text-gray-600 font-light">
                              Triathon
                            </div>
                          </div>
                          <div className="flex justify-start gap-3 mr-8">
                            <input
                              type="checkbox"
                              name="Ridjing_Styles"
                              value="Pedal Assist"
                              // defaultChecked={userInfo.Ridjing_Styles && value in userInfo.Ridjing_Styles}

                              className="w-6 h-6 border-slate-600 border-[1.5px] mt-2 accent-neutral-800 rounded-md "
                            />
                            <div className="text-xl text-gray-600 font-light">
                              Pedal Assist
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between my-10">
                      <div>
                        <button
                          type="submit"
                          className="h-12 w-48 bg-neutral-700 text-white rounded font-bold "
                        >
                          {" "}
                          Save Changes
                        </button>
                      </div>
                      <button
                        type="reset"
                        onClick={onClose}
                        className="underline text-neutral-800 font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
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
