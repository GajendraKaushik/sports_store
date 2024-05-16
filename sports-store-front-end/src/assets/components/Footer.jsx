import React from 'react'
import youtub from "../images/BikeImg/logo-youtube.svg"
import tiktok from "../images/BikeImg/logo-tiktok.svg"

const Footer = () => {
  return (
    <div className='w-full h-[700px] bg-slate-600 box-border'>
      <div className='px-12 flex  flex-col-reverse md:flex-col'>
        <div className='flex items-center'>
            <div>
                <h3>SPPOERT</h3>
            <ul className='text-xs font-light text-gray-300'>
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
              <ul className='text-xs font-light text-gray-300'>
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
                <ul className='text-xs font-light text-gray-300'>
                <li>Our Story</li>
                <li>Careers</li>
                <li>Innovation</li>
                <li>Stories</li>
                <li>Press</li>
                <li>Sustainability</li>
            </ul>
            </div>
        </div>
        <div>
            <h3>speslized app</h3>
            <div>
                <img src="" alt="" />
                <img src="" alt="" />
            </div>
            <div>
                <div><ion-icon name="logo-instagram"></ion-icon></div>
                <div><ion-icon name="logo-facebook"></ion-icon></div>
                <div><img src={youtub} alt="youtub"  className='w-5 h-5 text-slate-300'/></div>
                <div><img src={tiktok} alt="tiktok" className='w-5 h-5 text-slate-300'/></div>
            </div>
        </div>
        <div className='flex flex-col'>
            <form action="">
            <h3>NewsLatter</h3>
             <div>
                <input type="email" placeholder=' Email Addresse' className='bg-gray-700 text-gray-400'/>
                <button className='text-whit font-normal bg-red-800'>Join</button>
             </div>
            </form>
            <div>
                <p>By submitting your email address you agree to the Terms of Use</p>
            </div>
            <button className='w-12 h-12 text-gray-500 bg-slate-800'>FIND A RETALER</button>
        </div>
      </div>
      <div>
        <div className='flex'>
            <div>PRIVACY</div>
            <div>TERMS OF USE</div>
            <div>DO NOT SELL MY PERSONAL INFORMATION (CALIFORNIA)</div>
            <div>CALIFORNIA TRANSPARENCY ACT</div>
        </div>
        <div>
            <div>© 1996-2024 Specialized Bicycle Components, Inc. All Rights Reserved.</div>
            <div>US | EN</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
