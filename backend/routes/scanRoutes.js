const express = require("express");
const { scanAttendance } = require("../controllers/scanController");

const router = express.Router();

router.post("/attendance", scanAttendance);

module.exports = router;