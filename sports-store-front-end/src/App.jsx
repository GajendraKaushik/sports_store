import { useState } from "react";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'



import Login from "./assets/components/Login/Login";


import RootLayout from "./assets/components/Layout_Pages/RootLayout";
import MyaccountRootLayout from "./assets/components/Layout_Pages/MyaccountRootLayout";
import HomePage from "./assets/components/Pages/HomePage";
import ErrorPage from "./assets/components/Pages/ErrorPage";
import Profile from "./assets/components/Consumer_Details/Profile";
import Address from "./assets/components/Consumer_Details/Address";
import Oders from "./assets/components/Consumer_Details/Oders";
import PaymentMethods from "./assets/components/Consumer_Details/PaymentMethods";
import WishList from "./assets/components/Consumer_Details/WishList";
import Bikes from "./assets/components/Consumer_Details/Bikes";
import Wheels from "./assets/components/Consumer_Details/Wheels";

import Product_List_Page from "./assets/components/Product/Product_List_Page";

import Single_Product_page from "./assets/components/Product/Single_Product_page";
import ResponsiveRootLayout from "./assets/components/Layout_Pages/ResponsiveRootLayout";
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
        
        // U02: Normalized account routes
        {  
          path: "/account",
          element: <MyaccountRootLayout />,
          children:[
            { index:true, element: <Profile />, loader: async () => { /* Validate authentication here if needed */ }},
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
      ],
      
    },
  ]);

  return <RouterProvider router={router}/>;
}

export default App;


