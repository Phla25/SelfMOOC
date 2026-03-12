const express = require("express");
const router = express.Router();

const { getTeacherProfile, updateTeacherProfile, createStudent } = require("../controllers/teacherController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Teacher profile routes
router.get("/profile", authMiddleware, getTeacherProfile);
router.put("/profile", authMiddleware, updateTeacherProfile);

// Create student route
router.post("/create-student", authMiddleware, createStudent);

module.exports = router;