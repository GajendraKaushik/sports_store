import React from "react";
import { NavLink } from "react-router-dom";

const CustomerDetail_Card = ({ Logo, CardName, routePath }) => {
  return (
    <NavLink to={routePath} 
      className="min-h-36 rounded-md bg-white contrast-more:2xl flex flex-col justify-around items-center overflow-hidden p-4 hover:bg-opacity-0"
    >
      <img src={Logo} alt="" className="w-9 h-9 font-extralight" />
      <hr className="h-px w-full bg-slate-200" />
      <div>{CardName}</div>
    </NavLink>
  );
};

export default CustomerDetail_Card;
