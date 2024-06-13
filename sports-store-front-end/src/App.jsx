import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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


function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)'
  })
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Single_Product_page/>},
        { path:"product", element:<ProductCart />},
     
        {  
          path: "myaccout",
          element: <ResponsiveRootLayout />,
          children:[
            {
              index:true, 
              path:"profile", element: <Profile />
            },
            { path: "address", element: <Address /> },
            { path: "Oders", element: <Oders />},
            { path: "PaymentMethods", element: <PaymentMethods /> },
            { path: "Wishlist", element: <WishList /> },
            { path: "bikes", element: <Bikes /> },
            { path: "Wheels", element: <Wheels /> },
          ],
        },
      ],
      
    },
  ]);

  return <RouterProvider router={router}/>;
}

export default App;

