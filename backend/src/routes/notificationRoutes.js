const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authMiddleware } = require("../middleware/authMiddleware");

// Yêu cầu người dùng phải đăng nhập
router.use(authMiddleware);

// Gửi thông báo (POST /api/notifications/send)
router.post("/send", notificationController.sendNotification);

// Lấy danh sách thông báo của bản thân (GET /api/notifications)
router.get("/", notificationController.getNotifications);

// Đánh dấu một thông báo là đã đọc (PATCH /api/notifications/:notificationId/read)
router.patch("/:notificationId/read", notificationController.markAsRead);

module.exports = router;
