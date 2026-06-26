const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },

    roomNumber: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Complaint",
  complaintSchema
);