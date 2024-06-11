import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import CustomerDetail_Card from "../Consumer_Details/CustomerDetail_Card";
import about_user from "../../images/Icons/about_user.png";
import Bycicle from "../../images/Icons/bicycle.png";
import Payment from "../../images/Icons/credit-card-50.png";
import wheel from "../../images/Icons/Cycle-tire.png";
import location from "../../images/Icons/location-50.png";
import orderHistory from "../../images/Icons/Order-History.png";
import SaveForLatter from "../../images/bookmark.png";

import SideNavBtn from "../Consumer_Details/SideNavBtn";

const MyaccountRootLayout = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  })
  return (
<>
<div className="flex">
        <div className="mt-[73px] w-96 py-6 px-16 flex-col bg-stone-50 gap-5 text-center hidden lg:flex">
          <div className="">
            <div className="mr-3 my-2">My Account</div>
            <div className="text-3xl font-bold mr-3 my-3">User Name</div>
            <div className="flex flex-col justify-start gap-2">
              <SideNavBtn routePath={""} imgLogo={about_user} btnName={"Profile"} />
              <SideNavBtn routePath={"address"} imgLogo={location} btnName={"Address Book"} />
              <SideNavBtn routePath={"Oders"} imgLogo={orderHistory} btnName={"Order History"} />
              <SideNavBtn routePath={"PaymentMethods"} imgLogo={Payment} btnName={"Payment Methods"} />
              <SideNavBtn routePath={"Wishlist"} imgLogo={SaveForLatter} btnName={"Saved For Later"} />
              <SideNavBtn routePath={"bikes"} imgLogo={Bycicle} btnName={"Registered Bikes"} />
              <SideNavBtn routePath={"Wheels"} imgLogo={wheel} btnName={"Registered Wheels"} />   
            </div>

            <NavLink to={'/'} className="mr-3 underline">Sign Out</NavLink>
          </div>
        </div>

      <div className="cardcontainer w-full bg-white">
        <main>
          <Outlet />
        </main>
      </div>
      </div>

      {/* <div className="bg-stone-100 lg:hidden block">
        <div className="w-full mt-28 bg-stone-100">
          <div className=" flex items-center justify-between m-4">
            <p>My Account</p>
            <a href="">Sign Out</a>
          </div>
          <h3 className="text-center font-extrabold text-3xl">CustomerName</h3>

          <div className="flex justify-center items-center mb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5  flex-wrap w-full m-11 md:mx-36 md:mt-20 lg:m-10">
            <CustomerDetail_Card Logo={about_user} CardName={"Profile"} routePath={"profile"}/>
              <CustomerDetail_Card Logo={location} CardName={"Address Book"}  routePath={"/myaccout/address"}/>
              <CustomerDetail_Card
                Logo={orderHistory}
                CardName={"Order History"}
                routePath={"Oders"}
              />
              <CustomerDetail_Card
                Logo={Payment}
                CardName={"Payment Methods"}
                routePath={"PaymentMethods"}
              />
              <CustomerDetail_Card
                Logo={SaveForLatter}
                CardName={"Saved For Later"}
                routePath={"Wishlist"}
              />
              <CustomerDetail_Card
                Logo={Bycicle}
                CardName={"Registered Bikes"}
                routePath={"Bikes"}
              />
              <CustomerDetail_Card
                Logo={wheel}
                CardName={"Registered Wheels"}
                routePath={"Wheels"}
              />
            </div>
          </div>
        </div>
      </div> */}

</>
  )
}

export default MyaccountRootLayout
