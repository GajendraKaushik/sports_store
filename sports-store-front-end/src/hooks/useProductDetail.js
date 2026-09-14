// Application / Data-Fetching Layer — single product detail.
//
// Responsibility: fetch + loading/error state for /products/:slug and wrap
// the two mutations (add to cart, save for later) so the page never calls
// endpoint functions directly. The "size required" business rule lives in
// productService.resolveSizeSelection, not in JSX.
import { useCallback, useEffect, useState } from "react";
import { getProductBySlug } from "../api/productApi.js";
import { addCartItem } from "../api/cartApi.js";
import { addWishlistItem } from "../api/wishlistApi.js";
import { resolveSizeSelection } from "../services/productService.js";

export function useProductDetail(productSlug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    getProductBySlug(productSlug)
      .then((data) => {
        if (!cancelled) setProduct(data?.product ?? data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productSlug]);

  // Adds the product to the cart. Returns the host so the caller can decide
  // whether to navigate or surface a message. Rejects with the API error so
  // callers can handle e.g. 401 redirects — same contract as before.
  const addToCart = useCallback(
    async ({ quantity = 1, selectedSize = "" } = {}) => {
      const decision = resolveSizeSelection(product, selectedSize);
      if (!decision.ok) return decision;
      await addCartItem({
        productId: product.id,
        quantity,
        selectedSize: decision.size,
      });
      return { ok: true };
    },
    [product],
  );

  const saveForLater = useCallback(async () => {
    if (!product) return;
    await addWishlistItem(product.id);
  }, [product]);

  return {
    product,
    loading,
    loadError,
    addToCart,
    saveForLater,
  };
}

export default useProductDetail;
