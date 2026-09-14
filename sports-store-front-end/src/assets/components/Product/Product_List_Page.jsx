import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product_Card from "./Product_Card";
import { apiFetch } from "../../../lib/api.js";

const Product_List_Page = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // I02: category tiles on the homepage land here via ?category=<slug>.
    // limit=24 is the API max; the catalog is small enough to page once.
    const query = category ? `?category=${encodeURIComponent(category)}&limit=24` : "?limit=24";
    apiFetch(`/products${query}`)
      .then((data) => {
        if (!cancelled) setProducts(data?.items ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  // Heading follows the active tile filter ("Electric Bikes", "Tires", …).
  const categoryLabel = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";

  return (
    <>
      <div className="mt-32 ml-8 lg:mx-20 bg-white ">
        <div className="flex flex-col gap-3 relative">
          <h1 className="text-2xl font-bold ">{categoryLabel}</h1>
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

          <section className="flex justify-between sticky">
            <button className="md:block hidden md:w-28 w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold rounded-md text-center">
              <div className="flex justify-start gap-3 p-2">
                <p>Featured</p>{" "}
                <p className="text-xl text-white font-bold">
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </p>
              </div>
            </button>
            <button className="md:w-48 w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold rounded-md">
              <div className="flex justify-between mx-4">
                <p>Filter & sort</p>{" "}
                <p className="text-xl text-white font-bold">
                  <ion-icon name="options-outline"></ion-icon>
                </p>
              </div>
            </button>
          </section>
        </div>

        {loading && <p className="m-4">Loading products…</p>}

        {!loading && error && (
          <p className="m-4 text-red-600">
            Could not load products: {error.message}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="m-4">No products found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-4 mt-16">
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
    </>
  );
};
export default Product_List_Page;
