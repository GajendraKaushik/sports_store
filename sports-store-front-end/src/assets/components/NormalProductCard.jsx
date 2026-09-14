import React from 'react'
import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/format.js";

// Whole card opens the product detail page (/products/:productSlug), same
// pattern as Product_Card on the products list page.
const NormalProductCard = ({product, ProductImg}) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className=' w-full h-[425px] bg-white block'
    >
        <div className='px-3 py-8  bg-white w-full h-full'>
            <img src={ProductImg ?? product.primaryImage} alt={product.title} className='w-full h-3/4 rounded-md object-cover'/>
            <div className='flex justify-between w-full'>
              <div className='text-gray-600'>{product.title}</div>
              <div >
                <p className='text-gray-950'>{formatPrice(product.price, product.currency)}</p>
                {product.compareAtPrice ? (
                  <p className='text-gray-500 line-through'>{formatPrice(product.compareAtPrice, product.currency)}</p>
                ) : null}
              </div>
            </div>
        </div>
    </Link>
  )
}

export default NormalProductCard;
