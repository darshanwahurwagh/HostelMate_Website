import { useEffect, useState } from "react";
import api from "../../services/api";

const StudentDashboard = () => {
  const [data, setData] = useState({
    student: null,
    fees: [],
    complaints: [],
    attendance: [],
    messBills: [],
  });

  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!studentId) {
        setError("Student ID not found. Please logout and login again.");
        return;
      }

      const [
        studentRes,
        feesRes,
        attendanceRes,
        messRes,
        complaintsRes,
      ] = await Promise.allSettled([
        api.get(`/students/${studentId}`),
        api.get(`/fees/student/${studentId}`),
        api.get(`/attendance/student/${studentId}`),
        api.get(`/mess-bills/student/${studentId}`),
        api.get(`/complaints/student/${user?.name}`),
      ]);

      setData({
        student:
          studentRes.status === "fulfilled"
            ? studentRes.value.data
            : null,

        fees:
          feesRes.status === "fulfilled"
            ? feesRes.value.data
            : [],

        attendance:
          attendanceRes.status === "fulfilled"
            ? attendanceRes.value.data
            : [],

        messBills:
          messRes.status === "fulfilled"
            ? messRes.value.data
            : [],

        complaints:
          complaintsRes.status === "fulfilled"
            ? complaintsRes.value.data
            : [],
      });
    } catch (error) {
      console.log(error);
      setError("Failed to load dashboard data");
    }
  };

  const pendingFees = data.fees.filter(
    (fee) =>
      fee.status === "Pending" ||
      fee.status === "Unpaid"
  );

  const paidFees = data.fees.filter(
    (fee) => fee.status === "Paid"
  );

  const pendingComplaints = data.complaints.filter(
    (complaint) => complaint.status === "Pending"
  );

  const latestMessBill = data.messBills[0];

  return (
    <div>
      <h1>Student Dashboard</h1>

      {error && (
        <p style={{ color: "red", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Room Number</h3>
          <h2>
            {data.student?.room
              ? data.student.room.roomNumber
              : "Not Allocated"}
          </h2>
        </div>

        <div className="dashboard-card">
          <h3>Pending Fees</h3>
          <h2>{pendingFees.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Paid Fees</h3>
          <h2>{paidFees.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Attendance Records</h3>
          <h2>{data.attendance.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Pending Complaints</h3>
          <h2>{pendingComplaints.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Latest Mess Bill</h3>
          <h2>
            {latestMessBill
              ? `₹${latestMessBill.totalAmount}`
              : "₹0"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;