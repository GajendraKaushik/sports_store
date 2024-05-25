import React from "react";

const SingUp = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-36">
        <div className="flex items-center justify-center flex-col w-96 ">
          <div className="text-2xl font-medium  text-gray-800 mb-14">Create an Account</div>
          <form>
            <div className=" flex flex-col gap-8"> 
            <div className="">
              <input
                type="email"
                id=""
                placeholder="Email"
                required
                className="h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
              />
            </div>
            <div className="">
              <input
                type="password"
                name="pass"
                id=""
                placeholder="Password"
                required
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
              <input type="password" placeholder="Confirm Password" required className="h-[50px] w-full p-3 rounded-md border-slate-400 border-2"/>
            </div>
            <div>
              <input type="text" placeholder="First Name" required className="h-[50px] w-full p-3 rounded-md border-slate-400 border-2"/>
            </div>
            <div>
              <input type="text" placeholder="Last Name" required className="h-[50px] w-full p-3 rounded-md border-slate-400 border-2"/>
            </div>
            <div className="flex justify-between gap-3">
              <input type="checkbox" name="Sign" id="" className="w-6 h-5 border-slate-800 border-2 mt-2"/>
              <div className="text-xl text-gray-600 font-light">Sign Me Up To Receive Email Offers And Updates</div>
            </div>
            <div className="flex justify-between mr-8">
              <input type="checkbox" name="Accept" id="" required className="w-6 h-5 border-slate-800 border-[3px] mt-2"/>
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
              <button className="bg-gray-700 h-[50px] w-full text-white rounded-md hover:bg-gray-400
              ">
                Create Account
              </button>
            </div>
            </div>
          </form>
          <div className="m-10">
            <p>
              Already have an account? <a href=""  className="underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingUp;
