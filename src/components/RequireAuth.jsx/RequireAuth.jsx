import React,{useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const RequireAuth = () => {
  
  const { auth } = useContext(AuthContext)


  return auth.user ? <Outlet /> : <Navigate to="/" replace />;
};