import React from "react";
import { Link } from "react-router-dom";

// Placeholder checkout page - shown until real payment is implemented.
const CheckoutPlaceholder = () => {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-6 py-16 text-center">
      <div className="text-5xl leading-none text-neutral-800">
        <ion-icon name="card-outline"></ion-icon>
      </div>
      <h1 className="mt-4 text-3xl font-bold text-neutral-900">Checkout</h1>
      <p className="mt-2 max-w-md text-base text-neutral-600">
        Online payments will be implemented very soon. Your cart is saved -
        please check back later to complete your purchase.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/cart"
          className="flex h-12 items-center rounded-md bg-neutral-900 px-6 font-bold text-white hover:bg-neutral-500"
        >
          Back to Cart
        </Link>
        <Link
          to="/products"
          className="flex h-12 items-center rounded-md border border-neutral-300 bg-white px-6 font-semibold text-neutral-800 hover:border-neutral-900"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPlaceholder;
