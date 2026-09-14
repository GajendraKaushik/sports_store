import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product_Card from "./Product_Card";
import { apiFetch } from "../../../lib/api.js";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "New" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
];

const Product_List_Page = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  const activeSortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? "Featured";

  useEffect(() => {
    if (!sortOpen) return;
    const handlePointerDown = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSortOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sortOpen]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // I02: category tiles on the homepage land here via ?category=<slug>.
    // limit=24 is the API max; the catalog is small enough to page once.
    const params = new URLSearchParams({ limit: "24", sort });
    if (category) params.set("category", category);
    apiFetch(`/products?${params.toString()}`)
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
  }, [category, sort]);

  // Heading follows the active tile filter ("Electric Bikes", "Tires", …).
  const categoryLabel = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";

  return (
    <>
      <div className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex flex-col gap-3 relative z-30">
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

          <section className="flex justify-between relative z-30">
            <div ref={sortRef} className="relative md:block hidden md:w-56 w-full">
              <button
                type="button"
                onClick={() => setSortOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                className="w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold rounded-md text-center"
              >
                <div className="flex justify-between items-center gap-3 px-4">
                  <p className="truncate">Sort By: {activeSortLabel}</p>
                  <p className="text-xl text-white font-bold leading-none">
                    <ion-icon
                      name={sortOpen ? "chevron-up-outline" : "chevron-down-outline"}
                    ></ion-icon>
                  </p>
                </div>
              </button>
              {sortOpen && (
                <div
                  role="listbox"
                  aria-label="Sort products"
                  className="absolute left-0 top-full z-50 w-72 rounded-md bg-white shadow-xl border border-neutral-200 p-5 text-neutral-900"
                >
                  <div className="flex flex-col gap-5">
                    {SORT_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer text-lg"
                      >
                        <input
                          type="radio"
                          name="sort"
                          value={option.value}
                          checked={sort === option.value}
                          onChange={() => {
                            setSort(option.value);
                            setSortOpen(false);
                          }}
                          className="h-5 w-5 accent-neutral-900"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
