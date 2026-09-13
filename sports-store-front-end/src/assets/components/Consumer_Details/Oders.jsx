import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../lib/api.js";
import { useAuth } from "../../../lib/AuthContext.jsx";
import { formatPrice } from "../../../lib/format.js";

// I08: order history reads GET /account/orders
const Oders = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const load = useCallback(() => {
    apiFetch("/account/orders")
      .then((data) => setOrders(data?.orders ?? []))
      .catch((err) => setLoadError(err?.message ?? "Could not load orders"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const goBack = () => navigate(-1);

  return (
    <>
      <div className="lg:hidden block mt-16">
        <div className=" bg-stone-100 mt-3 h-44">
          <div className="flex items-center justify-between p-5">
            <div className="flex justify-start mt-3 gap-0 hover:text-red-600">
              <span className="text-2xl font-light pt-1">
                <ion-icon name="chevron-back-outline"></ion-icon>
              </span>
              <p onClick={goBack} className="text-xl font-light">
                Back
              </p>
            </div>
            <div
              onClick={handleSignOut}
              className="underline font-semibold hover:text-red-600 cursor-pointer"
            >
              Sign Out
            </div>
          </div>
          <div className="text-3xl text-center font-bold mt-7">Orders</div>
        </div>
      </div>
      <div className="mt-16 m-8 md:m-20">
        <div className="text-3xl font-bold hidden md:block">Orders</div>
        {loadError ? (
          <p className="text-red-600 mt-6">{loadError}</p>
        ) : loading ? (
          <p className="mt-6">Loading orders…</p>
        ) : orders.length ? (
          <div className="grid gap-8 mt-10">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-3xl rounded-lg p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                  <div>
                    <h3 className="font-semibold">
                      Order #{order.id?.slice(-6)?.toUpperCase()}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : ""}{" "}
                      · {order.fulfillmentMethod}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-stone-100 border border-stone-300">
                      {order.status}
                    </span>
                    <div className="font-semibold">
                      {formatPrice(order.total, order.currency)}
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 mt-4">
                  {(order.items ?? []).map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{item.titleSnapshot}</span>
                        <span className="text-xs text-neutral-500">
                          Qty {item.quantity}
                          {item.selectedSize ? ` · Size ${item.selectedSize}` : ""}
                        </span>
                      </div>
                      <div>{formatPrice(item.lineTotal, order.currency)}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-stone-200 text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span>{formatPrice(order.subtotal, order.currency)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-600 mt-6">
            No orders yet. Your completed checkouts will show up here.
          </p>
        )}
      </div>
    </>
  );
};

export default Oders;
