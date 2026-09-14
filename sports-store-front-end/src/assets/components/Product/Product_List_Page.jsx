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

const FilterSection = ({
  section,
  isOpen,
  expanded,
  onToggle,
  onToggleMore,
  checkboxList,
  pillList,
}) => {
  const visibleOptions =
    section.visibleLimit && !expanded
      ? section.options.slice(0, section.visibleLimit)
      : section.options;
  return (
    <div className="border-t border-neutral-200 py-4 first:border-t-0 first:pt-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-lg font-bold">{section.title}</span>
        <span className="text-xl leading-none">
          <ion-icon
            name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          ></ion-icon>
        </span>
      </button>
      {isOpen && (
        <div className="pt-4">
          {section.options.length === 0 ? (
            <p className="text-sm text-neutral-500">No options yet.</p>
          ) : section.variant === "pills" ? (
            pillList(section, visibleOptions)
          ) : (
            checkboxList(section, visibleOptions)
          )}
          {section.visibleLimit &&
            section.options.length > section.visibleLimit && (
              <button
                type="button"
                onClick={onToggleMore}
                className="mt-4 text-base font-normal text-neutral-800 underline"
              >
                {expanded ? "Show Less" : "Show More"}
              </button>
            )}
        </div>
      )}
    </div>
  );
};

const Product_List_Page = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const [facets, setFacets] = useState(null);
  const [openSections, setOpenSections] = useState({ Category: true });
  const [showMore, setShowMore] = useState({});
  const [selected, setSelected] = useState({
    categories: [],
    groups: [],
    sizes: [],
    families: [],
    collections: [],
    priceRanges: [],
  });

  const activeSortOption = SORT_OPTIONS.find(
    (option) => option.value === sort,
  );

  useEffect(() => {
    if (!sortOpen && !filterOpen) return;
    const handlePointerDown = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSortOpen(false);
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sortOpen, filterOpen]);

  // Live option counts for the filter panel, scoped to the ?category= tile.
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    const qs = params.toString();
    apiFetch(`/products/facets${qs ? `?${qs}` : ""}`)
      .then((data) => {
        if (data?.facets) setFacets(data.facets);
      })
      .catch(() => {});
  }, [category]);

  const toggleSelected = (key, value) => {
    setSelected((prev) => {
      const list = prev[key] ?? [];
      return {
        ...prev,
        [key]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const activeFilterCount = Object.values(selected).reduce(
    (sum, list) => sum + list.length,
    0,
  );

  const clearFilters = () => {
    setSelected({
      categories: [],
      groups: [],
      sizes: [],
      families: [],
      collections: [],
      priceRanges: [],
    });
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // I02: category tiles on the homepage land here via ?category=<slug>.
    // limit=24 is the API max; the catalog is small enough to page once.
    // No default sort: `sort` is only sent after the user picks an option.
    // Facet filters are multi-select and only sent when at least one box
    // in that group is checked.
    const params = new URLSearchParams({ limit: "24" });
    if (sort) params.set("sort", sort);
    if (category) params.set("category", category);
    if (selected.categories.length > 0)
      params.set("categories", selected.categories.join(","));
    if (selected.groups.length > 0)
      params.set("groups", selected.groups.join(","));
    if (selected.sizes.length > 0)
      params.set("sizes", selected.sizes.join(","));
    if (selected.families.length > 0)
      params.set("families", selected.families.join(","));
    if (selected.collections.length > 0)
      params.set("collections", selected.collections.join(","));
    if (selected.priceRanges.length > 0)
      params.set("priceRanges", selected.priceRanges.join(","));
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
  }, [category, sort, selected]);

  // Heading follows the active tile filter ("Electric Bikes", "Tires", …).
  const categoryLabel = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";

  const renderCheckboxOptions = (section, visibleOptions) => (
    <div className="flex flex-col gap-4">
      {visibleOptions.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-3 text-base"
        >
          <input
            type="checkbox"
            checked={(selected[section.key] ?? []).includes(option.value)}
            onChange={() => toggleSelected(section.key, option.value)}
            className="h-5 w-5 accent-neutral-900"
          />
          <span>
            {option.label}{" "}
            <span className="text-neutral-500">({option.count})</span>
          </span>
        </label>
      ))}
    </div>
  );

  const renderPillOptions = (section, visibleOptions) => (
    <div className="grid grid-cols-2 gap-3">
      {visibleOptions.map((option) => {
        const checked = (selected[section.key] ?? []).includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleSelected(section.key, option.value)}
            aria-pressed={checked}
            className={`h-11 rounded-md border text-base font-semibold transition-colors ${
              checked
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
  // Filter & sort dropdown sections. Size is a pill grid, rest are checkboxes.
  const filterSections = [
    {
      key: "categories",
      title: "Category",
      options: facets?.categories ?? [],
      variant: "checkbox",
    },
    {
      key: "groups",
      title: "Group",
      options: facets?.groups ?? [],
      variant: "checkbox",
    },
    {
      key: "sizes",
      title: "Size",
      options: facets?.sizes ?? [],
      variant: "pills",
      visibleLimit: 6,
    },
    {
      key: "priceRanges",
      title: "Price",
      options: (facets?.priceRanges ?? []).map((bucket) => ({
        value: bucket.key,
        label: bucket.label,
        count: bucket.count,
      })),
      variant: "checkbox",
      visibleLimit: 5,
    },
    {
      key: "families",
      title: "Product Family",
      options: facets?.families ?? [],
      variant: "checkbox",
      visibleLimit: 5,
    },
    {
      key: "collections",
      title: "Collection",
      options: facets?.collections ?? [],
      variant: "checkbox",
    },
  ];

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
                  <p className="truncate">
                    {activeSortOption
                      ? `Sort By: ${activeSortOption.label}`
                      : "Sort By"}
                  </p>
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
            <div ref={filterRef} className="relative md:w-48 w-full">
              <button
                type="button"
                onClick={() => setFilterOpen((open) => !open)}
                aria-haspopup="dialog"
                aria-expanded={filterOpen}
                className="w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold rounded-md"
              >
                <span className="flex justify-between items-center mx-4">
                  <span>
                    Filters
                    {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                  </span>{" "}
                  <span className="text-xl text-white font-bold leading-none">
                    <ion-icon name="options-outline"></ion-icon>
                  </span>
                </span>
              </button>
              {filterOpen && (
                <div
                  role="dialog"
                  aria-label="Filter products"
                  className="absolute right-0 top-full z-50 w-80 max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto rounded-md bg-white shadow-xl border border-neutral-200 p-5 text-neutral-900"
                >
                  <div className="flex flex-col">
                    {filterSections.map((section) => (
                      <FilterSection
                        key={section.key}
                        section={section}
                        isOpen={!!openSections[section.title]}
                        expanded={!!showMore[section.title]}
                        onToggle={() => toggleSection(section.title)}
                        onToggleMore={() =>
                          setShowMore((prev) => ({
                            ...prev,
                            [section.title]: !prev[section.title],
                          }))
                        }
                        checkboxList={renderCheckboxOptions}
                        pillList={renderPillOptions}
                      />
                    ))}
                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-4 text-sm font-semibold text-neutral-600 underline hover:text-neutral-900"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
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
