import { useEffect, useState } from "react";
import api from "../../services/api";

const MessBillHistory = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchMessBills();
  }, []);

  const fetchMessBills = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      const res = await api.get(
        `/mess-bills/student/${studentId}`
      );

      setBills(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch mess bills");
    }
  };

  const payMessBill = async (billId) => {
    const confirmPay = window.confirm(
      "Do you want to pay this mess bill?"
    );

    if (!confirmPay) return;

    try {
      await api.put(`/mess-bills/${billId}`, {
        status: "Paid",
      });

      alert("Mess bill payment successful");

      fetchMessBills();
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  return (
    <div>
      <h1>Mess Bill History</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Total Days</th>
              <th>Present Days</th>
              <th>Per Day Charge</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.month}</td>
                <td>{bill.totalDays}</td>
                <td>{bill.presentDays}</td>
                <td>₹{bill.perDayCharge}</td>
                <td>₹{bill.totalAmount}</td>
                <td>{bill.status}</td>
                <td>
                  {bill.status === "Pending" ? (
                    <button
                      className="btn"
                      onClick={() => payMessBill(bill._id)}
                    >
                      Pay Now
                    </button>
                  ) : (
                    <span>Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bills.length === 0 && (
          <p>No mess bill records found.</p>
        )}
      </div>
    </div>
  );
};

export default MessBillHistory;