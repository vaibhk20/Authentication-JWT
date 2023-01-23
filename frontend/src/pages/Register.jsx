import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, reset } from "../core/features/userSclice";
import toast from "react-hot-toast";

const Register = () => {
  const [inputEmail, setEmail] = useState();
  const [inputPassword, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.userDetails
  );

  const singupHandler = (e) => {
    e.preventDefault();
    const formData = {
      email: inputEmail,
      password: inputPassword,
    };
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("user registered");
      navigate("/dashboard");
      console.log(user);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <React.Fragment>
      <header></header>
      <form>
        <h1>SIGN UP</h1>
        <input placeholder="user name" type="text" />
        <input
          placeholder="user@email.com"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="left_link">
          <Link to="/userLogin">Already a user?</Link>
        </span>
        <button type="submit" onClick={singupHandler}>
          SUBMIT
        </button>
      </form>
    </React.Fragment>
  );
};

export default Register;
