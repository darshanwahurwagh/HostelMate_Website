const Fee = require("../models/Fee");

// Generate Fee
const createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);

    res.status(201).json(fee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Fees
const getFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("student");

    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateFeeStatus = async (
  req,
  res
) => {
  try {
    const fee =
      await Fee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(fee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getFeeStats = async (
  req,
  res
) => {
  try {
    const totalFees =
      await Fee.countDocuments();

    const paidFees =
      await Fee.countDocuments({
        status: "Paid",
      });

    const pendingFees =
      await Fee.countDocuments({
        status: "Pending",
      });

    res.json({
      totalFees,
      paidFees,
      pendingFees,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getStudentFees = async (req, res) => {
  try {
    const fees = await Fee.find({
      student: req.params.studentId,
    }).populate("student");

    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const sendEmail = require(
  "../utils/sendEmail"
);

module.exports = {
  createFee,
  getFees,
  updateFeeStatus,
  getFeeStats,
  getStudentFees,
};