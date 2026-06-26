const Attendance = require("../models/Attendance");

const scanAttendance = async (req, res) => {
  try {
    const { studentId, qrData } = req.body;

    if (!studentId) {
      return res.status(400).json({
        message: "Student ID is required",
      });
    }

    const parsedQR = JSON.parse(qrData);

    if (parsedQR.type !== "HOSTEL_ATTENDANCE") {
      return res.status(400).json({
        message: "Invalid QR Code",
      });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      student: studentId,
      date: { $gte: startOfDay },
    });

    if (!existing) {
      const attendance = await Attendance.create({
        student: studentId,
        date: new Date(),
        checkIn: new Date().toLocaleTimeString(),
        status: "Present",
      });

      return res.status(201).json({
        message: "Check-In successful",
        attendance,
      });
    }

    if (!existing.checkOut) {
      existing.checkOut = new Date().toLocaleTimeString();
      await existing.save();

      return res.status(200).json({
        message: "Check-Out successful",
        attendance: existing,
      });
    }

    res.status(200).json({
      message: "Attendance already completed for today",
      attendance: existing,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "QR scan failed",
    });
  }
};

module.exports = {
  scanAttendance,
};