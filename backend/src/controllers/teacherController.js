const pool = require("../config/db");
const bcrypt = require("bcrypt");
exports.getTeacherProfile = async (req, res) => {

    const userId = req.user.id;

    try {

        const result = await pool.query(
            `SELECT 
                t.name,
                t.dob,
                t.phone,
                t.subject,
                u.email,
                u.username,
                u.role
            FROM users u
            LEFT JOIN teachers t ON t.user_id = u.id
            WHERE u.id = $1`,
            [userId]
        );

        res.json(result.rows[0] || null);

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Lỗi máy chủ" });

    }

};

exports.updateTeacherProfile = async (req, res) => {

    const userId = req.user.id;

    const { name, dob, phone, subject, username } = req.body;

    try {

        const teacherResult = await pool.query(
            `INSERT INTO teachers (user_id, name, dob, phone, subject)
             VALUES ($1,$2,$3,$4,$5)
             ON CONFLICT (user_id)
             DO UPDATE SET
                name = EXCLUDED.name,
                dob = EXCLUDED.dob,
                phone = EXCLUDED.phone,
                subject = EXCLUDED.subject
             RETURNING *`,
            [userId, name, dob || null, phone, subject]
        );

        await pool.query(
            `UPDATE users
             SET username = $1
             WHERE id = $2`,
            [username || null, userId]
        );

        res.json({
            message: "Hồ sơ đã được cập nhật",
            teacher: teacherResult.rows[0]
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

function generatePassword(length = 10) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#";
    let pass = "";

    for (let i = 0; i < length; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    return pass;
}

exports.createStudent = async (req, res) => {

    const { name, dob } = req.body;

    try {

        const username =
            "std_" + Math.random().toString(36).substring(2, 8);


        const password = generatePassword();

        const hashedPassword = await bcrypt.hash(password, 10);

        const userResult = await pool.query(
            `INSERT INTO users (username, password_hash, role)
             VALUES ($1,$2,'STUDENT')
             RETURNING id`,
            [username, hashedPassword]
        );

        const userId = userResult.rows[0].id;

        const link_code =
            "STD-" + Math.random().toString(36).substring(2, 7).toUpperCase();

        const studentResult = await pool.query(
            `INSERT INTO students (user_id, name, dob, link_code)
             VALUES ($1,$2,$3,$4)
             RETURNING *`,
            [userId, name, dob || null, link_code]
        );

        res.json({
            message: "Học sinh đã được tạo thành công",
            student: studentResult.rows[0],
            username,
            password
        });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Lỗi máy chủ" });

    }
};