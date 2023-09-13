import React,{useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const RequireAuthAmin = () => {
  
  const { auth } = useContext(AuthContext)


  return auth.user?.admin ? <Outlet /> : <Navigate to="/" replace />;
};