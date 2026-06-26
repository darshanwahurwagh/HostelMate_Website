const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

module.exports = router;