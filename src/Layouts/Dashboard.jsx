import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../componets/Logo";
import {
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaShippingFast,
  FaUserEdit,
  FaUserClock,
  FaUserCheck,
} from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import useRoleUser from "../hook/useRoleuser";

const Dashboard = () => {

  const {role}= useRoleUser()
  console.log(role)
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar bg-base-300 w-full lg:hidden">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2 lg:hidden">Navbar Title</div>
            </div>
            <div className="my-10">
              <Outlet></Outlet>
            </div>
            {/* Page content here */}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Logo></Logo>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-500 font-bold bg-gray-100 p-2 rounded"
                  : "flex items-center gap-2 text-gray-700 hover:text-blue-500 p-2 rounded"
              }
            >
              <AiFillHome size={20} /> Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myparcel"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-500 font-bold bg-gray-100 p-2 rounded"
                  : "flex items-center gap-2 text-gray-700 hover:text-blue-500 p-2 rounded"
              }
            >
              <FaBoxOpen size={20} /> My Parcel
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/paymenthistory"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-500 font-bold bg-gray-100 p-2 rounded"
                  : "flex items-center gap-2 text-gray-700 hover:text-blue-500 p-2 rounded"
              }
            >
              <FaMoneyCheckAlt size={20} /> Payment History
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/track"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-500 font-bold bg-gray-100 p-2 rounded"
                  : "flex items-center gap-2 text-gray-700 hover:text-blue-500 p-2 rounded"
              }
            >
              <FaShippingFast size={20} /> Track a Package
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/updateprofile"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-blue-500 font-bold bg-gray-100 p-2 rounded"
                  : "flex items-center gap-2 text-gray-700 hover:text-blue-500 p-2 rounded"
              }
            >
              <FaUserEdit size={20} /> Update Profile
            </NavLink>
            </li>
            {
              !role || role==='admin' &&
              <>
              <li>
              <NavLink
                to="/dashboard/pending-riders"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-blue-500 font-bold bg-gray-100 p-2 rounded"
                    : "flex items-center gap-2 text-gray-700 hover:text-blue-500 p-2 rounded"
                }
              >
                <FaUserClock   size={20}/>
                Pending Riders
              </NavLink>
            </li>

            {/* Active Riders Link */}
            <li>
              <NavLink
                to="/dashboard/active-riders"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-blue-500 font-bold bg-gray-100 p-2 rounded"
                    : "flex items-center gap-2 text-gray-700 hover:text-blue-500 p-2 rounded"
                }
              >
                <FaUserCheck  size={20} />
                Active Riders
              </NavLink>
          
          </li>
            <li>
              <NavLink
                to="/dashboard/make-admin"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-blue-500 font-bold bg-gray-100 p-2 rounded"
                    : "flex items-center gap-2 text-gray-700 hover:text-blue-500 p-2 rounded"
                }
              >
                <FaUserCheck  size={20} />
               MakeAdmin
              </NavLink>
          
          </li>
              </>
            }
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
