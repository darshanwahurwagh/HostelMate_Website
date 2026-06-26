import { useEffect, useState } from "react";
import api from "../../services/api";

const MessBills = () => {
  const [students, setStudents] = useState([]);
  const [bills, setBills] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    month: "",
    perDayCharge: 100,
  });

  useEffect(() => {
    fetchStudents();
    fetchBills();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch students");
    }
  };

  const fetchBills = async () => {
    try {
      const res = await api.get("/mess-bills");
      setBills(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch mess bills");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateBill = async (e) => {
    e.preventDefault();

    try {
      await api.post("/mess-bills/generate", formData);

      alert("Mess bill generated successfully");

      setFormData({
        studentId: "",
        month: "",
        perDayCharge: 100,
      });

      fetchBills();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to generate mess bill");
    }
  };

  const updateStatus = async (billId, status) => {
    try {
      await api.put(`/mess-bills/${billId}`, {
        status,
      });

      alert("Mess bill status updated");
      fetchBills();
    } catch (error) {
      console.log(error);
      alert("Failed to update mess bill");
    }
  };

  return (
    <div>
      <h1>Mess Bill Management</h1>

      <form className="form-grid" onSubmit={generateBill}>
        <select
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
        >
          <option value="">Select Student</option>

          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name} - {student.email}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="month"
          placeholder="Month e.g. June 2026"
          value={formData.month}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="perDayCharge"
          placeholder="Per Day Charge"
          value={formData.perDayCharge}
          onChange={handleChange}
          required
        />

        <button className="btn" type="submit">
          Generate Mess Bill
        </button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Month</th>
              <th>Total Days</th>
              <th>Present Days</th>
              <th>Per Day Charge</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.student?.name || "N/A"}</td>
                <td>{bill.student?.email || "N/A"}</td>
                <td>{bill.month}</td>
                <td>{bill.totalDays}</td>
                <td>{bill.presentDays}</td>
                <td>₹{bill.perDayCharge}</td>
                <td>₹{bill.totalAmount}</td>
                <td>{bill.status}</td>
                <td>
                  <select
                    value={bill.status}
                    onChange={(e) =>
                      updateStatus(bill._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bills.length === 0 && <p>No mess bill records found.</p>}
      </div>
    </div>
  );
};

export default MessBills;