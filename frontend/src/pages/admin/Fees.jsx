
import { useEffect, useState } from "react";
import api from "../../services/api";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    month: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await api.get("/fees");
      setFees(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch fees");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch students");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateFee = async (e) => {
    e.preventDefault();

    try {
      await api.post("/fees", formData);

      alert("Fee generated successfully");

      setFormData({
        student: "",
        amount: "",
        month: "",
        status: "Pending",
      });

      fetchFees();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to generate fee");
    }
  };

  const updateStatus = async (feeId, status) => {
    try {
      const payload = {
        status,
        paymentDate: status === "Paid" ? new Date() : null,
      };

      await api.put(`/fees/${feeId}`, payload);

      alert("Fee status updated");
      fetchFees();
    } catch (error) {
      console.log(error);
      alert("Failed to update fee status");
    }
  };

  const downloadReceipt = (feeId) => {
    window.open(
      `http://localhost:5000/api/receipts/fee/${feeId}`,
      "_blank"
    );
  };

  const sendFeeReminder = async (feeId) => {
    try {
      const res = await api.post(`/email/fee-reminder/${feeId}`);
      alert(res.data.message || "Fee reminder email sent successfully");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to send email");
    }
  };

  return (
    <div>
      <h1>Fee Management</h1>

      <form className="form-grid" onSubmit={generateFee}>
        <select
          name="student"
          value={formData.student}
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
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <button className="btn" type="submit">
          Generate Fee
        </button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Update Status</th>
              <th>Receipt</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => (
              <tr key={fee._id}>
                <td>{fee.student?.name || "N/A"}</td>
                <td>{fee.student?.email || "N/A"}</td>
                <td>{fee.month}</td>
                <td>₹{fee.amount}</td>
                <td>{fee.status}</td>
                <td>
                  {fee.paymentDate
                    ? new Date(fee.paymentDate).toLocaleDateString()
                    : "Not Paid"}
                </td>
                <td>
                  <select
                    value={fee.status}
                    onChange={(e) => updateStatus(fee._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => downloadReceipt(fee._id)}
                  >
                    Download PDF
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => sendFeeReminder(fee._id)}
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {fees.length === 0 && <p>No fee records found.</p>}
      </div>
    </div>
  );
};

export default Fees;

