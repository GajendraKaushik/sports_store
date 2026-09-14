// API Layer — products.
//
// Responsibility: backend communication only (endpoints, HTTP methods,
// query params, payloads). No JSX, no business rules, no UI state.
// Transport details (base URL, auth header, envelope unwrapping) stay in
// lib/api.js; this module only declares product endpoints on top of it.
import { apiFetch } from "../lib/api.js";

export function listProducts(queryString = "") {
  const qs = queryString ? `?${queryString}` : "";
  return apiFetch(`/products${qs}`);
}

export function getProductFacets(category = "") {
  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiFetch(`/products/facets${qs}`);
}

export function getHomeProducts() {
  return apiFetch("/products");
}

export function getProductBySlug(productSlug) {
  return apiFetch(`/products/${productSlug}`);
}

export default { listProducts, getProductFacets, getHomeProducts, getProductBySlug };
