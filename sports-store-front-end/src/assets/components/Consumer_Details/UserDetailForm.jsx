// I07: rider profile edit form. Writes PATCH /account/profile with the
// fields the backend accepts (firstName/lastName/phone); email/role are
// never editable client-side. Keeps the original drawer styling.
import React, { useState } from "react";
import { updateProfile } from "../../../api/accountApi.js";

const UserDetailForm = ({ onClose, onSaved, userInfo }) => {
  const [firstName, setFirstName] = useState(userInfo?.firstName ?? "");
  const [lastName, setLastName] = useState(userInfo?.lastName ?? "");
  const [phone, setPhone] = useState(userInfo?.phone ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const canSave = firstName.trim() !== "" && lastName.trim() !== "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSave || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const data = await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
      });
      onSaved(data?.profile ?? data);
    } catch (err) {
      setError(err?.message ?? "Could not save profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full fixed z-1010 opacity-100">
        <div className="fixed p-2 overflow-hidden w-full md:w-[555px] h-full">
          <div className="flex justify-end">
            <div className=" p-4 flex w-auto flex-nowrap justify-end">
              <div className="bg-gray-300 flex justify-center items-center w-12 h-12 rounded relative">
                <div>
                  <div
                    onClick={onClose}
                    className="flex justify-center items-center text-3xl"
                  >
                    <ion-icon name="close-outline"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full overflow-y-scroll scroll-smooth flex flex-col">
            <div className="flex mb-20 mr-8">
              <div className="flex ">
                <form onSubmit={handleSubmit} className="mt-2">
                  <div className=" flex flex-col gap-5">
                    <h1 className="flex justify-center text-3xl font-bold pb-8">
                      Edit Rider Profile
                    </h1>

                    <div className="flex-wrap flex justify-between">
                      <div className="relative  basis-[47%]">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 text-gray-500 focus:border-neutral-800"
                        />
                        <span
                          htmlFor="firstName"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          First Name
                        </span>
                      </div>
                      <div className="relative basis-[47%]">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 text-gray-500"
                        />
                        <span
                          htmlFor="lastName"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          Last Name
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={userInfo?.email ?? ""}
                          readOnly
                          disabled
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 bg-stone-100 text-gray-400"
                        />
                        <span
                          htmlFor="email"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          Email (can't change)
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2 text-gray-500"
                        />
                        <span
                          htmlFor="phone"
                          className="floating-lable absolute left-3 top-3 text-gray-500"
                        >
                          Phone Number
                        </span>
                      </div>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex justify-between my-10">
                      <div>
                        <button
                          type="submit"
                          disabled={!canSave || submitting}
                          className="h-12 w-48 bg-neutral-700 text-white rounded font-bold disabled:opacity-50"
                        >
                          {" "}
                          {submitting ? "Saving…" : "Save Changes"}
                        </button>
                      </div>
                      <button
                        type="reset"
                        onClick={onClose}
                        className="underline text-neutral-800 font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailForm;