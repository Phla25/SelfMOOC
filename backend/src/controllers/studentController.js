const pool = require("../config/db");

exports.getStudentProfile = async (req, res) => {

    const userId = req.user.id;

    try {

        const result = await pool.query(
            `SELECT 
                s.name,
                s.dob,
                s.link_code,
                u.username,
                u.role
            FROM users u
            LEFT JOIN students s ON s.user_id = u.id
            WHERE u.id = $1`,
            [userId]
        );

        res.json(result.rows[0] || null);

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Lỗi máy chủ" });

    }

};

exports.updateStudentProfile = async (req, res) => {

    const userId = req.user.id;

    const { name, dob, username } = req.body;

    try {

        const studentResult = await pool.query(
            `INSERT INTO students (user_id, name, dob, link_code)
             VALUES (
                $1,
                $2,
                $3,
                (SELECT link_code FROM students WHERE user_id=$1)
             )
             ON CONFLICT (user_id)
             DO UPDATE SET
                name = EXCLUDED.name,
                dob = EXCLUDED.dob
             RETURNING *`,
            [userId, name, dob || null]
        );

        await pool.query(
            `UPDATE users
             SET username = $1
             WHERE id = $2`,
            [username || null, userId]
        );

        res.json({
            message: "Hồ sơ đã được cập nhật",
            student: studentResult.rows[0]
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