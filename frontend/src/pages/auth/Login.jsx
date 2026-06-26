import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import Modal from "../../components/Modal/Modal";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Forgot password states
  const [mode, setMode] = useState("login"); // 'login' | 'forgot' | 'verify'
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);
      const { user, token } = res.data;

      if (user.role === "Student" && !user.studentId) {
        showModal(
          "Profile Error",
          "Student profile not found. Please contact admin or register again."
        );
        return;
      }

      login(user, token);

      if (user.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      showModal("Login Error", error.response?.data?.message || "Login Failed");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotIdentifier) {
      showModal("Validation Error", "Please enter your Email or Phone Number.");
      return;
    }

    try {
      const res = await api.post("/auth/forgot-password", {
        identifier: forgotIdentifier,
      });
      showModal("OTP Sent", res.data.message || "OTP sent successfully.");
      setMode("verify");
    } catch (error) {
      showModal(
        "Request Failed",
        error.response?.data?.message || "Failed to request password reset OTP."
      );
    }
  };

  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      showModal("Validation Error", "Please fill in all verification fields.");
      return;
    }

    try {
      const res = await api.post("/auth/verify-otp", {
        identifier: forgotIdentifier,
        otp,
        newPassword,
      });
      showModal("Reset Successful", res.data.message || "Password reset successful.");
      setMode("login");
      // Clear forms
      setOtp("");
      setNewPassword("");
      setForgotIdentifier("");
    } catch (error) {
      showModal(
        "Verification Failed",
        error.response?.data?.message || "OTP verification failed."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {mode === "login" && (
          <>
            <h1>HostelMate Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div style={{ textAlign: "right", margin: "-5px 0 10px" }}>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2563eb",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <button className="btn" type="submit">
                Login
              </button>
            </form>

            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </>
        )}

        {mode === "forgot" && (
          <>
            <h1>Forgot Password</h1>
            <p style={{ color: "#64748b", marginBottom: "20px", fontSize: "14px" }}>
              Enter your registered email address or mobile number to receive a 6-digit OTP.
            </p>
            <form onSubmit={handleForgotPasswordSubmit}>
              <input
                type="text"
                placeholder="Email or Mobile Number"
                value={forgotIdentifier}
                onChange={(e) => setForgotIdentifier(e.target.value)}
                required
              />

              <button className="btn" type="submit" style={{ marginTop: "10px" }}>
                Send OTP
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setMode("login")}
                style={{ marginTop: "10px" }}
              >
                Back to Login
              </button>
            </form>
          </>
        )}

        {mode === "verify" && (
          <>
            <h1>Verify OTP</h1>
            <p style={{ color: "#64748b", marginBottom: "20px", fontSize: "14px" }}>
              Enter the 6-digit verification code and your new password.
            </p>
            <form onSubmit={handleVerifyOtpSubmit}>
              <input
                type="text"
                placeholder="6-Digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <button className="btn" type="submit" style={{ marginTop: "10px" }}>
                Reset Password
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setMode("forgot")}
                style={{ marginTop: "10px" }}
              >
                Back
              </button>
            </form>
          </>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        {modalMessage}
      </Modal>
    </div>
  );
};

export default Login;