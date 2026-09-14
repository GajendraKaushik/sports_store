import React, { useCallback, useEffect, useState } from "react";
import { Drawer } from "flowbite-react";
import Wheel_Detail_Form from "./Wheel_Detail_Form";
import Wheel_info_Cards from "./Wheel_info_Cards.jsx";
import plus from "../../images/Icons/plus.png";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../lib/api.js";
import { useAuth } from "../../../lib/AuthContext.jsx";

// I08: wheels page reads GET /account/wheels; form creates via POST /account/wheels
const Wheels = () => {
  const navigate = useNavigate()
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [wheels, setWheels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const handleClose = () => setIsOpen(false);

  const load = useCallback(() => {
    apiFetch("/account/wheels")
      .then((data) => setWheels(data?.wheels ?? []))
      .catch((err) => setLoadError(err?.message ?? "Could not load wheels"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleUpdatedWheelsDetails = () => {
    load();
    handleClose();
  };

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const goBack = () => {
    navigate(-1)
  }

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        bodyScrolling={false}
        className="w-full md:w-[553px] p-5"
      >
        <Drawer.Items>
          <Wheel_Detail_Form
            handleClose={handleClose}
            onCreated={handleUpdatedWheelsDetails}
          />
        </Drawer.Items>
      </Drawer>
      <div className="mb-12">
        <div className="lg:hidden block">
          <div className="pt-4 px-6 pb-px bg-stone-100 mt-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex justify-start mt-3 gap-0 hover:text-red-600 cursor-pointer">
                    <span className="text-2xl font-light pt-1">
                      <ion-icon name="chevron-back-outline"></ion-icon>
                    </span>
                    <p onClick={goBack} className="text-xl font-light">
                      Back
                    </p>
                  </div>
                  <div onClick={handleSignOut} className="underline font-semibold hover:text-red-600 cursor-pointer">Sign Out</div>
                </div>
              </div>
            </div>
            <div className="text-3xl text-center font-bold mb-10">
              Registered Wheels
            </div>
          </div>
        </div>

        <div className="bg-white grid-col-[repeat(1,minmax(min-content, max-content))] ">
          <div className="grid-cols-2 gap-5 hidden md:grid ml-11">
            <div className="mx-2 mb-5">
              <div className="text-3xl font-bold">Registered Wheels</div>
            </div>
          </div>

          <div className="m-10">
            <div className="flex gap-6 justify-between bg-white shadow-3xl shadow-stone-100 flex-col md:flex-row p-5 rounded-md">
              <header>
                <p className="mb-5 w-auto">
                  Register your wheels within 30 days of purchase. Once your
                  wheels are registered, your lifetime warranty and no-fault
                  crash replacement will be activated in our system. We’ll also
                  keep you informed about new products, promotions, and special
                  events.
                </p>
              </header>
              <button
                onClick={() => setIsOpen(true)}
                className="md:w-28 h-12 min-w-28 w-full bg-neutral-900 text-white hover:bg-neutral-400 object-cover rounded-md flex-grow"
              >
                <span className=" hidden md:block">Register</span>
                <span className=" block md:hidden">Register Your Wheel</span>
              </button>
            </div>
          </div>
          <h3 className="ml-11 text-xl font-medium">
            Your Wheels [{wheels.length}]
          </h3>

          <div className="bg-white">
            <div className="ml-11">
              <h3 className="px-6 font-semibold mt-5">
                Registered Wheels [{wheels.length}]
              </h3>
              <div
                className={`grid gap-6 grid-cols-[repeat(${
                  wheels.length + 1
                },minmax(370px,1fr))] md:grid-cols-[repeat(2,minmax(100px,1fr))] md:grid-rows-1 overflow-x-auto p-10`}
              >
                {loadError ? (
                  <p className="text-red-600">{loadError}</p>
                ) : loading ? (
                  <p>Loading wheels…</p>
                ) : (
                  wheels.map((info) => (
                    <Wheel_info_Cards wheelInfo={info} key={info.id} />
                  ))
                )}

                <div
                  onClick={() => setIsOpen(true)}
                  className="border-dashed border-gray-400 border-2 bg-white min-w-56 min-h-52  rounded-md cursor-pointer p-6"
                >                  <div className="flex flex-col h-full items-center justify-center">
                    <div className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center flex-col ">
                      <div className="w-5 h-5">
                        <img src={plus} alt="plus" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wheels;
