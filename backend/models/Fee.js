const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },

    paymentDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Fee",
  feeSchema
);