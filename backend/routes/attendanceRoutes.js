const express = require("express");

const {
  checkIn,
  checkOut,
  getAttendance,
  getStudentAttendance,
  getAttendanceStats,
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);

router.get("/", getAttendance);
router.get("/stats", getAttendanceStats);
router.get("/student/:studentId", getStudentAttendance);

module.exports = router;