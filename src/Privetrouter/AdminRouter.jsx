import React, { Children } from "react";
import useAuth from "../hook/useAuth";
import useRoleUser from "../hook/useRoleuser";
import { Navigate } from "react-router";
import Forbidden from "../Pages/Forbidden";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRoleUser();
  if (loading || isLoading) return <span>loading....</span>

  if (!user || role !== "admin") return <Navigate state={{form: location.pathname}} to='/forbidden'></Navigate>
  return children
};

export default AdminRouter;
