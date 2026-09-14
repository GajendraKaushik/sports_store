// API Layer — account / consumer profile.
//
// Responsibility: backend communication only for the customer account
// area (profile, addresses, bikes, wheels, orders, wishlist/cart from the
// saved-for-later section). No JSX, no business rules, no UI state.
import { apiFetch } from "../lib/api.js";

// --- Profile ---
export function getProfile() {
  return apiFetch("/account/profile");
}

export function updateProfile(payload) {
  return apiFetch("/account/profile", { method: "PATCH", body: payload });
}

// --- Addresses ---
export function getAddresses() {
  return apiFetch("/account/addresses");
}

export function createAddress(payload) {
  return apiFetch("/account/addresses", { method: "POST", body: payload });
}

export function updateAddress(addressId, payload) {
  return apiFetch(`/account/addresses/${addressId}`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteAddress(addressId) {
  return apiFetch(`/account/addresses/${addressId}`, { method: "DELETE" });
}

// --- Bikes ---
export function getBikes() {
  return apiFetch("/account/bikes");
}

export function createBike(payload) {
  return apiFetch("/account/bikes", { method: "POST", body: payload });
}

// --- Wheels ---
export function getWheels() {
  return apiFetch("/account/wheels");
}

export function createWheel(payload) {
  return apiFetch("/account/wheels", { method: "POST", body: payload });
}

// --- Orders ---
export function getOrders() {
  return apiFetch("/account/orders");
}

// --- Wishlist / cart actions used from "Save for Later" ---
export function getAccountWishlist() {
  return apiFetch("/account/wishlist");
}

export function removeWishlistItem(productId) {
  return apiFetch(`/account/wishlist/items/${productId}`, { method: "DELETE" });
}

export function addToCart(body) {
  return apiFetch("/cart/items", { method: "POST", body });
}

export default {
  getProfile,
  updateProfile,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getBikes,
  createBike,
  getWheels,
  createWheel,
  getOrders,
  getAccountWishlist,
  removeWishlistItem,
  addToCart,
};