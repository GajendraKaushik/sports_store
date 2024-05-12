import React from 'react'

const  Button =(props) => {
  return (
    <button className='bg-slate-950 text-white font-[Popins] py-2 px-6 rounded md:ml-8 hover:bg-slate-200 duration-500'>
      {props.children}
    </button>
  )
}

export default Button
