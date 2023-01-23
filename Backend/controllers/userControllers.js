const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const Login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "please enter required fields",
      });
    }
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(400).send({ message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "wrong password!" });
    } else {
      const token = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_SECRET_TOKEN
      );
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 6000000),
        // httpOnly: true,
      });

      return res
        .status(200)
        .json({ user: user, message: "Login Succesful", token: token });
    }
  } catch {
    res.status(500).send({
      message: "please enter required fields",
    });
  }
};
const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Please enter data properly",
    });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).send({
      message: "User already exist!",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return res.send(user);
  }
};

const ForgotPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    return res.status(400).send({
      message: "User doesn't exist!",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    );
    return res.status(200).json({ updatedUser });
  }
};

const emailValidate = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    return res.status(500).send({ message: "User doesn't exist" });
  } else {
    return res.status(200).send(true);
  }
};

const Home = (req, res) => {
  return res.status(200).json({ isLoggidIn: true });
};

const RefreshToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET_TOKEN);
  res.cookie("jwttoken", token, {
    expires: new Date(Date.now() + 6000000),
    httpOnly: true,
  });
  return res.send("New token generated");
};

const logout = async (req, res) => {
  res.clearCookie("jwttoken");
  return res.status(200).json({ message: "User loggod out successfully" });
};

module.exports = {
  Home,
  Login,
  Signup,
  logout,
  ForgotPassword,
  RefreshToken,
  emailValidate,
};
