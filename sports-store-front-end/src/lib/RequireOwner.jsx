// I09: owner-only route guard. Extends RequireAuth with a role check —
// logged-out users AND signed-in customers (role=user) are redirected to
// /owner/login. Backend enforces the same rule (requireRole owner, 403).
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function RequireOwner({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="bg-white ml-8 pt-6">
        <p>Checking your session…</p>
      </div>
    );
  }

  if (!user || user.role !== "owner") {
    return (
      <Navigate to="/owner/login" state={{ from: location.pathname }} replace />
    );
  }

  return children ?? <Outlet />;
}
