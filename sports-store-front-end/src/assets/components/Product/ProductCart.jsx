import React from "react";
import Img1 from "../../images/BikeImg/BikeImg-4.webp";

const ProductCart = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-16 md:mx-24 mx-7 relative">
        <div className="md:col-span-3">
          <h2 className="font-bold text-2xl text-black my-10">Cart</h2>
        </div>
        <div className="md:col-span-2 flex flex-col justify-start">
          <div>
            <div className="flex w-full">
              <div className="check w-full">
                <div className="flex gap-5">
                  <div className="w-56 h-56 rounded-md">
                    <img src={Img1} alt="" className="w-full h-full" />
                  </div>
                  <div >
                    <p>Bike Name</p>
                    <p>Part No : 9009142069</p>
                    <p>Colour: Gray</p>
                    <p>Size : XS</p>
                    <p>$2250.00</p>
                    <div className="flex h-[100px] flex-row items-end justify-start gap-3">
                      <div>
                        <button className="w-6 h-6 border-[1px] rounded-md border-gray-800">
                          <ion-icon name="remove-outline"></ion-icon>
                        </button>
                      </div>
                      <div>
                        <p>{1}</p>
                      </div>
                      <div>
                        <button className="w-6 h-6 border-[1px] rounded-md border-gray-800">
                          <ion-icon name="add-outline"></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" pt-3">
                  <div className="flex gap-3">
                    <div className="text-green-400 text-xl font-semibold">
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </div>
                    <div className="text-green-400 font-semibold">in stock</div>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-5 py-3">
                  <button className="w-32 h-10 rounded-lg bg-neutral-800 text-white font-bold hover:bg-neutral-500">
                    Save for Later
                  </button>
                  <div className="underline text-neutral-700 hover:text-neutral-500">
                    Remove
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <hr className="h-[1.5px] bg-gray-600 my-3"/>
          <h3 className="font-bold text-neutral-800 text-xl py-6">Save For Later</h3>

          <div className="check w-full">
                <div className="flex gap-5">
                  <div className="w-56 h-56 rounded-md">
                    <img src={Img1} alt="" className="w-full h-full rounded-md" />
                  </div>
                  <div >
                    <p>Bike Name</p>
                    <p>Part No : 9009142069</p>
                    <p>Colour: Gray</p>
                    <p>Size : XS</p>
                    <p>$2250.00</p>

                    <div className=" pt-3">
                  <div className="flex gap-3">
                    <div className="text-green-400 text-xl font-semibold">
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </div>
                    <div className="text-green-400 font-semibold">in stock</div>
                  </div>
                </div>
    
                  </div>
                </div>

                <div className="flex items-center justify-start gap-5 py-3">
                  <button className="w-32 h-10 rounded-lg bg-neutral-800 text-white font-bold hover:bg-neutral-500">
                    Add To Cart
                  </button>
                  <div className="underline text-neutral-700 hover:text-neutral-500">
                    Remove
                  </div>
                </div>
          </div>
          <hr className="h-[1.5px] bg-gray-600 my-3"/>

          <div className="check w-full">
                <div className="flex gap-5">
                  <div className="w-56 h-56 rounded-md">
                    <img src={Img1} alt="" className="w-full h-full" />
                  </div>
                  <div >
                    <p>Bike Name</p>
                    <p>Part No : 9009142069</p>
                    <p>Colour: Gray</p>
                    <p>Size : XS</p>
                    <p>$2250.00</p>

                    <div className=" pt-3">
                  <div className="flex gap-3">
                    <div className="text-green-400 text-xl font-semibold">
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </div>
                    <div className="text-green-400 font-semibold">in stock</div>
                  </div>
                </div>
    
                  </div>
                </div>

                <div className="flex items-center justify-start gap-5 py-3">
                  <button className="w-32 h-10 rounded-lg bg-neutral-800 text-white font-bold hover:bg-neutral-500">
                    Add To Cart
                  </button>
                  <div className="underline text-neutral-700 hover:text-neutral-500">
                    Remove
                  </div>
                </div>
          </div>
          <hr className="h-[1.5px] bg-gray-600 my-3"/>
          <div className="check w-full">
                <div className="flex gap-5">
                  <div className="w-56 h-56 rounded-md">
                    <img src={Img1} alt="" className="w-full h-full" />
                  </div>
                  <div >
                    <p>Bike Name</p>
                    <p>Part No : 9009142069</p>
                    <p>Colour: Gray</p>
                    <p>Size : XS</p>
                    <p>$2250.00</p>

                    <div className=" pt-3">
                  <div className="flex gap-3">
                    <div className="text-green-400 text-xl font-semibold">
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </div>
                    <div className="text-green-400 font-semibold">in stock</div>
                  </div>
                </div>
    
                  </div>
                </div>

                <div className="flex items-center justify-start gap-5 py-3">
                  <button className="w-32 h-10 rounded-lg bg-neutral-800 text-white font-bold hover:bg-neutral-500">
                    Add To Cart
                  </button>
                  <div className="underline text-neutral-700 hover:text-neutral-500">
                    Remove
                  </div>
                </div>
          </div>
          <hr className="h-[1.5px] bg-gray-600 my-3"/>
          <div className="check w-full">
                <div className="flex gap-5">
                  <div className="w-56 h-56 rounded-md">
                    <img src={Img1} alt="" className="w-full h-full" />
                  </div>
                  <div >
                    <p>Bike Name</p>
                    <p>Part No : 9009142069</p>
                    <p>Colour: Gray</p>
                    <p>Size : XS</p>
                    <p>$2250.00</p>

                    <div className=" pt-3">
                  <div className="flex gap-3">
                    <div className="text-green-400 text-xl font-semibold">
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </div>
                    <div className="text-green-400 font-semibold">in stock</div>
                  </div>
                </div>
    
                  </div>
                </div>

                <div className="flex items-center justify-start gap-5 py-3">
                  <button className="w-32 h-10 rounded-lg bg-neutral-800 text-white font-bold hover:bg-neutral-500">
                    Add To Cart
                  </button>
                  <div className="underline text-neutral-700 hover:text-neutral-500">
                    Remove
                  </div>
                </div>
          </div>
          <hr className="h-[1.75px] bg-gray-600 my-3"/>
        </div>

        <div className=" md:ml-12 sticky top-10 right-0 h-screen md:w-full">
          <div className="p-6 rounded-md bg-stone-400 flex flex-col w-full">
            <div className="text-xl font-bold text-neutral-900 mb-4">
              Order Summary
            </div>
            <div className="flex items-center justify-between mb-3 ">
              <p>Subtotal</p>
              <div className="font-semibold text-neutral-600">$2,250.00</div>
            </div>
            <div className="flex items-center justify-start mb-2">
              <p>Estimated Fees</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p>Pick up in-Store</p>
              <div className="font-semibold text-neutral-600">$50.00</div>
            </div>
            <hr className="h-[1.75px] my-1" />
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-neutral-600 underline underline-offset-2 pt-2 pb-3">
                Estimated Tax
              </div>
              <div>--</div>
            </div>
            <hr className="h-[1.75px] my-1"  />
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-neutral-600 underline underline-offset-2 pt-2 pb-3">
                Coupon Code
              </div>
              <div>--</div>
            </div>
            <hr className="h-[1.75px] my-1"  />
            <div className="flex justify-between items-center">
              <div className="text-xl font-medium text-neutral-600 underline underline-offset-2 pt-4 mb-3">
                Estimated Total
              </div>
              <div className="font-bold">$2,300.00</div>
            </div>
            <div className="text-xs text-neutral-600 mt-1">
              * Shipping is based on flat rate for up to 7 working days
              shipping.
            </div>
          </div>
          <div className="py-5">
            <button className=" bg-neutral-900 text-white font-bold rounded-md w-full h-12">
              Proceed to Checkout
            </button>
          </div>
          <div>
            <div>we Accept</div>
            <div>Paymet details</div>
            <div>Helpful Links</div>
            <div className="underline text-neutral-400">Contact Us</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCart;
