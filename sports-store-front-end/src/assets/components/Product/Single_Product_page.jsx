import React from "react";
import BikeImg from "../../images/BikeImg/BikeImg-3.webp";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

const Single_Product_page = () => {
  const [toggleTechInfo, setToggleTechInfo] = useState(true);
  const [getSize, setSize] = useState("");

  const handleChangeSize = (Size) => {
    setSize(Size);
  };

  const handleTechInfoStyle = () => {
    setToggleTechInfo((prevState) => !prevState);
  };

  return (
    <>
      <div className="bg-white mt-28">
        <div className="top-button">
          <div className="flex">
            <button className="flex justify-between items-center w-full h-16 px-4">
              <p>Sirrus X 5.0</p>
              <div className="tex-gray-900 rounded-full">
                <ion-icon name="chevron-down-outline"></ion-icon>
              </div>
              {/* <ion-icon name="chevron-up-outline"></ion-icon> */}
            </button>
          </div>

          <div className="grid grid-cols-3 ">
            <div className="w-full col-span-2">
           <div className="ml-14 ">
              <img src={BikeImg} alt="BikeImg" className="w-full h-[750px] rounded-md "/>
              {/* <img src={BikeImg} alt="BikeImg" className="w-full h-[400px]"/>
              <img src={BikeImg} alt="BikeImg" className="w-full h-[400px]"/>
              <img src={BikeImg} alt="BikeImg" className="w-full h-[400px]"/>
              <img src={BikeImg} alt="BikeImg" className="w-full h-[400px]"/> */}
           </div>
        
            </div>

            <div className="grid grid-cols-1 p-5 gap-y-3 col-span-1">
              <div className="mb-3">
                <div className="flex flex-col">
                  <h1 className="text-black text-2xl font-bold ">
                    Sirrus X 5.0
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {" "}
                    Part No. : 92422-3001
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-start ">
                  <h5 className="text-2xl font-semibold text-black">$2,250</h5>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-start pb-5">
                  {getSize ? `Size : ${getSize}` : "Size a Size"}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleChangeSize("XS")}
                    className="bg-white w-full h-9 text-center border-2 rounded border-gray-400 hover:border-gray-600"
                  >
                    <div>XS</div>
                  </button>
                  <button
                    onClick={() => handleChangeSize("S")}
                    className="bg-white w-full h-9 text-center  border-2 rounded border-gray-400 hover:border-gray-600"
                  >
                    <div>S</div>
                  </button>
                  <button
                    onClick={() => handleChangeSize("XL")}
                    className="bg-white w-full h-9 text-center border-2 rounded border-gray-400 hover:border-gray-600"
                  >
                    <div>XL</div>
                  </button>
                  <button
                    onClick={() => handleChangeSize("M")}
                    className="bg-white w-full h-9 text-center  border-2 rounded border-gray-400 hover:border-gray-600"
                  >
                    <div>M</div>
                  </button>
                  <button
                    onClick={() => handleChangeSize("L")}
                    className="bg-white w-full h-9 text-center border-2 rounded border-gray-400 hover:border-gray-600"
                  >
                    <div>L</div>
                  </button>
                  <button
                    onClick={() => handleChangeSize("XXL")}
                    className="bg-white w-full h-9 text-center border-2 rounded border-gray-400 hover:border-gray-600"
                  >
                    <div>XXL</div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-2">
                  <button className=" bg-neutral-900 text-white font-semibold w-full h-14 rounded-md hover:bg-stone-400">
                    Add To Cart
                  </button>
                </div>
                <div className="mb-2">
                  <button className="bg-white w-full h-14 text-neutral-800 font-medium border-[3px] rounded-md hover:broder-2 hover:border-neutral-900 border-neutral-500 ">
                    Find In-Store
                  </button>
                </div>
              </div>

              <hr className="h-1" />
              <div className="pt-3">
                <div className="flex justify-start gap-3 pb-3">
                  <div className=" text-2xl flex justify-center items-center">
                    <ion-icon name="bag-check-outline"></ion-icon>
                  </div>
                  <span className="text-xl">Express Checkout</span>
                </div>
                <div className="pb-5">
                  By placing an order via Express Checkout, you accept the
                  Specialized{" "}
                  <span className="underline text-neutral-800">
                    {" "}
                    Terms of Use
                  </span>{" "}
                  (updated April 16, 2024) and you acknowledge Specialized will
                  use your information in accordance with its Privacy Policy{" "}
                  <span className="underline text-neutral-800">
                    Privacy Policy
                  </span>
                  .
                </div>

                <div className="grid grid-cols-1 w-full">
                  <button className="bg-white w-full h-14 text-neutral-800 font-medium border-[3px] rounded-md hover:broder-2 hover:border-neutral-900 border-neutral-500 ">
                    Find In-Store
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between">
                  <button className="flex justify-start gap-1 pb-3">
                    <div className="text-2xl flex justify-center items-center ">
                      {" "}
                      <ion-icon name="heart-outline"></ion-icon>
                    </div>
                    <p className="underline decoration-gray-700 underline-offset-1 text-[16px] text-gray-500 font-thin">
                      Save for Later
                    </p>
                  </button>
                  <div>
                    <button className="flex justify-start gap-1 pb-3">
                      <div className="text-2xl flex justify-center items-center">
                        <ion-icon name="star-sharp"></ion-icon>
                      </div>
                      <p className="underline decoration-gray-700 underline-offset-2 text-[16px] text-gray-500 font-thin">
                        Reviews
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-1 mx-5" />
          <div className="data-component">
            <section className="technical specification mx-6 relative">
              <div>
                <div className="heading flex justify-between items-center py-3">
                  <span className="text-2xl font-semibold">
                    Technical Specification
                  </span>
                  <div>
                    <div
                      onClick={handleTechInfoStyle}
                      className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center text-2xl font-bold"
                    >
                      <ion-icon
                        name={toggleTechInfo ? "add" : "remove"}
                      ></ion-icon>
                      {/* <ion-icon name="remove"></ion-icon> */}
                    </div>
                  </div>
                </div>
                {/* transform duration-150 ease-in -translate-y-full absolute -z-10 */}
                <div
                  className={
                    toggleTechInfo
                      ? " transform duration-500 ease-in -translate-y-full absolute -z-10 pt-10"
                      : "details pt-10 "
                  }
                >
                  <div className="flex">
                    <div className="flex flex-col gap-8">
                      <div className="detail_desc ">
                        <div className="col-1">
                          <h4 className="text-xl font-bold">Frameset</h4>
                        </div>
                        <div className="col-2">
                          <div>
                            <p className="detail_sub_heading">Frame</p>
                            <p className="detail_sub_desc">
                              Specialized FACT 9r Carbon, Fitness Geometry, 1x
                              Drivetrain, 12x142 thru-axle, internal cable
                              routing, flat-mount disc, Plug + Play rack/fender
                              mounts
                            </p>
                          </div>
                          <div className="pt-4">
                            <p className="text-gray-900">Seat Binder</p>
                            <p className="text-neutral-600">
                              Integrated w/ frame
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="h-[1.5px] bg-neutral-600" />
                      <div className="detail_desc">
                        <div className="col-1">
                          <h4>Suspension</h4>
                        </div>
                        <div className="col-2">
                          <div>
                            <p className="detail_sub_heading">Fork</p>
                            <p className="detail_sub_desc">
                              Specialized FACT 9r Carbon Monocoque, flat-mount
                              disc, 12x100mm thru-axle, low rider mounts, Plug +
                              Play fender mounts, Future Shock 1.5
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="h-[1.5px] bg-neutral-600" />
                      <div className="detail_desc">
                        <div className="col-1">
                          <h4>Cockpit</h4>
                        </div>
                        <div className="flex flex-col gap-4 col-2">
                          <div>
                            <p className="detail_sub_heading">Saddle</p>
                            <p className="detail_sub_desc">
                              Body Geometry Power Sport, steel rails
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Stem</p>
                            <p className="detail_sub_desc">Future Stem, Comp</p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Tape</p>
                            <p className="detail_sub_desc">
                              Specialized Neutralizer, Body Geometry, locking
                              grip
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Handlebars</p>
                            <p className="detail_sub_desc">
                              Double-butted alloy, 9-degree backsweep, 15mm
                              rise, 31.8mm
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">SeatPost</p>
                            <p className="detail_sub_desc">
                              Alloy, 2-bolt, 14mm offset, 27.2mm
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="h-[1.5px] bg-neutral-600" />
                      <div className="detail_desc">
                        <div className="col-1">
                          <h4>Brakes</h4>
                        </div>
                        <div className="flex flex-col gap-4 col-2">
                          <div>
                            <p className="detail_sub_heading">Front Brake</p>
                            <p className="detail_sub_desc">
                              Tektro HD-R510, hydraulic disc, 160mm
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Rear Brake</p>
                            <p className="detail_sub_desc">
                              Tektro HD-R510, hydraulic disc, 160mm
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="h-[1.5px] bg-neutral-600" />

                      <div className="detail_desc">
                        <div className="col-1">
                          <h4>Drivetrain</h4>
                        </div>
                        <div className="flex flex-col gap-4 col-2">
                          <div>
                            <p className="detail_sub_heading">
                              Rear Derailleur
                            </p>
                            <p className="detail_sub_desc">
                              SRAM NX Eagle, 12-speed
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Shift Levers</p>
                            <p className="detail_sub_desc">
                              SRAM SL NX Eagle Trigger
                            </p>
                          </div>
                          <div>
                            <p>Cassette</p>
                            <p className="detail_sub_desc">
                              SRAM PG-1210 Eagle, 11-50t
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Chain</p>
                            <p className="detail_sub_desc">
                              SRAM NX Eagle, 12-speed
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Crankset</p>
                            <p className="detail_sub_desc">
                              SRAM S650, 3-piece, Powerspline
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Chainrings</p>
                            <p className="detail_sub_desc">38T</p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Bottom Bracket</p>
                            <p className="detail_sub_desc">SRAM Powerspline</p>
                          </div>
                        </div>
                      </div>

                      <hr className="h-[1.5px] bg-neutral-600" />

                      <div className="detail_desc">
                        <div className="col-1">
                          <h4>Wheels &amp; Tires</h4>
                        </div>
                        <div className="flex flex-col gap-4 col-2">
                          <div>
                            <p className="detail_sub_heading">Rims</p>
                            <p className="detail_sub_desc">
                              700C disc, double-wall alloy, 30mm depth, 21mm
                              internal width
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Front Hub</p>
                            <p className="detail_sub_desc">
                              Alloy, sealed cartridge bearings, Center Lock,
                              12x100mm thru-axle, 24h
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Rear Hub</p>
                            <p className="detail_sub_desc">
                              Alloy, sealed cartridge bearings, Center Lock,
                              12x142mm thru-axle, 28h
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Spokes</p>
                            <p className="detail_sub_desc">Stainless, 14g</p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Front Tire</p>
                            <p className="detail_sub_desc">
                              Pathfinder Pro, 2Bliss Ready, 700x38mm
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Rear Tire</p>
                            <p className="detail_sub_desc">
                              Pathfinder Pro, 2Bliss Ready, 700x38mm
                            </p>
                          </div>
                          <div>
                            <p className="detail_sub_heading">Inner Tubes</p>
                            <p className="detail_sub_desc">
                              700x28/38mm, 48mm Presta valve
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="h-[1.5px] bg-neutral-600" />
                      <div className="detail_desc">
                        <div className="col-1">
                          <h4>Accessories</h4>
                        </div>
                        <div className="flex flex-col gap-4 col-2">
                          <div>
                            <p className="detail_sub_heading">Pedals</p>
                            <p className="detail_sub_desc">
                              VP Platform, Alloy Body
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="pt-4 text-neutral-800 mb-8">
                    <span>
                      * Weights based on production painted frames as pictured.
                      Actual weights will vary based on colorway, frame size,
                      and component variation. Specifications are subject to
                      change without notice.
                    </span>
                  </p>
                </div>
              </div>
            </section>
            <hr className="h-1 mx-5" />
            {/* <section className="geometry mx-6 ">
            <div>
            <div className="heading flex justify-between items-center py-3">
                  <span className="text-2xl font-semibold">Geometry</span>
                  <div >
                    <div  className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center text-2xl font-bold">
                      <ion-icon name={true ? "add":"remove"}></ion-icon>

                    </div>
                  </div>
                </div>
              <div></div>
            </div>
            </section> */}
          </div>
        </div>

        <div>
          <div className="flex flex-col ml-6 gap-4 mt-5">
            <h1 className="text-3xl font-medium">Rider Reviews</h1>
            <ul className="flex gap-3 justify-start">
              <li className="text-xl font-[500]">4.4</li>
              <li className="text-xl">
                <ion-icon name="star-sharp"></ion-icon>
                <ion-icon name="star-sharp"></ion-icon>
                <ion-icon name="star-sharp"></ion-icon>
                <ion-icon name="star-sharp"></ion-icon>
                <ion-icon name="star-half-sharp"></ion-icon>
              </li>
              <li className="text-xs mt-1">25 Reviews</li>
            </ul>

            <div className="px-2">
              <div>
                <button className=" bg-neutral-900 text-white font-semibold w-full h-14 rounded-md hover:bg-stone-400">
                  Write a Review
                </button>
              </div>
            </div>
          </div>
          <div className="reviewCard flex flex-row overflow-x-auto mb-5 scroll-m-8 ">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
          {/* <div className="mt-9 ml-6 mb-9">
            <div className="bg-gray-400 full p-7 rounded">
              <div className="flex flex-wrap justify-between mb-3">
                <div className="flex gap-2">
                  <ion-icon name="star-sharp"></ion-icon>
                  <ion-icon name="star-sharp"></ion-icon>
                  <ion-icon name="star-sharp"></ion-icon>
                  <ion-icon name="star-sharp"></ion-icon>
                  <ion-icon name="star-half-sharp"></ion-icon>
                </div>
                <div>03/27/2024</div>
                <h2>Fun, unrestricted, comfortable.</h2>
              </div>
              <div className="mb-5">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam, fugiat eius iusto omnis impedit veniam enim officia
                  quis deleniti inventore.
                </p>
                <button>Read more</button>
              </div>
              <hr className="h-1" />
              <div className="my-3">Name : Mark</div>
              <hr className="h-[2px] bg-gray-700" />
              <div className="flex justify-start gap-2 mt-3">
                <p>Helpful?</p>
                <div>
                  <button className="px-4"><ion-icon name="thumbs-up-outline"></ion-icon> 0</button>
                  <button className="px-4"><ion-icon name="thumbs-down-outline"></ion-icon>0</button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Single_Product_page;
