import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AuthenticLayouts from "../Layouts/AuthenticLayouts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
    {
    path:'/',
    Component:RootLayouts,
    children:[{

        path:'/',
        index:true,
        Component:Home
    }]

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
}
])