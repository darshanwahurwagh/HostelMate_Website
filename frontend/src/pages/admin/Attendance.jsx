import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminAttendance = () => {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance");
      setRecords(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch attendance records");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCheckIn = (record) => {
    return record.checkIn?.trim() || "-";
  };

  const getCheckOut = (record) => {
    return record.checkOut?.trim() || "-";
  };

  const isCheckedIn = (record) => {
    return record.checkIn && record.checkIn.trim() !== "";
  };

  const isCheckedOut = (record) => {
    return record.checkOut && record.checkOut.trim() !== "";
  };

  const filteredRecords = records.filter((record) => {
    return selectedStudent ? record.student?._id === selectedStudent : true;
  });

  const totalCheckIns = filteredRecords.filter(isCheckedIn).length;
  const totalCheckOuts = filteredRecords.filter(isCheckedOut).length;

  const studentSummary = students
    .map((student) => {
      const studentRecords = records.filter(
        (record) => record.student?._id === student._id
      );

      const checkInCount = studentRecords.filter(isCheckedIn).length;
      const checkOutCount = studentRecords.filter(isCheckedOut).length;

      return {
        ...student,
        totalRecords: studentRecords.length,
        checkInCount,
        checkOutCount,
      };
    })
    .filter((student) =>
      selectedStudent ? student._id === selectedStudent : true
    );

  return (
    <div className="attendance-page">
      <div className="page-header">
        <div>
          <h1>Student Attendance</h1>
          <p>View student-wise attendance, check-in and check-out history.</p>
        </div>
      </div>

      <div className="attendance-filter-card">
        <div>
          <label>Filter by Student</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">All Students</option>

            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} - {student.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="dashboard-cards attendance-stats">
        <div className="dashboard-card">
          <h3>Total Records</h3>
          <h2>{filteredRecords.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Check-Ins</h3>
          <h2>{totalCheckIns}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Check-Outs</h3>
          <h2>{totalCheckOuts}</h2>
        </div>
      </div>

      <div className="table-container attendance-table-card">
        <div className="section-title">
          <div>
            <h2>Student Wise Attendance Count</h2>
            <p>Total check-ins and check-outs for each student.</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Total Records</th>
              <th>Check-In Count</th>
              <th>Check-Out Count</th>
            </tr>
          </thead>

          <tbody>
            {studentSummary.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.totalRecords}</td>
                <td>{student.checkInCount}</td>
                <td>{student.checkOutCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {studentSummary.length === 0 && <p>No student attendance found.</p>}
      </div>

      <div className="table-container attendance-table-card">
        <div className="section-title">
          <div>
            <h2>Detailed Attendance Records</h2>
            <p>Daily check-in and check-out history.</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.student?.name || "N/A"}</td>
                <td>{record.student?.email || "N/A"}</td>
                <td>
                  {record.date
                    ? new Date(record.date).toLocaleDateString()
                    : "-"}
                </td>
                <td>{getCheckIn(record)}</td>
                <td>{getCheckOut(record)}</td>
                <td>
                  <span className="status-pill">{record.status || "-"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRecords.length === 0 && <p>No attendance records found.</p>}
      </div>
    </div>
  );
};

export default AdminAttendance;