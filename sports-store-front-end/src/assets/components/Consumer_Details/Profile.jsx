import React, {useRef, useState} from "react";
import UserDetailForm from "./UserDetailForm";

import { Button, Drawer } from "flowbite-react";

const Profile = () => {

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <>


      <Drawer open={isOpen} onClose={handleClose} position="right" bodyScrolling={false} className="w-full sm:w-[553px] p-5">
        <Drawer.Items>
        <UserDetailForm onClose={handleClose}/>
        </Drawer.Items>
      </Drawer>
   

      <div className={`bg-white ml-9 grid-col-1 p-12`}>
        <div className=" mt-28 h-20 text-3xl font-bold">Profile</div>
        <div className="grid md:grid-cols-2 gap-10 grid-cols-1">
          <div className="bg-white rounded-lg shadow-lg min-w-64 shadow-black">
            <div className="flex flex-col items-start justify-start gap-5 p-6">
              <p className="text-2xl font-bold">Your Info</p>
              <div>
                <p className="text-xl font-semibold">Name</p>
                <p>Gajendra Kaushik</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Email</p>
                <p>gajendrakaushik128@gmail.com</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Phone number</p>
                <p>9009142069</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Birthday</p>
                <p>18/04/2000</p>
              </div>
              <div>
                <p className="text-xl font-semibold">City</p>
                <p>Pune Maharashtra</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Country</p>
                <p>India</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Ridjing Styles</p>
                <p>Mountain, steet</p>
              </div>
              <button onClick={() => setIsOpen(true)} className="underline hover:text-red-600" type="button" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                Edit
              </button>
            </div>
          </div>
          <div className="bg-white">
            <div className="w-full h-52 bg-white rounded-lg shadow-lg shadow-black p-6">
              <p className="text-2xl font-bold mb-5">password</p>
              <div>*******</div>
              <button onClick={() => setIsOpen(true)} className="underline hover:text-red-600">
               Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
