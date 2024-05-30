import React from 'react'
import { NavLink } from 'react-router-dom'

const SideNavBtn = ({imgLogo, btnName, routePath}) => {
  return (
    <NavLink to={routePath} className={({isActive})=>isActive ? "CustomerDetaiCardActive": "CustomerDetaiCard"} end>
    <img
      src={imgLogo}
      alt=""
      className="w-7 h-7 ml-1"
    />
    <div className="">{btnName}</div>
  </NavLink>
  )
}

export default SideNavBtn
