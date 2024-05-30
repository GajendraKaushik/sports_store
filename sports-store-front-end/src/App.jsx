import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import Bikes from "./assets/components/Consumer_Details/Biles";
import Wheels from "./assets/components/Consumer_Details/Wheels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
     
      {
        path: "myaccout",
        element: <MyaccountRootLayout />,
        children: [
          {
            index:true,
            element: <Profile />,
          },
          { path: "address", element: <Address /> },
          { path: "Oders", element: <Oders /> },
          { path: "PaymentMethods", element: <PaymentMethods /> },
          { path: "Wishlist", element: <WishList /> },
          { path: "Bikes", element: <Bikes /> },
          { path: "Wheels", element: <Wheels /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

