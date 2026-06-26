import { useEffect, useState } from "react";
import api from "../../services/api";

const Payments = () => {
  const [fees, setFees] = useState([]);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("studentId");
    setStudentId(id || "No studentId found");
    fetchFees(id);
  }, []);

  const fetchFees = async (id) => {
    try {
      if (!id) {
        alert("studentId not found in localStorage");
        return;
      }

      const res = await api.get(`/fees/student/${id}`);
      setFees(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch payments");
    }
  };

  const makePayment = async (feeId) => {
    try {
      await api.put(`/fees/${feeId}`, {
        status: "Paid",
        paymentDate: new Date(),
      });

      alert("Payment successful");
      fetchFees(localStorage.getItem("studentId"));
    } catch (error) {
      console.log(error);
      alert("Payment failed");
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
      <h1>My Payments</h1>

      <p>
        <strong>Student ID:</strong> {studentId}
      </p>

      <p>
        <strong>Total Fee Records:</strong> {fees.length}
      </p>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Payment</th>
              <th>Receipt</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((fee) => {
              const status = fee.status?.toLowerCase();
              const isPaid = status === "paid";
              const canPay =
                status === "pending" ||
                status === "unpaid" ||
                !status;

              return (
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
                    {canPay ? (
                      <button
                        className="btn"
                        onClick={() => makePayment(fee._id)}
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span>Paid</span>
                    )}
                  </td>

                  <td>
                    {isPaid ? (
                      <button
                        className="btn"
                        onClick={() => downloadReceipt(fee._id)}
                      >
                        Download Receipt
                      </button>
                    ) : (
                      <span>Available after payment</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {fees.length === 0 && (
          <p>
            No payment records found. Admin must generate fee for this exact
            student ID.
          </p>
        )}
      </div>
    </div>
  );
};

export default Payments;