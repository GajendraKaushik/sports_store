import React from 'react'

const WishList = () => {
  return (
    <div className='mt-32 m-20 '>
       <div>
        <div>Saved For Later</div>
        <div className='grid grid-cols-1 mt-16'>
            <div className='flex flex-col md:flex-row bg-white shadow-3xl '>
              <div>img</div>
              <div>
                <h3>bike name</h3>
                <p>
                  <div className='flex '>
                    <div>8000</div>
                    <div>6000</div>
                  </div>
                </p>
               <div className='flex'>
                <div>right sing</div>
                <div>in stock</div>
               </div>
              </div>
              <div>
                <div>add to cart</div>
                <div>remov</div>
              </div>
            </div>
        </div>
       </div>
    </div>
  )
}

export default WishList
