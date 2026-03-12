const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.generateToken = generateToken;