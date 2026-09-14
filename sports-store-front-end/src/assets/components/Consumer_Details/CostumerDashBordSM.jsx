import React from "react";
import { NavLink } from "react-router-dom";

import CustomerDetail_Card from "./CustomerDetail_Card";
import about_user from "../../images/Icons/about_user.png";
import Bycicle from "../../images/Icons/bicycle.png";
import Payment from "../../images/Icons/credit-card-50.png";
import wheel from "../../images/Icons/Cycle-tire.png";
import location from "../../images/Icons/location-50.png";
import orderHistory from "../../images/Icons/Order-History.png";
import SaveForLatter from "../../images/bookmark.png";

// U16: mobile account overview screen. This component is the index route of
// /account, so it renders purely from nested routing — no useLocation /
// pathname string checks. Nested pages (profile, orders, ...) render through
// the parent layout's <Outlet/> instead.
const CostumerDashBordSM = () => {
  return (
    <div className="bg-stone-100 relative">
      <div className="w-full bg-stone-100">
        <div className=" flex items-center justify-between m-4">
          <p>My Account</p>
          <NavLink to="/auth/login">Sign Out</NavLink>
        </div>
        <h3 className="text-center font-extrabold text-3xl">CustomerName</h3>

        <div className="flex justify-center items-center mb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5  flex-wrap w-full m-11 md:mx-36 md:mt-20 lg:m-10">
          <CustomerDetail_Card Logo={about_user} CardName={"Profile"} routePath={"profile"}/>
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
  );
};

export default CostumerDashBordSM;
