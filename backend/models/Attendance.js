const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    checkIn: {
      type: String,
      default: "",
    },

    checkOut: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);