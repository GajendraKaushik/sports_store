import React from "react";
import { useState } from "react";
const Login = () => {
  const [showpass, setShowpass] = useState(false);
  const handleShowpass = () => {
    setShowpass((prevState) => !prevState);
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
          <div className="flex flex-col gap-8 w-full">
            <div className="relative">
              <input
                type="email"
                id="myInput"
                required
                className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
              />
              <span
                for="myInput"
                className="floating-lable absolute left-3 top-3 text-gray-500"
              >
                Email
              </span>
            </div>

            <div className=" relative">
              <input
                type="password"
                name="pass"
                id=""
                placeholder="Password"
                required
                className="w-full h-[50px] p-3 rounded-md border-slate-400 border-2"
              />
              <span
                onClick={handleShowpass}
                className="absolute mt-3 right-5 text-stone-400 cursor-pointer"
              >
                {showpass ? "Show" : "Hide"}
              </span>
            </div>

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
                className=" h-[50px] w-full text-stone-600 font-semibold rounded-md bg-gray-400
              "
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className="m-10">
          <p>
            <a href="" className="underline text-gray-700">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
