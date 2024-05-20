import React from 'react'

const ResponsiveSideNavbar = () => {
  return (
    <div className=' bg-white ml-12 mt-8'>
        <div className='flex items-start justify-evenly flex-col'>
            <div className='text-3xl font-bold italic uppercase'>Sports store</div>
            <div className='text-gray-700 font-bold'>Bike</div>
            <div className='text-gray-700 font-bold'>Parts</div>
            <div className='text-gray-700 font-bold'>Apparel</div>
            <div className='text-gray-700 font-bold'>Accessaries</div>
            <div className='text-gray-700 font-bold'>Sale</div>
            <div className='text-gray-700 font-bold'>Inside Specialized</div>
            <div className='text-gray-700 font-bold'> Support</div>
        </div>
        <hr className='h-1  bg-slate-500'/>
        <div className='flex flex-col items-start justify-start w-full'>
            <div className='flex items-center justify-between'>
                <div className='text-gray-600'>My Account</div>
                <div className='text-gray-600'>Logo</div>
            </div>
            <div>Login in or sign up for an account</div>
            <div className='flex items-center justify-start gap-16'>
                <button className='bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-300 outline-none w-20 h-12'>Log In</button>
                <button className='bg-white text-slate-800 font-semibold rounded-lg  hover:border-[3px]  border-2 border-black w-20 h-12'>Sign Up</button>
            </div>
        </div>

        <hr className='h-1  bg-slate-500' />
        <div className='flex items-center justify-between'>
            <div className='text-gray-600'> Saved for Later</div>
            <div className='text-gray-600'>Logo</div>
        </div>

      
    </div>
  )
}

export default ResponsiveSideNavbar
