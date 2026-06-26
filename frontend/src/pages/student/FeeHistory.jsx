import { useEffect, useState } from "react";
import api from "../../services/api";

const FeeHistory = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      const res = await api.get(`/fees/student/${studentId}`);

      setFees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadReceipt = (feeId) => {
    window.open(
      `http://localhost:5000/api/receipts/fee/${feeId}`,
      "_blank"
    );
  };

  return (
    <div>
      <h1>Fee History</h1>

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Date</th>
            <th>Download PDF</th>
          </tr>
        </thead>

        <tbody>
          {fees.map((fee) => (
            <tr key={fee._id}>
              <td>{fee.month}</td>
              <td>₹{fee.amount}</td>
              <td>{fee.status}</td>
              <td>
                {fee.paymentDate
                  ? new Date(fee.paymentDate).toLocaleDateString()
                  : "Not Paid"}
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => downloadReceipt(fee._id)}
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {fees.length === 0 && <p>No fee records found.</p>}
    </div>
  );
};

export default FeeHistory;