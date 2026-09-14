import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product_Card from "./Product_Card";
import Product_Sort from "./Product_Sort";
import Product_Filters from "./Product_Filters";
import { useProductList, useProductFacets } from "../../../hooks/useProducts.js";
import { EMPTY_FILTERS, getCategoryHeading } from "../../../services/productService.js";

// UI / Presentation layer for /products.
//
// Responsibility: render the catalog + toolbar. All data fetching lives in
// useProductList / useProductFacets (application layer), filter + sort UI
// lives in Product_Filters / Product_Sort, and query building + heading
// rules live in productService. This component only owns UI state (sort
// value, checked filter boxes) and coordinates the pieces.
const Product_List_Page = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const [sort, setSort] = useState("");
  const [selected, setSelected] = useState({ ...EMPTY_FILTERS });

  const { products, loading, error } = useProductList({ sort, category, selected });
  const { facets } = useProductFacets(category);
  const heading = getCategoryHeading(category);

  return (
    <>
      <div className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col gap-3 relative z-30">
            <h1 className="text-2xl font-bold ">{heading}</h1>
            <section>
              <p>
                Perfection. It's hard to define, yet easy to recognize. We
                specialize in the science of perfection, however, and every bike
                we make embodies it. No matter your motivation or discipline,
                you'll benefit from our attention to detail and innovative spirit.
                So whether you're getting dirty on cyclocross bikes, leaving it
                all on the road, or testing your limits in a triathlon, you can
                rest assured that the bike underneath you is simply the best.
              </p>
            </section>

            <section className="flex justify-between relative z-30">
              <Product_Sort value={sort} onChange={setSort} className="relative md:block hidden md:w-56 w-full" />
              <Product_Filters facets={facets} value={selected} onChange={setSelected} />
            </section>
          </div>

          {loading && <p className="mt-10">Loading products…</p>}

          {!loading && error && (
            <p className="mt-10 text-red-600">
              Could not load products: {error.message}
            </p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="mt-10">No products found.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 relative z-0">
            {products.map((item) => (
              <Product_Card
                key={item.id}
                title={item.title}
                price={item.price}
                compareAtPrice={item.compareAtPrice}
                currency={item.currency}
                primaryImage={item.primaryImage}
                productSlug={item.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_List_Page;