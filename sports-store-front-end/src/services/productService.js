// Domain / Business Layer — products.
//
// Responsibility: product business rules + query building + payload mapping.
// Framework-independent: no React, no JSX, no fetch details.
// Why here and not in the component: Product_List_Page should only hold
// UI state (sort value, checked boxes) and render; how a selected filter
// set becomes a backend query string is a domain rule that must be
// testable and reusable without rendering anything.
export const EMPTY_FILTERS = {
  categories: [],
  groups: [],
  sizes: [],
  families: [],
  collections: [],
  priceRanges: [],
};

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "New" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
];

export function getSortLabel(sort) {
  return SORT_OPTIONS.find((option) => option.value === sort)?.label ?? "";
}

export function countActiveFilters(selected = EMPTY_FILTERS) {
  return Object.values(selected).reduce(
    (total, arr) => total + (Array.isArray(arr) ? arr.length : 0),
    0,
  );
}

export function toggleFilterValue(selected = EMPTY_FILTERS, key, value) {
  const current = selected[key] ?? [];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  return { ...selected, [key]: next };
}

// Builds the GET /products query from page inputs. Only sends `sort` and
// facet groups that have a selection — untouched requirement: no default
// sort/filter is applied.
export function buildProductListQuery({ sort = "", category = "", selected = EMPTY_FILTERS } = {}) {
  const params = new URLSearchParams({ limit: "24" });
  if (sort) params.set("sort", sort);
  if (category) params.set("category", category);
  if (selected.categories?.length > 0)
    params.set("categories", selected.categories.join(","));
  if (selected.groups?.length > 0)
    params.set("groups", selected.groups.join(","));
  if (selected.sizes?.length > 0)
    params.set("sizes", selected.sizes.join(","));
  if (selected.families?.length > 0)
    params.set("families", selected.families.join(","));
  if (selected.collections?.length > 0)
    params.set("collections", selected.collections.join(","));
  if (selected.priceRanges?.length > 0)
    params.set("priceRanges", selected.priceRanges.join(","));
  return params.toString();
}

// Maps a facet payload into the six filter sections the UI renders.
// Why here: the backend already returns { value, label, count } for most
// groups; only price buckets need key->value remapping. Keeping it here
// (not in JSX) means a payload shape change touches one file, not UI.
export function buildFilterSections(facets) {
  return [
    { key: "categories", title: "Category", options: facets?.categories ?? [] },
    { key: "groups", title: "Group", options: facets?.groups ?? [] },
    {
      key: "sizes",
      title: "Size",
      variant: "pills",
      visibleLimit: 6,
      options: facets?.sizes ?? [],
    },
    {
      key: "priceRanges",
      title: "Price",
      visibleLimit: 5,
      options: (facets?.priceRanges ?? []).map((bucket) => ({
        value: bucket.key,
        label: bucket.label,
        count: bucket.count,
      })),
    },
    {
      key: "families",
      title: "Product Family",
      visibleLimit: 5,
      options: facets?.families ?? [],
    },
    {
      key: "collections",
      title: "Collection",
      options: facets?.collections ?? [],
    },
  ];
}

export function getCategoryHeading(category) {
  return category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";
}

// Business rule: resolving which size should be sent to the API when
// adding a product to the cart. Currently a size must be explicitly picked
// by the shopper; an empty selection is rejected (the UI blocks silently,
// exactly as before the refactor). Framework-independent + unit-testable.
export function resolveSizeSelection(product, selectedSize) {
  const size = String(selectedSize ?? "").trim();
  if (!size) return { ok: false, message: "" };
  return { ok: true, size };
}

export default {
  EMPTY_FILTERS,
  SORT_OPTIONS,
  getSortLabel,
  countActiveFilters,
  toggleFilterValue,
  buildProductListQuery,
  buildFilterSections,
  getCategoryHeading,
  resolveSizeSelection,
};
