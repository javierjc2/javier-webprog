const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer ')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch {
            res.status(401).json({ message: 'Not authorised, invalid token.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorised, no token.' });
    }
};

// Only admins can do write operations
const adminOnly = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required.' });
    }
    next();
};

module.exports = { protect, adminOnly };
