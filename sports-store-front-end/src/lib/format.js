// Formatting helpers (I01). Backend sends Numbers; display via Intl.

export function formatPrice(value, currency = "USD") {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return String(amount);
  }
}

export default formatPrice;