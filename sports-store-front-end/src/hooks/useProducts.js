// Application / Data-Fetching Layer — product list.
//
// Responsibility: orchestrate server state for the /products page
// (fetch, loading, error, refetch inputs). Components receive plain data
// + setters and stay unaware of endpoints or query-string shape.
// Why a hook and not api calls in JSX: one place owns the fetch lifecycle
// and the cancelled-flag pattern; the page only owns UI state.
import { useEffect, useState } from "react";
import {
  listProducts,
  getProductFacets,
  getHomeProducts,
} from "../api/productApi.js";
import { buildProductListQuery } from "../services/productService.js";

export function useProductList({ sort = "", category = "", selected } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    listProducts(buildProductListQuery({ sort, category, selected }))
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

  return { products, loading, error };
}

// Facet options for the filter panel, scoped to the active ?category= tile.
export function useProductFacets(category = "") {
  const [facets, setFacets] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await getProductFacets(category);
        if (!cancelled) setFacets(data?.facets ?? null);
      } catch {
        if (!cancelled) setFacets(null);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [category]);

  return { facets };
}

// Homepage "Rider Favorites" slider: a simple read of the first page of
// products. Slider stays empty on failure — the /products page surfaces
// errors, same as the previous component behavior.
export function useHomeProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getHomeProducts()
      .then((data) => {
        if (!cancelled) setProducts(data?.items ?? []);
      })
      .catch(() => {
        // Slider stays empty on failure; the /products page surfaces errors.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { products };
}

export default useProductList;
