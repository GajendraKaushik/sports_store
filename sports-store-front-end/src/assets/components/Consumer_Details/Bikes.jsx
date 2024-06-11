import React,{useState} from "react";
import InfoDetailCard from "./InfoDetailCard";
import plus from "../../images/Icons/plus.png";
import { Drawer } from "flowbite-react";
import Bike_Detail_Form from "./Bike_Detail_Form";
import Address_detail_Card from "./Address_detail_Card";
import { useNavigate } from "react-router-dom";

const BiKes = () => {

  const navigate = useNavigate()
  const [registeredBikes, setRegisteredBikes] = useState([])

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

 const handleRegisteredBikesDetails = (updatedDetails) =>{
  setRegisteredBikes(updatedDetails)
 }

 const goBack =()=>{
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
    <Bike_Detail_Form handleClose={handleClose} handleRegisteredBikesDetails={handleRegisteredBikesDetails}  />
  </Drawer.Items>
</Drawer>  
     <div className="mb-12">
      <div className="lg:hidden block mt-16">
        <div className="pt-4 px-6 pb-px bg-stone-100 mt-3">
          <div className="flex items-center justify-between">
            <div className="flex justify-start mt-3 gap-0 hover:text-red-600">
            <span className="text-2xl font-light pt-1"><ion-icon name="chevron-back-outline"></ion-icon></span>
            <p onClick={goBack} className="text-xl font-light">Black</p>
            </div>
            <div className="underline font-semibold hover:text-red-600">Sign Out</div>
          </div>
          <div className="text-3xl text-center font-bold mb-10">
            Address Book
          </div>
        </div>
      </div>

     <div className="bg-white grid-col-[repeat(1,minmax(min-content, max-content))] ">
      <div className="grid-cols-2 gap-5 hidden md:grid ml-11 mt-36">
        <div className="mx-2 mb-5">
           <div className="text-3xl font-bold">
            Registered Bike
           </div>
        </div>
      </div>

      <div className="m-10"> 
        <div className="flex gap-4 justify-between bg-white shadow-3xl shadow-stone-100 flex-col md:flex-row p-5 rounded-md">
          <header>
            <h6 className="text-xl mb-3 font-semibold">Register a new product</h6>
            <p>Make sure to register your bike before your first ride to activate your lifetime frame warranty.</p>
          </header>
          <button onClick={setIsOpen} className="md:w-28 h-12 w-full bg-neutral-900 text-white hover:bg-neutral-400 object-cover rounded-md">
            <span   className=" hidden md:block">Register</span>
            <span  className=" block md:hidden">Register Your Bike</span>
            </button>
        </div>
      </div>

      <div className="bg-white">
          <div className="ml-11">
            <h3 className="px-6 font-semibold mt-5">Shipping Addresses [{registeredBikes.length}]</h3>
            <div className={`grid gap-6 grid-cols-[repeat(${registeredBikes.length + 1},minmax(370px,1fr))] md:grid-cols-[repeat(2,minmax(100px,1fr))] md:grid-rows-1 overflow-x-auto p-10`}>
            {registeredBikes && registeredBikes.map((address)=> <InfoDetailCard bikeInfo={address} key={address.appartmentNumber}/>)}
            
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

  </div>
  </div>

  </>
)
};

export default BiKes;
