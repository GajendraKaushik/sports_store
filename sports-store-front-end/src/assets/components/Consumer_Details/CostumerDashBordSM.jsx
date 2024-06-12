import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { useLocation } from 'react-router-dom';

import CustomerDetail_Card from "./CustomerDetail_Card";
import about_user from "../../images/Icons/about_user.png";
import Bycicle from "../../images/Icons/bicycle.png";
import Payment from "../../images/Icons/credit-card-50.png";
import wheel from "../../images/Icons/Cycle-tire.png";
import location from "../../images/Icons/location-50.png";
import orderHistory from "../../images/Icons/Order-History.png";
import SaveForLatter from "../../images/bookmark.png";

import SideNavBtn from "./SideNavBtn";
import Profile from "./Profile";

const CostumerDashBordSM = ({}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  })
 const location  = useLocation()

 console.log(location, "location")
 
 if("/myaccout" !== location.pathname){
return(
  <div >
  <main>
    <Outlet/>
  </main>
</div>
)
 }else{
  return (
    
    <div className="bg-stone-100 relative">
      <div className="w-full mt-28 bg-stone-100">
        <div className=" flex items-center justify-between m-4">
          <p>My Account</p>
          <a href="">Sign Out</a>
        </div>
        <h3 className="text-center font-extrabold text-3xl">CustomerName</h3>

        <div className="flex justify-center items-center mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5  flex-wrap w-full m-11 md:mx-36 md:mt-20 lg:m-10">
          <CustomerDetail_Card Logo={about_user} CardName={"Profile"} routePath={"profile"}/>
              <CustomerDetail_Card Logo={location} CardName={"Address Book"}  routePath={"address"}/>
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
    </div>
  );
};}

export default CostumerDashBordSM;
