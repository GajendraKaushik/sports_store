import React from 'react'

const CustomerDetail_Card = ({Logo, CardName}) => {
  return (
    <div className="min-h-36 rounded-md bg-white contrast-more:2xl flex flex-col justify-around items-center overflow-hidden p-4 hover:bg-opacity-0">
    <img src={Logo} alt="" className='w-9 h-9 font-extralight'/>
    <hr className="h-px w-full bg-slate-200"/>
    <div>{CardName}</div>
</div>
  )
}

export default CustomerDetail_Card;
