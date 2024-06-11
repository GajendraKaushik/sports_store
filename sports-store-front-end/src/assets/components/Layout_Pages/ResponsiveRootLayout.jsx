import React from 'react'
import { useMediaQuery } from 'react-responsive'
import MyaccountRootLayout from './MyaccountRootLayout'
import CostumerDashBordSM from '../Consumer_Details/CostumerDashBordSM'

const ResponsiveRootLayout = () => {
   const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1024px)'
      })
  return (
     <>
     {isDesktopOrLaptop ? <MyaccountRootLayout /> : <CostumerDashBordSM/>}
     </>
  )
}

export default ResponsiveRootLayout
