import React from 'react'

// I08: renders one registered bike from GET /account/bikes.
// Edit/Remove omitted — registration updates are out of scope (no endpoints).
const InfoDetailCard = ({ bikeInfo }) => {
  return (
    <div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
      <div className="flex items-start justify-between">
        <div className="flex flex-col flex-auto">
          <div className="text-black font-bold">{bikeInfo.bikeName}</div>
          <div>Serial NO: {bikeInfo.serialNumber}</div>
          {bikeInfo.modelYear ? <div>Model Year: {bikeInfo.modelYear}</div> : null}
          <div>
            Purchased on :{' '}
            {bikeInfo.purchaseDate
              ? new Date(bikeInfo.purchaseDate).toLocaleDateString()
              : "—"}
          </div>
          <div>{bikeInfo.purchaseLocation || "—"}</div>
        </div>

      </div>
    </div>

  )
}

export default InfoDetailCard
