const express = require("express");

const {
  createFee,
  getFees,
  updateFeeStatus,
  getFeeStats,
  getStudentFees,
} = require("../controllers/feeController");

const router = express.Router();

router.post("/", createFee);
router.get("/", getFees);
router.get("/student/:studentId", getStudentFees);
router.put("/:id",updateFeeStatus);
router.get("/stats",getFeeStats);

module.exports = router;