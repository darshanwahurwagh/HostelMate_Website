const express = require(
  "express"
);

const {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  getStudentComplaints,
} = require("../controllers/complaintController");

const router =express.Router();

router.post("/",createComplaint);
router.get("/",getComplaints);
router.get("/student/:studentName", getStudentComplaints);
router.put("/:id",updateComplaintStatus);
module.exports = router;