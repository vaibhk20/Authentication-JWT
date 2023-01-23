import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../core/features/userSclice";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const { user } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout_handler = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  // console.log(user.user.email);
  return (
    <>
      <div>
        <Toaster position="top-center"></Toaster>
      </div>
      <header>{/* <span>{user && user.user.email}</span> */}</header>

      <h1>WELCOME TO YOUR FEED!</h1>
      <h1></h1>
      <button onClick={logout_handler}>logout</button>
    </>
  );
};

export default Dashboard;
