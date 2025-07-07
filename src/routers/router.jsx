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
import BeArider from "../Pages/Be a rider/BeArider";
import PendingRiders from "../Pages/Be a rider/PendingRiders";
import ActiveRiders from "../Pages/Be a rider/ActiveRiders";
import MakeAdmin from "../Pages/DashboardPage/makeAdmin.jsx/MakeAdmin";
import AdminRouter from "../Privetrouter/AdminRouter";
import Forbidden from "../Pages/Forbidden";
import AssignRiders from "../Pages/AssinRider/AssignRiders";

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
      {path:'/bearider',
        element:<PrivetRouter><BeArider></BeArider></PrivetRouter>,
        loader: () => fetch("/public/warehouses.json"),
      },
        {
        path:'forbidden',
        Component:Forbidden,
      }
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
      },
      {
        path:'assign-riders',
        element:<AdminRouter><AssignRiders></AssignRiders></AdminRouter>
      },
      {
        path:'pending-riders',
        element:<AdminRouter><PendingRiders></PendingRiders></AdminRouter>
      },
      {
        path:'active-riders',
        element:<AdminRouter><ActiveRiders></ActiveRiders></AdminRouter>
      },
      {
        path:'make-admin',
        element:<AdminRouter><MakeAdmin></MakeAdmin></AdminRouter>
      },
    

    ],
  },
]);
