// API Layer — wishlist (Save for Later).
//
// Responsibility: backend communication only. No JSX, no UI state.
import { apiFetch } from "../lib/api.js";

export function getWishlist() {
  return apiFetch("/account/wishlist");
}

export function addWishlistItem(productId) {
  return apiFetch("/account/wishlist/items", {
    method: "POST",
    body: { productId },
  });
}

export function removeWishlistItem(productId) {
  return apiFetch(`/account/wishlist/items/${productId}`, { method: "DELETE" });
}

export default { getWishlist, addWishlistItem, removeWishlistItem };
