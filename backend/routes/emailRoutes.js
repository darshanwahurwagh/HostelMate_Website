const express = require("express");

const {
  sendFeeReminder,
  sendComplaintStatusEmail,
} = require("../controllers/emailController");

const router = express.Router();

router.post("/fee-reminder/:id", sendFeeReminder);
router.post("/complaint-status/:id", sendComplaintStatusEmail);

module.exports = router;