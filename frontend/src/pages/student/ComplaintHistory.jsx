import { useEffect, useState } from "react";
import api from "../../services/api";

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await api.get(
        `/complaints/student/${user.name}`
      );

      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Complaint History</h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Room</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.title}</td>
              <td>{complaint.roomNumber}</td>
              <td>{complaint.description}</td>
              <td>{complaint.status}</td>
              <td>
                {new Date(
                  complaint.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {complaints.length === 0 && (
        <p>No complaints found.</p>
      )}
    </div>
  );
};

export default ComplaintHistory;