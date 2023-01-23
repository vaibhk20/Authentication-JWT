import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { checkAuth } from "../core/features/userSclice";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Menu from "../pages/Menu";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import UnProtected from "./UnProtected";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import ResetPassword from "../pages/ResetPassword";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e.key === "token") {
        if (e.newValue !== e.oldValue) {
          toast.error("You're not authorized");
          dispatch(checkAuth());
          console.log("auth");
        }
      }
    });
  }, []);
  return (
    <React.Fragment>
      <div>
        <Toaster position="top-center"></Toaster>
      </div>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes/>} path='/'>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route element={<UnProtected/>} path='/'>
            <Route element={<Menu/>}  path='/home'/>
            <Route element={<Login/>} path="/userLogin"/>
            <Route element={<Register/>} path="/registerUser"/>
            <Route element={<ResetPassword/>} path='/forgotPassword'/>
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default Home;
