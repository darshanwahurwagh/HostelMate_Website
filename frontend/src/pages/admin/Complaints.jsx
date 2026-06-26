import { useEffect, useState } from "react";
import api from "../../services/api";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  const [formData, setFormData] = useState({
    studentName: "",
    roomNumber: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch complaints");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addComplaint = async (e) => {
    e.preventDefault();

    try {
      await api.post("/complaints", formData);

      alert("Complaint added successfully");

      setFormData({
        studentName: "",
        roomNumber: "",
        title: "",
        description: "",
      });

      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed to add complaint"
      );
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/complaints/${id}`, {
        status,
      });

      alert("Complaint status updated");
      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert("Failed to update complaint status");
    }
  };

  const sendComplaintEmail = async (complaint) => {
    const email = prompt(
      "Enter student's email address:"
    );

    if (!email) return;

    try {
      const res = await api.post(
        `/email/complaint-status/${complaint._id}`,
        {
          email,
        }
      );

      alert(
        res.data.message ||
          "Email sent successfully"
      );
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed to send email"
      );
    }
  };

  return (
    <div>
      <h1>Complaint Management</h1>

      <form
        className="form-grid"
        onSubmit={addComplaint}
      >
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          required
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
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button
          className="btn"
          type="submit"
        >
          Add Complaint
        </button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Room</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map(
              (complaint) => (
                <tr
                  key={complaint._id}
                >
                  <td>
                    {
                      complaint.studentName
                    }
                  </td>

                  <td>
                    {
                      complaint.roomNumber
                    }
                  </td>

                  <td>
                    {complaint.title}
                  </td>

                  <td>
                    {
                      complaint.description
                    }
                  </td>

                  <td>
                    {complaint.status}
                  </td>

                  <td>
                    <select
                      value={
                        complaint.status
                      }
                      onChange={(e) =>
                        updateStatus(
                          complaint._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Resolved">
                        Resolved
                      </option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="btn"
                      onClick={() =>
                        sendComplaintEmail(
                          complaint
                        )
                      }
                    >
                      Send Email
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {complaints.length ===
          0 && (
          <p>
            No complaints found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Complaints;
