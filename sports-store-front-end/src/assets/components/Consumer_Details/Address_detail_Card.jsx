import React from 'react'

const Address_detail_Card = ({address, onEdit, onRemove, onSetDefault}) => {
  return (
    <div className="p-5 flex flex-col gap-5 shadow-3xl shadow-stone-200 rounded-md">
    <div className="flex items-start justify-between">
      <div className="flex flex-col flex-auto">
        <div className="text-black font-bold">{address.fullName}</div>
        <div>{address.line1}{address.line2 ? `, ${address.line2}` : ""}</div>
        <div>{address.city}{address.state ? `, ${address.state}` : ""} {address.postalCode}</div>
        <div>{address.country}</div>
        <div>{address.phone}</div>
      </div>
   {address.isDefault && <div className="bg-stone-100 text-gray-600 text-sm h-8 rounded text-center w-24 p-1">
      Default
    </div>}
    </div>
    <div className="flex items-center justify-start gap-4">
      <button onClick={onEdit} className=" hover:text-red-600 font-semibold underline">
        Edit
      </button>
      {!address.isDefault && (
        <button onClick={onSetDefault} className=" hover:text-red-600 font-semibold underline">
          Set as default
        </button>
      )}
      <button onClick={onRemove} className=" hover:text-red-600 font-semibold underline">
        Remove
      </button>
    </div>
  </div>
  )
}

export default Address_detail_Card