import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  passwordResetRequest,
  emailValidate,
  resetValidation,
} from "../core/features/userSclice";

const ResetPassword = () => {
  const [inputEmail, setEmail] = useState();
  const [inputPassword, setPassword] = useState();
  const { emailValidation } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationRequest = (e) => {
    e.preventDefault();
    dispatch(emailValidate(inputEmail));
    dispatch(resetValidation());
  };

  const passwordReset = (e) => {
    e.preventDefault();
    const updatedPassword = {
      email: inputEmail,
      password: inputPassword,
    };
    dispatch(passwordResetRequest(updatedPassword));
    dispatch(resetValidation());
    navigate("/home");
  };

  return (
    <React.Fragment>
      <header>
        <span>
          <Link to="/home">Home</Link>
        </span>
      </header>
      <form>
        <h1>Forgot password</h1>
        <input
          placeholder="enter your email address"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailValidation ? (
          <input
            placeholder="enter your new password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : null}
        {!emailValidation ? (
          <button type="submit" onClick={validationRequest}>
            Validate email
          </button>
        ) : (
          <button type="submit" onClick={passwordReset}>
            Request for reset
          </button>
        )}
      </form>
    </React.Fragment>
  );
};

export default ResetPassword;
