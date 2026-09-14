import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import CustomerDetail_Card from "./CustomerDetail_Card.jsx";
import about_user from "../../images/Icons/about_user.png";
import Bycicle from "../../images/Icons/bicycle.png";
import Payment from "../../images/Icons/credit-card-50.png";
import wheel from "../../images/Icons/Cycle-tire.png";
import location from "../../images/Icons/location-50.png";
import orderHistory from "../../images/Icons/Order-History.png";
import SaveForLatter from "../../images/bookmark.png";

import SideNavBtn from "./SideNavBtn";
import Profile from "./Profile";

const CostumerDashbord = () => {
  return (
    <>
      <div className="flex">
        <div className="w-96 py-6 px-16 flex-col bg-slate-500 gap-5 text-center hidden lg:flex">
          <div className="">
            <div className="mr-3 my-4">My Account</div>
            <div className="text-3xl font-bold mr-3 my-7">User Name</div>
            <div className="flex flex-col justify-start gap-2">
              <SideNavBtn routePath={""} imgLogo={about_user} btnName={"Profile"} />
              <SideNavBtn routePath={"addresses"} imgLogo={location} btnName={"Address Book"} />
              <SideNavBtn routePath={"orders"} imgLogo={orderHistory} btnName={"Order History"} />
              <SideNavBtn routePath={"payment-methods"} imgLogo={Payment} btnName={"Payment Methods"} />
              <SideNavBtn routePath={"wishlist"} imgLogo={SaveForLatter} btnName={"Saved For Later"} />
              <SideNavBtn routePath={"bikes"} imgLogo={Bycicle} btnName={"Registered Bikes"} />
              <SideNavBtn routePath={"wheels"} imgLogo={wheel} btnName={"Registered Wheels"} />   
            </div>

            <NavLink to={'/auth/login'} className="mr-3 underline">Sign Out</NavLink>
          </div>
        </div>

        <div className="cardcontainer w-full bg-white">
          <main>
            <Outlet />
          </main>
        </div>
      </div>

      <div className="bg-stone-100 lg:hidden block">
        <div className="w-full bg-stone-100">
          <div className=" flex items-center justify-between m-4">
            <p>My Account</p>
            <NavLink to="/auth/login">Sign Out</NavLink>
          </div>
          <h3 className="text-center font-extrabold text-3xl">CustomerName</h3>

          <div className="flex justify-center items-center mb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5  flex-wrap w-full m-11 md:mx-36 md:mt-20 lg:m-10">
              <CustomerDetail_Card Logo={about_user} CardName={"Profile"} routePath={""}/>
              <CustomerDetail_Card Logo={location} CardName={"Address Book"}  routePath={"addresses"}/>
              <CustomerDetail_Card
                Logo={orderHistory}
                CardName={"Order History"}
                routePath={"orders"}
              />
              <CustomerDetail_Card
                Logo={Payment}
                CardName={"Payment Methods"}
                routePath={"payment-methods"}
              />
              <CustomerDetail_Card
                Logo={SaveForLatter}
                CardName={"Saved For Later"}
                routePath={"wishlist"}
              />
              <CustomerDetail_Card
                Logo={Bycicle}
                CardName={"Registered Bikes"}
                routePath={"bikes"}
              />
              <CustomerDetail_Card
                Logo={wheel}
                CardName={"Registered Wheels"}
                routePath={"wheels"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostumerDashbord;
