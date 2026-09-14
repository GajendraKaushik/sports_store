import React, { useCallback, useEffect, useState } from "react";
import Saved_Product_Card from "./Saved_Product_Card";
import { useNavigate } from "react-router-dom";
import {
  getAccountWishlist,
  removeWishlistItem,
  addToCart,
} from "../../../api/accountApi.js";
import { useAuth } from "../../../lib/AuthContext.jsx";

// I08: wishlist page reads /account/wishlist and supports move-to-cart
// (wishlist DELETE + cart POST) and remove (wishlist DELETE).
const WishList = () => {
  const navigate = useNavigate()
  const { logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const load = useCallback(() => {
    getAccountWishlist()
      .then((data) => setItems(data?.items ?? []))
      .catch((err) =>
        setLoadError(err?.message ?? "Could not load wishlist"),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const itemProductId = (item) => item.product?.id ?? item.productId;

  const handleRemove = async (productId) => {
    try {
      await removeWishlistItem(productId);
      setItems((prev) =>
        prev.filter((i) => itemProductId(i) !== productId),
      );
    } catch (err) {
      alert(err?.message ?? "Could not remove saved item");
    }
  };

  const handleAddToCart = async (item) => {
    const product = item.product ?? {};
    const productId = itemProductId(item);
    try {
      await addToCart({ productId, quantity: 1, selectedSize: "" });
      await handleRemove(productId);
    } catch (err) {
      alert(err?.message ?? "Could not add to cart");
    }
  };

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const goBack =()=>{
    navigate(-1)
  }
  return (
    <>
      <div className="lg:hidden block">
        <div className=" bg-stone-100 mt-3 h-44">
          <div className="flex items-center justify-between p-5">
          <div className="flex justify-start mt-3 gap-0 hover:text-red-600">
                    <span className="text-2xl font-light pt-1">
                      <ion-icon name="chevron-back-outline"></ion-icon>
                    </span>
                    <p onClick={goBack} className="text-xl font-light">
                      Black
                    </p>
                  </div>
            <div onClick={handleSignOut} className="underline font-semibold hover:text-red-600 cursor-pointer">Sign Out</div>
          </div>
          <div className="text-3xl text-center font-bold mt-7">
          Saved For Later
          </div>
        </div>
      </div>
      <div className="m-8 md:m-20 ">
        <div className="">
          <div className="text-3xl font-bold hidden md:block">
            Saved For Later
          </div>
          {loadError ? (
            <p className="text-red-600 mt-6">{loadError}</p>
          ) : loading ? (
            <p className="mt-6">Loading saved items…</p>
          ) : (
          <div className="grid grid-cols-1 mt-16 gap-8 ">
          <h3 className="block text-gray-950 md:hidden">
            Your Saved Items ({items.length})
          </h3>
            {items.length ? (
              items.map((item) => (
                <Saved_Product_Card
                  key={itemProductId(item)}
                  item={item}
                  onAddToCart={() => handleAddToCart(item)}
                  onRemove={() => handleRemove(itemProductId(item))}
                />
              ))
            ) : (
              <p className="text-neutral-600">Nothing saved for later.</p>
            )}
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;
