import { useEffect, useState } from "react";
import api from "../../services/api";

const AttendanceHistory = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      const res = await api.get(
        `/attendance/student/${studentId}`
      );

      setRecords(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Attendance History</h1>

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
    </div>
  );
};

export default AttendanceHistory;