import React from 'react'
import plus from "../../images/Icons/plus.png"


const InfoDetailCard = ({bikeInfo}) => {
  return (
    <div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
      <div className="flex items-start justify-between">
        <div className="flex flex-col flex-auto">
          <div className="text-black font-bold">{bikeInfo.purchaseId}</div>
          <div>{bikeInfo.bikeName}</div>
          <div>Serial NO: {bikeInfo.serialNumber}</div>
          <div>Purchased on : {bikeInfo.purchaseDate}</div>
          <div>{bikeInfo.purchaseLocation}</div>
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

export default InfoDetailCard
