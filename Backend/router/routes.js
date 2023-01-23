const express = require("express");
const {
  Login,
  Signup,
  Home,
  RefreshToken,
  logout,
  ForgotPassword,
  emailValidate,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/authentication");
const router = express.Router();

router.post("/registerUser", Signup);
// name. email, password
router.post("/userLogin", Login);
// emial, password
router.post("/check", verifyToken, Home);
// token
router.get("/logout", logout);
router.post("/emailValidate", emailValidate);
router.post("/resetPassword", ForgotPassword);
router.post("/refreshToken", RefreshToken);
// token

module.exports = router;
