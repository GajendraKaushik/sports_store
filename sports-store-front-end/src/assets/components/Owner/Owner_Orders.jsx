// I09: owner orders. Reads GET /owner/orders, changes status via
// PATCH /owner/orders/:orderId/status (frozen status enum).
import React, { useCallback, useEffect, useState } from "react";
import { getOwnerOrders, updateOrderStatus } from "../../../api/ownerApi.js";
import { formatPrice } from "../../../lib/format.js";

const STATUSES = [
  "pending",
  "confirmed",
  "ready_for_pickup",
  "completed",
  "cancelled",
];

const Owner_Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowBusy, setRowBusy] = useState(null);

  const load = useCallback(() => {
    getOwnerOrders()
      .then((data) => setOrders(data?.orders ?? []))
      .catch((err) => setError(err?.message ?? "Could not load orders"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (orderId, status) => {
    setRowBusy(orderId);
    try {
      const data = await updateOrderStatus(orderId, { status });
      const updated = data?.order ?? data;
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? updated : order)),
      );
    } catch (err) {
      alert(err?.message ?? "Could not update status");
    } finally {
      setRowBusy(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Orders</h1>
      {error ? (
        <p className="text-red-600 mt-6">{error}</p>
      ) : loading ? (
        <p className="mt-6">Loading orders…</p>
      ) : orders.length ? (
        <div className="grid gap-6 mt-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-3xl rounded-md p-6">
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
                  <select
                    value={order.status}
                    disabled={rowBusy === order.id}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="text-xs px-3 py-2 rounded-md border border-stone-300 bg-white"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <div className="font-semibold">
                    {formatPrice(order.total, order.currency)}
                  </div>
                </div>
              </div>
              <div className="grid gap-2 mt-4 text-sm">
                {(order.items ?? []).map((item, index) => (
                  <div key={index} className="flex justify-between gap-4">
                    <span>
                      {item.titleSnapshot} × {item.quantity}
                      {item.selectedSize ? ` · ${item.selectedSize}` : ""}
                    </span>
                    <span>
                      {formatPrice(item.unitPrice * item.quantity, order.currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-600 mt-6">No orders yet.</p>
      )}
    </div>
  );
};

export default Owner_Orders;
