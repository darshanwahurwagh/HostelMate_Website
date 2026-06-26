import { useEffect, useState } from "react";
import api from "../../services/api";

const Attendance = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      const res = await api.get(`/attendance/student/${studentId}`);

      setRecords(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch attendance");
    }
  };

  const handleCheckIn = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      const res = await api.post("/attendance/checkin", {
        student: studentId,
      });

      alert(res.data.message);
      fetchAttendance();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Check-In failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      const res = await api.post("/attendance/checkout", {
        student: studentId,
      });

      alert(res.data.message);
      fetchAttendance();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Check-Out failed");
    }
  };

  const today = new Date().toLocaleDateString();

  const todayRecord = records.find(
    (record) =>
      new Date(record.date).toLocaleDateString() === today
  );

  return (
    <div>
      <h1>My Attendance</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          className="btn"
          onClick={handleCheckIn}
          disabled={!!todayRecord}
          style={{ marginRight: "10px" }}
        >
          Check-In
        </button>

        <button
          className="btn"
          onClick={handleCheckOut}
          disabled={!todayRecord || !!todayRecord.checkOut}
        >
          Check-Out
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td>
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td>{record.checkIn || "-"}</td>
                <td>{record.checkOut || "-"}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <p>No attendance records found.</p>
        )}
      </div>
    </div>
  );
};

export default Attendance;