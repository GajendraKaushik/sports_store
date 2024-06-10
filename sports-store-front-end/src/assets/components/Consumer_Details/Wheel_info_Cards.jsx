import React from 'react'


const Wheel_info_Cards = ({wheelInfo}) => {
  return (
<div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
      <div className="flex items-start justify-between">
        <div className="flex flex-col flex-auto">
          <div className="text-black font-bold">{wheelInfo.purchaseId}</div>
          <div>{wheelInfo.wheelName}</div>
          <div>Serial NO: {wheelInfo.serialNumber}</div>
          <div>Purchased on : {wheelInfo.purchaseDate}</div>
          <div>{wheelInfo.purchaseLocation}</div>
        </div>
 
      </div>
      <div className="flex items-center justify-start gap-4">
        <button className=" hover:text-red-600 font-semibold underline">
          Edit
        </button>
        <button className=" hover:text-red-600 font-semibold underline">
          Remove
        </button>
      </div>
    </div>

  )
}

export default Wheel_info_Cards
