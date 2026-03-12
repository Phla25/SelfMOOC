const express = require('express');
const router = express.Router();

const { register, login, changePassword } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Change password route
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;