const MessBill = require("../models/MessBill");
const Attendance = require("../models/Attendance");

// Generate Mess Bill using attendance
const generateMessBill = async (req, res) => {
  try {
    const { studentId, month, perDayCharge } = req.body;

    const attendance = await Attendance.find({
      student: studentId,
      status: "Present",
    });

    const presentDays = attendance.length;
    const totalAmount = presentDays * Number(perDayCharge);

    const bill = await MessBill.create({
      student: studentId,
      month,
      totalDays: 30,
      presentDays,
      perDayCharge,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all mess bills
const getMessBills = async (req, res) => {
  try {
    const bills = await MessBill.find()
      .populate("student")
      .sort({ createdAt: -1 });

    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get student mess bills
const getStudentMessBills = async (req, res) => {
  try {
    const bills = await MessBill.find({
      student: req.params.studentId,
    })
      .populate("student")
      .sort({ createdAt: -1 });

    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update mess bill status
const updateBillStatus = async (req, res) => {
  try {
    const bill = await MessBill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!bill) {
      return res.status(404).json({
        message: "Mess bill not found",
      });
    }

    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateMessBill,
  getMessBills,
  getStudentMessBills,
  updateBillStatus,
};