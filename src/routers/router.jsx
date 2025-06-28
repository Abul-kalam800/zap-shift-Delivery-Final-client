import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AuthenticLayouts from "../Layouts/AuthenticLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Coverag from "../Pages/Coverag/Coverag";
import SendPercel from "../Pages/sendPercel/SendPercel";
import Dashboard from "../Layouts/Dashboard";

export const router = createBrowserRouter([
    {
    path:'/',
    Component:RootLayouts,
    children:[{

        path:'/',
        index:true,
        Component:Home
    },
    {
        path:'/coverage',
        Component:Coverag,
        loader: ()=>fetch('/public/warehouses.json')
    },
    {
        path:'/sendpercel',
        Component:SendPercel,
         loader: ()=>fetch('/public/warehouses.json')
    }
]

},
{
    path:'/',
    Component:AuthenticLayouts,
    children:[
        {
            path:'/login',
            Component:Login,
        },
        {
            path:'/register',
            Component:Register
        }  
     ]
},
{
    path:'/dashboard',
    Component:Dashboard,

}
])