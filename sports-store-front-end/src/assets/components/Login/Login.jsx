import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showpass, setShowpass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const handleShowpass = () => {
    setShowpass((prevState) => !prevState);
  };
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid || submitting) return;
    setSubmitting(true);
    setFormError(null);
    try {
      await login(email, password);
      navigate(location.state?.from ?? "/account", { replace: true });
    } catch (err) {
      const details = Array.isArray(err?.details) ? err.details : [];
      setFormError(
        details.length
          ? details.map((d) => `${d.path}: ${d.message}`).join(" · ")
          : err?.message ?? "Unable to sign in.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col mt-36">
        <div className="flex items-center justify-center flex-col w-96 ">
          <div className="mb-8">
            <p className="text-2xl text-gray-800 font-medium">
              Sign in to your Account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            <div className="relative">
              <input
                type="email"
                id="myInput"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
              />
              <span
                htmlFor="myInput"
                className="floating-lable absolute left-3 top-3 text-gray-500"
              >
                Email
              </span>
            </div>

            <div className=" relative">
              <input
                type={showpass ? "text" : "password"}
                name="pass"
                id=""
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] p-3 rounded-md border-slate-400 border-2"
              />
              <span
                onClick={handleShowpass}
                className="absolute mt-3 right-5 text-stone-400 cursor-pointer"
              >
                {showpass ? "Hide" : "Show"}
              </span>
            </div>

            {formError && (
              <p className="text-sm text-red-600">{formError}</p>
            )}

            <div>
              <p className="underline">Forgot your password?</p>
            </div>

            <div>
              <p className="text-center text-sm font-light font">
                By clicking “Sign In,” you acknowledge you are over the age of
                18, you accept the Specialized{" "}
                <span className="underline font-semibold">Terms of Use</span>{" "}
                (updated April 16, 2024), and you acknowledge Specialized will
                use your information in accordance with its{" "}
                <span className="underline font-semibold">Privacy Policy.</span>
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid || submitting}
                className={`h-[50px] w-full font-semibold rounded-md ${
                  isFormValid
                    ? "bg-neutral-900 text-white hover:bg-neutral-700 cursor-pointer"
                    : "text-stone-600 bg-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting ? "Signing in…" : "Sign In"}
              </button>
            </div>
          </form>
        </div>
        <div className="m-10">
          <p>
            <Link to="/auth/signup" className="underline text-gray-700">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
