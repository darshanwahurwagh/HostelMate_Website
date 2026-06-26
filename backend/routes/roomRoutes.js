const express = require("express");

const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const router = express.Router();

router.post("/", createRoom);

router.get("/", getRooms);

router.put("/:id", updateRoom);

router.delete("/:id", deleteRoom);

module.exports = router;