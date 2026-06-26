const express = require("express");
const { generateQRCode } = require("../controllers/qrController");

const router = express.Router();

router.get("/generate", generateQRCode);

module.exports = router;