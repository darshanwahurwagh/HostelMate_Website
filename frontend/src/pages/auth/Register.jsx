import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import Modal from "../../components/Modal/Modal";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    education: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [redirectOnClose, setRedirectOnClose] = useState(false);

  const showModal = (title, message, shouldRedirect = false) => {
    setModalTitle(title);
    setModalMessage(message);
    setRedirectOnClose(shouldRedirect);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (redirectOnClose) {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 10-digit mobile number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      showModal("Validation Error", "Please enter a valid 10-digit mobile number.");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      course: formData.education, // maps Education to course field in backend schema
      role: "Student", // Register only as Student
    };

    try {
      const res = await api.post("/auth/register", payload);
      showModal(
        "Success",
        res.data.message || "Registration Successful",
        true
      );
    } catch (error) {
      console.log(error);
      showModal(
        "Error",
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="education"
            placeholder="Education"
            value={formData.education}
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

          <button type="submit" className="btn">
            Register
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title={modalTitle}
      >
        {modalMessage}
      </Modal>
    </div>
  );
};

export default Register;
