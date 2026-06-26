const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["Single", "Double", "Triple"],
      required: true,
    },

    occupied: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Available", "Full"],
      default: "Available",
    },

    requestedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);