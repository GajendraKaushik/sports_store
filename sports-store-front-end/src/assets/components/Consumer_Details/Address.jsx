import React, { useState } from "react";
import plus from "../../images/Icons/plus.png";
import {Drawer } from "flowbite-react";
import Address_Detail_Form from "./Address_Detail_Form";
import Address_detail_Card from "./Address_detail_Card";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Address = () => {
  let user_address = []
  let BillingAddress = []
  let ShippingAddress = []

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(user_address)
  const handleUserAddress = (updatedAddress) =>{
    setUserInfo(updatedAddress)
  }
  userInfo.map((addre) =>{
    if(addre.address === "Billing"){
      BillingAddress.push(JSON.parse(JSON.stringify(addre)))
    }
    if(addre.address ==="Shipping"){
      ShippingAddress.push(JSON.parse(JSON.stringify(addre)))
     }

  } )
  // console.log(BillingAddress, "Billing", BillingAddress.length)

  console.log(window.innerWidth, "widht")



  const handleClose = () => setIsOpen(false);

  const goBack =()=>{
    navigate(-1)
  }
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-full md:w-[553px] p-5 "
      >
        <Drawer.Items>
          <Address_Detail_Form handleClose={handleClose} handleUserAddress={handleUserAddress} />
        </Drawer.Items>
      </Drawer>
      <div className="bg-white grid-col-[repeat(1,minmax(min-content, max-content))] mt-16">
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
              <div className="underline font-semibold hover:text-red-600">Sign Out</div>
            </div>
            <div className="text-3xl text-center font-bold mb-10">
              Address Book
            </div>
          </div>
        </div>
        <div className="hidden lg:block ml-11 mt-24">
          <div className="pt-4 px-6 pb-px bg-white mt-3 flex items-center justify-between">
            <div className="text-3xl text-center font-bold">Address Book</div>

            <div className="p-5">
              <button
                onClick={() => setIsOpen(true)}
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

        <div className="bg-white">
          <div className="ml-11">
            <h3 className="px-6 font-semibold mt-5">Shipping Addresses [{ShippingAddress.length}]</h3>
            <div className={`grid gap-6 grid-cols-[repeat(${ShippingAddress.length + 1},minmax(370px,1fr))] md:grid-cols-[repeat(2,minmax(100px,1fr))] md:grid-rows-1 overflow-x-auto p-10`}>
            {ShippingAddress && ShippingAddress.map((address)=> <Address_detail_Card userInfo={address} key={address.appartmentNumber}/>) }

              <div onClick={() => setIsOpen(true)} className="border-dashed border-gray-400 border-2 bg-white min-w-56 min-h-52  rounded-md cursor-pointer p-6">
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
            <h3 className="px-6 font-semibold mt-5">Billing Addresses [{BillingAddress.length}]</h3>
            <div className={`grid gap-6 grid-cols-[repeat(${BillingAddress.length + 1},minmax(370px,1fr))] md:grid-cols-[repeat(2,minmax(100px,1fr))] md:grid-rows-1 overflow-x-auto p-10`}>
            {BillingAddress && BillingAddress.map((address)=> <Address_detail_Card userInfo={address} key={address.appartmentNumber}/>) }
              <div onClick={() => setIsOpen(true)} className="border-dashed border-gray-400 border-2 bg-white min-w-56 min-h-52  rounded-md cursor-pointer p-6">
                <div className="flex flex-col h-full items-center justify-center">
                  <div className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center flex-col ">
                    <div className="w-5 h-5">
                      {/* <ion-icon name="add-outline"></ion-icon> */}
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
            onClick={() => setIsOpen(true)}
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
