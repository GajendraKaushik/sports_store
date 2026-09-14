// UI / Presentation layer — cart page.
//
// Responsibility: render cart + "Save for Later" rows and forward user
// actions to useCart (application layer) which talks to cartApi /
// wishlistApi. Price formatting stays in lib/format.js.
import React from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart.js";
import { formatPrice } from "../../../lib/format.js";

const CartItemCard = ({ item, onUpdateQty, onRemove, onSaveForLater, busy }) => {
  const qtyMinus = () => onUpdateQty(Math.max(1, item.quantity - 1));
  const qtyPlus = () => onUpdateQty(item.quantity + 1);
  return (
    <div className="check w-full">
      <div className="flex gap-5">
        <div className="w-56 h-56 rounded-md">
          {item.imageSnapshot ? (
            <img
              src={item.imageSnapshot}
              alt={item.titleSnapshot}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-stone-100" />
          )}
        </div>
        <div>
          <p>{item.titleSnapshot}</p>
          {item.productId && <p>Part No : {item.productId}</p>}
          {item.selectedSize && <p>Size : {item.selectedSize}</p>}
          <p>{formatPrice(item.unitPriceSnapshot)}</p>
          <div className="flex h-[100px] flex-row items-end justify-start gap-3">
            <div>
              <button
                disabled={busy}
                onClick={qtyMinus}
                className="w-6 h-6 border-[1px] rounded-md border-gray-800"
              >
                <ion-icon name="remove-outline"></ion-icon>
              </button>
            </div>
            <div>
              <p>{item.quantity}</p>
            </div>
            <div>
              <button
                disabled={busy}
                onClick={qtyPlus}
                className="w-6 h-6 border-[1px] rounded-md border-gray-800"
              >
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
        <button
          disabled={busy}
          onClick={onSaveForLater}
          className="w-32 h-10 rounded-lg bg-neutral-800 text-white font-bold hover:bg-neutral-500 disabled:opacity-50"
        >
          Save for Later
        </button>
        <div
          onClick={onRemove}
          className="underline text-neutral-700 hover:text-neutral-500 cursor-pointer"
        >
          Remove
        </div>
      </div>
    </div>
  );
};
const SavedItemCard = ({ item, onAddToCart, onRemove, busy }) => {
  const product = item.product ?? {};
  return (
    <div className="check w-full">
      <div className="flex gap-5">
        <div className="w-56 h-56 rounded-md">
          {product.primaryImage ? (
            <img
              src={product.primaryImage}
              alt={product.title}
              className="w-full h-full rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-stone-100 rounded-md" />
          )}
        </div>
        <div>
          <p>{product.title}</p>
          {product.id && <p>Part No : {product.id}</p>}
          <p>{formatPrice(product.price, product.currency)}</p>

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
        <button
          disabled={busy}
          onClick={onAddToCart}
          className="w-32 h-10 rounded-lg bg-neutral-800 text-white font-bold hover:bg-neutral-500 disabled:opacity-50"
        >
          Add To Cart
        </button>
        <div
          onClick={onRemove}
          className="underline text-neutral-700 hover:text-neutral-500 cursor-pointer"
        >
          Remove
        </div>
      </div>
    </div>
  );
};
const ProductCart = () => {
  const navigate = useNavigate();
  const {
    cart,
    wishlist,
    items,
    loading,
    loadError,
    busy,
    subtotal,
    estimatedTotal,
    pickupFee,
    updateQuantity,
    removeItem,
    saveForLater,
    removeSaved,
    moveSavedToCart,
  } = useCart();

  // Dummy checkout: payment is not enabled yet, so route to the
  // placeholder page instead of placing an order.
  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="bg-white ml-8 pt-6">
        <p>Loading your cart…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-white ml-8 pt-6">
        <p>{loadError?.message ?? "Could not load cart."}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 pt-6 md:mx-24 mx-7 relative">
        <div className="md:col-span-3">
          <h2 className="font-bold text-2xl text-black my-10">Cart</h2>
        </div>
        <div className="md:col-span-2 flex flex-col justify-start">
          <div>
            {items.length ? (
              items.map((item) => (
                <React.Fragment key={item.productId}>
                  <div className="flex w-full">
                    <CartItemCard
                      item={item}
                      busy={busy}
                      onUpdateQty={(q) => updateQuantity(item.productId, q)}
                      onRemove={() => removeItem(item.productId)}
                      onSaveForLater={() => saveForLater(item)}
                    />
                  </div>
                  <hr className="h-[1.5px] bg-gray-600 my-3" />
                </React.Fragment>
              ))
            ) : (
              <p className="text-neutral-600 py-6">
                Your cart is empty.{" "}
                <button
                  className="underline"
                  onClick={() => navigate("/products")}
                >
                  Browse products
                </button>
              </p>
            )}
          </div>
          <h3 className="font-bold text-neutral-800 text-xl py-6">
            Save For Later
          </h3>

          {wishlist.length ? (
            wishlist.map((item) => (
              <React.Fragment key={item.product?.id ?? item.productId}>
                <div className="flex w-full">
                  <SavedItemCard
                    item={item}
                    busy={busy}
                    onAddToCart={() => moveSavedToCart(item)}
                    onRemove={() =>
                      removeSaved(item.product?.id ?? item.productId)
                    }
                  />
                </div>
                <hr className="h-[1.75px] bg-gray-600 my-3" />
              </React.Fragment>
            ))
          ) : (
            <p className="text-neutral-600">Nothing saved yet.</p>
          )}
        </div>

        <div className=" md:ml-12 sticky top-10 right-0 h-screen md:w-full">
          <div className="p-6 rounded-md bg-stone-400 flex flex-col w-full">
            <div className="text-xl font-bold text-neutral-900 mb-4">
              Order Summary
            </div>
            <div className="flex items-center justify-between mb-3 ">
              <p>Subtotal</p>
              <div className="font-semibold text-neutral-600">
                {formatPrice(subtotal)}
              </div>
            </div>
            <div className="flex items-center justify-start mb-2">
              <p>Estimated Fees</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p>Pick up in-Store</p>
              <div className="font-semibold text-neutral-600">
                {formatPrice(pickupFee)}
              </div>
            </div>
            <hr className="h-[1.75px] my-1" />
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-neutral-600 underline underline-offset-2 pt-2 pb-3">
                Estimated Tax
              </div>
              <div>--</div>
            </div>
            <hr className="h-[1.75px] my-1" />
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-neutral-600 underline underline-offset-2 pt-2 pb-3">
                Coupon Code
              </div>
              <div>--</div>
            </div>
            <hr className="h-[1.75px] my-1" />
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
            <button
              disabled={busy || !items.length}
              onClick={handleCheckout}
              className=" bg-neutral-900 text-white font-bold rounded-md w-full h-12 disabled:opacity-50"
            >
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