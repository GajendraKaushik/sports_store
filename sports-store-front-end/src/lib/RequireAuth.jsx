// I01: frontend route guard. Redirects logged-out users to /auth/login,
// remembering where they were heading so Login can send them back after
// authenticating. Replaces the old U10 `isAuthenticated() => false` loader.
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="bg-white ml-8 pt-6">
        <p>Checking your session…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children ?? <Outlet />;
}