import React from "react";
import Img1 from "../../images/BikeImg/BikeImg-4.webp";

const ProductCart = () => {
  return (
    <>
      <div className="grid grid-cols-3 mt-16 mx-24">
        <div className="col-span-3">
          <h2 className="font-bold text-2xl text-black">Cart</h2>
        </div>
        <div className="col-span-2">
          <div>
            <div className="flex w-full">
              <div className="check w-full">
                <div className="flex">
                  <div className="w-56 h-64 rounded-md">
                    <img src={Img1} alt="" className="w-full h-full" />
                  </div>
                  <div>
                    <p>Bike Name</p>
                    <p>Part No : 9009142069</p>
                    <p>Colour: Gray</p>
                    <p>Size : XS</p>
                    <p>$2250.00</p>
                    <div className="flex flex-row items-end justify-start gap-3">
                      <div>
                        <button className="w-6 h-6 border-2 border-gray-800">
                          <ion-icon name="remove-outline"></ion-icon>
                        </button>
                      </div>
                      <div>
                        <p>{1}</p>
                      </div>
                      <div>
                        <button className="w-6 h-6 border-2 border-gray-800">
                          <ion-icon name="add-outline"></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-3">
                    <div className="text-green-400 text-xl">
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </div>
                    <div className="text-green-400">in stock</div>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <button className="bg-neutral-800 text-white font-bold rounded-sm hover:text-neutral-300">
                    Save for Later
                  </button>
                  <div className="underline text-neutral-700 peer-hover:text-neutral-400">
                    Remove
                  </div>
                </div>
              </div>
              <hr className="h-1" />
            </div>
          </div>
          <div>
            <h3>Save For Later</h3>
          </div>
        </div>
        
        <div>
          <div className="p-6 rounded-md bg-stone-400 flex flex-col">
            <div className="text-xl font-semibold text-neutral-900 mb-3">
              Order Summary
            </div>
            <div className="flex items-center justify-between">
              <p>Subtotal</p>
              <div className="font-semibold text-neutral-600">$2,250.00</div>
            </div>
            <div className="flex items-center justify-start">
              <p>Estimated Fees</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Pick up in-Store</p>
              <div className="font-semibold text-neutral-600">$50.00</div>
            </div>
            <hr className="h-1" />
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-neutral-600 underline underline-offset-2">
                Estimated Tax
              </div>
              <div>--</div>
            </div>
            <hr className="h-1" />
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-neutral-600 underline underline-offset-2">
                Coupon Code
              </div>
              <div>--</div>
            </div>
            <hr className="h-1" />
            <div>
              <div className="text-xl font-medium text-neutral-600 underline underline-offset-2">
                Estimated Total
              </div>
              <div>$2,300.00</div>
            </div>
            <div className="text-xs text-neutral-600">
              * Shipping is based on flat rate for up to 7 working days
              shipping.
            </div>
          </div>
          <div>
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
