import React,{useState} from 'react'
import InfoDetailCard from './InfoDetailCard'
import { Drawer } from 'flowbite-react'
import Wheel_Detail_Form from './Wheel_Detail_Form'

const Wheels = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

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
    <Wheel_Detail_Form handleClose={handleClose} />
  </Drawer.Items>
</Drawer> 
<div className="mb-12">
      <div className="lg:hidden block mt-16">
        <div className="pt-4 px-6 pb-px bg-stone-100 mt-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-light">Black</p>
            </div>
            <div className="underline font-semibold">Sign Out</div>
          </div>
          <div className="text-3xl text-center font-bold mb-10">
          Registered Wheels
          </div>
        </div>
      </div>

     <div className="bg-white grid-col-[repeat(1,minmax(min-content, max-content))] ">
      <div className="grid-cols-2 gap-5 hidden md:grid ml-11 mt-36">
        <div className="mx-2 mb-5">
           <div className="text-3xl font-bold">
            Registered Wheels
           </div>
        </div>
      </div>

      <div className="m-10"> 
        <div className="flex gap-6 justify-between bg-white shadow-3xl shadow-stone-100 flex-col md:flex-row p-5 rounded-md">
          <header>
            <p className='mb-5 w-auto'>Register your wheels within 30 days of purchase. Once your wheels are registered, your lifetime warranty and no-fault crash replacement will be activated in our system. We’ll also keep you informed about new products, promotions, and special events.</p>
          </header>
          <button onClick={setIsOpen} className="md:w-28 h-12 min-w-28 w-full bg-neutral-900 text-white hover:bg-neutral-400 object-cover rounded-md flex-grow">
            <span className=" hidden md:block">Register</span>
            <span className=" block md:hidden">Register Your Wheel</span>
            </button>
        </div>
      </div>
    <h3 className='ml-11 text-xl font-medium'>Your Wheels(0)</h3>
     <InfoDetailCard />

  </div>
  </div>
</>
  )
}

export default Wheels
