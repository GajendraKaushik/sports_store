import React from 'react'

const Address_Detail_Form = ({handleClose}) => {
  
  return (
 <div className="w-full fixed z-1010 opacity-100">
    <div className="fixed p-2 overflow-hidden w-full md:w-[555px] h-full">
      <div className="flex justify-end">
        <div className=" p-4 flex w-auto flex-nowrap justify-end">
          <div className="bg-gray-300 flex justify-center items-center w-12 h-12 rounded relative">
            <div>
              <div
                onClick={handleClose}
                className="flex justify-center items-center text-3xl"
              >
                <ion-icon name="close-outline"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 h-full overflow-y-scroll scroll-smooth flex flex-col">
        <div className="mb-20 mr-8">
          <h3 className="text-3xl font-bold pb-10">Add Address</h3>
          <div className="pb-4">
            <form action="" className="p-3">
              <div className="flex w-full justify-start items-center gap-2 mb-2 ">
                <input
                  type="checkbox"
                  name="Shipping Address"
                  id="Shipping"
                  className="rounded-full border-[2px] w-5 h-5 accent-neutral-800"
                />
                <label htmlFor="Shipping" className="text-neutral-900 text-[18px]">Shipping address</label>
              </div>
              <div className="flex w-full justify-start items-center gap-2 mb-2 ">
                <input
                  type="checkbox"
                  defaultValue={true}
                  name="Billing address"
                  id="Billing"
                   className="rounded-full border-[2px] w-5 h-5 accent-neutral-800"
                />
                <label htmlFor="Shipping" className="text-neutral-900 text-[18px]">Billing address</label>
              </div>
            </form>
          </div>
          <form
            action=""
            className="pb-4 relative  flex flex-col gap-4"
          >
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="myInput"
                  required
                  className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                />
                <span
                  htmlFor="myInput"
                  className="floating-lable absolute left-3 top-3 text-gray-500"
                >
                  Country
                </span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="myInput"
                  required
                  className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                />
                <span
                  htmlFor="myInput"
                  className="floating-lable absolute left-3 top-3 text-gray-500"
                >
                  Name
                </span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="myInput"
                  required
                  className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                />
                <span
                  htmlFor="myInput"
                  className="floating-lable absolute left-3 top-3 text-gray-500"
                >
                  Last Name
                </span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="myInput"
                  required
                  className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                />
                <span
                  htmlFor="myInput"
                  className="floating-lable absolute left-3 top-3 text-gray-500"
                >
                  Phone number
                </span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="myInput"
                  required
                  className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                />
                <span
                  htmlFor="myInput"
                  className="floating-lable absolute left-3 top-3 text-gray-500"
                >
                  Street and address
                </span>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                id="myInput"
                required
                className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
              />
              <span
                htmlFor="myInput"
                className="floating-lable absolute left-3 top-3 text-gray-500"
              >
                Appartment or Suite Number
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                id="myInput"
                required
                className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
              />
              <span
                htmlFor="myInput"
                className="floating-lable absolute left-3 top-3 text-gray-500"
              >
                City
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                id="myInput"
                required
                className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
              />
              <span
                htmlFor="myInput"
                className="floating-lable absolute left-3 top-3 text-gray-500"
              >
                State/Region
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                id="myInput"
                required
                className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
              />
              <span
                htmlFor="myInput"
                className="floating-lable absolute left-3 top-3 text-gray-500"
              >
                post code
              </span>
            </div>
          </form>
          <div className="flex justify-start ml-1 mr-8 gap-3 mb-4">
              <input
                type="checkbox"
                name="Accept"
                id=""
                required
                className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
              />
              <div className="text-xl text-gray-600 font-light">
              Make this my default address
              </div>
            </div>
            <button className="w-full h-14 bg-neutral-300 text-neutral-600 font-semibold rounded-lg mb-4">
              Save Address
            </button>

            <div onClick={handleClose} className=" text-center underline text-neutral-900 font-semibold mb-4 cursor-pointer">Cancel</div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Address_Detail_Form
