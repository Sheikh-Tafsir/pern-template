require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.PASSWORD_ENCRYPT_SECRET_KEY;

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });

        req.user = user;
        next();
    });
};

module.exports = auth;
