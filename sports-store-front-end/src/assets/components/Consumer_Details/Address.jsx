import React, { useCallback, useEffect, useState } from "react";
import plus from "../../images/Icons/plus.png";
import {Drawer } from "flowbite-react";
import Address_Detail_Form from "./Address_Detail_Form";
import Address_detail_Card from "./Address_detail_Card";
import { useNavigate } from "react-router-dom";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../../../api/accountApi.js";
import { useAuth } from "../../../lib/AuthContext.jsx";

// I07: address book reads/writes /account/addresses* (list/create/update/
// delete/set-default). Backend fields: label,type,fullName,line1,line2,
// city,state,postalCode,country,phone,isDefault.
const Address = () => {
  const navigate = useNavigate()
  const { logout } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const load = useCallback(() => {
    getAddresses()
      .then((data) => setAddresses(data?.addresses ?? []))
      .catch((err) =>
        setLoadError(err?.message ?? "Could not load addresses"),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleClose = () => {
    setIsOpen(false);
    setEditing(null);
  };
  const openAdd = () => {
    setEditing(null);
    setIsOpen(true);
  };
  const openEdit = (address) => {
    setEditing(address);
    setIsOpen(true);
  };

  const handleUpsert = async (payload) => {
    if (editing?.id) {
      await updateAddress(editing.id, payload);
    } else {
      await createAddress(payload);
    }
    handleClose();
    await load();
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm("Remove this address?")) return;
    await deleteAddress(addressId);
    await load();
  };

  const handleSetDefault = async (addressId) => {
    await updateAddress(addressId, {
      isDefault: true,
    });
    await load();
  };

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const goBack =()=>{
    navigate(-1)
  }

  const shippingAddresses = addresses.filter((a) => a.type === "shipping" || !a.type);
  const billingAddresses = addresses.filter((a) => a.type === "billing");

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-full md:w-[553px] p-5 "
      >
        <Drawer.Items>
          <Address_Detail_Form
            initial={editing}
            onSave={handleUpsert}
            onClose={handleClose}
          />
        </Drawer.Items>
      </Drawer>
      <div className="bg-white grid-col-[repeat(1,minmax(min-content, max-content))]">
        <div className="lg:hidden block">
          <div className="pt-4 px-6 pb-px bg-stone-100 mt-3">
            <div className="flex items-center justify-between">
              <div>
                <p onClick={goBack} className="text-xl font-light">
                  <span>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                  </span>
                  Black
                </p>
              </div>
              <div onClick={handleSignOut} className="underline font-semibold hover:text-red-600 cursor-pointer">Sign Out</div>
            </div>
            <div className="text-3xl text-center font-bold mb-10">
              Address Book
            </div>
          </div>
        </div>
        <div className="hidden lg:block ml-11">
          <div className="pt-4 px-6 pb-px bg-white mt-3 flex items-center justify-between">
            <div className="text-3xl text-center font-bold">Address Book</div>

            <div className="p-5">
              <button
                onClick={openAdd}
                className={
                  "md:w-28 w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold rounded-md"
                }
                type="button"
                data-drawer-target="drawer-right-example"
                data-drawer-show="drawer-right-example"
                data-drawer-placement="right"
                aria-controls="drawer-right-example"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>

        {loadError ? (
          <div className="ml-11 mt-5"><p className="text-red-600">{loadError}</p></div>
        ) : loading ? (
          <div className="ml-11 mt-5"><p>Loading addresses…</p></div>
        ) : null}

        <div className="bg-white">
          <div className="ml-11">
            <h3 className="px-6 font-semibold mt-5">Shipping Addresses [{shippingAddresses.length}]</h3>
            <div className={`grid gap-6 grid-cols-[repeat(${shippingAddresses.length + 1},minmax(370px,1fr))] md:grid-cols-[repeat(2,minmax(100px,1fr))] md:grid-rows-1 overflow-x-auto p-10`}>
            {shippingAddresses.map((address) => (
              <Address_detail_Card
                address={address}
                key={address.id}
                onEdit={() => openEdit(address)}
                onRemove={() => handleDelete(address.id)}
                onSetDefault={() => handleSetDefault(address.id)}
              />
            ))}

              <div onClick={openAdd} className="border-dashed border-gray-400 border-2 bg-white min-w-56 min-h-52  rounded-md cursor-pointer p-6">
                <div className="flex flex-col h-full items-center justify-center">
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

        <div className="bg-white">
          <div className="ml-11">
            <h3 className="px-6 font-semibold mt-5">Billing Addresses [{billingAddresses.length}]</h3>
            <div className={`grid gap-6 grid-cols-[repeat(${billingAddresses.length + 1},minmax(370px,1fr))] md:grid-cols-[repeat(2,minmax(100px,1fr))] md:grid-rows-1 overflow-x-auto p-10`}>
            {billingAddresses.map((address) => (
              <Address_detail_Card
                address={address}
                key={address.id}
                onEdit={() => openEdit(address)}
                onRemove={() => handleDelete(address.id)}
                onSetDefault={() => handleSetDefault(address.id)}
              />
            ))}
              <div onClick={openAdd} className="border-dashed border-gray-400 border-2 bg-white min-w-56 min-h-52  rounded-md cursor-pointer p-6">
                <div className="flex flex-col h-full items-center justify-center">
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

        <div className="ml-11 p-5 block md:hidden">
          <button
            onClick={openAdd}
            className="md:w-28 w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold mb-10 rounded-md"
          >
            Add Address
          </button>
        </div>
      </div>
    </>
  );
};

export default Address;