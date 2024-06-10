import React, {useRef, useState} from "react";
import UserDetailForm from "./UserDetailForm";

import {Drawer} from "flowbite-react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  let user_info = {}

  const [userInfo, setUserInfo] = useState(user_info)
  const [isOpen, setIsOpen] = useState(false);
  console.log(userInfo)
  const handleUserInfo = (userDetail) =>{
    setUserInfo((prevState)=>{
      if(prevState){
        if(prevState.name !== userDetail.name){
          prevState.name= userDetail.name
        }
        if(prevState.email !== userDetail.email){
          prevState.email= userDetail.email
        }
        if(prevState.PhoneNumber !== userDetail.PhoneNumber){
          prevState.PhoneNumber= userDetail.PhoneNumber
        }
        if(prevState.dob!== userDetail.dob){
          prevState.dob= userDetail.dob
        }
        if(prevState.city !== userDetail.city){
          prevState.city= userDetail.city
        }
        if(prevState.country !== userDetail.country){
          prevState.country= userDetail.country
        }
        if(prevState.Ridjing_Styles !== userDetail.Ridjing_Styles){
          prevState.Ridjing_Styles= userDetail.Ridjing_Styles
        }
        return{...prevState}
      }{
        return userDetail
      }
    })
  }
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} position="right" className="w-full sm:w-[553px] p-5">
        <Drawer.Items>
        <UserDetailForm onClose={handleClose} handleUserInfo={handleUserInfo} userInfo={userInfo} />
        </Drawer.Items>
      </Drawer>
      <div className="lg:hidden block mt-16">
          <div className="pt-4 px-6 pb-px bg-stone-100 mt-3">
            <div className="flex items-center justify-between">
              <div>
                <NavLink to={"/account"} className="text-xl font-light">
                  <span>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                  </span>
                  Black
                </NavLink>
              </div>
              <div className="underline font-semibold">Sign Out</div>
            </div>
            <div className="text-3xl text-center font-bold mb-10">
              Address Book
            </div>
          </div>
        </div>

      <div className={`bg-white ml-9 grid-col-1 p-12`}>

        <div className=" mt-28 h-20 text-3xl font-bold">Profile</div>
        <div className="grid md:grid-cols-2 gap-10 grid-cols-1">
          <div className="bg-white rounded-lg shadow-lg min-w-64 shadow-black">
            <div className="flex flex-col items-start justify-start gap-5 p-6">
              <p className="text-2xl font-bold">Your Info</p>
              <div>
                <p className="text-xl font-semibold">Name</p>
                <p>{userInfo.name}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Email</p>
                <p>{userInfo.email}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Phone number</p>
                <p>{userInfo.PhoneNumber}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Birthday</p>
                <p>{userInfo.dob}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">City</p>
                <p>{userInfo.city}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Country</p>
                <p>{userInfo.country}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Ridjing Styles</p>
                <p>{userInfo.Ridjing_Styles && userInfo.Ridjing_Styles.join(", ")}</p>
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
