const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

// Register user
exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    try {

        if (!email || !password || !role) {
            return res.status(400).json({ error: "Email, mật khẩu, vai trò là bắt buộc" });
        }
        const existing = await pool.query(
            "SELECT id FROM users WHERE email=$1",
            [email]
        );

        if (existing.rows.length > 0) {
            return res.status(400).json({ error: "Email đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *",
            [email, hashedPassword, role]
        );
        res.json({ message: "Đăng ký thành công", user: result.rows[0] });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Lỗi máy chủ" });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        if (!password) {
            return res.status(400).json({ error: "Mật khẩu là bắt buộc" });
        }

        //find by email or username
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1 OR username = $2",
            [email || null, username || null]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Người dùng không tồn tại" });
        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ error: "Mật khẩu không đúng" });
        }

        const token = generateToken(user);
        res.json({
            message: "Đăng nhập thành công",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });
    } catch (err) {
        console.error("Đăng nhập thất bại:", err);
        res.status(500).json({ error: "Lỗi máy chủ" });
    }
};


//Change password
exports.changePassword = async (req, res) => {

    try {

        const userId = req.user.id;

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                error: "Vui lòng nhập đủ thông tin"
            });
        }


        if (newPassword.length < 8) {
            return res.status(400).json({
                error: "Mật khẩu phải có ít nhất 8 ký tự"
            });
        }


        const result = await pool.query(
            `SELECT password_hash
             FROM users
             WHERE id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Người dùng không tồn tại"
            });
        }

        const user = result.rows[0];


        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password_hash
        );

        if (!isMatch) {
            return res.status(400).json({
                error: "Mật khẩu cũ không đúng"
            });
        }


        const newHash = await bcrypt.hash(newPassword, 10);

        await pool.query(
            `UPDATE users
             SET password_hash = $1
             WHERE id = $2`,
            [newHash, userId]
        );

        res.json({
            message: "Mật khẩu đã được thay đổi thành công"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Lỗi máy chủ"
        });

    }

};