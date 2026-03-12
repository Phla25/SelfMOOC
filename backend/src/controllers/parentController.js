const pool = require("../config/db");



exports.getParentProfile = async (req, res) => {

    const userId = req.user.id;

    try {

        const result = await pool.query(
            `SELECT 
                u.username,
                u.email,
                u.role,
                p.name,
                p.phone
            FROM users u
            LEFT JOIN parents p ON u.id = p.user_id
            WHERE u.id = $1`,
            [userId]
        );

        res.json(result.rows[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Lỗi máy chủ"
        });

    }

};


exports.updateParentProfile = async (req, res) => {

    const userId = req.user.id;

    const { name, phone, username } = req.body;

    try {

        const parentResult = await pool.query(
            `INSERT INTO parents (user_id, name, phone)
             VALUES ($1, $2, $3)
             ON CONFLICT (user_id)
             DO UPDATE SET
                name = EXCLUDED.name,
                phone = EXCLUDED.phone
             RETURNING *`,
            [userId, name, phone || null]
        );

        await pool.query(
            `UPDATE users
             SET username = $1
             WHERE id = $2`,
            [username || null, userId]
        );

        res.json({
            message: "Thông tin hồ sơ đã được cập nhật",
            parent: parentResult.rows[0]
        });

    } catch (err) {

        console.error(err);

        if (err.code === "23505") {
            return res.status(400).json({
                error: "Tên người dùng đã tồn tại"
            });
        }

        res.status(500).json({ error: "Lỗi máy chủ" });

    }

};


exports.linkParentToStudent = async (req, res) => {
    const parentUserId = req.user.id;
    const { link_code } = req.body;

    if (!link_code) {
        return res.status(400).json({ error: "Mã liên kết là bắt buộc" });
    }

    try {
        const parent = await pool.query(
            `SELECT * FROM parents WHERE user_id=$1`,
            [parentUserId]
        );

        if (parent.rows.length === 0) {
            return res.status(400).json({ error: "Hồ sơ phụ huynh không tồn tại" });
        }

        const parentId = parent.rows[0].id;

        const student = await pool.query(
            `SELECT id, name, link_code FROM students WHERE link_code=$1`,
            [link_code.trim()]
        );

        if (student.rows.length === 0) {
            return res.status(400).json({ error: "Mã liên kết không hợp lệ" });
        }

        const studentId = student.rows[0].id;

        const exist = await pool.query(
            `SELECT * FROM parent_student
             WHERE parent_id=$1 AND student_id=$2`,
            [parentId, studentId]
        );

        if (exist.rows.length > 0) {
            return res.json({
                message: "Học sinh đã được liên kết",
                student: student.rows[0]
            });
        }

        await pool.query(
            `INSERT INTO parent_student (parent_id, student_id)
             VALUES ($1,$2)`,
            [parentId, studentId]
        );

        res.json({
            message: "Phụ huynh đã được liên kết với học sinh thành công",
            student: student.rows[0]
        });
    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Lỗi máy chủ" });

    }
};

exports.getChildren = async (req, res) => {

    const userId = req.user.id;

    try {

        const result = await pool.query(
            `SELECT s.id, s.name, s.link_code
             FROM students s
             JOIN parent_student ps ON s.id = ps.student_id
             JOIN parents p ON ps.parent_id = p.id
             WHERE p.user_id = $1`,
            [userId]
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Lỗi máy chủ" });

    }

};