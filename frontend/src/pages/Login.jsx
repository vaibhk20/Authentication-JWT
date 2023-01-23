import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, reset } from "../core/features/userSclice";
import toast from "react-hot-toast";

const Login = () => {
  const [inputEmail, setEmail] = useState();
  const [inputPassword, setPassword] = useState();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.userDetails
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = {
      email: inputEmail,
      password: inputPassword,
    };
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("login successful");
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <React.Fragment>
      <header></header>
      <form>
        <h1>SIGN IN</h1>
        <input
          placeholder="username@gmail.com"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="left_link">
          <Link to="/forgotPassword">Forgot Password?</Link>
        </span>
        <span className="right_link">
          <Link to="/registerUser">New User?</Link>
        </span>
        <button type="submit" onClick={loginHandler}>
          LOGIN
        </button>
      </form>
    </React.Fragment>
  );
};

export default Login;
