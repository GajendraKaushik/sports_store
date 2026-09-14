// API Layer — cart.
//
// Responsibility: backend communication only. No JSX, no totals/discount
// business rules, no UI state.
import { apiFetch } from "../lib/api.js";

export function getCart() {
  return apiFetch("/cart");
}

export function addCartItem({ productId, quantity = 1, selectedSize }) {
  return apiFetch("/cart/items", {
    method: "POST",
    body: { productId, quantity, selectedSize },
  });
}

export function updateCartItem(productId, patch) {
  return apiFetch(`/cart/items/${productId}`, { method: "PATCH", body: patch });
}

export function updateCartItemQuantity(productId, quantity) {
  return apiFetch(`/cart/items/${productId}`, {
    method: "PATCH",
    body: { quantity },
  });
}

export function removeCartItem(productId) {
  return apiFetch(`/cart/items/${productId}`, { method: "DELETE" });
}

export default {
  getCart,
  addCartItem,
  updateCartItem,
  updateCartItemQuantity,
  removeCartItem,
};
