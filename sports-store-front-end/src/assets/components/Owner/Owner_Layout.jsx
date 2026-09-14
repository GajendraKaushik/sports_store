// I09: shared owner shell. Sidebar links map 1:1 to /owner/* API groups
// (dashboard counts, products, orders, store profile).
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/AuthContext.jsx";

const LINKS = [
  { to: "/owner/dashboard", label: "Dashboard" },
  { to: "/owner/products", label: "Products" },
  { to: "/owner/orders", label: "Orders" },
  { to: "/owner/store-profile", label: "Store Profile" },
];

const Owner_Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="mb-20 pt-6 mx-4 md:mx-10 flex flex-col md:flex-row gap-8">
      <aside className="md:w-56 shrink-0">
        <div className="bg-white shadow-3xl rounded-md p-5">
          <h2 className="text-lg font-bold">Owner Panel</h2>
          <p className="text-xs text-neutral-500 mt-1 break-all">
            {user?.email}
          </p>
          <nav className="mt-5 flex flex-col gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-700 hover:bg-stone-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={handleSignOut}
            className="mt-6 text-sm underline font-semibold hover:text-red-600"
          >
            Sign Out
          </button>
          <NavLink
            to="/"
            className="mt-2 block text-sm underline font-semibold hover:text-red-600"
          >
            Back to store
          </NavLink>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Owner_Layout;
