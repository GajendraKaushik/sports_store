// Application / Data-Fetching Layer — cart.
//
// Responsibility: own cart + wishlist server state (fetch, mutations,
// loading, busy/error flags) and expose plain data + actions to the UI.
// The component never constructs endpoints or knows request shapes.
// Why a hook: one place owns the fetch lifecycle and the post-mutation
// reload, so ProductCart stays a thin presenter.
import { useCallback, useEffect, useState } from "react";
import {
  getCart,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
} from "../api/cartApi.js";
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "../api/wishlistApi.js";
import {
  PICKUP_FEE,
  getCartSubtotal,
  applyPickupFee,
} from "../services/cartService.js";

export function useCart() {
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [cartData, wishlistData] = await Promise.all([
        getCart(),
        getWishlist(),
      ]);
      setCart(cartData?.cart ?? cartData);
      setWishlist(wishlistData?.items ?? wishlistData ?? []);
    } catch (err) {
      setLoadError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Runs any cart/wishlist mutation, then re-syncs server state. Error
  // handling mirrors the previous page behavior (alert on failure).
  const runAction = useCallback(
    async (action) => {
      setBusy(true);
      try {
        await action();
        await load();
      } catch (err) {
        alert(err?.message ?? "Something went wrong");
      } finally {
        setBusy(false);
      }
    },
    [load],
  );

  const items = cart?.items ?? [];
  // Server subtotal wins; fall back to a local computation if absent.
  const subtotal = Number(cart?.subtotal ?? getCartSubtotal(items));
  const estimatedTotal = applyPickupFee(subtotal);

  const updateQuantity = (productId, quantity) =>
    runAction(() => updateCartItemQuantity(productId, quantity));

  const removeItem = (productId) =>
    runAction(() => removeCartItem(productId));

  const saveForLater = (item) =>
    runAction(async () => {
      await addWishlistItem(item.productId);
      await removeCartItem(item.productId);
    });

  const removeSaved = (productId) =>
    runAction(() => removeWishlistItem(productId));

  const moveSavedToCart = (item) =>
    runAction(async () => {
      const product = item.product ?? {};
      await addCartItem({
        productId: product.id,
        quantity: 1,
        selectedSize: "",
      });
      await removeWishlistItem(product.id);
    });

  return {
    cart,
    wishlist,
    items,
    subtotal,
    estimatedTotal,
    pickupFee: PICKUP_FEE,
    loading,
    loadError,
    busy,
    reload: load,
    updateQuantity,
    removeItem,
    saveForLater,
    removeSaved,
    moveSavedToCart,
  };
}

export default useCart;
