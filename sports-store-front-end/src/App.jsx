import { useState } from "react";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'



import Login from "./assets/components/Login/Login";


import RootLayout from "./assets/components/Layout_Pages/RootLayout";
import ResponsiveRootLayout from "./assets/components/Layout_Pages/ResponsiveRootLayout";
import CostumerDashBordSM from "./assets/components/Consumer_Details/CostumerDashBordSM";
import HomePage from "./assets/components/Pages/HomePage";
import ErrorPage from "./assets/components/Pages/ErrorPage";
import Profile from "./assets/components/Consumer_Details/Profile";
import Address from "./assets/components/Consumer_Details/Address";
import Oders from "./assets/components/Consumer_Details/Oders";
import PaymentMethods from "./assets/components/Consumer_Details/PaymentMethods";
import WishList from "./assets/components/Consumer_Details/WishList";
import Bikes from "./assets/components/Consumer_Details/Bikes";
import Wheels from "./assets/components/Consumer_Details/Wheels";
import OwnerPlaceholder from "./assets/components/Owner/OwnerPlaceholder";

import Product_List_Page from "./assets/components/Product/Product_List_Page";

import Single_Product_page from "./assets/components/Product/Single_Product_page";
import ProductCart from "./assets/components/Product/ProductCart";
import SignUp from "./assets/components/Login/SignUp";

// U10: temporary frontend-only auth placeholder for the cart flow.
// Backend integration will replace this with a real session/token check.
const isAuthenticated = () => false;

const cartLoader = () => {
  // TODO: replace with backend session check (e.g. GET /api/v1/auth/session).
  if (!isAuthenticated()) {
    return redirect("/auth/login");
  }
  return null;
};


function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  })
  const router = createBrowserRouter([
    { // This is the root path "/"
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage/>},
        { 
          path:"/products", 
          element:<Product_List_Page />,
        },
        {
          path: "/products/:productSlug",
          element: <Single_Product_page />
        },
        { path: "/cart", element: <ProductCart />, loader: cartLoader },
        
        // U02 + U16: Normalized + responsive account routes.
        // ResponsiveRootLayout picks the desktop sidebar or the mobile
        // <Outlet/> shell. CostumerDashBordSM is the mobile-only index
        // overview; "profile" is the shared first detail page.
        {  
          path: "/account",
          element: <ResponsiveRootLayout />,
          children:[
            { index:true, element: <CostumerDashBordSM /> },
            { path: "profile", element: <Profile /> },
            { path: "addresses", element: <Address /> },
            { path: "orders", element: <Oders />},
            { path: "payment-methods", element: <PaymentMethods /> },
            { path: "wishlist", element: <WishList /> },
            { path: "bikes", element: <Bikes /> },
            { path: "wheels", element: <Wheels /> },
          ],
        },
        
        // U04: Auth routes
        { path: "/auth/login", element: <Login /> },
        { path: "/auth/signup", element: <SignUp /> },

        // U18: minimal owner route placeholders. Names align with the
        // backend owner API plan (/api/v1/owner/*). Real dashboard later.
        { path: "/owner/login", element: <OwnerPlaceholder title="Owner Login" /> },
        { path: "/owner/dashboard", element: <OwnerPlaceholder title="Owner Dashboard" /> },
        { path: "/owner/products", element: <OwnerPlaceholder title="Owner Products" /> },
        { path: "/owner/orders", element: <OwnerPlaceholder title="Owner Orders" /> },
        { path: "/owner/inventory", element: <OwnerPlaceholder title="Owner Inventory" /> },
        { path: "/owner/store-profile", element: <OwnerPlaceholder title="Owner Store Profile" /> },
      ],
      
    },
  ]);

  return <RouterProvider router={router}/>;
}

export default App;


