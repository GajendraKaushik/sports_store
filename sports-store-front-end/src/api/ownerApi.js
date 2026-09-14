// API Layer — owner panel.
//
// Responsibility: backend communication only for owner endpoints
// (dashboard, orders, store profile, product CRUD + categories dropdown).
// No JSX, no business rules, no UI state.
import { apiFetch } from "../lib/api.js";

export function getOwnerDashboard() {
  return apiFetch("/owner/dashboard");
}

export function getOwnerOrders() {
  return apiFetch("/owner/orders");
}

export function updateOrderStatus(orderId, payload) {
  return apiFetch(`/owner/orders/${orderId}/status`, {
    method: "PATCH",
    body: payload,
  });
}

export function getOwnerStore() {
  return apiFetch("/owner/store");
}

export function updateOwnerStore(payload) {
  return apiFetch("/owner/store", { method: "PATCH", body: payload });
}

export function getOwnerProducts() {
  return apiFetch("/owner/products");
}

export function createOwnerProduct(payload) {
  return apiFetch("/owner/products", { method: "POST", body: payload });
}

export function updateOwnerProduct(productId, payload) {
  return apiFetch(`/owner/products/${productId}`, {
    method: "PATCH",
    body: payload,
  });
}

export function getCategories() {
  return apiFetch("/categories");
}

export default {
  getOwnerDashboard,
  getOwnerOrders,
  updateOrderStatus,
  getOwnerStore,
  updateOwnerStore,
  getOwnerProducts,
  createOwnerProduct,
  updateOwnerProduct,
  getCategories,
};