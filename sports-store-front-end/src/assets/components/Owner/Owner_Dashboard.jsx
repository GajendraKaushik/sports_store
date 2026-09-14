// I09: owner dashboard. Reads GET /owner/dashboard counts only.
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOwnerDashboard } from "../../../api/ownerApi.js";

const Owner_Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOwnerDashboard()
      .then((data) => setDashboard(data?.dashboard ?? data))
      .catch((err) => setError(err?.message ?? "Could not load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const CARDS = [
    { label: "Products", key: "productCount", to: "/owner/products" },
    { label: "Orders", key: "orderCount", to: "/owner/orders" },
    { label: "Pending orders", key: "pendingOrders", to: "/owner/orders" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {error ? (
        <p className="text-red-600 mt-6">{error}</p>
      ) : loading ? (
        <p className="mt-6">Loading dashboard…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          {CARDS.map((card) => (
            <Link
              key={card.key}
              to={card.to}
              className="bg-white shadow-3xl rounded-md p-6 hover:bg-stone-50"
            >
              <div className="text-4xl font-bold">
                {dashboard?.[card.key] ?? 0}
              </div>
              <div className="text-neutral-600 mt-2">{card.label}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Owner_Dashboard;
