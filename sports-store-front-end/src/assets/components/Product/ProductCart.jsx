import React from "react";
import { mockCartItems, mockSavedForLaterItems } from "./cart.mock";

const formatPrice = (value) =>
  `$${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const CartItemCard = ({ item }) => {
  return (
    <div className="check w-full">
      <div className="flex gap-5">
        <div className="w-56 h-56 rounded-md">
          <img src={item.image} alt={item.name} className="w-full h-full" />
        </div>
        <div>
          <p>{item.name}</p>
          <p>Part No : {item.partNo}</p>
          <p>Colour: {item.colour}</p>
          <p>Size : {item.size}</p>
          <p>{formatPrice(item.price)}</p>
          <div className="flex h-[100px] flex-row items-end justify-start gap-3">
            <div>
              <button className="w-6 h-6 border-[1px] rounded-md border-gray-800">
                <ion-icon name="remove-outline"></ion-icon>
              </button>
            </div>
            <div>
              <p>{item.quantity}</p>
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
          <div className="text-green-400 font-semibold">
            {item.inStock ? "in stock" : "out of stock"}
          </div>
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
  );
};

const SavedForLaterCard = ({ item }) => {
  return (
    <div className="check w-full">
      <div className="flex gap-5">
        <div className="w-56 h-56 rounded-md">
          <img src={item.image} alt={item.name} className="w-full h-full rounded-md" />
        </div>
        <div>
          <p>{item.name}</p>
          <p>Part No : {item.partNo}</p>
          <p>Colour: {item.colour}</p>
          <p>Size : {item.size}</p>
          <p>{formatPrice(item.price)}</p>

          <div className=" pt-3">
            <div className="flex gap-3">
              <div className="text-green-400 text-xl font-semibold">
                <ion-icon name="checkmark-outline"></ion-icon>
              </div>
              <div className="text-green-400 font-semibold">
                {item.inStock ? "in stock" : "out of stock"}
              </div>
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
  );
};

const ProductCart = () => {
  const subtotal = mockCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const pickupFee = 50;
  const estimatedTotal = subtotal + pickupFee;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-16 md:mx-24 mx-7 relative">
        <div className="md:col-span-3">
          <h2 className="font-bold text-2xl text-black my-10">Cart</h2>
        </div>
        <div className="md:col-span-2 flex flex-col justify-start">
          <div>
            {mockCartItems.map((item) => (
              <React.Fragment key={item.id}>
                <div className="flex w-full">
                  <CartItemCard item={item} />
                </div>
                <hr className="h-[1.5px] bg-gray-600 my-3" />
              </React.Fragment>
            ))}
          </div>
          <h3 className="font-bold text-neutral-800 text-xl py-6">Save For Later</h3>

          {mockSavedForLaterItems.map((item) => (
            <React.Fragment key={item.id}>
              <SavedForLaterCard item={item} />
              <hr className="h-[1.75px] bg-gray-600 my-3" />
            </React.Fragment>
          ))}
        </div>

        <div className=" md:ml-12 sticky top-10 right-0 h-screen md:w-full">
          <div className="p-6 rounded-md bg-stone-400 flex flex-col w-full">
            <div className="text-xl font-bold text-neutral-900 mb-4">
              Order Summary
            </div>
            <div className="flex items-center justify-between mb-3 ">
              <p>Subtotal</p>
              <div className="font-semibold text-neutral-600">{formatPrice(subtotal)}</div>
            </div>
            <div className="flex items-center justify-start mb-2">
              <p>Estimated Fees</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p>Pick up in-Store</p>
              <div className="font-semibold text-neutral-600">{formatPrice(pickupFee)}</div>
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
              <div className="font-bold">{formatPrice(estimatedTotal)}</div>
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
