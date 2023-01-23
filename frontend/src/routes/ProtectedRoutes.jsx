import React from 'react'
import { useSelector } from 'react-redux';
import {
    Navigate, Outlet,
  } from "react-router-dom";

const ProtectedRoutes = () => {
    const { isLoggedIn } = useSelector((state) => state.userDetails);
  return (
    <React.Fragment>
        {isLoggedIn? <Outlet/> : <Navigate to="/home"/>}
    </React.Fragment>
  )
}

export default ProtectedRoutes