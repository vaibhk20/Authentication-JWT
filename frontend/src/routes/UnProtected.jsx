import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

const UnProtected = () => {
    const { isLoggedIn } = useSelector((state) => state.userDetails);

  return (
    <React.Fragment>
        {!isLoggedIn? <Outlet/> : <Navigate to="/dashboard"/>}  
    </React.Fragment>
  )
}

export default UnProtected