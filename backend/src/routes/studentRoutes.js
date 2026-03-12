const express = require("express");
const router = express.Router();

const { getStudentProfile, updateStudentProfile } = require("../controllers/studentController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Student profile routes
router.get("/profile", authMiddleware, getStudentProfile);
router.put("/profile", authMiddleware, updateStudentProfile);

module.exports = router;