const express = require("express");

const {
  generateMessBill,
  getMessBills,
  getStudentMessBills,
  updateBillStatus,
} = require("../controllers/messBillController");

const router = express.Router();

router.post("/generate", generateMessBill);
router.get("/", getMessBills);
router.get("/student/:studentId", getStudentMessBills);
router.put("/:id", updateBillStatus);

module.exports = router;