const express = require("express");

const {
  createStudent,
  getStudents,
  getStudentById,
  applyForRoom,
  allocateRoom,
  rejectRoomRequest,
  updateStudentProfile,
} = require("../controllers/studentController");

const router = express.Router();

// Student CRUD
router.post("/", createStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudentProfile);

// Room Request Routes
router.put("/apply-room/:id", applyForRoom);
router.put("/allocate/:id", allocateRoom);
router.put("/reject-room/:id", rejectRoomRequest);

module.exports = router;
