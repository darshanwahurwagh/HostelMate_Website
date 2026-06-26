const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Register User
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      course,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    let student = null;

    if (role === "Student") {
      student = await Student.findOne({ email });

      if (!student) {
        student = await Student.create({
          name,
          email,
          phone: phone || "0000000000",
          course: course || "Not Provided",
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    let studentId = null;

    if (user.role === "Student") {
      const student = await Student.findOne({ email: user.email });

      if (student) {
        studentId = student._id;
      }
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        studentId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Forgot Password OTP
const forgotPassword = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({ message: "Email or Phone Number is required" });
    }

    let user = null;

    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier.toLowerCase().trim() });
    } else {
      const student = await Student.findOne({ phone: identifier.trim() });
      if (student) {
        user = await User.findOne({ email: student.email });
      }
    }

    if (!user) {
      return res.status(404).json({ message: "Registered User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const subject = "HostelMate Password Reset OTP";
    const message = `Your password reset OTP is <strong>${otp}</strong>. It is valid for 10 minutes.`;
    await sendEmail(user.email, subject, message);

    console.log(`[SMS OTP] Sent OTP ${otp} to phone/email: ${identifier}`);

    res.status(200).json({
      success: true,
      message: "OTP sent to your registered email/mobile number.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP and Reset Password
const verifyOTP = async (req, res) => {
  try {
    const { identifier, otp, newPassword } = req.body;

    if (!identifier || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = null;

    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier.toLowerCase().trim() });
    } else {
      const student = await Student.findOne({ phone: identifier.trim() });
      if (student) {
        user = await User.findOne({ email: student.email });
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp || user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOTP,
};