import React, { useEffect, useState } from "react";
import UserDetailForm from "./UserDetailForm";

import {Drawer} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../lib/api.js";
import { useAuth } from "../../../lib/AuthContext.jsx";

// I07: profile reads/writes the backend (GET/PATCH /account/profile).
// Backend exposes firstName/lastName/email/phone only, so the drawer form
// edits just those; the rest of the layout is untouched.
const Profile = () => {
  const navigate = useNavigate()
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const loadProfile = () =>
    apiFetch("/account/profile")
      .then((data) => setUserInfo(data?.profile ?? data))
      .catch((err) => setLoadError(err?.message ?? "Could not load profile"));

  useEffect(() => {
    loadProfile();
  }, []);

  const handleClose = () => setIsOpen(false);
  const handleSaved = (updated) => {
    setUserInfo(updated);
    handleClose();
  };
  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const goBack =()=>{
       navigate(-1)
  }
  const fullName = userInfo
    ? `${userInfo.firstName ?? ""} ${userInfo.lastName ?? ""}`.trim()
    : "";

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} position="right" className="w-full sm:w-[553px] p-5">
        <Drawer.Items>
        <UserDetailForm onClose={handleClose} onSaved={handleSaved} userInfo={userInfo} />
        </Drawer.Items>
      </Drawer>
      <div className="lg:hidden block">
          <div className="pt-4 px-6 pb-px bg-stone-100 mt-3">
            <div className="flex items-center justify-between">
            <div className="flex justify-start mt-3 gap-0 hover:text-red-600 cursor-pointer">
                    <span className="text-2xl font-light pt-1">
                      <ion-icon name="chevron-back-outline"></ion-icon>
                    </span>
                    <p onClick={goBack} className="text-xl font-light">
                      Black
                    </p>
                  </div>
              <div onClick={handleSignOut} className="underline font-semibold hover:text-red-600 cursor-pointer">Sign Out</div>
            </div>
            <div className="text-3xl text-center font-bold mb-10">
              Profile
            </div>
          </div>
        </div>

      <div className={`bg-white ml-9 grid-col-1 p-12`}>

        <div className="h-20 text-3xl font-bold">Profile</div>
        {loadError && <p className="text-red-600">{loadError}</p>}
        <div className="grid md:grid-cols-2 gap-10 grid-cols-1">
          <div className="bg-white rounded-lg shadow-lg min-w-64 shadow-black">
            <div className="flex flex-col items-start justify-start gap-5 p-6">
              <p className="text-2xl font-bold">Your Info</p>
              <div>
                <p className="text-xl font-semibold">Name</p>
                <p>{fullName}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Email</p>
                <p>{userInfo?.email}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Phone number</p>
                <p>{userInfo?.phone || "—"}</p>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                disabled={!userInfo}
                className="underline hover:text-red-600 disabled:opacity-50"
                type="button"
                data-drawer-target="drawer-right-example"
                data-drawer-show="drawer-right-example"
                data-drawer-placement="right"
                aria-controls="drawer-right-example"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="bg-white">
            <div className="w-full h-52 bg-white rounded-lg shadow-lg shadow-black p-6">
              <p className="text-2xl font-bold mb-5">password</p>
              <div>*******</div>
              <button onClick={() => setIsOpen(true)} className="underline hover:text-red-600">
               Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
