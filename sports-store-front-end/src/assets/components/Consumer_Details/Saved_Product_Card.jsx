import React from "react";
import savedBike from "../../images/BikeImg/BikeImg-3.webp";
import { formatPrice } from "../../../lib/format.js";

// I08: renders one wishlist item (item.product from GET /account/wishlist)
const Saved_Product_Card = ({ item, onAddToCart, onRemove }) => {
  const product = item?.product ?? {};
  const title = product.title ?? "Product";
  const inStock = product.status === "active";

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-3xl rounded-lg p-6 gap-5">
      <div className="h-full flex justify-center items-center">
        <img
          src={product.primaryImage ?? savedBike}
          alt={title}
          className="max-w-full w-64  md:w-44 h-full"
        />
      </div>
      <div className="flex flex-col justify-start gap-3 w-full">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-xs">
          <div className="flex flex-row gap-3 ">
            {product.compareAtPrice ? (
              <div className="line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </div>
            ) : null}
            <div>{formatPrice(product.price, product.currency)}</div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className={`text-xl ${inStock ? "text-green-400" : "text-red-400"}`}>
            <ion-icon
              name={inStock ? "checkmark-outline" : "close-outline"}
            ></ion-icon>
          </div>
          <div className={inStock ? "text-green-400" : "text-red-400"}>
            {inStock ? "in stock" : "unavailable"}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end justify-between gap-5">
        <button
          onClick={onAddToCart}
          className="text-center border-[1px] hover:border-[3px] w-full md:w-28 h-12 rounded-md border-gray-500 hover:border-gray-900 bg-white text-gray-800"
        >
          Add To Cart
        </button>
        <button
          onClick={onRemove}
          className="underline border-gray-800 font-semibold hover:text-red-600 cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Saved_Product_Card;
