const mongoose = require("mongoose");

const messBillSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    totalDays: {
      type: Number,
      required: true,
      default: 30,
    },

    presentDays: {
      type: Number,
      required: true,
      default: 0,
    },

    perDayCharge: {
      type: Number,
      required: true,
      default: 100,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MessBill", messBillSchema);