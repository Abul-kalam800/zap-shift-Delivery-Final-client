import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AuthenticLayouts from "../Layouts/AuthenticLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Coverag from "../Pages/Coverag/Coverag";
import SendPercel from "../Pages/sendPercel/SendPercel";
import Dashboard from "../Layouts/Dashboard";
import Myparcel from "../Pages/DashboardPage/Myparcel";
import PrivetRouter from "../Privetrouter/PrivetRouter";
import Payment from "../Pages/DashboardPage/Payment/Payment";
import PaymentHistroy from "../Pages/DashboardPage/PaymentHistroy";
import TrackPackeg from "../Pages/DashboardPage/Track packeg/TrackPackeg";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverag,
        hydrateFallbackElement: (
          <span className="loading loading-bars loading-xl"></span>
        ),
        loader: () => fetch("/public/warehouses.json"),
      },
      {
        path: "/sendpercel",
        Component: SendPercel,
        loader: () => fetch("/public/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthenticLayouts,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <Dashboard></Dashboard>
      </PrivetRouter>
    ),
    children: [
      {
        path: "myparcel",
        element: (
          <PrivetRouter>
            <Myparcel></Myparcel>
          </PrivetRouter>
        ),
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path:'paymenthistory',
        Component:PaymentHistroy
      },
      {
        path:'track',
        Component:TrackPackeg
      }
    ],
  },
]);
