const Attendance = require("../models/Attendance");

// Student Check-In Button
const checkIn = async (req, res) => {
  try {
    const { student } = req.body;

    if (!student) {
      return res.status(400).json({
        message: "Student ID is required",
      });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      student,
      date: { $gte: startOfDay },
    });

    if (existing) {
      return res.status(400).json({
        message: "You already checked in today",
      });
    }

    const attendance = await Attendance.create({
      student,
      date: new Date(),
      checkIn: new Date().toLocaleTimeString(),
      status: "Present",
    });

    res.status(201).json({
      message: "Check-In successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Student Check-Out Button
const checkOut = async (req, res) => {
  try {
    const { student } = req.body;

    if (!student) {
      return res.status(400).json({
        message: "Student ID is required",
      });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      student,
      date: { $gte: startOfDay },
    });

    if (!attendance) {
      return res.status(400).json({
        message: "Please check in first",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        message: "You already checked out today",
      });
    }

    attendance.checkOut = new Date().toLocaleTimeString();
    await attendance.save();

    res.status(200).json({
      message: "Check-Out successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Attendance For Admin
const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("student")
      .sort({ createdAt: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Attendance By Student
const getStudentAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      student: req.params.studentId,
    })
      .populate("student")
      .sort({ createdAt: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Attendance Stats
const getAttendanceStats = async (req, res) => {
  try {
    const total = await Attendance.countDocuments();

    const present = await Attendance.countDocuments({
      status: "Present",
    });

    const checkedOut = await Attendance.countDocuments({
      checkOut: { $ne: "" },
    });

    res.status(200).json({
      total,
      present,
      checkedOut,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getAttendance,
  getStudentAttendance,
  getAttendanceStats,
};