// API Layer — auth.
//
// Responsibility: backend communication only (endpoints, methods, payloads).
// No UI state, no token persistence — that stays in AuthContext / api.js.
import { apiFetch } from "../lib/api.js";

export function getCurrentUser() {
  return apiFetch("/auth/me");
}

export function loginUser({ email, password }) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function signupUser(payload) {
  return apiFetch("/auth/signup", {
    method: "POST",
    body: payload,
  });
}

export default { getCurrentUser, loginUser, signupUser };