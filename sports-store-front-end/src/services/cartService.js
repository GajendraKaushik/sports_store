// Domain / Business Layer — cart.
//
// Responsibility: cart calculations and UI-agnostic rules. No React, no
// JSX, no fetch. Why here: totals must be computed identically wherever
// the cart is shown, and unit-testable without rendering.
export const PICKUP_FEE = 50;

export function getCartSubtotal(items = []) {
  return items.reduce(
    (total, item) =>
      total + Number(item.unitPriceSnapshot ?? 0) * Number(item.quantity ?? 0),
    0,
  );
}

export function getEstimatedTotal(items = []) {
  return getCartSubtotal(items) + PICKUP_FEE;
}

// Adds the flat pickup fee to an already-known subtotal (the server sends
// the authoritative subtotal; this stays server-wins for the cart page).
export function applyPickupFee(subtotal) {
  return Number(subtotal ?? 0) + PICKUP_FEE;
}

export default { PICKUP_FEE, getCartSubtotal, getEstimatedTotal, applyPickupFee };
