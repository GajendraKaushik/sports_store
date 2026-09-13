import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/AuthContext.jsx";

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    password.length >= 6 &&
    password === confirm &&
    accepted;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid || submitting) return;
    setSubmitting(true);
    setFormError(null);
    try {
      await signup({ firstName, lastName, email, password });
      navigate(location.state?.from ?? "/account", { replace: true });
    } catch (err) {
      const details = Array.isArray(err?.details) ? err.details : [];
      setFormError(
        details.length
          ? details.map((d) => `${d.path}: ${d.message}`).join(" · ")
          : err?.message ?? "Unable to create account.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-36">
        <div className="flex items-center justify-center flex-col w-96 ">
          <div className="text-2xl font-medium  text-gray-800 mb-14">Create an Account</div>
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-8">
            <div className="relative">
              <input
                type="email"
                id="signup-email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
              />
            </div>
            <div className="">
              <input
                type="password"
                name="pass"
                id="signup-password"
                placeholder="Password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] p-3 rounded-md border-slate-400 border-2"
              />
              <div className="flex items-center justify-between gap-3 mt-4">
                <div className="rounded-md h-2 w-11 bg-stone-300"></div>
                <div className="rounded-md h-2 w-11 bg-stone-300"></div>
                <div className="rounded-md h-2 w-11 bg-stone-300"></div>
                <div className="rounded-md h-2 w-11 bg-stone-300"></div>
                <div className="rounded-md h-2 w-11 bg-stone-300"></div>
                <div className="rounded-md h-2 w-11 bg-stone-300"></div>
              </div>
              <div className="text-right text-red-800 mt-4">Weak</div>
            </div>

            <div>
              <input type="password" placeholder="Confirm Password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className="h-[50px] w-full p-3 rounded-md border-slate-400 border-2"/>
            </div>
            <div>
              <input type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-[50px] w-full p-3 rounded-md border-slate-400 border-2"/>
              <input type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-[50px] w-full p-3 rounded-md border-slate-400 border-2"/>
            </div>
            <div className="flex justify-between gap-3">
              <input type="checkbox" name="Sign" id="" className="w-6 h-5 border-slate-800 border-2 mt-2"/>
              <div className="text-xl text-gray-600 font-light">Sign Me Up To Receive Email Offers And Updates</div>
            </div>
            {formError && (
              <p className="text-sm text-red-600">{formError}</p>
            )}
            <div className="flex justify-between mr-8">
              <input
                type="checkbox"
                name="Accept"
                id=""
                required
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-6 h-5 border-slate-800 border-[3px] mt-2"
              />
              <div className="text-xl text-gray-600 font-light">
                I Accept The{" "}<span className="underline">Specialized Terms Of Use</span>
              </div>
            </div>
            <div>
              <p className="text-center text-sm font-light font">
                By clicking “Create Account,” you acknowledge you are over the
                age of 18 and you acknowledge Specialized will use your
                information in accordance with its{" "}
                <span className="underline">Privacy Policy.</span>
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid || submitting}
                className="bg-gray-700 h-[50px] w-full text-white rounded-md hover:bg-gray-400 disabled:opacity-50
              ">
                {submitting ? "Creating account…" : "Create Account"}
              </button>
            </div>
            </div>
          </form>
          <div className="m-10">
            <p>
              Already have an account? <Link to="/auth/login"  className="underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
