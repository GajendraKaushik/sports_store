import React, { useState } from "react";
import plus from "../../images/Icons/plus.png";
import {Drawer } from "flowbite-react";
import Address_Detail_Form from "./Address_Detail_Form";
import Address_detail_Card from "./Address_detail_Card";


const Address = () => {
  let user_address = []
  let BillingAddress = []
  let ShippingAddress = []
  const [isOpen, setIsOpen] = useState(true);
  const [userInfo, setUserInfo] = useState(user_address)
  const handleUserAddress = (updatedAddress) =>{
    setUserInfo(updatedAddress)
  }
  userInfo.map((addre) =>{
    if(addre.address === "Billing"){
      BillingAddress.push(JSON.parse(JSON.stringify(addre)))
    }
    if(addre.address ==="Shipping"){
      ShippingAddress.push(addre)
     }

  } )
  // if(userInfo.address === "Billing"){
  //   BillingAddress.push(JSON.parse(JSON.stringify(userInfo)))
  // }
  // if(userInfo.address ==="Shipping"){
  //   ShippingAddress.push(userInfo)
  //  }

  console.log(BillingAddress, "Billing", BillingAddress.length)

  const handleClose = () => setIsOpen(false);
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
                <p className="text-xl font-light">
                  <span>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                  </span>
                  Black
                </p>
              </div>
              <div className="underline font-semibold">Sign Out</div>
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
            <h3 className="px-6 font-semibold mt-5">Shipping Addresses (2)</h3>
            <div className=" grid gap-6 grid-cols-[repeat(3,minmax(370px,1fr))] md:grid-cols-[repeat(2,minmax(100px,1fr))] md:grid-rows-1 overflow-x-auto p-10">
              <div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col flex-auto">
                    <div className="text-black font-bold">Ship to</div>
                    <div>Gajendra Kauhik</div>
                    <div>
                      Sai Poorna Luxuria, Harlur Main Road Tower - 3 Flat Number
                      010 bilaspur , Idaho 560068
                    </div>
                    <div>United States</div>
                    <div>09009142069</div>
                  </div>
                  <div className="bg-stone-100 text-gray-600 text-sm h-8 rounded text-center w-24 p-1">
                    Default
                  </div>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <button className=" hover:text-red-600 font-semibold underline">
                    Edit
                  </button>
                  <button className=" hover:text-red-600 font-semibold underline">
                    Remove
                  </button>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col flex-auto">
                    <div className="text-black font-bold">Ship to</div>
                    <div>Gajendra Kauhik</div>
                    <div>
                      Sai Poorna Luxuria, Harlur Main Road Tower - 3 Flat Number
                      010 bilaspur , Idaho 560068
                    </div>
                    <div>United States</div>
                    <div>09009142069</div>
                  </div>
                  <div className="bg-stone-100 text-gray-600 text-sm h-8 rounded text-center w-24 p-1">
                    Default
                  </div>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <button className=" hover:text-red-600 font-semibold underline">
                    Edit
                  </button>
                  <button className=" hover:text-red-600 font-semibold underline">
                    Remove
                  </button>
                </div>
              </div>
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
            <div className=" grid gap-6 grid-cols-[repeat(3,minmax(370px,1fr))] md:grid-cols-[repeat(2,minmax(100px,1fr))] md:grid-rows-1 overflow-x-auto p-10">
            {BillingAddress && BillingAddress.map((address)=> <Address_detail_Card userInfo={address} key={address.appartmentNumber}/>) }

              {/* <div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col flex-auto">
                    <div className="text-black font-bold">Ship to</div>
                    <div>{userInfo.name}{userInfo.lastname}</div>
                    <div>
                      {userInfo.street},{userInfo.postcode}
                    </div>
                    <div>{userInfo.country}</div>
                    <div>{userInfo.phoneNumber}</div>
                  </div>
               {userInfo.Address && userInfo.Address.includes("default") && <div className="bg-stone-100 text-gray-600 text-sm h-8 rounded text-center w-24 p-1">
                  Default
                </div>}
                </div>
                <div className="flex items-center justify-start gap-4">
                  <button className=" hover:text-red-600 font-semibold underline">
                    Edit
                  </button>
                  <button className=" hover:text-red-600 font-semibold underline">
                    Remove
                  </button>
                </div>
              </div> */}
              {/* <div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col flex-auto">
                    <div className="text-black font-bold">Ship to</div>
                    <div>Gajendra Kauhik</div>
                    <div>
                      Sai Poorna Luxuria, Harlur Main Road Tower - 3 Flat Number
                      010 bilaspur , Idaho 560068
                    </div>
                    <div>United States</div>
                    <div>09009142069</div>
                  </div>
                  <div className="bg-stone-100 text-gray-600 text-sm h-8 rounded text-center w-24 p-1">
                    Default
                  </div>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <button className=" hover:text-red-600 font-semibold underline">
                    Edit
                  </button>
                  <button className=" hover:text-red-600 font-semibold underline">
                    Remove
                  </button>
                </div>
              </div> */}
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
