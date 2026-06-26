const Room = require("../models/Room");
const Student = require("../models/Student");

// Create Room
const createRoom = async (req, res) => {
  try {
    const room = await Room.create({
      ...req.body,
      occupied: req.body.occupied || 0,
      status:
        Number(req.body.occupied || 0) >= Number(req.body.capacity)
          ? "Full"
          : "Available",
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("requestedStudents");

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Room
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    room.roomNumber = req.body.roomNumber || room.roomNumber;
    room.capacity =
      req.body.capacity !== undefined ? Number(req.body.capacity) : room.capacity;
    room.type = req.body.type || room.type;

    if (room.occupied >= room.capacity) {
      room.status = "Full";
    } else {
      room.status = "Available";
    }

    await room.save();

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Room
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Remove this room from all students who were allocated to it
    await Student.updateMany(
      {
        room: room._id,
      },
      {
        $set: {
          room: null,
          roomRequest: {
            requestedRoom: null,
            status: "None",
            requestedAt: null,
          },
        },
      }
    );

    // Remove pending requests for this room
    await Student.updateMany(
      {
        "roomRequest.requestedRoom": room._id,
      },
      {
        $set: {
          roomRequest: {
            requestedRoom: null,
            status: "None",
            requestedAt: null,
          },
        },
      }
    );

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Room deleted successfully and student room references cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
};