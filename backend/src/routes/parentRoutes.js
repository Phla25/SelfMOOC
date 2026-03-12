const express = require("express");
const router = express.Router();

const {
    getParentProfile,
    linkParentToStudent,
    updateParentProfile,
    getChildren
} = require("../controllers/parentController");

const { authMiddleware } = require("../middleware/authMiddleware");

// Parent profile routes
router.get("/profile", authMiddleware, getParentProfile);
router.put("/profile", authMiddleware, updateParentProfile);

// Link parent to student and get children routes
router.post("/link-student", authMiddleware, linkParentToStudent);

// Get children of the parent
router.get("/children", authMiddleware, getChildren);
module.exports = router;