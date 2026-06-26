const sendEmail = require("../utils/sendEmail");
const Fee = require("../models/Fee");
const Complaint = require("../models/Complaint");

const sendFeeReminder = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id).populate("student");

    if (!fee) {
      return res.status(404).json({
        message: "Fee record not found",
      });
    }

    await sendEmail(
      fee.student.email,
      "HostelMate Fee Reminder",
      `Dear ${fee.student.name}, your hostel fee for ${fee.month} is ₹${fee.amount}. Current status: ${fee.status}. Please pay it as soon as possible.`
    );

    res.status(200).json({
      message: "Fee reminder email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const sendComplaintStatusEmail = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Student email is required",
      });
    }

    await sendEmail(
      email,
      "HostelMate Complaint Status Update",
      `Dear ${complaint.studentName}, your complaint "${complaint.title}" is currently marked as "${complaint.status}".`
    );

    res.status(200).json({
      message: "Complaint status email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendFeeReminder,
  sendComplaintStatusEmail,
};