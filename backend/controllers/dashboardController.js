const Student = require("../models/Student");
const Room = require("../models/Room");
const Complaint = require("../models/Complaint");
const Fee = require("../models/Fee");

const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalRooms = await Room.countDocuments();

    const occupiedRooms = await Room.countDocuments({
      status: "Full",
    });

    const availableRooms = await Room.countDocuments({
      status: "Available",
    });

    const pendingComplaints = await Complaint.countDocuments({
      status: "Pending",
    });

    const inProgressComplaints = await Complaint.countDocuments({
      status: "In Progress",
    });

    const resolvedComplaints = await Complaint.countDocuments({
      status: "Resolved",
    });

    const pendingFees = await Fee.countDocuments({
      status: "Pending",
    });

    const paidFees = await Fee.countDocuments({
      status: "Paid",
    });

    const paidFeeRecords = await Fee.find({
      status: "Paid",
    });

    const totalRevenue = paidFeeRecords.reduce(
      (sum, fee) => sum + fee.amount,
      0
    );

    res.status(200).json({
      totalStudents,
      totalRooms,
      occupiedRooms,
      availableRooms,
      pendingComplaints,
      inProgressComplaints,
      resolvedComplaints,
      pendingFees,
      paidFees,
      totalRevenue,
      complaintChart: [
        {
          name: "Pending",
          value: pendingComplaints,
        },
        {
          name: "In Progress",
          value: inProgressComplaints,
        },
        {
          name: "Resolved",
          value: resolvedComplaints,
        },
      ],
      feeChart: [
        {
          name: "Pending",
          value: pendingFees,
        },
        {
          name: "Paid",
          value: paidFees,
        },
      ],
      roomChart: [
        {
          name: "Available",
          value: availableRooms,
        },
        {
          name: "Full",
          value: occupiedRooms,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};