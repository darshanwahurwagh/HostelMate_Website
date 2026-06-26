const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    permanentAddress: {
      type: String,
      default: "",
    },

    profilePicture: {
      type: String,
      default: "",
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },

    roomRequest: {
      requestedRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        default: null,
      },

      status: {
        type: String,
        enum: ["None", "Pending", "Approved", "Rejected"],
        default: "None",
      },

      requestedAt: {
        type: Date,
        default: null,
      },
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);