// I09: owner login. Reuses POST /auth/login (no separate owner endpoint);
// rejects non-owner accounts, per plan "guard /owner/* for owner role only".
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/AuthContext.jsx";

const Owner_Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = email.trim() !== "" && password.trim() !== "" && !submitting;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const signedIn = await login(email.trim(), password);
      if (signedIn?.role !== "owner") {
        setError("This account is not a store owner.");
        return;
      }
      navigate(location.state?.from ?? "/owner/dashboard", { replace: true });
    } catch (err) {
      setError(err?.message ?? "Could not sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-28 mb-20 mx-auto max-w-md px-6">
      <h1 className="text-3xl font-bold">Owner Login</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Sign in with your store owner account.
        {user?.role === "owner" ? " You are already signed in as an owner." : ""}
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
          required
        />
        {error ? <p className="text-red-600 text-sm">{error}</p> : null}
        <button
          type="submit"
          disabled={!canSubmit}
          className="h-12 bg-neutral-900 text-white font-semibold rounded-md hover:bg-neutral-700 disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Owner_Login;
