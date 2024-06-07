import React from 'react'

const Payment_Detail_Form = ({handleClose}) => {
  return (
    <div className="w-full fixed z-1010 opacity-100">
    <div></div>
    <div className="fixed p-6 overflow-hidden w-full md:w-[555px] h-full">
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
        <div className='Strip Payment pb-8'>
            <h2 className='text-4xl font-bold'>Add Payment Method</h2>
            <div>
                Payment details
            </div>
        </div>
          <h3 className="text-3xl font-bold pb-10"s>Billing Address</h3>
          <div className="pb-4">

          </div>
          <form
            action=""
            className="mb-16 relative  flex flex-col gap-4"
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
          
            <button className="w-full h-14 bg-neutral-300 text-neutral-600 font-semibold rounded-lg mb-0">
              Add payment Method
            </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Payment_Detail_Form
