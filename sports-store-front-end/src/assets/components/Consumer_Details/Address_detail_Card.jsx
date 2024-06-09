import React from 'react'

const Address_detail_Card = ({userInfo}) => {
  return (
    <div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
    <div className="flex items-start justify-between">
      <div className="flex flex-col flex-auto">
        <div className="text-black font-bold">Ship to</div>
        <div>{userInfo.name}{userInfo.lastname}</div>
        <div>
          {userInfo.street},{userInfo.postcode}
        </div>
        <div>{userInfo.country}</div>
        <div>{userInfo.phoneNumber}</div>
      </div>
   {userInfo.Address && userInfo.Address.includes("default") && <div className="bg-stone-100 text-gray-600 text-sm h-8 rounded text-center w-24 p-1">
      Default
    </div>}
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

export default Address_detail_Card
