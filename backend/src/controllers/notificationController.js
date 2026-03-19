const pool = require("../config/db");

// 1. Gửi thông báo (Giáo viên / Admin gửi cho Sinh viên / Phụ huynh)
const sendNotification = async (req, res) => {
    const senderId = req.user.id;
    const { title, content, type, receiverIds } = req.body;

    if (!title || !content || !receiverIds || !Array.isArray(receiverIds) || receiverIds.length === 0) {
        return res.status(400).json({ error: "Vui lòng cung cấp đủ title, content, và danh sách receiverIds" });
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Tạo thông báo mới
        const notifResult = await client.query(
            "INSERT INTO notifications (title, content, type, sender_id) VALUES ($1, $2, $3, $4) RETURNING id",
            [title, content, type || 'GENERAL', senderId]
        );
        const notificationId = notifResult.rows[0].id;

        // Thêm danh sách người nhận
        const insertReceiversQuery = `
            INSERT INTO notification_receivers (notification_id, user_id)
            VALUES ($1, $2)
        `;
        
        for (const userId of receiverIds) {
            await client.query(insertReceiversQuery, [notificationId, userId]);
        }

        await client.query("COMMIT");
        res.status(201).json({ message: "Gửi thông báo thành công", notificationId });
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Error sending notification:", err);
        res.status(500).json({ error: "Lỗi máy chủ khi gửi thông báo" });
    } finally {
        client.release();
    }
};

// 2. Xem danh sách thông báo của người dùng hiện tại (Sinh viên, Phụ huynh, Giáo viên)
const getNotifications = async (req, res) => {
    const userId = req.user.id;

    try {
        const query = `
            SELECT 
                n.id as notification_id,
                n.title,
                n.content,
                n.type,
                n.created_at,
                n.sender_id,
                u.email as sender_email,
                nr.is_read,
                nr.read_at
            FROM notification_receivers nr
            JOIN notifications n ON nr.notification_id = n.id
            LEFT JOIN users u ON n.sender_id = u.id
            WHERE nr.user_id = $1
            ORDER BY n.created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error("Error getting notifications:", err);
        res.status(500).json({ error: "Lỗi máy chủ khi lấy danh sách thông báo" });
    }
};

// 3. Đánh dấu một thông báo đã đọc
const markAsRead = async (req, res) => {
    const userId = req.user.id;
    const { notificationId } = req.params;

    try {
        const result = await pool.query(
            "UPDATE notification_receivers SET is_read = TRUE, read_at = CURRENT_TIMESTAMP WHERE notification_id = $1 AND user_id = $2 RETURNING *",
            [notificationId, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Không tìm thấy thông báo hoặc bạn không có quyền truy cập" });
        }

        res.json({ message: "Đánh dấu đã đọc thành công", data: result.rows[0] });
    } catch (err) {
        console.error("Error marking notification as read:", err);
        res.status(500).json({ error: "Lỗi máy chủ khi cập nhật trạng thái thông báo" });
    }
};

module.exports = {
    sendNotification,
    getNotifications,
    markAsRead
};
