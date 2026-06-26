import { useState } from "react";
import api from "../../services/api";

const StudentComplaints = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    studentName: user?.name || "",
    roomNumber: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      await api.post("/complaints", formData);

      alert("Complaint submitted successfully");

      setFormData({
        studentName: user?.name || "",
        roomNumber: "",
        title: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to submit complaint");
    }
  };

  return (
    <div>
      <h1>Submit Complaint</h1>

      <form className="form-grid" onSubmit={submitComplaint}>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          readOnly
        />

        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={formData.roomNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Complaint Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button className="btn" type="submit">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default StudentComplaints;