import React from "react";
import BikeImg from "../../images/BikeImg/BikeImg-3.webp";

const Single_Product_page = () => {
  return (
    <>
      <div className="bg-white mt-28">
        <div className="top-button">
          <div className="flex">
            <button className="flex justify-between w-full">
              <p>Sirrus X 5.0</p>
              <div className="tex-gray-900 w-5 h-5 rounded-full">
                <ion-icon name="chevron-down-outline"></ion-icon>
              </div>
              {/* <ion-icon name="chevron-up-outline"></ion-icon> */}
            </button>
          </div>

          <div className="w-full">
            <img src={BikeImg} alt="BikeImg" />
          </div>

          <div className="grid grid-cols-1 p-5 gap-y-3">
            <div className="mb-3">
              <div className="flex flex-col">
                <h1 className="text-black text-2xl font-bold ">Sirrus X 5.0</h1>
                <p className="text-gray-400 text-sm"> Part No. : 92422-3001</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-start ">
                <h5 className="text-2xl font-semibold text-black">$2,250</h5>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-start pb-5">Size: XS</div>
              <div className="grid grid-cols-3 gap-4">
                <button className="bg-white w-full h-9 text-center border-2 rounded border-gray-600">
                  <div >XS</div>
                </button>
                <button className="bg-white w-full h-9 text-center  border-2 rounded border-gray-600">
                  <div>XS</div>
                </button>
                <button className="bg-white w-full h-9 text-center border-2 rounded border-gray-600">
                  <div>XS</div>
                </button>
                <button className="bg-white w-full h-9 text-center  border-2 rounded border-gray-600">
                  <div>XS</div>
                </button>
                <button className="bg-white w-full h-9 text-center border-2 rounded border-gray-600">
                  <div>XS</div>
                </button>
                <button className="bg-white w-full h-9 text-center border-2 rounded border-gray-600">
                  <div>XS</div>
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
                  <div className="text-2xl flex justify-center items-center pt-2">
                    {" "}
                    <ion-icon name="heart-outline"></ion-icon>
                  </div>
                  <p className="underline underline-offset-1 text-[21px]">Save for Later</p>
                </button>
                <div>
                  <button className="flex justify-start gap-1 pb-3">
                    <div className="text-2xl flex justify-center items-center pt-1">
                      <ion-icon name="star-sharp"></ion-icon>
                    </div>
                    <p className="underline underline-offset-2 text-[21px]">Reviews</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="data-component">
            <section className="technical specification">
              <div>
                <div className="heading ">
                  <span>Technical Specification</span>
                  <div>
                    <div className="w-8 h-8 rounded-full">
                      <ion-icon name="add"></ion-icon>
                      {/* <ion-icon name="remove"></ion-icon> */}
                    </div>
                  </div>
                </div>
                <div className="details">
                  <div className="flex">
                    <div>
                      <div>
                        <div>
                          <h4>Frameset</h4>
                        </div>
                        <div>
                          <div>
                            <p>Frame</p>
                            <p>
                              Specialized FACT 9r Carbon, Fitness Geometry, 1x
                              Drivetrain, 12x142 thru-axle, internal cable
                              routing, flat-mount disc, Plug + Play rack/fender
                              mounts
                            </p>
                          </div>
                          <div>
                            <p>Seat Binder</p>
                            <p>Integrated w/ frame</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h4>Suspension</h4>
                        </div>
                        <div>
                          <div>
                            <p>Fork</p>
                            <p>
                              Specialized FACT 9r Carbon Monocoque, flat-mount
                              disc, 12x100mm thru-axle, low rider mounts, Plug +
                              Play fender mounts, Future Shock 1.5
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h4>Cockpit</h4>
                        </div>
                        <div>
                          <div>
                            <p>Saddle</p>
                            <p>Body Geometry Power Sport, steel rails</p>
                          </div>
                          <div>
                            <p>Stem</p>
                            <p>Future Stem, Comp</p>
                          </div>
                          <div>
                            <p>Tape</p>
                            <p>
                              Specialized Neutralizer, Body Geometry, locking
                              grip
                            </p>
                          </div>
                          <div>
                            <p>Handlebars</p>
                            <p>
                              Double-butted alloy, 9-degree backsweep, 15mm
                              rise, 31.8mm
                            </p>
                          </div>
                          <div>
                            <p>SeatPost</p>
                            <p>Alloy, 2-bolt, 14mm offset, 27.2mm</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h4>Brakes</h4>
                        </div>
                        <div>
                          <div>
                            <p>Front Brake</p>
                            <p>Tektro HD-R510, hydraulic disc, 160mm</p>
                          </div>
                          <div>
                            <p>Rear Brake</p>
                            <p>Tektro HD-R510, hydraulic disc, 160mm</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h4>Drivetrain</h4>
                        </div>
                        <div>
                          <div>
                            <p>Rear Derailleur</p>
                            <p>SRAM NX Eagle, 12-speed</p>
                          </div>
                          <div>
                            <p>Shift Levers</p>
                            <p>SRAM SL NX Eagle Trigger</p>
                          </div>
                          <div>
                            <p>Cassette</p>
                            <p>SRAM PG-1210 Eagle, 11-50t</p>
                          </div>
                          <div>
                            <p>Chain</p>
                            <p>SRAM NX Eagle, 12-speed</p>
                          </div>
                          <div>
                            <p>Crankset</p>
                            <p>SRAM S650, 3-piece, Powerspline</p>
                          </div>
                          <div>
                            <p>Chainrings</p>
                            <p>38T</p>
                          </div>
                          <div>
                            <p>Bottom Bracket</p>
                            <p>SRAM Powerspline</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h4>Wheels &amp; Tires</h4>
                        </div>
                        <div>
                          <div>
                            <p>Rims</p>
                            <p>
                              700C disc, double-wall alloy, 30mm depth, 21mm
                              internal width
                            </p>
                          </div>
                          <div>
                            <p>Front Hub</p>
                            <p>
                              Alloy, sealed cartridge bearings, Center Lock,
                              12x100mm thru-axle, 24h
                            </p>
                          </div>
                          <div>
                            <p>Rear Hub</p>
                            <p>
                              Alloy, sealed cartridge bearings, Center Lock,
                              12x142mm thru-axle, 28h
                            </p>
                          </div>
                          <div>
                            <p>Spokes</p>
                            <p>Stainless, 14g</p>
                          </div>
                          <div>
                            <p>Front Tire</p>
                            <p>Pathfinder Pro, 2Bliss Ready, 700x38mm</p>
                          </div>
                          <div>
                            <p>Rear Tire</p>
                            <p>Pathfinder Pro, 2Bliss Ready, 700x38mm</p>
                          </div>
                          <div>
                            <p>Inner Tubes</p>
                            <p>700x28/38mm, 48mm Presta valve</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h4>Accessories</h4>
                        </div>
                        <div>
                          <div>
                            <p>Pedals</p>
                            <p>VP Platform, Alloy Body</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>
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
            <section className="geometry"></section>
          </div>
        </div>

    <div>
        <div className="flex">
         <h1>Rider Reviews</h1>   
        </div>
        <div></div>
    </div>
      </div>
    </>
  );
};

export default Single_Product_page;
