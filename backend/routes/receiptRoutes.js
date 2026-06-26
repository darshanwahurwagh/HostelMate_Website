const express = require(
  "express"
);

const {
  generateFeeReceipt,
} = require(
  "../controllers/receiptController"
);

const router =
  express.Router();

router.get(
  "/fee/:id",
  generateFeeReceipt
);

module.exports = router;