import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'


import Login from "./assets/components/Login/Login";
import RequireAuth from "./lib/RequireAuth.jsx";


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
import Owner_Layout from "./assets/components/Owner/Owner_Layout";
import Owner_Login from "./assets/components/Owner/Owner_Login";
import Owner_Dashboard from "./assets/components/Owner/Owner_Dashboard";
import Owner_Products from "./assets/components/Owner/Owner_Products";
import Owner_Orders from "./assets/components/Owner/Owner_Orders";
import Owner_Store_Profile from "./assets/components/Owner/Owner_Store_Profile";
import RequireOwner from "./lib/RequireOwner.jsx";

import Product_List_Page from "./assets/components/Product/Product_List_Page";

import Single_Product_page from "./assets/components/Product/Single_Product_page";
import ProductCart from "./assets/components/Product/ProductCart";
import CheckoutPlaceholder from "./assets/components/Product/CheckoutPlaceholder";
import SignUp from "./assets/components/Login/SignUp";

// U10 -> I01: auth guard now reads the real session (AuthContext). Logged-out
// users get redirected to /auth/login by RequireAuth instead of a hardcoded
// false check. Cart/account pages render only when a JWT session exists.


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
        { path: "/cart", element: <RequireAuth><ProductCart /></RequireAuth> },
        { path: "/checkout", element: <RequireAuth><CheckoutPlaceholder /></RequireAuth> },
        
        // U02 + U16 + I01: Normalized + responsive account routes, now
        // behind the real session guard. ResponsiveRootLayout picks the
        // desktop sidebar or the mobile <Outlet/> shell. CostumerDashBordSM
        // is the mobile-only index overview; "profile" is the shared first
        // detail page.
        {  
          path: "/account",
          element: <RequireAuth><ResponsiveRootLayout /></RequireAuth>,
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

        // I09: real owner flow. /owner/login is public (reuses POST /auth/login
        // and rejects non-owner accounts). Everything under /owner is wrapped
        // in RequireOwner — logged-out users AND role=user accounts are
        // redirected to /owner/login (backend also 403s non-owner tokens).
        { path: "/owner/login", element: <Owner_Login /> },
        {
          path: "/owner",
          element: <RequireOwner><Owner_Layout /></RequireOwner>,
          children: [
            { index: true, element: <Owner_Dashboard /> },
            { path: "dashboard", element: <Owner_Dashboard /> },
            { path: "products", element: <Owner_Products /> },
            { path: "orders", element: <Owner_Orders /> },
            { path: "store-profile", element: <Owner_Store_Profile /> },
          ],
        },
      ],
      
    },
  ]);

  return <RouterProvider router={router}/>;
}

export default App;


