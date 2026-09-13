import React from 'react'

// I08: renders one registered wheelset from GET /account/wheels.
// Edit/Remove omitted — registration updates are out of scope (no endpoints).
const Wheel_info_Cards = ({wheelInfo}) => {
  return (
<div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
      <div className="flex items-start justify-between">
        <div className="flex flex-col flex-auto">
          <div className="text-black font-bold">{wheelInfo.wheelName}</div>
          <div>Serial NO: {wheelInfo.serialNumber}</div>
          {wheelInfo.purchaseId ? <div>Purchase ID: {wheelInfo.purchaseId}</div> : null}
          <div>
            Purchased on :{' '}
            {wheelInfo.purchaseDate
              ? new Date(wheelInfo.purchaseDate).toLocaleDateString()
              : "—"}
          </div>
          <div>{wheelInfo.purchaseLocation || "—"}</div>
        </div>

      </div>
    </div>

  )
}

export default Wheel_info_Cards
