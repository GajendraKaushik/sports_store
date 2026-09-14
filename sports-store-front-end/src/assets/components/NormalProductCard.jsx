import React from 'react'
import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/format.js";

// Whole card opens the product detail page (/products/:productSlug), same
// pattern as Product_Card on the products list page.
// Rider-Favorites styling: grey square image well + stacked title/price.
const NormalProductCard = ({product, ProductImg}) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className='block w-full bg-white'
    >
      <div className='w-full aspect-square overflow-hidden rounded-xl bg-neutral-100'>
        <img
          src={ProductImg ?? product.primaryImage}
          alt={product.title}
          className='h-full w-full object-contain p-8'
        />
      </div>
      <div className='pt-5 text-left'>
        <div className='text-xl font-bold leading-snug text-neutral-800'>{product.title}</div>
        <div className='mt-2'>
          <p className='text-lg text-neutral-900'>{formatPrice(product.price, product.currency)}</p>
          {product.compareAtPrice ? (
            <p className='text-base text-neutral-500 line-through'>{formatPrice(product.compareAtPrice, product.currency)}</p>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default NormalProductCard;
