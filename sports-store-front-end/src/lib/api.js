// Shared API client (I01). All pages use this instead of ad-hoc fetch.
// Base URL: VITE_API_URL env, or the local backend during development.
const API_BASE_URL =
  (import.meta.env && import.meta.env.VITE_API_URL) ||
  "http://localhost:5000/api/v1";

export const TOKEN_KEY = "sports_store_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Thin fetch wrapper that:
 * - prefixes the backend base URL
 * - attaches `Authorization: Bearer <token>` when available
 * - unwraps the backend envelope `{ success, data, error }`
 * - throws an Error carrying status/code/details on non-2xx
 */
export async function apiFetch(path, { method = "GET", body, token } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const authToken = token ?? getToken();
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    const networkErr = new Error(
      "Unable to reach the server. Is the backend running?",
    );
    networkErr.status = 0;
    networkErr.code = "NETWORK_ERROR";
    throw networkErr;
  }

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const apiErr = new Error(
      payload?.error?.message ?? `Request failed (${res.status})`,
    );
    apiErr.status = res.status;
    apiErr.code = payload?.error?.code ?? "REQUEST_FAILED";
    apiErr.details = payload?.error?.details;
    throw apiErr;
  }

  return payload?.data ?? payload;
}

export default apiFetch;