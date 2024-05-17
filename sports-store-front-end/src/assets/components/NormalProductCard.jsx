import React from 'react'


const NormalProductCard = ({ProductImg, ProductName, OfferPrice, OriginalPrice}) => {
  return (
    <div  className=' w-[325px] h-[425px] bg-white'>
        <div className='px-3 py-8  bg-white'>
            <img src={ProductImg} alt="img1" className='w-full h-3/4 rounded-md'/>
            <div className='flex justify-between w-full'>
              <div className='text-gray-600'>{ProductName}</div>
              <div >
                <p className='text-gray-950'>${OfferPrice}</p>
                <p className='text-gray-500 line-through'>${OriginalPrice}</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default NormalProductCard;
