import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../lib/format.js";

const Product_Card = ({
  title,
  price,
  compareAtPrice,
  currency = "USD",
  primaryImage,
  productSlug,
}) => {
  return (
    <Link to={`/products/${productSlug}`}>
      <div className="w-full h-full bg-white">
        <div className="px-6 py-8 bg-white relative">
          <div className="absolute p-4 left-[75%] font-thin text-sm">2023</div>
          <img
            src={primaryImage}
            alt={title}
            className="w-full h-3/4 rounded-md"
          />
          <div className="flex justify-between flex-col w-full">
            <div className="text-gray-900 text-[1.17em] font-bold my-3">
              {title}
            </div>
            <div className="flex justify-start gap-4">
              <p className="text-gray-950 tex font-medium">
                {formatPrice(price, currency)}
              </p>
              {compareAtPrice ? (
                <p className="text-gray-500 line-through">
                  {formatPrice(compareAtPrice, currency)}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product_Card;
