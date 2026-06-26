const Student = require("../models/Student");
const Room = require("../models/Room");

// Create Student
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("room")
      .populate("roomRequest.requestedRoom");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Student
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("room")
      .populate("roomRequest.requestedRoom");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Student Apply For Room
const applyForRoom = async (req, res) => {
  try {
    const { roomId } = req.body;

    const student = await Student.findById(req.params.id);
    const room = await Room.findById(roomId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // If student has a room id, verify that room still exists.
    // If room was deleted, clean stale room reference.
    if (student.room) {
      const existingRoom = await Room.findById(student.room);

      if (existingRoom) {
        return res.status(400).json({
          message: "You already have an allocated room",
        });
      }

      student.room = null;
      await student.save();
    }

    if (student.roomRequest?.status === "Pending") {
      return res.status(400).json({
        message: "You already have a pending room request",
      });
    }

    if (room.status === "Full" || room.occupied >= room.capacity) {
      return res.status(400).json({
        message: "Room is already full",
      });
    }

    student.roomRequest = {
      requestedRoom: roomId,
      status: "Pending",
      requestedAt: new Date(),
    };

    const alreadyRequested = room.requestedStudents.some(
      (id) => id.toString() === student._id.toString()
    );

    if (!alreadyRequested) {
      room.requestedStudents.push(student._id);
    }

    await student.save();
    await room.save();

    const updatedStudent = await Student.findById(student._id)
      .populate("room")
      .populate("roomRequest.requestedRoom");

    res.status(200).json({
      message: "Room request submitted successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin Allocate Room
const allocateRoom = async (req, res) => {
  try {
    const { roomId } = req.body;

    const student = await Student.findById(req.params.id);
    const newRoom = await Room.findById(roomId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (!newRoom) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // If student has a room id, verify that room still exists.
    // If old room was deleted, clean stale room reference.
    if (student.room) {
      const oldRoom = await Room.findById(student.room);

      if (oldRoom) {
        if (student.room.toString() === roomId) {
          return res.status(400).json({
            message: "This room is already allocated to this student",
          });
        }

        oldRoom.occupied = Math.max(0, oldRoom.occupied - 1);
        oldRoom.status =
          oldRoom.occupied >= oldRoom.capacity ? "Full" : "Available";

        await oldRoom.save();
      }

      student.room = null;
    }

    if (newRoom.status === "Full" || newRoom.occupied >= newRoom.capacity) {
      return res.status(400).json({
        message: "Room is already full",
      });
    }

    student.room = roomId;

    // Clear request after approval/allocation
    student.roomRequest = {
      requestedRoom: null,
      status: "None",
      requestedAt: null,
    };

    newRoom.occupied += 1;

    newRoom.status =
      newRoom.occupied >= newRoom.capacity ? "Full" : "Available";

    newRoom.requestedStudents = newRoom.requestedStudents.filter(
      (id) => id.toString() !== student._id.toString()
    );

    await student.save();
    await newRoom.save();

    const updatedStudent = await Student.findById(student._id)
      .populate("room")
      .populate("roomRequest.requestedRoom");

    res.status(200).json({
      message: "Room allocated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin Reject Room Request
const rejectRoomRequest = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const requestedRoomId = student.roomRequest?.requestedRoom;

    if (requestedRoomId) {
      await Room.findByIdAndUpdate(requestedRoomId, {
        $pull: {
          requestedStudents: student._id,
        },
      });
    }

    student.roomRequest = {
      requestedRoom: null,
      status: "None",
      requestedAt: null,
    };

    await student.save();

    const updatedStudent = await Student.findById(student._id)
      .populate("room")
      .populate("roomRequest.requestedRoom");

    res.status(200).json({
      message: "Room request rejected successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Student Profile
const updateStudentProfile = async (req, res) => {
  try {
    const { name, education, phone, city, permanentAddress, profilePicture } = req.body;
    
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (name) student.name = name;
    if (education !== undefined) student.education = education;
    if (phone) student.phone = phone;
    if (city !== undefined) student.city = city;
    if (permanentAddress !== undefined) student.permanentAddress = permanentAddress;
    if (profilePicture !== undefined) student.profilePicture = profilePicture;

    await student.save();

    res.status(200).json({
      message: "Profile updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  applyForRoom,
  allocateRoom,
  rejectRoomRequest,
  updateStudentProfile,
};
