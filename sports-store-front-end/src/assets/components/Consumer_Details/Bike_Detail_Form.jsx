import React from 'react'

const Bike_Detail_Form = ({handleClose}) => {

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
          <h3 className="text-3xl font-bold pb-10">Bike Registration</h3>
          <form
            action=""
            className="pb-8 relative  flex flex-col gap-4"
          >  
           <h4 className='py-3 font-semibold'>Your Information</h4>
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
                  type="email"
                  id="myInput"
                  required
                  className="input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2"
                />
                <span
                  htmlFor="myInput"
                  className="floating-lable absolute left-3 top-3 text-gray-500"
                >
                  Email
                </span>
              </div>
            </div>
            <h4 className='py-3 font-semibold'>Bike Information</h4>
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
                  Serial Number
                </span>
              </div>
            </div>

          </form>
            <button className="w-full h-14 bg-neutral-300 text-neutral-600 font-semibold rounded-lg mb-4">
            Registre Your Bike
            </button>

            <div  onClick={handleClose} className=" text-center underline text-neutral-900 font-semibold mb-4 cursor-pointer">Cancel</div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Bike_Detail_Form
