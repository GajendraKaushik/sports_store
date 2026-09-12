import React from 'react'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import MyaccountRootLayout from './MyaccountRootLayout'

// U16: responsive account layout. Desktop reuses the sidebar layout, mobile
// renders the nested account route directly. No pathname string matching —
// React Router's nested routes + <Outlet/> decide what shows. The mobile
// overview (CostumerDashBordSM) is the index route of /account.
const ResponsiveRootLayout = () => {
   const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1024px)'
      })
  if (isDesktopOrLaptop) {
    return <MyaccountRootLayout />
  }
  return (
    <div className="bg-stone-100 min-h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default ResponsiveRootLayout
