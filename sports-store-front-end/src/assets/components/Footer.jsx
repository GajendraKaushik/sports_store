import React from 'react'
import youtub from "../images/BikeImg/logo-youtube.svg"
import tiktok from "../images/BikeImg/logo-tiktok.svg"
import appStor from "../images/BikeImg/appStore.svg"
import playStor from "../images/BikeImg/google-play-black.svg"

const Footer = () => {
  return (
    <div className='w-full bg-slate-600 box-borde'>
      <div className='py-12'>
      <div className='flex gap-y-5 mx-2 my-0 px-12 flex-wrap space-x-0 flex-col-reverse justify-between items-start md:flex-row md:mx-56'>
        <div className='flex items-center justify-center gap-8'>
            <div>
                <h3>SPPOERT</h3>
            <ul className='text-xs font-light text-gray-300 mt-4 leading-relaxed'>
                <li>contact Us</li>
                <li>FAQ</li>
                <li>Installments</li>
                <li>Shipping & Delivery</li>
                <li>Return</li>
                <li>Warranty</li>
                </ul>
            </div>
            <div> 
            <h3 >RESOURCEs</h3>
              <ul className='text-xs font-light text-gray-300 mt-4 leading-relaxed'>
                <li>Bike Archive</li>
                <li>Demo and Events</li>
                <li>Safety Recall Notice</li>
                <li>Suspension Calculator</li>
                <li>Turbo Range Calculator</li>
                <li>Become a Retailer</li>
                </ul>
            </div>
            <div>
                <h3>ABOUT</h3>
                <ul className='text-xs font-light text-gray-300 mt-4 line leading-relaxed'>
                <li>Our Story</li>
                <li>Careers</li>
                <li>Innovation</li>
                <li>Stories</li>
                <li>Press</li>
                <li>Sustainability</li>
            </ul>
            </div>
      
        </div>
        <div className='flex items-center justify-start flex-col'>
            <div className='mb-7'>
                <h3 className='uppercase'>speslized app</h3>
                <div className='flex flex-wrap gap-4 mt-4'>
                <img src={appStor} alt="appStore"/>
                <img src={playStor} alt="playStore"/>
                </div>
            </div>
            <div className='flex mr-24 gap-4 mt-3'>
                <div><ion-icon name="logo-instagram"></ion-icon></div>
                <div><ion-icon name="logo-facebook"></ion-icon></div>
                <div><img src={youtub} alt="youtub"  className='w-5 h-5 text-slate-300'/></div>
                <div><img src={tiktok} alt="tiktok" className='w-5 h-5 text-slate-300'/></div>
            </div>
        </div>
        <div className='flex flex-col justify-items-start'>
            <form action="">
             <div >
                <h3 className='uppercase'>NewsLatter</h3>
                <div className='flex flex-col mt-3 gap-4'>
                <input type="email" placeholder=' Email Addresse' className='bg-gray-700 text-gray-400 h-10 rounded-md md:w-3/4 outline-none'/>
                <button className='text-whit font-normal bg-red-800 h-10 rounded-md md:w-3/4'>Join</button>
                </div>
             </div>
            </form>
            <div className='w-3/4 mt-4'>
                <p className='text-xs'>By submitting your email address you agree to the <span className='text-white underline underline-offset-2'>Terms of Use</span></p>
            </div>
            <button className='md:w-3/4 h-10 rounded-md text-gray-500 bg-slate-800 mt-5'>FIND A RETALER</button>
        </div>
      </div>
      </div>

      <div className='pb-8 flex flex-col gap-5 my-0 mx-2 md:mx-60 text-xs'>
        <div className='flex gap-6 text-center flex-wrap flex-col md:items-center md:justify-center md:flex-row'>
            <div>PRIVACY</div>
            <div>TERMS OF USE</div>
            <div>DO NOT SELL MY PERSONAL INFORMATION (CALIFORNIA)</div>
            <div>CALIFORNIA TRANSPARENCY ACT</div>
        </div>
        <div className='flex text-xs gap-7 flex-wrap text-center flex-col md:items-center md:justify-center md:flex-row'>
            <div>© 1996-2024 Specialized Bicycle Components, Inc. All Rights Reserved.</div>
            <div>US | EN</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
